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
  [{ num: 1, direction: [{ dir: "right", len: 5, answer: "REACT" },{ dir: "down", len: 5, answer: "ROUTE" }], filled: false }, {filled: false }, { num: 6, direction: [{ dir: "right", len: 3, answer: "ACT" }],filled: false},{ filled: false },{filled:false}],
  [{ num: 2, direction: [{ dir: "right", len: 5, answer: "OHTRO" }],filled: false },{filled: false }, { filled: false }, { filled: false }, { filled: false }],
  [{num: 3, direction: [{ dir: "right", len: 3, answer: "URL"}],filled: false }, {num: 8, direction: [{ dir: "down", len: 3, answer: "RAM"}], filled: false }, { filled: false}, { filled: true }, { filled: false }],
  [{num: 4, direction: [{ dir: "right", len: 3, answer: "TAB"}],filled: false }, { filled: false }, { filled: false }, { filled: true }, { filled: true}],
  [{num: 5, direction: [{ dir: "right", len: 5, answer: "EMAIL"}],filled: false }, { filled: false }, { filled: false }, { filled: false}, { filled: false}]

];
const crossGrid3=[
  [{ num: 1, direction: [{dir: "right", len: 5, answer: "PHONE" },{ dir: "down", len: 5, answer: "PIXEL" }], filled: false }, {filled: false }, {filled: false}, {filled: false },{num: 6, direction: [{ dir: "down", len: 3, answer: "EEE" }], filled: false }],
  [{num: 2, direction: [{dir: "right", len: 5, answer: "IMAGE" }], filled: false  },{num:4,direction:[{dir: "down", len: 4, answer: "MODI"}],filled:false}, { filled: false }, { filled: false }, { filled: false }],
  [{num: 3, direction: [{dir: "right", len: 3, answer: "XOR" }],filled: false }, { filled: false }, {num: 7, direction: [{ dir: "down", len: 3, answer: "RUN" }], filled: false}, { filled: true }, { filled: false }],
  [{filled: false }, { filled: false }, {filled: false }, { filled: true}, { filled: true }],
  [{num: 5, direction: [{ dir: "right", len: 5, answer: "LINUX" }],filled: false }, { filled: false }, { filled: false }, { filled: false }, { filled: false }]
];
const crossGrid4 = [
  [{ num: 1, direction: [{ dir: "right", len: 5, answer: "MOUSE" }, { dir: "down", len: 5, answer: "MERGE" }], filled: false }, { num: 5, direction: [{ dir: "down", len: 5, answer: "ENTER" }], filled: false }, { filled: false }, { num: 6, direction: [{ dir: "right", len: 3, answer: "BIN" }], filled: false }],
  [{ num: 2, direction: [{ dir: "right", len: 4, answer: "GNOME" }], filled: false }, { filled: false }, { filled: false }, { filled: false }],
  [{ filled: false }, { filled: false }, { filled: false }, { filled: false }],
  [{ num: 3, direction: [{ dir: "right", len: 5, answer: "EGNAR" }], filled: false }, { filled: false }, { filled: false }, { filled: false }],
  [{ num: 4, direction: [{ dir: "down", len: 5, answer: "SIGMA" }], filled: false }, { filled: false }, { filled: false }, { filled: false }]
];

const crossGrid5 = [
  [{ num: 1, direction: [{ dir: "right", len: 4, answer: "NODE" }, { dir: "down", len: 5, answer: "NOTES" }], filled: false }, { num: 2, direction: [{ dir: "right", len: 4, answer: "TESLA" }], filled: false }, { filled: false }, { filled: false }],
  [{ filled: false }, { filled: false }, { filled: false }, { filled: false }],
  [{ num: 3, direction: [{ dir: "down", len: 5, answer: "OPERA" }], filled: false }, { filled: false }, { filled: false }, { filled: false }],
  [{ num: 4, direction: [{ dir: "down", len: 5, answer: "DISKS" }], filled: false }, { filled: false }, { filled: false }, { filled: false }],
  [{ num: 5, direction: [{ dir: "down", len: 4, answer: "TAHC" }], filled: false }, { filled: false }, { filled: false }, { filled: false }]
];

