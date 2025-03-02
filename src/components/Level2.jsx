import { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";

const Level2 = () => {
    // Questions data
    const questions = {
        1: "What is React?",
        2: "What is JSX?",
        3: "What are hooks?",
        4: "What is Virtual DOM?",
        5: "What is component state?",
        6: "What are props?",
        7: "What is Tailwind CSS?",
        8: "What is a higher-order component?",
        9: "What is Redux?"
    };
    

    // Generate random groups
    const generateGroups = () => {
        const shuffled = Array.from({ length: 9 }, (_, i) => i + 1)
            .sort(() => Math.random() - 0.5);
        return [shuffled.slice(0, 3), shuffled.slice(3, 6), shuffled.slice(6, 9)];
    };

    let email ="rani@gmail.com"

    const [groups, setGroups] = useState([]);
    const [currentSection, setCurrentSection] = useState(0);
    const [presentDoor, setPresentDoor] = useState(-1);
    const [doorClick, setDoorClick] = useState(false);
    const [openedDoors,setOpenedDoors]=useState([]);
    

    useEffect(() => {
        setGroups(generateGroups());
    }, []);

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


                // Fetch the groups (array of arrays for questions)
                if (result.groups) {
                    setGroups(result.groups); // Set the fetched groups
                }
            } catch (error) {
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
                <h1 className="text-3xl font-bold text-blue-400 mb-8 text-center">
                    Section {currentSection + 1}
                </h1>

                <div className="border border-white justify-around flex w-[80%] h-[600px]">
                    {groups[currentSection].map((qNum) => (
                        <div
                            key={qNum}
                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                            onClick={() => { 
                                if(!openedDoors.includes(qNum) && openedDoors.length<2) setOpenedDoors(prevDoors => [...prevDoors, qNum]);;
                                setPresentDoor(qNum); 
                                setDoorClick(true);
                                console.log(openedDoors); 
                            }}
                        >
                            <div className="text-lg font-semibold text-gray-700 mb-2">
                                Question {qNum}
                            </div>
                            <div className="text-gray-600">
                                {questions[qNum]}
                            </div>
                            {openedDoors.includes(qNum)&&presentDoor === qNum && doorClick &&
                                <div className='absolute inset-0 flex flex-col justify-center items-center border w-screen h-screen '>

                                    <div className='flex flex-col bg-black text-white w-[90%] h-[730px] p-6'>
                                        <RxCross2 className='text-white self-end cursor-pointer' 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setPresentDoor(-1);
                                            setDoorClick(false);
                                            console.log(openedDoors);
                                        }} />
                                        <div className='h-full w-full flex'>
                                            <div className='w-1/2 bg-red-500 h-full'><p>Hello</p>
                                                {questions[qNum]}</div>
                                            <div className='w-1/2 bg-green-500 h-full'></div>
                                        </div>

                                    </div>
                                </div>}

                        </div>
                    ))}

                </div>

                <div className="text-center">
                    <button
                        onClick={()=>{handleNext();setOpenedDoors([]);}}
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
