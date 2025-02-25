import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IoBulbOutline } from "react-icons/io5";
import { FaHandsClapping } from "react-icons/fa6";
const crossGrid1 = [
  [{ num: 1, direction: [{ dir: "right", len: 5, answer: "DEBUG" }, { dir: "down", len: 5, answer: "DELTA" }], filled: false }, { num: 5, direction: [{ dir: "down", len: 5, answer: "EXPEL" }], filled: false }, { filled: false }, { num: 6, direction: [{ dir: "down", len: 5, answer: "UTTER" }], filled: false }, { filled: false }],
  [{ num: 2, direction: [{ dir: "right", len: 4, answer: "EXIT" }], filled: false }, { filled: false }, { filled: false }, { filled: false }, { filled: true }],
  [{ filled: false }, { filled: false }, { filled: true }, { filled: false }, { filled: true }],
  [{ num: 3, direction: [{ dir: "right", len: 5, answer: "TENES" }], filled: false }, { filled: false }, { filled: false }, { filled: false }, { filled: false }],
  [{ num: 4, direction: [{ dir: "right", len: 5, answer: "ALARM" }], filled: false }, { filled: false }, { filled: false }, { filled: false }, { filled: false }]
];
const crossGrid2=[
  [{ num: 1, direction: [{ dir: "right", len: 4, answer: "ABCD" }], filled: false }, { num: 2, direction: [{ dir: "down", len: 5, answer: "BEFGH" }], filled: false }, {num: 3, direction: [{ dir: "down", len: 5, answer: "CKNST" }], filled: false}, { num: 5, direction: [{ dir: "down", len: 3, answer: "DLO" }], filled: false },{filled:true}],
  [{ filled: true },{filled: false }, { filled: false }, { filled: false }, {num: 6, direction: [{ dir: "down", len: 4, answer: "MPQR" }], filled: false }],
  [{num: 4, direction: [{ dir: "right", len: 5, answer: "HFNOP" },{ dir: "down", len: 3, answer: "HIJ" }],filled: false }, { filled: false }, { filled: false}, { filled: false }, { filled: false }],
  [{filled: false }, { filled: false }, { filled: false }, { filled: true }, { filled: false }],
  [{ num: 5, direction: [{ dir: "right", len: 5, answer: "JHTUR" }], filled: false }, { filled: false }, { filled: false }, { filled: false }, { filled: false }]

];
const crossGrid3=[
  [{ num: 1, direction: [{ dir: "right", len: 5, answer: "ABCDE" }], filled: false }, { num: 4, direction: [{ dir: "down", len: 5, answer: "BGLPQ" }], filled: false }, {num: 5, direction: [{ dir: "down", len: 4, answer: "CHMR" }], filled: false}, { num: 6, direction: [{ dir: "down", len: 5, answer: "DINST" }], filled: false },{num: 7, direction: [{ dir: "down", len: 5, answer: "EJOUV" }], filled: false }],
  [{num: 2, direction: [{ dir: "right", len: 5, answer: "FGHIJ" }], filled: false  },{filled: false }, { filled: false }, { filled: false }, { filled: false }],
  [{num: 3, direction: [{ dir: "right", len: 5, answer: "KLMNO" }],filled: false }, { filled: false }, { filled: false}, { filled: false }, { filled: false }],
  [{filled: true }, { filled: false }, { filled: false }, { filled: false}, { filled: false }],
  [{filled: true }, { filled: false }, { filled: true }, { filled: false }, { filled: false }]
];
const crossGrid4=[
  [{  filled: true }, { num: 1, direction: [{ dir: "right", len: 4, answer: "ABCD" }], filled: false }, { filled: false}, { filled: false },{filled: false }],
  [{num: 2, direction: [{ dir: "right", len: 5, answer: "EFGHI" }], filled: false  },{filled:false},{ num: 5, direction: [{ dir: "down", len: 4, answer: "GKPT" }], filled: false }, { filled: false }, { filled: false }],
  [{filled: true },{num: 6, direction: [{ dir: "right", len: 4, answer: "JKLM" }],filled: false }, { filled: false }, { filled: false}, { filled: false }],
  [{ num: 3, direction: [{ dir: "right", len: 4, answer: "NOPQ" }], filled: false }, { filled: false }, { filled: false}, { filled: false },{filled: true }],
  [{ num: 4, direction: [{ dir: "right", len: 5, answer: "RSTUV" }], filled: false },{ filled: false }, { filled: false }, { filled: false }, { filled: false }]
];
const crossGrid5=[
  [{ num: 1, direction: [{ dir: "down", len: 5, answer: "AEJNR" }], filled: false }, { filled: true }, {num: 2, direction: [{ dir: "right", len: 3, answer: "BCD" }], filled: false}, { num: 5, direction: [{ dir: "down", len: 5, answer: "CHLPU" }], filled: false },{num: 6, direction: [{ dir: "down", len: 5, answer: "DIMQV" }], filled: false }],
  [{num: 3, direction: [{ dir: "right", len: 5, answer: "EFGHI" }], filled: false  },{num: 4, direction: [{ dir: "right", len: 4, answer: "FGHI" },{ dir: "down", len: 4, answer: "FKOS" }], filled: false  }, { filled: false }, { filled: false }, { filled: false }],
  [{filled: false }, { filled: false }, { filled: true}, { filled: false }, { filled: false }],
  [{filled: false }, { filled: false }, { filled: true }, { filled: false}, { filled: false }],
  [{num: 7, direction: [{ dir: "right", len: 5, answer: "RSTUV" }],filled: false}, { filled: false }, { filled: false }, { filled: false }, { filled: false }]
];
const questions1 = {
  1: {
    right: {
      text: "I am the process that reveals hidden mistakes in logic, syntax, or execution, often requiring patience and problem-solving skills. Without me, software might remain broken. What am I?",
      hints: [{ text: "Hello I am Hint 1 wgeyfiudwejoedkowhe jdfhiqjowekfmc hegfrurw whqeinfdwe hwqefoiewqjimif ghrgfuwequejn hegiu ddfhjsei", used: false },
      { text: "Hello I am Hint 2 wgeyfiudwejoedkowhe jdfhiqjowekfmc hegfrurw whqeinfdwe hwqefoiewqjimif ghrgfuwequejn hegiu ddfhjsei", used: false },
      { text: "Hello I am Hint 3 wgeyfiudwejoedkowhe jdfhiqjowekfmc hegfrurw whqeinfdwe hwqefoiewqjimif ghrgfuwequejn hegiu ddfhjsei", used: false },],
      len: 5,
      hintNum: 0
    },
    down: {
      text: "In computer science and mathematics, which term is used to represent the difference or change in a variable, often appearing in equations or algorithms to calculate differences between values?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },],
      len: 5,
      hintNum: 0
    }
  },
  2: {
    right: {
      text: "In programming, I can be called with a status code to terminate execution, and in some cases, I clean up resources before doing so. In shell scripts, I signify the end of a process. What am I?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },], len: 4, hintNum: 0
    }
  },
  3: {
    right: {
      text: "Which communication system, once widely used for sending written messages over long distances, relied on teleprinters and was commonly used by businesses before the advent of fax and email?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },], len: 5, hintNum: 0
    }
  },
  4: {
    right: {
      text: "In operating systems, I can be set to send a signal after a specified time interval, often used to interrupt sleeping processes or enforce timeouts. What am I?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },], len: 5, hintNum: 0
    },
    // down: { text: "Sun rises in the?", answer: "EAST" }
  },
  5: {
    down: {
      text: "What word describes the action of forcefully removing an unauthorized user from a system or network?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },],
      len: 5,
      hintNum: 0
    },
    // down: { text: "Sun rises in the?", answer: "EAST" }
  },
  6: {
    down: {
      text: "What word means to express something verbally, and can also relate to speech synthesis in AI and voice assistants?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },],
      len: 5,
      hintNum: 0
    }
  }
};
const questions2 = {
  1: {
    right: {
      text: "I am the process that reveals hidden mistakes in logic, syntax, or execution, often requiring patience and problem-solving skills. Without me, software might remain broken. What am I?",
      hints: [{ text: "Hello I am Hint 1 wgeyfiudwejoedkowhe jdfhiqjowekfmc hegfrurw whqeinfdwe hwqefoiewqjimif ghrgfuwequejn hegiu ddfhjsei", used: false },
      { text: "Hello I am Hint 2 wgeyfiudwejoedkowhe jdfhiqjowekfmc hegfrurw whqeinfdwe hwqefoiewqjimif ghrgfuwequejn hegiu ddfhjsei", used: false },
      { text: "Hello I am Hint 3 wgeyfiudwejoedkowhe jdfhiqjowekfmc hegfrurw whqeinfdwe hwqefoiewqjimif ghrgfuwequejn hegiu ddfhjsei", used: false },],
      len: 5,
      hintNum: 0
    },
    down: {
      text: "In computer science and mathematics, which term is used to represent the difference or change in a variable, often appearing in equations or algorithms to calculate differences between values?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },],
      len: 5,
      hintNum: 0
    }
  },
  2: {
    right: {
      text: "In programming, I can be called with a status code to terminate execution, and in some cases, I clean up resources before doing so. In shell scripts, I signify the end of a process. What am I?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },], len: 4, hintNum: 0
    }
  },
  3: {
    right: {
      text: "Which communication system, once widely used for sending written messages over long distances, relied on teleprinters and was commonly used by businesses before the advent of fax and email?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },], len: 5, hintNum: 0
    }
  },
  4: {
    right: {
      text: "In operating systems, I can be set to send a signal after a specified time interval, often used to interrupt sleeping processes or enforce timeouts. What am I?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },], len: 5, hintNum: 0
    },
    // down: { text: "Sun rises in the?", answer: "EAST" }
  },
  5: {
    down: {
      text: "What word describes the action of forcefully removing an unauthorized user from a system or network?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },],
      len: 5,
      hintNum: 0
    },
    // down: { text: "Sun rises in the?", answer: "EAST" }
  },
  6: {
    down: {
      text: "What word means to express something verbally, and can also relate to speech synthesis in AI and voice assistants?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },],
      len: 5,
      hintNum: 0
    }
  }
};
const questions3 = {
  1: {
    right: {
      text: "I am the process that reveals hidden mistakes in logic, syntax, or execution, often requiring patience and problem-solving skills. Without me, software might remain broken. What am I?",
      hints: [{ text: "Hello I am Hint 1 wgeyfiudwejoedkowhe jdfhiqjowekfmc hegfrurw whqeinfdwe hwqefoiewqjimif ghrgfuwequejn hegiu ddfhjsei", used: false },
      { text: "Hello I am Hint 2 wgeyfiudwejoedkowhe jdfhiqjowekfmc hegfrurw whqeinfdwe hwqefoiewqjimif ghrgfuwequejn hegiu ddfhjsei", used: false },
      { text: "Hello I am Hint 3 wgeyfiudwejoedkowhe jdfhiqjowekfmc hegfrurw whqeinfdwe hwqefoiewqjimif ghrgfuwequejn hegiu ddfhjsei", used: false },],
      len: 5,
      hintNum: 0
    },
    down: {
      text: "In computer science and mathematics, which term is used to represent the difference or change in a variable, often appearing in equations or algorithms to calculate differences between values?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },],
      len: 5,
      hintNum: 0
    }
  },
  2: {
    right: {
      text: "In programming, I can be called with a status code to terminate execution, and in some cases, I clean up resources before doing so. In shell scripts, I signify the end of a process. What am I?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },], len: 4, hintNum: 0
    }
  },
  3: {
    right: {
      text: "Which communication system, once widely used for sending written messages over long distances, relied on teleprinters and was commonly used by businesses before the advent of fax and email?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },], len: 5, hintNum: 0
    }
  },
  4: {
    right: {
      text: "In operating systems, I can be set to send a signal after a specified time interval, often used to interrupt sleeping processes or enforce timeouts. What am I?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },], len: 5, hintNum: 0
    },
    // down: { text: "Sun rises in the?", answer: "EAST" }
  },
  5: {
    down: {
      text: "What word describes the action of forcefully removing an unauthorized user from a system or network?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },],
      len: 5,
      hintNum: 0
    },
    // down: { text: "Sun rises in the?", answer: "EAST" }
  },
  6: {
    down: {
      text: "What word means to express something verbally, and can also relate to speech synthesis in AI and voice assistants?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },],
      len: 5,
      hintNum: 0
    }
  }
};
const questions4 = {
  1: {
    right: {
      text: "I am the process that reveals hidden mistakes in logic, syntax, or execution, often requiring patience and problem-solving skills. Without me, software might remain broken. What am I?",
      hints: [{ text: "Hello I am Hint 1 wgeyfiudwejoedkowhe jdfhiqjowekfmc hegfrurw whqeinfdwe hwqefoiewqjimif ghrgfuwequejn hegiu ddfhjsei", used: false },
      { text: "Hello I am Hint 2 wgeyfiudwejoedkowhe jdfhiqjowekfmc hegfrurw whqeinfdwe hwqefoiewqjimif ghrgfuwequejn hegiu ddfhjsei", used: false },
      { text: "Hello I am Hint 3 wgeyfiudwejoedkowhe jdfhiqjowekfmc hegfrurw whqeinfdwe hwqefoiewqjimif ghrgfuwequejn hegiu ddfhjsei", used: false },],
      len: 5,
      hintNum: 0
    },
    down: {
      text: "In computer science and mathematics, which term is used to represent the difference or change in a variable, often appearing in equations or algorithms to calculate differences between values?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },],
      len: 5,
      hintNum: 0
    }
  },
  2: {
    right: {
      text: "In programming, I can be called with a status code to terminate execution, and in some cases, I clean up resources before doing so. In shell scripts, I signify the end of a process. What am I?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },], len: 4, hintNum: 0
    }
  },
  3: {
    right: {
      text: "Which communication system, once widely used for sending written messages over long distances, relied on teleprinters and was commonly used by businesses before the advent of fax and email?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },], len: 5, hintNum: 0
    }
  },
  4: {
    right: {
      text: "In operating systems, I can be set to send a signal after a specified time interval, often used to interrupt sleeping processes or enforce timeouts. What am I?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },], len: 5, hintNum: 0
    },
    // down: { text: "Sun rises in the?", answer: "EAST" }
  },
  5: {
    down: {
      text: "What word describes the action of forcefully removing an unauthorized user from a system or network?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },],
      len: 5,
      hintNum: 0
    },
    // down: { text: "Sun rises in the?", answer: "EAST" }
  },
  6: {
    down: {
      text: "What word means to express something verbally, and can also relate to speech synthesis in AI and voice assistants?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },],
      len: 5,
      hintNum: 0
    }
  }
};
const questions5 = {
  1: {
    right: {
      text: "I am the process that reveals hidden mistakes in logic, syntax, or execution, often requiring patience and problem-solving skills. Without me, software might remain broken. What am I?",
      hints: [{ text: "Hello I am Hint 1 wgeyfiudwejoedkowhe jdfhiqjowekfmc hegfrurw whqeinfdwe hwqefoiewqjimif ghrgfuwequejn hegiu ddfhjsei", used: false },
      { text: "Hello I am Hint 2 wgeyfiudwejoedkowhe jdfhiqjowekfmc hegfrurw whqeinfdwe hwqefoiewqjimif ghrgfuwequejn hegiu ddfhjsei", used: false },
      { text: "Hello I am Hint 3 wgeyfiudwejoedkowhe jdfhiqjowekfmc hegfrurw whqeinfdwe hwqefoiewqjimif ghrgfuwequejn hegiu ddfhjsei", used: false },],
      len: 5,
      hintNum: 0
    },
    down: {
      text: "In computer science and mathematics, which term is used to represent the difference or change in a variable, often appearing in equations or algorithms to calculate differences between values?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },],
      len: 5,
      hintNum: 0
    }
  },
  2: {
    right: {
      text: "In programming, I can be called with a status code to terminate execution, and in some cases, I clean up resources before doing so. In shell scripts, I signify the end of a process. What am I?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },], len: 4, hintNum: 0
    }
  },
  3: {
    right: {
      text: "Which communication system, once widely used for sending written messages over long distances, relied on teleprinters and was commonly used by businesses before the advent of fax and email?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },], len: 5, hintNum: 0
    }
  },
  4: {
    right: {
      text: "In operating systems, I can be set to send a signal after a specified time interval, often used to interrupt sleeping processes or enforce timeouts. What am I?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },], len: 5, hintNum: 0
    },
    // down: { text: "Sun rises in the?", answer: "EAST" }
  },
  5: {
    down: {
      text: "What word describes the action of forcefully removing an unauthorized user from a system or network?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },],
      len: 5,
      hintNum: 0
    },
    // down: { text: "Sun rises in the?", answer: "EAST" }
  },
  6: {
    down: {
      text: "What word means to express something verbally, and can also relate to speech synthesis in AI and voice assistants?",
      hints: [{ text: "Hello I am Hint 1", used: false },
      { text: "Hello I am Hint 2", used: false },
      { text: "Hello I am Hint 3", used: false },],
      len: 5,
      hintNum: 0
    }
  }
};