const questions1 = {
  1: {
    right: {
      text: "I am the process that reveals hidden mistakes in logic, syntax, or execution, often requiring patience and problem-solving skills. Without me, software might remain broken. What am I?",
      hints: [{ text: "This process involves identifying and resolving errors or bugs in code, often using tools like breakpoints and log statements.", used: false },
      { text: " Developers use specialized tools or environments to step through code line by line during this process, ensuring it behaves as expected.", used: false },
      { text: "It’s a five-letter word starting with D, essential for fixing broken software and ensuring programs work correctly.", used: false },],
      len: 5,
      hintNum: 0
    },
    down: {
      text: "In computer science and mathematics, which term is used to represent the difference or change in a variable, often appearing in equations or algorithms to calculate differences between values?",
      hints: [{ text: " In mathematics and computer science, this term symbolizes a change or difference in a variable, commonly used in algorithms, calculus, and physics equations.", used: false },
      { text: "It’s often represented by a Greek letter (∆) and is used to calculate variations in values, like in time intervals or rate of change.", used: false },
      { text: " It’s a five-letter word starting with D, also the fourth letter of the Greek alphabet.", used: false },],
      len: 5,
      hintNum: 0
    }
  },
  2: {
    right: {
      text: "In programming, I can be called with a status code to terminate execution, and in some cases, I clean up resources before doing so. In shell scripts, I signify the end of a process. What am I?",
      hints: [{ text: " In programming, this command or function is used to terminate the execution of a program, often returning a status code to indicate success or failure.", used: false },
      { text: "It’s commonly used in shell scripts and languages like C, Python, and Bash to stop a process or break out of the program flow.", used: false },
      { text: "It’s a four-letter word starting with E, also seen on doors, signaling a way out.", used: false },], len: 4, hintNum: 0
    }
  },
  3: {
    right: {
      text: "Which communication system, once widely used for sending written messages over long distances, relied on teleprinters and was commonly used by businesses before the advent of fax and email?",
      hints: [{ text: " This system used teleprinters connected over a network to exchange text-based messages, allowing businesses to communicate across long distances before modern digital methods.", used: false },
      { text: "It was a predecessor to fax machines and email, popular in the mid-20th century, especially for secure business communications.", used: false },
      { text: "It’s a five-letter word starting with T, sounding like a blend of telephone and text.", used: false },], len: 5, hintNum: 0
    }
  },
  4: {
    right: {
      text: "In operating systems, I can be set to send a signal after a specified time interval, often used to interrupt sleeping processes or enforce timeouts. What am I?",
      hints: [{ text: "In operating systems, this function schedules a signal to be sent after a certain time period, often used to implement timeouts or wake up processes.", used: false },
      { text: " It’s commonly used in Unix-like systems to interrupt sleeping programs or trigger events after a delay.", used: false },
      { text: "It’s a five-letter word starting with A, also something you set in the morning to wake up!", used: false },], len: 5, hintNum: 0
    },
    // down: { text: "Sun rises in the?", answer: "EAST" }
  },
  5: {
    down: {
      text: "What word describes the action of forcefully removing an unauthorized user from a system or network?",
      hints: [{ text: " In cybersecurity, this action involves forcibly disconnecting an unauthorized user from a system or network to prevent further access.", used: false },
      { text: "It’s a five-letter word, often used in schools or organizations, meaning to kick someone out due to a violation of rules.", used: false },
      { text: "It starts with E and sounds like what happens when someone is permanently removed for breaking the rules.", used: false },],
      len: 5,
      hintNum: 0
    },
    // down: { text: "Sun rises in the?", answer: "EAST" }
  },
  6: {
    down: {
      text: "What word means to express something verbally, and can also relate to speech synthesis in AI and voice assistants?",
      hints: [{ text: "This word refers to vocalizing thoughts, often linked to speech synthesis in AI, where text is transformed into spoken words.", used: false },
      { text: "It’s a five-letter word that means to say something out loud, whether in conversation or through a digital voice assistant.", used: false },
      { text: " It starts with U and can also describe something spoken softly or with minimal sound.", used: false },],
      len: 5,
      hintNum: 0
    }
  }
};
const questions2 = {
  1: {
    right: {
      text: "Which JavaScript library is used for building user interfaces with a component-based architecture?",
      hints: [{ text: "This library uses a virtual DOM to optimize rendering performance.", used: false },
      { text: "Components in this library can be functional or class-based and follow a unidirectional data flow.", used: false },
      { text: "The library's logo is a blue atom, symbolizing its reactive nature.", used: false },],
      len: 5,
      hintNum: 0
    },
    down: {
      text: "What term is used in networking and web development to define the path taken by data packets or the structure of URLs in a web application?",
      hints: [{ text: "In web development, this term defines how requests are handled by mapping URLs to specific handlers or controllers.", used: false },
      { text: " In networking, it refers to the path data packets take from source to destination, often involving routers and IP addresses.", used: false },
      { text: " It’s a five-letter word starting with R, commonly used in frameworks like Express.js and React Router.", used: false },],
      len: 5,
      hintNum: 0
    }
  },
  2: {
    right: {
      text: "Which term, derived from Greek, is commonly used to refer to both the branch of medicine dealing with musculoskeletal issues and a shorthand for specialists in this field?",
      hints: [{ text: "This term comes from the Greek word meaning straight or correct.", used: false },
      { text: "It is commonly associated with treating bone, joint, and spine disorders.", used: false },
      { text: "The full term often appears in hospitals as Orthopedic Surgeon or Orthopedist.", used: false },], len: 5, hintNum: 0
    }
  },
  3: {
    right: {
      text: "What is the standard term for the address used to access a resource on the internet?",
      hints: [{ text: "This term refers to a reference or locator used to identify and retrieve resources on a network, often starting with http or https.", used: false },
      { text: "It’s a string of characters that specifies the location of a web page or file on the internet, commonly seen in the address bar of a browser.", used: false },
      { text: "It’s a three-letter abbreviation, starting with U, that stands for Uniform Resource Locator.", used: false },], len: 3, hintNum: 0
    }
  },
  4: {
    right: {
      text: "What key on a keyboard is used to switch between different open applications or windows?",
      hints: [{ text: "This key, when combined with Alt on Windows or Command on Mac, cycles through open applications.", used: false },
      { text: "It’s also used for indentation in text editors and moving between form fields in web browsers.", used: false },
      { text: "The key’s name has three letters and sounds like a short form of tablet.", used: false },], len: 3, hintNum: 0
    },
    // down: { text: "Sun rises in the?", answer: "EAST" }
  },
  5: {
    right: {
      text: "What is the term for a system used to send, receive, and store digital messages over the internet?",
      hints: [{ text: "This system uses protocols like SMTP, IMAP, and POP to transmit and retrieve digital messages.", used: false },
      { text: "It allows users to send text, images, and attachments instantly and usually requires an @ symbol in the address.", used: false },
      { text: "The term is a combination of electronic and mail.", used: false },],
      len: 5,
      hintNum: 0
    },
    // down: { text: "Sun rises in the?", answer: "EAST" }
  },
  6: {
    right: {
      text: "What word refers to the process of doing something intentionally or taking action in response to a situation?",
      hints: [{ text: "This word can describe a formal law passed by a government or a conscious decision to do something.", used: false },
      { text: "It’s often used to describe what performers do on stage or what a person does when responding to an event.", used: false },
      { text: "It’s a three-letter word that starts with A   and means to take action", used: false },],
      len: 3,
      hintNum: 0
    }
  },
  7: {
    down: {
      text: "What is the name of the anonymous network browser used to access the dark web securely?",
      hints: [{ text: "This browser uses a technique called onion routing to conceal a user’s identity by encrypting traffic and bouncing it through a series of relays.", used: false },
      { text: "It allows users to access .onion websites and is often associated with secure, anonymous communication over the internet.", used: false },
      { text: "The browser's name is a three-letter acronym standing for The Onion Router.", used: false },],
      len: 3,
      hintNum: 0
    }
  },
  8: {
    down: {
      text: "Which computer component provides temporary storage for data and programs, allowing for fast access and processing but loses its content when power is turned off?",
      hints: [{ text: " This component is a type of volatile memory, meaning its data is lost when the computer is powered off, but it allows quick read and write access for running programs.", used: false },
      { text: "It acts as the computer's short-term memory, temporarily holding data that the CPU needs to access quickly.", used: false },
      { text: " It’s a three-letter word starting with R, commonly measured in gigabytes (GB) and crucial for multitasking and performance.", used: false },],
      len: 3,
      hintNum: 0
    }
  }
};
const questions3 = {
  1: {
    right: {
      text: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
      hints: [{ text: "This device transmits voices over long distances without physical presence.", used: false },
      { text: "It can hear through a microphone and speak through a speaker, often used for communication.", used: false },
      { text: "It’s a five-letter word, starting with P, and you probably carry it in your pocket every day.", used: false },],
      len: 5,
      hintNum: 0
    },
    down: {
      text: "What is the smallest unit of an image displayed on a screen, often used to measure the resolution of digital images?",
      hints: [{ text: "This tiny element is the fundamental unit of a digital image, representing a single point of color.", used: false },
      { text: "Screen resolution is often described by counting the number of these units, like 1080p or 4K.", used: false },
      { text: "It’s a five-letter word starting with P and ends with L, commonly linked to image quality.", used: false },],
      len: 5,
      hintNum: 0
    }
  },
  2: {
    right: {
      text: "What is the term for a visual representation of something, often created digitally or captured by a camera?",
      hints: [{ text: "This can be a digital rendering, a photograph, or a scanned picture, often made up of pixels.", used: false },
      { text: "It is something you might edit using software like Photoshop or view in a gallery app.", used: false },
      { text: "It’s a five-letter word starting with I and ending with E, often used to describe pictures or graphics.", used: false },], len: 5, hintNum: 0
    }
  },
  3: {
    right: {
      text: "Which bitwise operation, commonly used in programming, results in true if and only if the number of true inputs is odd?",
      hints: [{ text: "This bitwise operation outputs true when inputs differ — one is true, and the other is false.", used: false },
      { text: "It’s short for exclusive or, used in logic gates and binary addition without carry.", used: false },
      { text: "It’s a three-letter term starting with X, often symbolized by ^ in many programming languages.", used: false },], len: 3, hintNum: 0
    }
  },
  4: {
    down: {
      text: "A Great Politician, known for his ambitious projects like Make in India and Digital India.",
      hints: [{ text: "Before becoming Prime Minister, he served as the Chief Minister of Gujarat from 2001 to 2014.", used: false },
      { text: " He launched initiatives like Swachh Bharat Abhiyan, Make in India, and Digital India to modernize the country.", used: false },
      { text: "His last name is four letters long, starting with M, and he's been India’s Prime Minister since 2014.", used: false },], len: 4, hintNum: 0
    },
    // down: { text: "Sun rises in the?", answer: "EAST" }
  },
  5: {
    right: {
      text: "Which operating system, often favored by developers and system administrators, is known for being highly customizable and having a command-line interface as a core feature?",
      hints: [{ text: "This open-source operating system is based on the Unix kernel and allows users to modify its source code freely.", used: false },
      { text: "It powers many servers, supercomputers, and even Android devices, offering flexibility and control through its terminal.", used: false },
      { text: "It’s a five-letter word starting with L, often associated with distros like Ubuntu, Fedora, and Debian.", used: false },],
      len: 5,
      hintNum: 0
    },
    // down: { text: "Sun rises in the?", answer: "EAST" }
  },
  6: {
    down: {
      text: "Which branch of engineering, deals with the design and development of electrical systems, circuits, and electronic devices?",
      hints: [{ text: " This engineering branch focuses on studying electricity, electromagnetism, and their applications in designing circuits and systems.", used: false },
      { text: " It covers areas like power generation, control systems, and microelectronics, often involving both hardware and software.", used: false },
      { text: " It’s commonly abbreviated as EEE — standing for Electrical and Electronics Engineering.", used: false },],
      len: 3,
      hintNum: 0
    }
  },
  7: {
    down: {
      text: "What term is used to describe the process of executing a program or script, often initiated by a user or an automated system?",
      hints: [{ text: "This term refers to the process of starting a program or script, allowing the computer to execute its instructions step by step.", used: false },
      { text: "In many programming environments, pressing a play button or typing a command initiates this process, starting the code execution.", used: false },
      { text: "It’s a three-letter word starting with R, often used when you  a program to make it work.", used: false },],
      len: 3,
      hintNum: 0
    }
  }
};
const questions4 = {
  1: {
    right: {
      text: "Which device, named after a small rodent, has become essential for navigating graphical user interfaces and often uses a sensor or ball to detect movement?",
      hints: [{ text: "This input device translates hand movements into pointer movements on a screen, often using optical sensors or mechanical balls.", used: false },
      { text: "It typically has buttons for clicking and may include a scroll wheel for navigating documents or web pages.", used: false },
      { text: "It’s named after a small animal with a tail, and it’s a five-letter word starting with M, used: false }",used:false},],
      len: 5,
      hintNum: 0
    },
    down: {
      text: "What term is used in programming or version control systems to combine changes from different sources into a single, unified version?",
      hints: [{ text: "This operation is crucial in version control systems like Git, often requiring conflict resolution when combining code changes.", used: false },
      { text: "It integrates changes from different branches into a unified branch, ensuring all updates coexist in the codebase.", used: false },
      { text: " It’s a five-letter word starting with M that means to combine or join things together.", used: false },],
      len: 5,
      hintNum: 0
    }
  },
  2: {
    right: {
      text: "What is the name of the popular open-source desktop environment used in Linux, known for its user-friendly interface and customization options?",
      hints: [{ text: "This desktop environment follows the GTK toolkit and focuses on simplicity, accessibility, and modern design principles.", used: false },
      { text: "It’s the default desktop environment for many Linux distributions, including Fedora and Ubuntu (in certain editions).", used: false },
      { text: " Its name is a five-letter word starting with G, sharing its name with a mythical creature often depicted as a small humanoid figure.", used: false },], len: 4, hintNum: 0
    }
  },
  3: {
    right: {
      text: "What is the reverse word of term which is used to describe the difference between the highest and lowest values in a dataset or a set of numbers?",
      hints: [{ text: " In statistics, this term represents a measure of dispersion, calculated by subtracting the smallest value from the largest value in a dataset.", used: false },
      { text: "It shows how spread out numbers are, helping to understand the variability within a set of data points.", used: false },
      { text: " It’s a five-letter word starting with R, often used to describe the span or extent between two points.", used: false },], len: 5, hintNum: 0
    }
  },
  4: {
    down: {
      text: "What Greek letter is commonly used to represent the sum of a series or the sum of a set of numbers in mathematics?",
      hints: [{ text: "This Greek letter is used in mathematics to denote summation, typically written as a large symbol with upper and lower bounds indicating the range of values to add.", used: false },
      { text: "It looks like a stylized E and is often seen in formulas for calculating series, like arithmetic or geometric sums.", used: false },
      { text: "It’s a five-letter word starting with S, representing the sum operator in math.", used: false },], len: 5, hintNum: 0
    },
    // down: { text: "Sun rises in the?", answer: "EAST" }
  },
  5: {
    down: {
      text: "What key on a keyboard is used to submit or confirm an action, such as sending a message or executing a command?",
      hints: [{ text: "This key often triggers form submissions or executes commands in terminal interfaces, moving the cursor to a new line in text editors.", used: false },
      { text: " It’s sometimes labeled Return on older keyboards and is crucial for confirming inputs or sending messages.", used: false },
      { text: " It’s a five-letter word starting with E, usually the largest key on the right side of the main keyboard area.", used: false },],
      len: 5,
      hintNum: 0
    },
    // down: { text: "Sun rises in the?", answer: "EAST" }
  },
  6: {
    right: {
      text: "In computing, what term refers to a storage area used to temporarily hold files or data that are no longer needed?",
      hints: [{ text: "In operating systems, this storage area temporarily holds deleted files, allowing users to restore them if needed.", used: false },
      { text: "On Windows, it’s called the Recycle , and on macOS, it’s simply the . ", used: false },
      { text: "It’s a three-letter word starting with B, often used to describe a container for discarded items, both digitally and physically.", used: false },],
      len: 3,
      hintNum: 0
    }
  }
};
const questions5 = {
  1: {
    right: {
      text: "What term is used to describe a point in a network, where data is sent or received, and can represent either a physical device or a logical entity in systems like graphs or trees?",
      hints: [{ text: "In graph theory, this term represents a vertex where edges meet, and in networking, it’s a connection point for data transmission.", used: false },
      { text: "In computer science, this term is used in data structures like linked lists, trees, and graphs to store data and links to other elements.", used: false },
      { text: "It’s a four-letter word starting with N, commonly associated with networks and data structures.", used: false },],
      len: 4,
      hintNum: 0
    },
    down: {
      text: "What term refers to written or recorded information, often used as a reminder or reference, and is commonly found in classrooms, meetings, or digital apps?",
      hints: [{ text: "These are brief records of important information, often used for studying, brainstorming, or summarizing ideas.", used: false },
      { text: "You might take these during lectures, meetings, or while reading to remember key points later.", used: false },
      { text: "It’s a five-letter word starting with N, and many apps like Google Keep and Evernote are designed for this purpose.", used: false },],
      len: 5,
      hintNum: 0
    }
  },
  2: {
    right: {
      text: "Which innovative company, named after a famous inventor, has become a leader in electric vehicles, solar energy, and space exploration?",
      hints: [{ text: "This company, founded in 2003, revolutionized the electric vehicle market and expanded into renewable energy and battery storage.", used: false },
      { text: "Named after a legendary inventor known for his work with electricity, the company produces cars like the Model S, Model 3, and Model Y.", used: false },
      { text: " It’s a five-letter word starting with T, led by Elon Musk, and famous for electric cars and self-driving technology.", used: false },], len: 4, hintNum: 0
    }
  },
  3: {
    down: {
      text: "Which web browser, known for its speed and support for modern web standards, is also famous for being developed by a software company that shares its name with a famous music genre?",
      hints: [{ text: "This web browser is known for its built-in VPN, ad blocker, and support for modern web technologies, offering a unique user experience.", used: false },
      { text: "Its name is shared with a classical music genre and reflects a sense of elegance and performance.", used: false },
      { text: " It’s a five-letter word starting with O, often linked to both a web browser and a dramatic musical art form.", used: false },], len: 5, hintNum: 0
    }
  },
  4: {
    down: {
      text: "What devices are often used for long-term data retention, can be either volatile or non-volatile, and is found in both computers and external drives?",
      hints: [{ text: "These storage devices can be magnetic (like HDDs) or solid-state (like SSDs) and are used for saving data even when the computer is turned off.", used: false },
      { text: "They are circular in shape, traditionally spinning to read/write data, though modern versions have no moving parts.", used: false },
      { text: "It’s a five-letter word starting with D, often found in computers, storing everything from operating systems to personal files.", used: false },], len: 5, hintNum: 0
    },
    // down: { text: "Sun rises in the?", answer: "EAST" }
  },
  5: {
    down: {
      text: "What is the reverse word of term which is used for a conversation or exchange of messages, often taking place in a digital interface, where responses are instantaneous and typically used for both casual and professional communication?",
      hints: [{ text: "This form of communication allows real-time text-based interaction, often seen in messaging apps, customer support interfaces, and online gaming.", used: false },
      { text: "It’s commonly used in platforms like WhatsApp, Slack, and Discord for quick back-and-forth exchanges.", used: false },
      { text: "It’s a four-letter word starting with C, describing informal or formal text conversations.", used: false },],
      len: 4,
      hintNum: 0
    },
    // down: { text: "Sun rises in the?", answer: "EAST" }
  }
};

