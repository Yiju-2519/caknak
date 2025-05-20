"use client";

import { useState } from "react";
import type { PasswordResponse } from "~/types/password";
import { motion } from "framer-motion";
import TopNav from "~/components/TopNav";
import Footer from "~/components/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import StarryBackground from "~/components/StarryBackground";
import dynamic from 'next/dynamic';

// Dynamically import the password game component
const PasswordGame = dynamic(() => import('./password_game/app/page'), {
    ssr: false,
    loading: () => <div className="text-[#ffffc5]">Loading Password Game...</div>
});

const calculateRandomness = (entropy: number) => {
    // Convert entropy to a percentage (0-100)
    // Assuming entropy is typically between 0-4, we'll scale it to 0-100
    return Math.min(Math.max((entropy / 4) * 100, 0), 100);
};

const getStrengthText = (strength: number) => {
    if (strength === 0) return "Weak Password 🔴 (Common Password)";
    if (strength === 1) return "Weak Password 🔴";
    // if (strength === 0) return "Medium Password 🟠";
    return "Strong Password 🟢";
};

const getStrengthColor = (strength: number) => {
    if (strength === 0) return "text-red-600";
    if (strength === 1) return "text-red-600";
    // if (strength === 1) return "text-yellow-600";
    return "text-green-600";
};

const formatFeatureName = (name: string) => {
    const map: Record<string, string> = {
        length: "Password Length",
        num_upper: "Uppercase Letters",
        num_lower: "Lowercase Letters",
        num_digit: "Numbers",
        num_symbol: "Special Characters",
    };
    return map[name] ?? name;
};

const formatFeatureValue = (name: string, value: string | number) => {
    return value;
};

