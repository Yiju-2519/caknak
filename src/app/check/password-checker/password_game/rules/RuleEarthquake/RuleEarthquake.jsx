import { useEffect, useRef } from "react";
import Rule from "../Rule";
import styles from "./RuleEarthquake.module.css";

export default class RuleEarthquake extends Rule{
    constructor(){
        super("Oh no! there is an Cyberattack! Get your password to safety! Add the word '2FA' anywhere in your password.");
        this.renderItem = ({pswd, setPswd, shakePasswordBox, correct}) => {
            return (
                <Earthquake 
                    pswd={pswd}
                    setPswd={setPswd}
                    shakePasswordBox={shakePasswordBox}
                    correct={correct}
                />
            )
        }
    }

    check(txt){
        return /2FA/i.test(txt); // check for '2FA' anywhere in the password
    }
}

// Secret rule for removing 👾
export class RuleRemoveInvader extends Rule {
    constructor() {
        super("Secret Rule: Remove all 👾 emoji from your password to proceed!");
    }
    check(txt) {
        return !txt.includes("👾");
    }
}

function Earthquake({pswd, setPswd, shakePasswordBox, correct}){
    const solvedOnce = useRef(false);
    const timerRef = useRef(null);
    const replaceCount = useRef(0);

    // start Earthquake
    useEffect(()=>{
        timerRef.current = setTimeout(shuffleCharacters, 1000);
        shakePasswordBox(true);
        solvedOnce.current = false;
        return () => clearTimeout(timerRef.current);
    }, []);

    // continue Earthquake using timeout
    useEffect(()=>{
        if(!solvedOnce.current){
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(
                shuffleCharacters, 
                replaceCount.current < 8 ? 1000 : 2000 // Faster rate
            );
        }
    }, [pswd]);

    // stop Earthquake
    useEffect(()=>{
        if(!solvedOnce.current && correct){
            solvedOnce.current = true;
            clearTimeout(timerRef.current);
            shakePasswordBox(false);
        }
    }, [correct]);

    function shuffleCharacters(){
        if (pswd.length === 0) return; // Don't insert if empty
        // Only insert at valid code point boundaries
        const codePoints = Array.from(pswd);
        const randomPosition = Math.floor(Math.random() * (codePoints.length + 1));
        codePoints.splice(randomPosition, 0, "👾");
        setPswd(codePoints.join(""));
        replaceCount.current += 1;
    }

    return (
        <div className={styles.earthquake_container}>
            <div className={styles.pulse_animation}>
                2FA
            </div>
        </div>
    )
}