const Level1 = () => {
  // Questions Array

  // State to track the current question indices
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [currentIndex, setcurrentIndex] = useState(0);
  const [forceRender, setForceRender] = useState(0);
  const [direction, setDirection] = useState(0);
  const [correct, showCorrectMessage] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [crosswordGrid, setCrosswordGrid] = useState([]);
  const [questions,setQuestions]=useState({}); 
  const location = useLocation();
  const { email } = location.state || {};
  const [completion,setCompletion]=useState(false);
  // State to track the answers entered by the user
  // const [answers, setAnswers] = useState(Array(7).fill("")); // 7 questions, 7 answers

  const handleButtonClick = (index) => {
    // if (index === 0) {
    //   setcurrentIndex([0, 1]); // Show both question 1 and question 2 for button 1
    // } else {
    if (questions[index + 1].down) {
      setDirection(0);
    } else if (questions[index + 1].right) {
      setDirection(1);
    }
    setcurrentIndex(index); // Adjust index for other buttons
    // }
  };

  //this use effect accesses the user data from the database
  useEffect(() => {
    const fetchUser = async () => {

      try {
        // console.log(email,password)
        const response = await fetch("http://localhost:5000/access", { // Ensure "http://" is included
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }, // Convert state to JSON string
          body: JSON.stringify({ email: email })
        });

        const result = await response.json();
        console.log(result);
        if(result.gridNum){
          setCrosswordGrid(eval(`crossGrid${result.gridNum}`));
          setQuestions(eval(`questions${result.gridNum}`));
        }
        setUser(result);
        if (result.Level1) {
          navigate("/checkpoints");
        }
        // setForceRender((prev) => prev + 1);


        // if (response.status === 200) {
        //   // navigate("/level1");

        // } else {
        //   setResponseMessage(result.message || "Login failed");
        // }
      } catch (error) {
        console.log(error);
        setResponseMessage(`Error: ${error.message}`);
        navigate("/login");
      }
    };
    if (!email) {
      navigate("/login");
    }
    fetchUser();
  }, [forceRender]);

  // const initialUserInput = Array(5).fill("").map(() => Array(5).fill(""));
  // const [userInput, setUserInput] = useState(() => {
  //   const savedInput = localStorage.getItem("userInput");
  //   return savedInput ? JSON.parse(savedInput) : initialUserInput;
  // });
  const [userInput, setUserInput] = useState(Array(5).fill("").map(() => Array(5).fill("")));
  const handleInputChange = (row, col, value) => {
    const newGrid = [...userInput];
    newGrid[row][col] = value.toUpperCase();
    setUserInput(newGrid);
  };

  let i = 0;
  let j = 0;
  let flag = false;

  // useEffect(() => {
  //   localStorage.setItem("userInput", JSON.stringify(userInput));
  // }, [userInput]);

  //this use effect uses the user input to check the wholegrid
  useEffect(() => {
    // const newGrid = [...userInput];


    crosswordGrid.forEach((row, rowIndex) => {
      let i = rowIndex;

      row.forEach((cell, colIndex) => {
        let j = colIndex;
        let flag = false;

        if (cell.num) {
          // console.log(cell.num, cell.direction);
          

          cell.direction.forEach((dir) => {
            if (dir.dir === "right") {
              for (let k = 0; k < dir.len; k++) {
                if (userInput[i][j + k] == dir.answer[k]) {
                  flag = true;
                  // console.log(`flag true ${i} ${j + k}`);
                } else {
                  flag = false;
                  // console.log(`flag false ${i} ${j + k}`);
                  break;
                }
              }
              // console.log(`flag ${i} ${j} ${flag}`);
              if (flag) {
                // console.log(`flag true ${i} ${j}`);
                let complete=false;
                for (let k = 0; k < dir.len; k++) {
                  // console.log(`flag green true ${i} ${j + k}`);
                  if(crosswordGrid[i][j + k].filled===false) complete=true;
                  crosswordGrid[i][j + k].filled = true;

                }
                if(complete){
                  handleCorrect();
                // setForceRender((prev) => prev + 1);
                showCorrectMessage(true);
                setTimeout(() => {
                  showCorrectMessage(false);
              }, 3000);
            }

              }
            }

            if (dir.dir === "down") {
              for (let k = 0; k < dir.len; k++) {
                if (userInput[i + k][j] === dir.answer[k]) {
                  // console.log(`flag true ${i} ${j + k}`);
                  flag = true;
                } else {
                  flag = false;
                  // console.log(`flag false ${i} ${j + k}`);
                  break;
                }
              }
              // console.log(`flag ${i} ${j} ${flag}`);
              if (flag) {
                // console.log(`flag true ${i} ${j}`);
                let complete=false;
                for (let k = 0; k < dir.len; k++) {
                  // console.log(`flag green true ${i} ${j + k}`);
                  if(crosswordGrid[i + k][j].filled===false) complete=true;
                  crosswordGrid[i + k][j].filled = true;
                  // setForceRender((prev) => prev + 1);
                }
                if(complete){
                  handleCorrect();
                  // setForceRender((prev) => prev + 1);
                  showCorrectMessage(true);
                  setTimeout(() => {
                    showCorrectMessage(false);
                }, 3000);
              }
              }
            }
          });
        }
      });
    });

    // setUserInput(newGrid);
  }, [userInput]);

  const handleCorrect=async()=>{
    try {
      // console.log(email,password)
          
          const response = await fetch("http://localhost:5000/marks", { // Ensure "http://" is included
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            }, // Convert state to JSON string
            body: JSON.stringify({ email: email })
          });
          const result = await response.json();
          console.log(result);
          setForceRender((prev) => prev + 1); 
  }
      


      // if (response.status === 200) {
      //   // navigate("/level1");

      // } else {
      //   setResponseMessage(result.message || "Login failed");
      // }
     catch (error) {
      console.log(error);
      // setResponseMessage(`Error: ${error.message}`);
      // navigate("/login");
    }
  }

  //this use effect is used for checking if the crossword is completed
  useEffect(() => {
    const level1Completed = async () => {
      try {
        // console.log(email,password)
        const response = await fetch("http://localhost:5000/completion", { // Ensure "http://" is included
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
    let flag = true;
    crosswordGrid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.filled === false) {
          flag = false;
        }
      })
    })
    if (crosswordGrid.length>0 && flag) {
      if (level1Completed()) {
        setCompletion(true);
                  setTimeout(() => {
                    setCompletion(false);
                    navigate("/checkpoints");
                }, 3000);
        
      }
      // navigate("/checkpoints")
    }

  }, [userInput]);
  const targetTime = "2025-02-22T16:15:00";
  const calculateTimeLeft = () => {
    const now = new Date().getTime(); // Current timestamp
    const target = new Date(targetTime).getTime(); // Target timestamp
    const difference = Math.max(target - now, 0); // Ensure non-negative time
    return Math.floor(difference / 1000); // Convert to seconds
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handledownHint=async(index)=>{
   
        try {
          // console.log(email,password)
          if (questions[currentIndex + 1].down.hintNum === index) 
            { 
              questions[currentIndex + 1].down.hintNum += 1;
              questions[currentIndex + 1].down.hints[index].used = true; 
              
              const response = await fetch("http://localhost:5000/decrementMarks", { // Ensure "http://" is included
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                }, // Convert state to JSON string
                body: JSON.stringify({ email: email,hintsUsed:index+1 })
              });
              const result = await response.json();
              console.log(result);
              setForceRender((prev) => prev + 1); 
      }
          
  
  
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

         

  }

  const handlerightHint=async(index)=>{
   
    try {
      // console.log(email,password)
      // console.log(index);
      if (questions[currentIndex + 1].right.hintNum === index) 
        { 
          
          questions[currentIndex + 1].right.hintNum += 1;
          questions[currentIndex + 1].right.hints[index].used = true; 
          
          const response = await fetch("http://localhost:5000/decrementMarks", { // Ensure "http://" is included
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            }, // Convert state to JSON string
            body: JSON.stringify({ email: email,hintsUsed:index+1 })
          });
          const result = await response.json();
          console.log(result);
          setForceRender((prev) => prev + 1); 
  }
      


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

     

}

  return (
    <div className=" flex flex-col items-center">
      <div className="fixed w-screen h-screen top-0 bg-[url('/bglevel1.jpg')] bg-cover bg-center bg-no-repeat  ">
      </div>
      {/* Title */}
      <div className="  flex flex-col items-center backdrop-blur-sm">

        <div className="flex justify-between w-full px-7 items-center">
          <div className=" flex flex-col gap-4 w-1/4">
            <p className="text-lg h-[30px] font-bold text-purple-400">Team Name: {user.teamName || ""}</p>
            <p className=" text-lg h-[30px] font-bold text-purple-400">Points: {user.Points}</p>
          </div>

          <p className=" h-28 backdrop-blur-sm text-transparent bg-clip-text items-center text-5xl font-bold p-3 bg-gradient-to-br from-blue-400 via-green-300 to-purple-600 flex justify-center"> Round-1 : Enigma Of Minds</p>
          <p className="text-4xl font-bold text-green-400 w-1/4 flex justify-end">{formatTime(timeLeft)}</p>
        </div>
        {/* Flex container for grid and questions */}
        <div className=" space-x-10 backdrop-blur-sm flex w-full h-[600px] justify-evenly ">
          {/* Crossword Grid */}

          <div className=" w-1/2 flex flex-col justify-center items-center">
            {/* <p className="text-white">Team Name: </p> */}
            <div className="h-16">
            {correct && <div className=" mb-5 opacity-0 translate-y-5  bg-green-400 text-white "
              style={{
                animation: "fadeInUp 2s ease-out, fadeOut 3s ease-out",
              }}
            >
              <p className="flex justify-center items-center p-2 gap-3 text-lg"><FaHandsClapping />Wow....! That was correct</p>
              {/* <div className="w-full bg-white h-1 mt-1 relative overflow-hidden">
                <div
                  className="h-full bg-green-300"
                  style={{
                    width: "100%",
                    animation:
                      "progress-bar 3s linear forwards",
                  }}
                ></div>
              </div> */}
              <style>{`
        @keyframes progress-bar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
            </div>}
            </div>


            <div className=" grid grid-cols-5 p-4 w-[420px] h-[420px] ">

              {crosswordGrid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    style={{
                      backgroundImage: cell.filled ? "url('/logo for website.png')" : "none",
                      backgroundSize: "500% 500%",
                      backgroundPosition: `${(colIndex * 100) / 4}% ${(rowIndex * 100) / 4}%`,
                      transition: "background-image 0.5s ease-in-out, opacity 0.5s ease-in-out",
                    }}
                    className={`relative border-2 w-20 h-20 flex items-center justify-center transition-all duration-500 ease-in-out ${cell.filled
                      ? "bg-slate-800 border-green-500 opacity-100"
                      : "bg-black border-white "
                      }`}
                  >
                    {/* Display Question Number */}
                    {cell.num && (
                      <span className=" absolute top-1 text-white left-1 text-xs font-bold">
                        {cell.num}
                      </span>
                    )}
                    {/* Input Field */}
                    <input
                      type="text"
                      maxLength="1"
                      className="w-16 h-16 text-center text-lg text-white font-bold uppercase  focus:outline-none"
                      value={userInput[rowIndex][colIndex]}
                      onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                      disabled={cell.filled}
                    />
                  </div>
                ))
              )}

            </div>
          </div>

          {/* Questions Section */}
          <div className=" text-white px-7  pt-8 w-2/3 backdrop-blur-sm flex flex-col gap-10 items-center mr-3">
            {/* <h2 className="text-3xl text-green-400 font-bold mb-4">Questions</h2> */}
            <div className=" text-2xl text-center">
              {questions[currentIndex + 1] && ( // Check if question exists
                <div key={`question-${currentIndex + 1}`}>
                  <p className="font-bold text-emerald-400">Question {currentIndex + 1}</p>
                  <div className="flex justify-center my-3 ">
                    {questions[currentIndex + 1].down && questions[currentIndex + 1].right && (
                      <div className="flex gap-3 justify-around w-2/3  rounded-xl ">
                        <button 
                        className={` cursor-pointer border-gray-300 border-2 w-1/2 py-3  rounded-xl ${direction === 0 ? "bg-blue-700 " : ""}`} 
                        onClick={() => setDirection(0)}>Direction 1</button>
                        <button 
                        className={`cursor-pointer border-gray-300 border-2 w-1/2 py-3  rounded-xl ${direction === 1 ? "bg-blue-700 " : ""}`} 
                        onClick={() => setDirection(1)}>Direction 2</button>

                      </div>
                    )}
                  </div>
                  <div>
                    {questions[currentIndex + 1].down && (
                      <div className={` mb-4 ${direction === 0 ? "block" : "hidden"}`}>
                        <p
                          key={`${currentIndex + 1}-down`} // Unique key for down
                        >
                          {questions[currentIndex + 1].down.text}
                        </p>
                        <div className=" flex flex-col justify-center items-center mt-4">
                          <div className="flex gap-3 justify-center items-center">
                            <button 
                            className={`p-2  rounded-xl flex  items-center ${questions[currentIndex + 1].down.hintNum == 0 ? "bg-yellow-500 cursor-pointer" : "bg-gray-600"}`} 
                            disabled={questions[currentIndex+1].down.hintNum!==0}
                            onClick={()=>handledownHint(0)}><IoBulbOutline /> Hint 1</button>
                            <button 
                            className={`p-2  rounded-xl flex  items-center ${questions[currentIndex + 1].down.hintNum == 1 ? "bg-yellow-500 cursor-pointer" : "bg-gray-600"}`} 
                            disabled={questions[currentIndex+1].down.hintNum!==1}
                            onClick={()=>handledownHint(1)}><IoBulbOutline /> Hint 2</button>
                            <button 
                            className={`p-2  rounded-xl flex  items-center ${questions[currentIndex + 1].down.hintNum == 2 ? "bg-yellow-500 cursor-pointer" : "bg-gray-600"}`} 
                            disabled={questions[currentIndex+1].down.hintNum!==2}
                            onClick={()=>handledownHint(2)}><IoBulbOutline /> Hint 3</button>
                          </div>
                          <div className="flex flex-col gap-3 w-full pt-3">
                            {questions[currentIndex + 1].down.hints.map((hint, index) =>
                              hint.used ? <p key={index} className="bg-transparent backdrop-blur-md border border-gray-600 rounded-lg py-2">Hint-{index + 1}: {hint.text}</p> : null
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {questions[currentIndex + 1].right && (
                      <div className={` mb-4 ${direction === 1 ? "block" : "hidden"}`}>
                        <p
                          key={`${currentIndex + 1}-right`} // Unique key for right
                        >
                          {questions[currentIndex + 1].right.text}
                        </p>
                        <div className="flex flex-col justify-center mt-4">
                          <div className="flex gap-3 justify-center">
                            <button 
                            className={`p-2 rounded-xl flex  items-center ${questions[currentIndex + 1].right.hintNum == 0 ? "bg-yellow-500 cursor-pointer" : "bg-gray-600"}`} 
                            disabled={questions[currentIndex+1].right.hintNum!==0}
                            onClick={()=>handlerightHint(0)}><IoBulbOutline /> Hint 1</button>
                            <button 
                            className={`p-2 rounded-xl flex  items-center ${questions[currentIndex + 1].right.hintNum == 1 ? "bg-yellow-500 cursor-pointer" : "bg-gray-600"}`} 
                            disabled={questions[currentIndex+1].right.hintNum!==1}
                            onClick={()=>handlerightHint(1)}><IoBulbOutline /> Hint 2</button>
                            <button 
                            className={`p-2 rounded-xl flex  items-center ${questions[currentIndex + 1].right.hintNum == 2 ? "bg-yellow-500 cursor-pointer" : "bg-gray-600"}`} 
                            disabled={questions[currentIndex+1].right.hintNum!==2}
                            onClick={()=>handlerightHint(2)}><IoBulbOutline /> Hint 3</button>
                          </div>
                          <div className="flex flex-col gap-3 w-full pt-3">
                            {questions[currentIndex + 1].right.hints.map((hint, index) =>
                              hint.used ? <p key={index} className="bg-transparent backdrop-blur-md border border-gray-600 rounded-lg  py-2">Hint-{index + 1}: {hint.text}</p> : null
                            )}
                          </div>
                        </div>
                      </div>

                    )}
                  </div>
                </div>
              )}
            </div>
            <div className=" grid grid-cols-6 gap-2">
              {Array.from({ length: Object.keys(questions).length }).map((_, index) => (
                <button
                  key={index + 1}
                  className={`w-10 h-10 border rounded-md  ${currentIndex === index ? "bg-blue-500" : "bg-gray-500"
                    } text-white`}
                  onClick={() => handleButtonClick(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
          {completion &&<div className= "fixed flex justify-center items-center ">
            <div className="h-[500px] w-[550px] rounded-2xl bg-white 00 p-10 flex flex-col justify-evenly items-center shadow-lg">
              <img src="level1message.png" alt="congratulations" className=""/>
               <p className="text-3xl text-green-600 font-bold mb-4 text-center ">You have completed the first level in Genius Gateway</p>
               <p className="text-2xl text-blue-600 font-bold ">Your Current Points: {user.Points}</p>
           </div>
          </div>
}


          {/* Navigation Buttons */}

        </div>
      </div>
    </div>
  );
};

export default Level1;
