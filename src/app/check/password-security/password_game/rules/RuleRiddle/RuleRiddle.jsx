import { useRef, useState } from 'react';
import Rule from "../Rule";
import styles from "./RuleRiddle.module.css";
import ReloadButton from '../../components/ReloadButton';


const riddles = [
    ["What's the item for Check at our starting and home page?", "MagicOrb"],
    ["What's the item for Educate at our starting and home page?", "Book"],
    ["What's the item for Test at our starting and home page?", "Feather"],
]

const answerToImage = {
    MagicOrb: '/main/crystal_orb.png',
    Feather: '/main/magic_feather2_ink.png',
    Book: '/main/guardian_book.png',
};

export default class RuleRiddle extends Rule{
    constructor(){
        super("Your password must contain the solution to the following question:");

        this.riddleNum = Math.floor(Math.random()*riddles.length);
        console.log("Riddle:", riddles[this.riddleNum][1]);
        this.renderItem = ({regenerateRule, correct}) => <Riddle riddleNum={this.riddleNum} regenerate={()=>regenerateRule(this.num)} correct={correct}/>
        // this.num is the rule number that is dynamically set later
        
    }

    regenerate(){
        this.riddleNum = Math.floor(Math.random()*riddles.length);
        console.log("Riddle:", riddles[this.riddleNum][1]);
    }

    check = (txt) => {
        let ans = riddles[this.riddleNum][1];
        let r = RegExp(`(?:${ans})`, "i");
        return r.test(txt);
    }
}

function Riddle({riddleNum, regenerate, correct}){
    const riddle = riddles[riddleNum][0];
    const answer = riddles[riddleNum][1];
    const reloadsLeft = useRef(2);
    const [showHint, setShowHint] = useState(false);

    return (
        <div className={styles.riddle_wrapper}>
            <div className={styles.riddle}>
                {riddle}
            </div>
            <ReloadButton 
                onClick={()=>{
                    if(reloadsLeft.current>0){
                        regenerate()
                        reloadsLeft.current--; 
                        setShowHint(false);
                    }
                }} 
                hidden={correct} 
                reloadsLeft={reloadsLeft.current}
            />
            <button 
                className={styles.answer_button}
                onClick={()=>setShowHint((v)=>!v)}
                disabled={correct}
                style={{marginLeft: 8}}
            >
                {showHint ? "Hide Hint" : "Hint"}
            </button>
            {showHint && answerToImage[answer] && (
                <div className={styles.answer}>
                    <img src={answerToImage[answer]} alt="Hint" style={{ width: 48, height: 48, display: 'inline-block', verticalAlign: 'middle', marginRight: 8 }} />
                </div>
            )}
        </div>
    )
}