export default function PasswordCheckPage() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [result, setResult] = useState<PasswordResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState<'checker' | 'game'>('checker');

    const handleCheck = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/check-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });
            if (!res.ok) throw new Error("API failed");
            const json = await res.json() as PasswordResponse;
            setResult(json);
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const randomness = calculateRandomness(result?.features.entropy ?? 0);
    const hasTips = result && (
        result.features.num_upper === 0 ||
        result.features.num_digit === 0 ||
        result.features.num_symbol === 0 ||
        result.features.length < 12 ||
        result.features.has_password === 1 ||
        result.features.has_admin === 1
    );

    // Count the number of tips to improve
    const getNumTips = () => {
        if (!result) return [];
        let tips = [];
        if (result.strength === -1) tips.push("common");
        if (result.features.num_upper === 0) tips.push("upper");
        if (result.features.num_digit === 0) tips.push("digit");
        if (result.features.num_symbol === 0) tips.push("symbol");
        if (result.features.length < 12) tips.push("length");
        if (result.features.has_password === 1) tips.push("password");
        if (result.features.has_admin === 1) tips.push("admin");
        return tips;
    };

    // Set left box height based on tips logic
    const getLeftBoxHeight = () => {
        if (activeTab === 'game') return "h-[520px]";
        if (!result) return "";
        const tips = getNumTips();
        if (tips.length === 0) return "h-[350px]";
        if (tips.length > 3) return "h-[490px]";
        if (tips.length === 3) {
            const hasSymbol = tips.includes("symbol");
            const hasLength = tips.includes("length");
            if (hasSymbol && hasLength) return "h-[490px]";
            return "h-[450px]";
        }
        return "h-[450px]";
    };

    return (
        <main
            className="min-h-screen flex flex-col"
            style={{
                backgroundImage: "linear-gradient(to bottom, #000000, #1a1a1a)",
                backgroundRepeat: "repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                fontFamily: "var(--font-sniglet)",
            }}
        >
            <TopNav />

            <div className="flex flex-col items-center justify-center flex-grow text-center p-6">
                <h1 className={`text-4xl text-[#ffffc5] font-extrabold ${result ? 'mb-8' : 'mb-4'}`}>
                    Password Security
                </h1>
                {!result && (
                    <p className="text-[#ffffc5] max-w-lg mb-6 mx-auto">
                        Check your password strength or play the password game to learn about strong passwords!
                    </p>
                )}
                {/* Responsive flex row for desktop, column for mobile */}
                <div className="w-full max-w-8xl px-2 md:px-25 mx-auto flex flex-col md:flex-row gap-8 items-start justify-center">
                    {/* Left: Tabs + Checker/Game */}
                    <div className="w-full md:w-5/12 max-w-full">
                        <div className={`bg-[#f9f4e6] border-4 border-[#5b4636] rounded-lg shadow-lg p-6 flex flex-col ${getLeftBoxHeight()}`}>
                            {/* Centered Tab buttons */}
                            <div className="flex justify-center mb-4">
                                <button
                                    onClick={() => setActiveTab('checker')}
                                    className={`px-4 py-2 font-bold rounded-t-lg border-b-2 transition-all duration-200 ${activeTab === 'checker' ? 'border-[#e2b96f] bg-white/90 text-[#5b4636]' : 'border-transparent bg-transparent text-[#b6a07a] hover:bg-yellow-50'}`}
                                    type="button"
                                >
                                    Password Checker
                                </button>
                                <button
                                    onClick={() => setActiveTab('game')}
                                    className={`px-4 py-2 font-bold rounded-t-lg border-b-2 transition-all duration-200 ${activeTab === 'game' ? 'border-[#e2b96f] bg-white/90 text-[#5b4636]' : 'border-transparent bg-transparent text-[#b6a07a] hover:bg-yellow-50'}`}
                                    type="button"
                                >
                                    Password Game
                                </button>
                            </div>
                            {/* Tab content */}
                            {activeTab === 'checker' ? (
                                <>
                                    <div className="relative w-full max-w-md mx-auto mb-4">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter password..."
                                            className="w-full px-4 py-3 pr-12 rounded-lg border-4 border-[#5b4636] text-[#5b4636] bg-white/80 shadow-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5b4636] text-xl focus:outline-none"
                                            aria-label="Toggle password visibility"
                                        >
                                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                                        </button>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.05, y: -3, boxShadow: "0 0 20px #fde68a" }}
                                        disabled={loading}
                                        onClick={handleCheck}
                                        className="w-full max-w-md mx-auto mt-2 bg-[#ffc067] text-[#5b4636] border-4 border-[#5b4636] px-8 py-3 rounded-xl text-xl font-bold hover:bg-[#e8b15e] transition-colors duration-200 transform hover:scale-105"
                                    >
                                        {loading ? "Checking..." : "Check"}
                                    </motion.button>

                                    {error && <p className="text-red-600 font-semibold mt-4">{error}</p>}
                                </>
                            ) : (
                                <div className="w-full">
                                    <PasswordGame />
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Right: Result box (only for checker and only if result) */}
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full md:w-7/12 max-w-full bg-[#f9f4e6] border-4 border-[#5b4636] rounded-lg shadow-lg p-6 text-left"
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className={`text-3xl font-bold text-center mb-6 ${getStrengthColor(result.strength)}`}
                            >
                                {getStrengthText(result.strength)}
                            </motion.div>

                            <div className="flex flex-col md:flex-row gap-6 mb-6">
                                <div className="flex-1 bg-white/80 border-2 border-[#5b4636] rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-lg font-semibold text-[#5b4636]">Password Randomness</span>
                                        <span className="text-2xl font-bold text-[#5b4636]">
                                            {randomness.toFixed(0)}%
                                        </span>
                                    </div>
                                    <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${randomness.toFixed(0)}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className="h-full bg-yellow-500"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 grid grid-cols-3 gap-4">
                                    {Object.entries(result.features)
                                        .filter(([key]) => ['length', 'num_upper', 'num_lower', 'num_digit', 'num_symbol'].includes(key))
                                        .map(([key, val]: [string, string | number]) => (
                                            <div key={key} className="bg-white/80 border-2 border-[#5b4636] rounded-lg p-3">
                                                <div className="text-sm text-[#5b4636] font-medium">{formatFeatureName(key)}</div>
                                                <div className="text-lg text-yellow-700 font-semibold">{formatFeatureValue(key, val)}</div>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            {hasTips && (
                                <div className="mt-4 text-[#5b4636] text-lg bg-white/80 border-2 border-[#5b4636] rounded-lg p-4 flex flex-col items-center">
                                    <p className="font-bold mb-3 text-xl text-center">Tips to improve:</p>
                                    <div className="w-full flex flex-wrap justify-center gap-x-12 gap-y-3">
                                        {result.strength === -1 && (
                                            <span className="flex items-center"><span className="mr-2">•</span>Avoid using <span className="font-bold text-yellow-700 mx-1">common passwords</span></span>
                                        )}
                                        {result.features.num_upper === 0 && (
                                            <span className="flex items-center"><span className="mr-2">•</span>Add <span className="font-bold text-yellow-700 mx-1">uppercase</span> letters</span>
                                        )}
                                        {result.features.num_digit === 0 && (
                                            <span className="flex items-center"><span className="mr-2">•</span>Include <span className="font-bold text-yellow-700 mx-1">numbers</span></span>
                                        )}
                                        {result.features.num_symbol === 0 && (
                                            <span className="flex items-center"><span className="mr-2">•</span>Use special characters <span className="font-bold text-yellow-700 mx-1">(!@#$%)</span></span>
                                        )}
                                        {result.features.length < 12 && (
                                            <span className="flex items-center"><span className="mr-2">•</span>Make it at least <span className="font-bold text-yellow-700 mx-1">12</span> characters</span>
                                        )}
                                        {result.features.has_password === 1 && (
                                            <span className="flex items-center"><span className="mr-2">•</span>Avoid using <span className="font-bold text-yellow-700 mx-1">common words</span> like &quot;password&quot;</span>
                                        )}
                                        {result.features.has_admin === 1 && (
                                            <span className="flex items-center"><span className="mr-2">•</span>Avoid using <span className="font-bold text-yellow-700 mx-1">admin</span> in your password</span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
            <StarryBackground />
            <Footer />
        </main>
    );
}
