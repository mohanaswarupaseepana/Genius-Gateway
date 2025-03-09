import { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
import MagicSquare from './MagicSquare';
import Queens from './Queens';
import { useNavigate } from 'react-router-dom';
import TowersOfHanoi from './TowersOfHanoi';
import KenKen from './Kenken';
import { useLocation } from 'react-router-dom';
import Waterjug from './Waterjug';
import { CiUnlock } from "react-icons/ci";
import "../index.css";
import { useCallback } from 'react';
import GeniusCipherGameUI from './GeniusCipher';
import Coins from './Coins';
import BridgeTorch from './BridgeTorch';
import Sudoku from './Sudoku';
import MissingGrid from './MissingGrid';
let currentSection = 0;



let key = [];
const Level2 = ({ EVENT_START_TIME, LEVEL_TIME_LIMITS }) => {
    const [user, setUser] = useState({});
    const [groups, setGroups] = useState([]);
    const [answeredOne, setAnsweredOne] = useState(false);
    const [presentDoor, setPresentDoor] = useState(-1);
    const [doorClick, setDoorClick] = useState(false);
    const [openedDoors, setOpenedDoors] = useState([]);
    const [doorAnswer, setDoorAnswer] = useState(false);
    const [wrongDoor, setWrongDoor] = useState(false);
    // const targetTime = "2025-03-05T16:37:00";
    // const calculateTimeLeft = () => {
    //     const now = new Date().getTime(); // Current timestamp
    //     const target = new Date(targetTime).getTime(); // Target timestamp
    //     const difference = Math.max(target - now, 0); // Ensure non-negative time
    //     return Math.floor(difference / 1000); // Convert to seconds
    // };

    // const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    // useEffect(() => {
    //     if (timeLeft <= 0) return;

    //     const timer = setInterval(() => {
    //         setTimeLeft(calculateTimeLeft());
    //     }, 1000);

    //     return () => clearInterval(timer);
    // }, [timeLeft]);

    // // Format time as MM:SS
    // const formatTime = (seconds) => {
    //     const minutes = Math.floor(seconds / 60);
    //     const secs = seconds % 60;
    //     return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    // };

    const handleElimination = async () => {
        try {
            const response = await fetch("http://localhost:5000/eliminated", { // Ensure "http://" is included
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, // Convert state to JSON string
                body: JSON.stringify({ email: email })
            });
            const result = await response.json();
            console.log(result);
            navigate("/eliminated", { state: { email: email } });
        } catch (error) {
            console.log(error);
        }
    }

    const getAllocatedTime = (userStartTime) => {
        // Time passed from the event start to user's start (in ms)
        const delay = userStartTime.getTime() - (EVENT_START_TIME.getTime() + 900000);
        const allocated = LEVEL_TIME_LIMITS[1] - delay;
        // console.log(allocated,delay);
        return Math.max(allocated, 0);
    };
    const userStartTime = new Date();
    const [remainingTime, setRemainingTime] = useState(getAllocatedTime(userStartTime));
    useEffect(() => {
        if (remainingTime <= 0) {
            // When time runs out, automatically navigate to the next level.
            // You might also call onComplete(false) if you want to mark it as incomplete.
            if (user && user.Level1 === true && user.Level2 === false) {
                handleElimination();
            } else if (user.Level2 === true) {
                navigate("/level2waiting", { state: { email: email } });
            }

        }

        const interval = setInterval(() => {
            setRemainingTime(prev => {
                const updated = prev - 1000;
                if (updated >= 0) {
                    return updated;
                } else {
                    return 0;
                }

            });
        }, 1000);

        return () => clearInterval(interval);
    }, [remainingTime, user]);

    const navigate = useNavigate();
    const handleCheckpoint = async (checkpoint) => {
        try {
            const response = await fetch("http://localhost:5000/checkpoints", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email, checkpoint: checkpoint }),
            });

            const result = await response.json();
            console.log(result);
            if (response.status === 200) {
                console.log("Checkpoint Success:", result);
                currentSection = currentSection + 1;
            } else {
                console.log("Checkpoint failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const level2Completed = async () => {
        try {
            // console.log(email,password)
            const response = await fetch("http://localhost:5000/completion2", { // Ensure "http://" is included
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, // Convert state to JSON string
                body: JSON.stringify({ email: email })
            });

            const result = await response.json();
            console.log(result);
            return true;
            // setUser(result);
            // setForceRender((prev) => prev + 1); 


            // if (response.status === 200) {
            //   // navigate("/level1");

            // } else {
            //   setResponseMessage(result.message || "Login failed");
            // }
        } catch (error) {
            console.log(error);

            // setResponseMessage(`Error: ${error.message}`);
            // navigate("/login");
        }
    };

    const handleQuestions = async () => {
        try {
            const response = await fetch("http://localhost:5000/questions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email }),
            });

            const result = await response.json();
            setUser(result)
            console.log(result);
            if (response.status === 200) {
                console.log("Success:", result);
            } else {
                console.log("Failed");
            }
        } catch (error) {
            console.error("Error:", error);

        }
    }


    // Questions data
    const handleSuccess = ((qNum) => {
        console.log("Success currentSection:", currentSection);
        setPresentDoor(-1);
        setDoorClick(false);
        setAnsweredOne(true);
        questions[qNum].answer = true;
        handleQuestions();

        if (qNum === key[currentSection]) {
            
            if (currentSection === 2) {
                setTimeout(() => {
                    // setDoorAnswer(true);
                    setTimeout(() => {
                        // setDoorAnswer(false);
                        handleCheckpoint(currentSection + 1);
                        level2Completed();
                        navigate("/level2waiting", { state: { email: email } });

                        // currentSection=currentSection+1;
                    }, 5000);
                    console.log("incremented current section");
                }, 3000);
            } else {
                setTimeout(() => {
                    setDoorAnswer(true);
                    setTimeout(() => {
                        setDoorAnswer(false);
                        handleCheckpoint(currentSection + 1);

                        // currentSection=currentSection+1;
                    }, 5000);
                    console.log("incremented current section");
                }, 3000);
            }
        } else {
            setWrongDoor(true);
            setTimeout(() => {
                setWrongDoor(false);
            }, 5000);
        }
    });
    const [questions, setQuestions] = useState({
        1: { component: <MissingGrid handleSubmit={handleSuccess} qNum={1} />, answer: false },
        2: { component: <MagicSquare handleSubmit={handleSuccess} qNum={2} />, answer: false },
        3: { component: <Sudoku handleSubmit={handleSuccess} qNum={3} />, answer: false },
        4: { component: <KenKen handleSubmit={handleSuccess} qNum={4} />, answer: false },
        5: { component: <Waterjug handleSubmit={handleSuccess} qNum={5} />, answer: false },
        6: { component: <Coins handleSubmit={handleSuccess} qNum={6} />, answer: false },
        7: { component: <TowersOfHanoi handleSubmit={handleSuccess} qNum={7} />, answer: false },
        8: { component: <BridgeTorch handleSubmit={handleSuccess} qNum={8} />, answer: false },
        9: { component: <GeniusCipherGameUI handleSubmit={handleSuccess} qNum={9} />, answer: false }
    });




    // Generate random groups
    const generateGroups = () => {
        const shuffled = Array.from({ length: 9 }, (_, i) => i + 1)
            .sort(() => Math.random() - 0.5);
        return [shuffled.slice(0, 3), shuffled.slice(3, 6), shuffled.slice(6, 9)];
    };

    const location = useLocation();
    const { email } = location.state || {};



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
                setUser(result);
                let Unum = result.UniqueNumber;
                const Ukey = Unum.split("").map(Number);
                console.log(Ukey);
                key = Ukey;
                console.log(key);

                if (result.Level3 === true) {
                    if (result.winner === true) {
                        navigate("/winner", { state: { email: email } });
                    } else {
                        navigate("/completed", { state: { email: email } });
                    }
                }

                if (result.eliminated === true) {
                    navigate("/eliminated", { state: { email: email } });
                }
                if (result.Level2 === true) {
                    navigate("/level2waiting", { state: { email: email } });
                }
                if (result.Checkpoint1 === false) {
                    currentSection = 0;
                } else if (result.Checkpoint2 === false) {
                    currentSection = 1;
                } else if (result.Checkpoint3 === false) {
                    currentSection = 2;
                }
                console.log(currentSection);
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



    // const handleNext = () => {
    //     if (currentSection < 2) {
    //         setCurrentSection(prev => prev + 1);
    //     }
    // };

    if (groups.length === 0) return <div>Loading...</div>;



    return (
        <div className=" flex flex-col items-center">
            {doorAnswer && <div className='absolute w-[60%] h-[500px] bg-white mt-28 z-50 bg-gradient-to-br from-blue-100 to-green-200' >
                <div className="bg-white flex flex-col items-center justify-center gap-10 h-full p-8 rounded-lg shadow-lg text-center">
                    <h1 className="text-8xl font-bold text-green-600 mb-4">Hurray!</h1>
                    <p className="text-4xl font-bold text-gray-700">Well done! The correct door has been revealed. Get ready, Checkpoint {currentSection + 2} is just ahead!</p>
                </div>
            </div>}

            <div className=" -z-10 fixed w-screen h-screen top-0 bg-[url('12979917_5084836.jpg')] bg-cover bg-center bg-no-repeat  ">
            </div>
            {/* <p className="h-20 backdrop-blur-sm text-transparent bg-clip-text items-center text-5xl font-bold  bg-gradient-to-br from-blue-400 via-green-300 to-purple-600 flex justify-center">Round 2: Vault of Minds</p> */}
            <div className=" min-h-dvh min-w-dvw  flex flex-col items-center backdrop-blur-xs">
                <div className="flex justify-between w-full px-7 items-center">
                    <div className=" flex flex-col gap-4 w-1/4">
                        <p className="text-lg h-[30px] font-bold text-purple-400">Team Name: {user.teamName}</p>
                        <p className=" text-lg h-[30px] font-bold text-purple-400">Points: {user.Points}</p>
                    </div>

                    <p className=" h-28 backdrop-blur-sm text-transparent bg-clip-text items-center text-5xl font-bold p-3 bg-gradient-to-br from-yellow-400 via-red-300 to-purple-600 flex justify-center"> Round-2 : Vault Of Minds</p>
                    <p className="text-4xl font-bold text-green-400 w-1/4 flex justify-end">{Math.floor(remainingTime / 60000)}:{((remainingTime % 60000) / 1000).toFixed(0).padStart(2, '0')}</p>
                </div>
                <div className="px-7 h-16 grid grid-cols-3  w-full items-center">
                    <p className="text-left font-bold text-4xl text-green-500 flex ">Key: <span className='flex mx-5'><span className={` px-2 flex ${currentSection <= 0 ? "bg-black" : "bg-green-400"}  text-white`}>{key[0]}</span><span className={` px-2 flex ${currentSection <= 1 ? "bg-black" : "bg-green-400"}  text-white`}>{key[1]}</span><span className={` px-2 flex ${currentSection <= 2 ? "bg-black" : "bg-green-400"}  text-white`}>{key[2]}</span></span></p>
                    <h1 className="text-3xl font-bold text-blue-400 text-center">
                        Checkpoint - {currentSection + 1}
                    </h1>
                    <div></div>
                </div>


                <div className="justify-around flex w-[80%] h-[400px]">
                    {groups[currentSection].map((qNum) => (
                        <div key={qNum} className=' flex w-1/3 justify-center '>
                            {questions[qNum].answer ? (
                                <div className={` flex items-center justify-center w-[70%] ${qNum === key[currentSection] ? "bg-green-500" : "bg-red-700"} border-red-600  h-full`}>
                                    <CiUnlock className='fade-in text-9xl text-white' />
                                    <p className='fade-out absolute  text-9xl text-white'>{qNum}</p>
                                </div>) : (<div
                                    className=" w-[70%] rounded-lg shadow-md hover:shadow-lg transition-shadow"
                                    onClick={() => {
                                        if (!openedDoors.includes(qNum) && openedDoors.length < 2) setOpenedDoors(prevDoors => [...prevDoors, qNum]);;
                                        setPresentDoor(qNum);
                                        setDoorClick(true);
                                        console.log(openedDoors);
                                    }}
                                >
                                    <img src="gateclosed.png" alt="gate" className=" w-full h-full mx-auto object-cover" />
                                    {/* {questions[qNum].answer === true ?} */}
                                    <div className="text-lg font-semibold text-gray-700 mb-2">
                                        Question {qNum}
                                    </div>
                                    {/* <div className="text-gray-600">
                                {questions[qNum]}
                            </div> */}
                                    {(openedDoors.includes(qNum) || answeredOne) && presentDoor === qNum && doorClick &&
                                        <div className='z-50 absolute inset-0 flex flex-col justify-center items-center border w-screen h-screen '>

                                            <div className='flex flex-col bg-black w-[90%] h-[630px] '>
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

                {/* <div className="text-center">
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
                </div> */}
                {wrongDoor && <div className='pt-5'>
                    <p className='fade-out text-3xl text-red-400'>Sorry the unlocked door key has not matched with yours.....!</p>
                </div>}
            </div>
        </div>
    );
};

export default Level2;
