"use client";

import TopNav from "~/components/TopNav";
import Footer from "~/components/Footer";
import FlipCard from "~/components/FlipCard";
import Link from "next/link";
import { FaEnvelopeOpenText, FaUserFriends, FaGift, FaSearch, FaShieldAlt, FaQuestionCircle, FaArrowUp } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import StarryBackground from "~/components/StarryBackground";

export default function PhishingPreventionPage() {
    return (
        <main
            className="min-h-screen flex flex-col"
            style={{
                // backgroundImage: "url('/textures/parchment-texture.png')",
                backgroundImage: "linear-gradient(to bottom, #000000, #1a1a1a)",
                backgroundRepeat: "repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                fontFamily: "var(--font-sniglet)",
            }}
        >
            <TopNav />

            <div className="flex flex-col items-center px-4 py-8 space-y-10 flex-grow">
                {/* Title */}
                <div className="text-center space-y-2">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#ffc067] flex items-center justify-center gap-2">
                        <img src="/main/guardian_book.png" alt="Cyber Heroes" className="w-15 h-20 inline-block" /> Phishing Prevention for Super Cyber Heroes!
                    </h1>
                    <div className="text-[#ffc067] text-center text-lg">
                        Join us on a cyber adventure to learn how to protect yourself from digital tricksters called &quot;phishers&quot;!
                    </div>
                </div>

                {/* What is Phishing Box */}
                <div className="bg-[#fdf6e3] border-4 border-[#5b4636] rounded-2xl p-8 shadow-lg max-w-5xl w-full text-[#5b4636]">
                    <h2 className="text-3xl font-bold text-center text-[#5b4636] mb-6">
                        🎣 &nbsp; What is Phishing?
                    </h2>
                    <p className="mt-2 pb-2">
                        Phishing is a sneaky trick where scammers pretend to be trusted sources to steal your information.
                    </p>
                    <p className="mt-2">
                        It&apos;s like when someone pretends to be your friend to get you to share a secret - but online!
                    </p>
                    <div className="flex flex-col gap-2 text-lg font-bold pt-5">Phishers might try to get your:</div>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>Passwords</li>
                        <li>Usernames</li>
                        <li>Phone numbers</li>
                        <li>Home address</li>
                        <li>Social media login information</li>
                    </ul>
                </div>

                {/* Suspicious examples */}
                <div className="flex flex-col items-center bg-[#f9f4e6] border-4 border-[#5b4636] rounded-2xl p-6 shadow-lg max-w-5xl w-full text-[#5b4636]">
                    <h2 className="text-3xl font-bold text-center gap-2 pb-6">
                        🚨 Watch Out For These Phishing Tricks!
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
                        {/* Email */}
                        <div className="bg-orange-50 border-4 border-orange-300 rounded-2xl p-4 text-[#5b4636]">
                            <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
                                <FaEnvelopeOpenText className="text-orange-600" /> Suspicious Email
                            </h3>
                            <div className="bg-white border border-orange-400 rounded-lg p-3 shadow-inner text-sm space-y-1">
                                <p><span className="font-semibold">Subject:</span> <span className="font-bold">YOU WON $1,000,000!!!</span></p>
                                <p><span className="font-semibold">From:</span> <span className="text-red-600">[email protected]</span></p>
                                <p>Click here to claim your prize now!</p>
                            </div>
                            <p className="text-sm pt-4">Watch out for emails with bad spelling, strange addresses, or prizes that seem too good to be true!</p>
                        </div>

                        {/* Friend Request */}
                        <div className="bg-orange-50 border-4 border-orange-500 rounded-2xl p-4 text-[#5b4636">
                            <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
                                <FaUserFriends className="text-orange-600" /> Fake Friend Request
                            </h3>
                            <div className="bg-white border border-orange-400 rounded-lg p-3 shadow-inner text-sm space-y-1">
                                <p><span className="font-semibold">Sophie_Gamer293</span></p>
                                <p className="text-gray-500 text-xs">No mutual friends</p>
                                <button className="mt-1 px-3 py-1 bg-blue-400 text-white text-sm rounded hover:scale-105 transition">Accept Request</button>
                            </div>
                            <p className="text-sm pt-4">Be careful of friend requests from people you don&apos;t know – they might want to steal your information!</p>
                        </div>

                        {/* Game Offer */}
                        <div className="bg-orange-50 border-4 border-orange-700 rounded-2xl p-4 text-[#5b4636]">
                            <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
                                <FaGift className="text-orange-600" /> Gaming Website Pop-ups
                            </h3>
                            <div className="bg-white border border-orange-400 rounded-lg p-3 shadow-inner text-sm space-y-1">
                                <p className="font-bold text-center">CONGRATULATIONS!</p>
                                <p>You won 500 free game coins!</p>
                                <p>Enter your account details to claim:</p>
                                <button className="mt-1 px-3 py-1 bg-red-500 text-white text-sm rounded hover:scale-105 transition">Claim Now!</button>
                            </div>
                            <p className="text-sm pt-2">Pop-ups offering free game currency or prizes often try to steal your account information!</p>
                        </div>
                    </div>
                </div>

                {/* Flip Cards */}
                <div className="bg-[#fdf6e3] border-4 border-[#5b4636] rounded-2xl p-8 shadow-lg max-w-5xl w-full text-[#5b4636] space-y-8">
                    <h2 className="text-3xl font-bold text-center text-[#5b4636] mb-6">
                        🪄 Flip Cards to Learn More!
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
                        {/* Flip Card 1 */}
                        <FlipCard
                            width="w-[18rem]"
                            height="h-[14rem]"
                            frontContent={
                                <div className="bg-red-100 rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg h-full">
                                    <FaSearch className="text-red-600 text-6xl mb-4" />
                                    <h2 className="text-2xl font-bold text-red-700">Spot the Fake</h2>
                                    <p className="text-red-700 text-center">Hover over me to learn!</p>
                                </div>
                            }
                            backContent={
                                <div className="bg-red-50 rounded-2xl p-6 shadow-lg h-full flex flex-col items-center justify-center text-center">
                                    <h2 className="text-2xl font-bold text-red-700 mb-2">How to Spot Fake Content:</h2>
                                    <ul className="text-red-800 space-y-1 text-sm">
                                        <li>✅ Check the website address for typos</li>
                                        <li>✅ Look for grammar & spelling errors</li>
                                        <li>✅ Be cautious of urgency or fear</li>
                                        <li>✅ Check for 🔒 icon in address bar</li>
                                    </ul>
                                </div>
                            }
                        />

                        {/* Flip Card 2 */}
                        <FlipCard
                            width="w-[18rem]"
                            height="h-[14rem]"
                            frontContent={
                                <div className="bg-green-100 rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg h-full">
                                    <FaShieldAlt className="text-green-600 text-6xl mb-4" />
                                    <h2 className="text-2xl font-bold text-green-700">Safe Online Habits</h2>
                                    <p className="text-green-700 text-center">Hover over me to learn!</p>
                                </div>
                            }
                            backContent={
                                <div className="bg-green-50 rounded-2xl p-6 shadow-lg h-full flex flex-col items-center justify-center text-center">
                                    <h2 className="text-2xl font-bold text-green-700 mb-2">Safe Online Habits:</h2>
                                    <ul className="text-green-800 space-y-1 text-sm">
                                        <li>✅ Use different passwords</li>
                                        <li>✅ Don’t share personal info</li>
                                        <li>✅ Log out on shared computers</li>
                                        <li>✅ Keep devices updated</li>
                                    </ul>
                                </div>
                            }
                        />

                        {/* Flip Card 3 */}
                        <FlipCard
                            width="w-[18rem]"
                            height="h-[14rem]"
                            frontContent={
                                <div className="bg-blue-100 rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg h-full">
                                    <FaQuestionCircle className="text-blue-600 text-6xl mb-4" />
                                    <h2 className="text-2xl font-bold text-blue-700">What to Do If…</h2>
                                    <p className="text-blue-700 text-center">Hover over me to learn!</p>
                                </div>
                            }
                            backContent={
                                <div className="bg-blue-50 rounded-2xl p-6 shadow-lg h-full flex flex-col items-center justify-center text-center">
                                    <h2 className="text-2xl font-bold text-blue-700 mb-2">If You Find a Phishing Attempt:</h2>
                                    <ul className="text-blue-800 space-y-1 text-sm">
                                        <li>✅ Don’t click links or download</li>
                                        <li>✅ Tell an adult right away</li>
                                        <li>✅ Mark email as spam</li>
                                        <li>✅ Change your password</li>
                                    </ul>
                                </div>
                            }
                        />
                    </div>
                </div>

                <div className="bg-[#fdf6e3] border-4 border-[#5b4636] rounded-2xl p-8 shadow-lg max-w-5xl w-full text-[#5b4636] space-y-8">
                    <h2 className="text-3xl font-bold text-center text-[#5b4636] mb-6">🛡️ Safety Tips to Remember</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 text-3xl">🔒</div>
                            <div>
                                <h3 className="font-bold text-lg">Never share passwords</h3>
                                <p className="text-sm">Keep your passwords secret, even from your best friends. Only share with parents if needed.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 text-3xl">👆</div>
                            <div>
                                <h3 className="font-bold text-lg">Ask parents before clicking</h3>
                                <p className="text-sm">If you&apos;re not sure about a link or download, ask an adult for help before clicking.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 text-3xl">🔍</div>
                            <div>
                                <h3 className="font-bold text-lg">Check website addresses carefully</h3>
                                <p className="text-sm">Make sure the website address is spelled correctly before entering any information.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 text-3xl">✉️</div>
                            <div>
                                <h3 className="font-bold text-lg">Don&apos;t open strange messages</h3>
                                <p className="text-sm">Be careful with messages from people you don&apos;t know or that look suspicious.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#fdf6e3] border-4 border-[#5b4636] rounded-2xl p-8 shadow-lg max-w-5xl w-full text-[#5b4636] space-y-8">
                    <h2 className="text-3xl font-bold text-[#5b4636] text-center">🔍 How to Spot Phishing</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="bg-white border border-[#a0d5c1] border-3 rounded-xl p-4 shadow-md flex flex-col">
                            <div className="text-3xl text-[#2e8b57] mb-2">✅</div>
                            <h3 className="font-bold text-lg text-[#2e8b57] mb-2">Check for Spelling Mistakes</h3>
                            <p className="text-sm text-[#333] flex-grow">Phishers often make spelling and grammar mistakes. Big companies like Google or Roblox don&apos;t make these errors!</p>
                            <div className="bg-[#fef9e7] border border-[#e0c97c] rounded-lg p-2 text-xs text-[#5b4636] mt-2">
                                Example: &quot;Dear Costumer, Your acount needs updating&quot;
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white border border-[#a0d5c1] border-3 rounded-xl p-4 shadow-md flex flex-col">
                            <div className="text-3xl text-[#2e8b57] mb-2">⚠️</div>
                            <h3 className="font-bold text-lg text-[#2e8b57] mb-2">Beware of Scary Messages</h3>
                            <p className="text-sm text-[#333] flex-grow">Phishers try to scare you with &quot;URGENT!&quot; messages or threats that your account will be deleted.</p>
                            <div className="bg-[#fef9e7] border border-[#e0c97c] rounded-lg p-2 text-xs text-[#5b4636] mt-2">
                                Example: &quot;WARNING! Act now or your account will be DELETED in 24 hours!&quot;
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white border border-[#a0d5c1] border-3 rounded-xl p-4 shadow-md flex flex-col">
                            <div className="text-3xl text-[#2e8b57] mb-2">🔗</div>
                            <h3 className="font-bold text-lg text-[#2e8b57] mb-2">Look at the URL</h3>
                            <p className="text-sm text-[#333] flex-grow">Check website addresses carefully. Phishers use tricks like &quot;r0blox.com&quot; instead of &quot;roblox.com&quot;.</p>
                            <div className="bg-[#fef9e7] border border-[#e0c97c] rounded-lg p-2 text-xs text-[#5b4636] mt-2">
                                Example: &quot;faceb00k.com&quot; instead of &quot;facebook.com&quot;
                            </div>
                        </div>
                    </div>

                    {/* STOP Method */}
                    <div className="bg-white border border-[#a0d5c1] border-3 rounded-xl p-6 shadow-md space-y-4">
                        <h3 className="text-2xl font-bold text-[#2e8b57]">The STOP Method</h3>
                        <p className="text-sm text-[#333]">Use this easy method to check for phishing:</p>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                            <div>
                                <h4 className="font-bold text-[#2e8b57] text-lg">S</h4>
                                <p className="text-sm">Sender<br />Do you know who sent the message?</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#2e8b57] text-lg">T</h4>
                                <p className="text-sm">Too good to be true?<br />Free prizes and amazing offers are usually fake!</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#2e8b57] text-lg">O</h4>
                                <p className="text-sm">Odd requests?<br />Are they asking for your password or personal info?</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#2e8b57] text-lg">P</h4>
                                <p className="text-sm">Pressure<br />Are they rushing you to act quickly?</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-center gap-20">
                    <Link
                        href="/check/phishing-detection"
                        className="mt-4 bg-[#4F959D] text-[#fff] text-lg font-bold rounded-2xl px-6 py-3 shadow hover:scale-105 hover:bg-[#a68a64] transition">
                        <FaMagnifyingGlass className="inline-block" /> &nbsp; Click here to Detect Phishing
                    </Link>
                    <Link
                        href="/test/phishing-simulator"
                        className="mt-4 bg-[#4F959D] text-[#fff] text-lg font-bold rounded-2xl px-6 py-3 shadow hover:scale-105 hover:bg-[#a68a64] transition">
                        <FaQuestionCircle className="inline-block" /> &nbsp; Click here to Phishing Simulator
                    </Link>
                </div>
                <button className="fixed bottom-4 right-4 bg-white text-white p-2 rounded-full shadow-lg hover:bg-gray-300 transition"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <FaArrowUp className="text-gray-800 text-2xl" />
                </button>
            </div>
            <StarryBackground />
            <Footer />
        </main>
    );
}
