import React, { useState } from "react";
import { useEffect } from "react";

const questions={
    1:{question:"What is 2 + 2?", answer: "4"},
    2:{question:"What is 5 + 3?", answer: "8"},
    3:{question:"What is 10 - 7?", answer: "3"},
    4:{question:"What is the capital of France?", answer: "Paris"},
    5:{question:"What is 6 * 6?", answer: "36"},
    6:{question:"What is 15 / 3?", answer: "5"},
    7:{question:"What is the color of the sky?", answer: "Blue"},
    8:{question:"What is 12 + 4?", answer: "16"},
    9:{question:"What is 9 - 3?", answer: "6"}
  }

const Level2 = () => {
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
    console.log("hello")
    let key=[1, 2, 3];
    const shuffleArray = (arr) => {
        const array = [...arr];
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const allDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const nonkey = allDigits.filter((d) => !key.includes(d));
    const shuffledNonKey = shuffleArray(nonkey);
    const group1 = [key[0], shuffledNonKey[0], shuffledNonKey[1]];
    const group2 = [key[1], shuffledNonKey[2], shuffledNonKey[3]];
    const group3 = [key[2], shuffledNonKey[4], shuffledNonKey[5]];
    const shuffledGroup1 = shuffleArray(group1);
    const shuffledGroup2 = shuffleArray(group2);
    const shuffledGroup3 = shuffleArray(group3);
    setQuestions([shuffledGroup1, shuffledGroup2, shuffledGroup3]);
    console.log([shuffledGroup1, shuffledGroup2, shuffledGroup3]);
    },[]);

    useEffect(() => {
        console.log("Updated questions:", questions);
    }, [questions]);
    return (
        <div className="h-dvh w-dvw flex flex-col items-center justify-between gap-10 py-10 bg-gradient-to-tr from-blue-400 via-blue-500 to-blue-600 text-white">
            <h2>Level 2</h2>
            
        </div>
    );
};

export default Level2;
