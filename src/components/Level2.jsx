import { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
import MagicSquare from './MagicSquare';
import Queens from './Queens';
import { useNavigate } from 'react-router-dom';

let key = [];
const Level2 = () => {
    const [groups, setGroups] = useState([]);
    const [answeredOne, setAnsweredOne] = useState(false);
    const [currentSection, setCurrentSection] = useState(0);
    const [presentDoor, setPresentDoor] = useState(-1);
    const [doorClick, setDoorClick] = useState(false);
    const [openedDoors, setOpenedDoors] = useState([]);

    const navigate = useNavigate();

    // Questions data
    const handleSuccess = (qNum) => {
        console.log("Success");
        console.log(qNum);
        setPresentDoor(-1);
        setDoorClick(false);
        setAnsweredOne(true);
        console.log(key);
        if (qNum === key[currentSection]) {
            setCurrentSection((prev) => prev + 1);
            console.log("incremented current section");
        }
        questions[qNum].answer = true;
    }
    const [questions, setQuestions] = useState({
        1: { component: <MagicSquare handleSubmit={handleSuccess} qNum={1} />, answer: false },
        2: { component: <MagicSquare handleSubmit={handleSuccess} qNum={2} />, answer: false },
        // 2: { component: <MagicSquare />, answer: false },
        3: { component: <Queens handleSubmit={handleSuccess} qNum={3} />, answer: false },
        4: { component: <MagicSquare />, answer: false },
        5: { component: <MagicSquare />, answer: false },
        6: { component: <MagicSquare />, answer: false },
        7: { component: <MagicSquare />, answer: false },
        8: { component: <MagicSquare handleSubmit={handleSuccess} qNum={8} />, answer: false },
        9: { component: <MagicSquare handleSubmit={handleSuccess} qNum={9} />, answer: false },
    });




    // Generate random groups
    const generateGroups = () => {
        const shuffled = Array.from({ length: 9 }, (_, i) => i + 1)
            .sort(() => Math.random() - 0.5);
        return [shuffled.slice(0, 3), shuffled.slice(3, 6), shuffled.slice(6, 9)];
    };

    let email = "naira@gmail.com"



    // useEffect(() => {
    //     setGroups(generateGroups());
    // }, []);

    // useEffect(() => {
    //     console.log(key); // Will log the updated key when state changes
    // }, [key]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch("http://localhost:5000/access", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: email }),
                });

                const result = await response.json();
                console.log(result);
                let Unum = result.UniqueNumber;
                const Ukey = Unum.split("").map(Number);
                console.log(Ukey);
                key = Ukey;
                console.log(key);
                // console.log(key);


                // Fetch the groups (array of arrays for questions)
                if (result.groups) {
                    setGroups(result.groups); // Set the fetched groups
                }
            } catch (error) {
                navigate("/login");
                console.error("Error fetching data:", error);
            }
        };

        fetchQuestions();
    }, []);



    const handleNext = () => {
        if (currentSection < 2) {
            setCurrentSection(prev => prev + 1);
        }
    };

    if (groups.length === 0) return <div>Loading...</div>;

    return (
        <div className=" flex flex-col items-center">
            <div>Wow </div>
            <div className=" -z-10 fixed w-screen h-screen top-0 bg-[url('12979917_5084836.jpg')] bg-cover bg-center bg-no-repeat  ">
            </div>
            {/* <p className="h-20 backdrop-blur-sm text-transparent bg-clip-text items-center text-5xl font-bold  bg-gradient-to-br from-blue-400 via-green-300 to-purple-600 flex justify-center">Round 2: Vault of Minds</p> */}
            <div className=" min-h-dvh min-w-dvw  flex flex-col items-center backdrop-blur-xs">
                <div className="flex justify-between w-full px-7 items-center">
                    <div className=" flex flex-col gap-4 w-1/4">
                        <p className="text-lg h-[30px] font-bold text-purple-400">Team Name: </p>
                        <p className=" text-lg h-[30px] font-bold text-purple-400">Points: </p>
                    </div>

                    <p className=" h-28 backdrop-blur-sm text-transparent bg-clip-text items-center text-5xl font-bold p-3 bg-gradient-to-br from-yellow-400 via-red-300 to-purple-600 flex justify-center"> Round-2 : Vault Of Minds</p>
                    <p className="text-4xl font-bold text-green-400 w-1/4 flex justify-end">18:00</p>
                </div>
                <div className="border px-7 h-16 grid grid-cols-3  w-full items-center">
                    <p className="text-left font-bold text-4xl">Key: {key}</p>
                    <h1 className="text-3xl font-bold text-blue-400 text-center">
                        Checkpoint - {currentSection + 1}
                    </h1>
                    <div></div>
                </div>


                <div className="justify-around flex w-[80%] h-[400px]">
                    {groups[currentSection].map((qNum) => (
                        <div className='flex w-1/3 justify-center '>
                            {questions[qNum].answer ? (
                                <div className='flex items-center justify-center  border border-red-600 w-full h-full'>
                                    <p className='text-7xl text-white '>{qNum}</p>
                                </div>) : (<div
                                    key={qNum}
                                    className="rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                                    onClick={() => {
                                        if (!openedDoors.includes(qNum) && openedDoors.length < 2) setOpenedDoors(prevDoors => [...prevDoors, qNum]);;
                                        setPresentDoor(qNum);
                                        setDoorClick(true);
                                        console.log(openedDoors);
                                    }}
                                >
                                    <img src="gateclosed.png" alt="gate" className="w-full h-full mx-auto" />
                                    {/* {questions[qNum].answer === true ?} */}
                                    <div className="text-lg font-semibold text-gray-700 mb-2">
                                        Question {qNum}
                                    </div>
                                    {/* <div className="text-gray-600">
                                {questions[qNum]}
                            </div> */}
                                    {(openedDoors.includes(qNum) || answeredOne) && presentDoor === qNum && doorClick &&
                                        <div className='absolute inset-0 flex flex-col justify-center items-center border w-screen h-screen '>

                                            <div className='flex flex-col bg-black text-white w-[90%] h-[630px] '>
                                                <RxCross2 className='absolute text-4xl m-5 text-gray-300 self-end cursor-pointer'
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setPresentDoor(-1);
                                                        setDoorClick(false);
                                                        console.log(openedDoors);
                                                    }} />
                                                <div className='h-full w-full '>
                                                    {questions[qNum].component}
                                                </div>

                                            </div>
                                        </div>}

                                </div>)}
                        </div>

                    ))}

                </div>

                <div className="text-center">
                    <button
                        onClick={() => { handleNext(); setOpenedDoors([]); }}
                        disabled={currentSection === 2}
                        className={`px-6 py-2 rounded-lg font-medium ${currentSection === 2
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                    >
                        {currentSection === 2 ? 'Last Section' : 'Next Section'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Level2;
