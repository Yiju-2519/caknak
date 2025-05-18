import { NextResponse } from "next/server";

// Function to analyze risks in the email text
function analyzeRisks(emailText: string) {
  const risks = [];
  
  // Detect external links
  const urlRegex = /https?:\/\/\S+/g;
  const urls = emailText.match(urlRegex) || [];
  if (urls.length > 0) {
    risks.push(`Contains external links: ${urls.join(', ')}`);
  }
  
  // Detect urgency language
  const urgencyKeywords = ['urgent', 'immediately', 'asap', 'act now', 'verify now', 'limited time', 'important notice'];
  const foundUrgency = urgencyKeywords.filter(kw => {
    const regex = new RegExp(`\\b${kw}\\b`, 'i');
    return regex.test(emailText);
  });
  if (foundUrgency.length > 0) {
    risks.push(`Uses urgency language: ${foundUrgency.join(', ')}`);
  }
  
  // Detect suspicious keywords
  const suspiciousKeywords = ['login', 'update your account', 'verify credentials', 'reset your password', 'unusual activity'];
  const foundSuspicious = suspiciousKeywords.filter(kw => emailText.toLowerCase().includes(kw));
  if (foundSuspicious.length > 0) {
    risks.push(`Suspicious keywords or action requests: ${foundSuspicious.join(', ')}`);
  }
  
  // Detect personalization
  const personalizationMarkers = ['dear', 'hello', 'hi', 'user', 'customer', 'subscriber'];
  const foundPersonalization = personalizationMarkers.filter(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    return regex.test(emailText);
  });
  if (foundPersonalization.length > 0) {
    risks.push(`Generic or fake personalization: ${foundPersonalization.join(', ')}`);
  }
  
  // Detect reward or penalty
  const baitPhrases = ['win a prize', 'get a reward', 'claim your gift', 'account suspended', 'will be deactivated'];
  if (baitPhrases.some(phrase => emailText.toLowerCase().includes(phrase))) {
    risks.push("Bait with reward or penalty");
  }
  
  // Detect bad grammar
  const grammarIssues = ['.  ', ' ,', '!!', '???', 'plz', 'u r', 'click heree', 'recieve'];
  if (grammarIssues.some(issue => emailText.toLowerCase().includes(issue))) {
    risks.push("Poor grammar or misspellings");
  }
  
  // Detect HTML obfuscation
  if (/<[^>]+>|&#\d+;/.test(emailText)) {
    risks.push("Obfuscated content or HTML tricks");
  }
  
  // Detect mismatch links
  if (/<a[^>]*href="(.*?)"[^>]*>(.*?)<\/a>/.test(emailText)) {
    risks.push("Mismatch between link text and actual URL");
  }
  
  return risks;
}

export async function POST(request: Request): Promise<Response> {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email content is required" },
        { status: 400 }
      );
    }

    // Call the Hugging Face Spaces API
    const response = await fetch("https://ems-royal-phising-detection-tm02.hf.space/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: email }),
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const hfResult = await response.json();
    
    // Calculate risk score (assuming "phishing_email" probability corresponds to risk)
    // Convert it to a 0-100 integer score
    const riskScore = Math.round(hfResult.all_probabilities.phishing_email * 100);
    
    // Analyze risk factors
    const riskFactors = analyzeRisks(email);
    
    // Construct the final result with the same structure as before
    const result = {
      prediction: hfResult.prediction,
      confidence: hfResult.confidence,
      all_probabilities: hfResult.all_probabilities,
      risk_score: riskScore,
      risk_factors: riskFactors
    };
    
    return NextResponse.json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to analyze email", details: errorMessage },
      { status: 500 }
    );
  }
} 