const Level1 = ({EVENT_START_TIME,LEVEL_TIME_LIMITS}) => {
  // Questions Array

  // State to track the current question indices
  // console.log(EVENT_START_TIME,LEVEL_TIME_LIMITS);
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

        if (result.level3 === true) {
          if (result.winner === true) {
            navigate("/winner", { state: { email: email } });
          } else {
            navigate("/completed", { state: { email: email } });
          }
        }
        if(result.eliminated===true){
          navigate("/eliminated",{ state: { email:email} });
        }
        if(result.gridNum){
          setCrosswordGrid(eval(`crossGrid${result.gridNum}`));
          setQuestions(eval(`questions${result.gridNum}`));
        }
        setUser(result);
        if (result.Level1) {
          navigate("/level1waiting",{ state: { email:email} });
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
        const response = await fetch("http://localhost:5000/completion1", { // Ensure "http://" is included
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
                    navigate("/level1waiting",{ state: { email:email} });
                }, 10000);
        
      }
      // navigate("/checkpoints")
    }

  }, [userInput]);
  // const targetTime = "2025-03-04T11:37:00";
  // const calculateTimeLeft = () => {
  //   const now = new Date().getTime(); // Current timestamp
  //   const target = new Date(targetTime).getTime(); // Target timestamp
  //   const difference = Math.max(target - now, 0); // Ensure non-negative time
  //   return Math.floor(difference / 1000); // Convert to seconds
  // };

  const handleElimination = async () => {
    try{
      const response = await fetch("http://localhost:5000/eliminated", { // Ensure "http://" is included
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, // Convert state to JSON string
        body: JSON.stringify({ email: email })
      });
      const result = await response.json();
      console.log(result);
      navigate("/eliminated",{ state: { email:email} });
    } catch (error) {
      console.log(error);
    }
  }
  const getAllocatedTime = (userStartTime) => {
    // Time passed from the event start to user's start (in ms)
    const delay = userStartTime.getTime() - EVENT_START_TIME.getTime();
    const allocated = LEVEL_TIME_LIMITS[0] - delay;
    // console.log(allocated,delay);
    return Math.max(allocated, 0);
  };
  const userStartTime = new Date();
  // const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [remainingTime, setRemainingTime] = useState(getAllocatedTime(userStartTime));
  
  useEffect(() => {
    if (remainingTime <= 0) {
      // When time runs out, automatically navigate to the next level.
      // You might also call onComplete(false) if you want to mark it as incomplete.
      console.log("hello 1");
      if(user && user.Level1===false){
        console.log("hello 2");
        handleElimination();
      }
      return;
    }

    const interval = setInterval(() => {
      setRemainingTime(prev => {
        const updated = prev - 1000;
        if(updated>=0){
          return updated;
      }else{
          return 0;
      }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime,user]);
  
  // useEffect(() => {
  //   if (timeLeft <= 0) return;

  //   const timer = setInterval(() => {
  //     setTimeLeft(calculateTimeLeft());
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [timeLeft]);


  // // Format time as MM:SS
  // const formatTime = (seconds) => {
  //   const minutes = Math.floor(seconds / 60);
  //   const secs = seconds % 60;
  //   return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  // };

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
      <div className=" fixed w-screen h-screen top-0 bg-[url('/bglevel1.jpg')] bg-cover bg-center bg-no-repeat  ">
      </div>
      {/* Title */}
      <div className=" min-h-dvh min-w-dvw  flex flex-col items-center backdrop-blur-sm">

        <div className="flex justify-between w-full px-7 items-center">
          <div className=" flex flex-col gap-4 w-1/4">
            <p className="text-lg h-[30px] font-bold text-purple-400">Team Name: {user.teamName || ""}</p>
            <p className=" text-lg h-[30px] font-bold text-purple-400">Points: {user.Points}</p>
          </div>

          <p className=" h-28 backdrop-blur-sm text-transparent bg-clip-text items-center text-5xl font-bold p-3 bg-gradient-to-br from-blue-400 via-green-300 to-purple-600 flex justify-center"> Round-1 : Enigma Of Minds</p>
          <p className="text-4xl font-bold text-green-400 w-1/4 flex justify-end">{Math.floor(remainingTime / 60000)}:{((remainingTime % 60000) / 1000).toFixed(0).padStart(2, '0')}</p>
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
            <div className=" grid grid-cols-8 gap-2">
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


