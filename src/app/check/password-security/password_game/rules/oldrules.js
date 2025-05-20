import Rule from "./Rule";
import RuleWordle from "./RuleWordle/RuleWordle";
import RuleSlidingPuzzle from "./RuleSlidingPuzzle/RuleSlidingPuzzle";
import RuleMorse from "./RuleMorse/RuleMorse";
import RuleRiddle from "./RuleRiddle/RuleRiddle";
import RuleLocation from "./RuleLocation/RuleLocation";
import RuleTimeEmoji from "./RuleTimeEmoji/RuleTimeEmoji";
import RuleQR from "./RuleQR/RuleQR";
import RuleSum from "./RuleSum/RuleSum";
import RuleEarthquake from "./RuleEarthquake/RuleEarthquake";


var rules = [
    new Rule( 
        "Your password must be at least 10 characters long.",
        (t) => t?.length >= 10
    ),
    new Rule( 
        "Include both UPPERCASE and lowercase letters.",
        (t) => (/[A-Z]/.test(t) && /[a-z]/.test(t))
    ),
    new Rule( 
        "Include at least one number and one special character (!, @, #, etc.).",
        (t) => /\d/.test(t) && /[!@#$%^&*()_\-+=<>?]/.test(t)
    ),
    new Rule( 
        "Avoid common traps — your password must NOT contain 'password', '123456', or 'qwerty'.",
        (t) => !/(password|123456|qwerty)/i.test(t)
    ),
    new Rule( 
        "Your password must contain the word 'Caknak' (our cyber guardian 🛡️).",
        (t) => /caknak/i.test(t)
    ),
    new Rule( 
        "Include a Malaysian element like 'MY', 'Boleh', or 'Merdeka'.",
        (t) => /my|boleh|merdeka/i.test(t)
    ),
    new Rule(
        "Add a cybersecurity buzzword like 'phish', 'hack', or 'breach'.",
        (t) => /(phish|hack|breach)/i.test(t)
    ),
    new Rule(
        "Include a 2-digit prime number to add complexity.",
        (t) => /(11|13|17|19|23|29|31|37|41|43|47|53|59|61|67|71|73|79|83|89|97)/.test(t)
    ),
    new Rule( 
        "Mention an anti-fraud action like '2FA' or 'secure'.",
        (t) => /(2fa|secure)/i.test(t)
    ),
    new Rule(
        "Your password must include at least 3 different types of characters (e.g., letter, number, symbol).",
        (t) => {
            let types = 0;
            if (/[a-zA-Z]/.test(t)) types++;
            if (/\d/.test(t)) types++;
            if (/[^a-zA-Z0-9]/.test(t)) types++;
            return types >= 3;
        }
    ),
    new Rule(
        "Include a fake phishing domain like 'faceb00k', 'g00gle', or 'paypaI' to recognize bad patterns.",
        (t) => /(faceb00k|g00gle|paypaI)/i.test(t)
    ),
    new Rule(
        "Your password must include a hint of recovery like 'backup', 'reset', or 'recover'.",
        (t) => /(backup|reset|recover)/i.test(t)
    ),
    new Rule(
        "Mention a continent or region (Asia, Europe, etc.) to show awareness of global threats.",
        (t) => /asia|europe|africa|australia|oceania|north america|south america|antarctica/i.test(t)
    ),
    new Rule(
        "Your password must include the word 'check', 'educate', or 'test' to support cyber literacy.",
        (t) => /(check|educate|test)/i.test(t)
    ),
    new Rule(
        "Your password must include its length (e.g., '14' if the password has 14 characters).",
        (t) => {
            let l = t.length;
            return new RegExp(`${l}`).test(t);
        }
    )
];


function sort_rules(a, b){
    if(a.correct == b.correct){
        return b.num - a.num;
    }
    else if(!a.correct && b.correct){
        return -1;
    }
    else{
        return 1;
    }
}

export default rules;
export {sort_rules};