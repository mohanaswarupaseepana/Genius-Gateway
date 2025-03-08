import { useState, useEffect } from 'react';

const initialBoard = [
    [0, 3, 2, 1, 5, 0, 0, 0, 0],
    [0, 0, 5, 0, 0, 0, 2, 0, 8],
    [1, 9, 0, 2, 0, 4, 7, 0, 3],
    [2, 5, 7, 0, 3, 0, 6, 4, 0],
    [9, 8, 0, 0, 7, 2, 0, 0, 1],
    [6, 0, 0, 0, 0, 9, 8, 2, 7],
    [3, 7, 8, 0, 0, 0, 9, 0, 0],
    [4, 0, 0, 0, 6, 0, 0, 8, 0],
    [0, 0, 1, 0, 0, 0, 3, 0, 0],
];

const Sudoku = ({ handleSubmit, qNum }) => {
    const [board, setBoard] = useState(initialBoard.map(row => [...row]));
    const [initialCells] = useState(new Set(
        initialBoard.flatMap((row, i) =>
            row.map((cell, j) => cell !== 0 ? `${i}-${j}` : null).filter(Boolean)
        )));
    const [selectedCell, setSelectedCell] = useState(null);
    const [errors, setErrors] = useState({});
    const [time, setTime] = useState(0);
    const [isSolved, setIsSolved] = useState(false);

    useEffect(()=>{
        if(isSolved===true){
            handleSubmit(qNum);
        }
    },[isSolved])

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Only handle input if a cell is selected.
            if (!selectedCell) return;

            // If a number key (1-9) is pressed, use that value.
            if (e.key >= '1' && e.key <= '9') {
                handleNumberInput(Number(e.key));
            }
            // If 0, Backspace or Delete is pressed, clear the cell.
            else if (e.key === '0' || e.key === 'Backspace' || e.key === 'Delete') {
                handleNumberInput(0);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedCell]);


    const isValidMove = (row, col, value) => {
        if (value === 0) return true;

        // Check row and column
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === value && i !== col) return false;
            if (board[i][col] === value && i !== row) return false;
        }

        // Check 3x3 subgrid
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (board[i][j] === value && i !== row && j !== col) return false;
            }
        }

        return true;
    };

    const handleCellClick = (row, col) => {
        if (!initialCells.has(`${row}-${col}`)) {
            setSelectedCell([row, col]);
        }
    };

    const handleNumberInput = (number) => {
        if (!selectedCell) return;

        const [row, col] = selectedCell;
        const newBoard = [...board];
        newBoard[row][col] = number;

        const isValid = isValidMove(row, col, number);
        setErrors({ ...errors, [`${row}-${col}`]: !isValid });

        setBoard(newBoard);
        checkSolved(newBoard);
    };

    const checkSolved = (currentBoard) => {
        const isComplete = currentBoard.flat().every(cell => cell !== 0);
        if (!isComplete) return;

        const hasErrors = Object.values(errors).some(error => error);
        setIsSolved(!hasErrors);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const resetGame = () => {
        setBoard(initialBoard.map(row => [...row]));
        setSelectedCell(null);
        setErrors({});
        setTime(0);
        setIsSolved(false);
    };

    return (
        <div className="w-full h-full bg-gray-100 flex  items-center justify-center p-4">
            <div className=' w-1/2 overflow-x-scroll h-full'>
                <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
                    <h1 className="text-3xl font-bold mb-4 text-center">Sudoku Puzzle Game</h1>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">Description</h2>
                        <p className="text-gray-700">
                            Sudoku is a logic-based number-placement puzzle. The objective is to fill a 9×9 grid with digits so that each row, each column, and each of the nine 3×3 subgrids (also known as "boxes", "blocks", or "regions") contains all of the digits from 1 to 9.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">Rules</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>Each row must contain the digits 1 through 9 with no repetition.</li>
                            <li>Each column must contain the digits 1 through 9 with no repetition.</li>
                            <li>Each of the nine 3×3 subgrids must contain the digits 1 through 9 with no repetition.</li>
                            <li>Some cells are pre-filled as clues and cannot be changed.</li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">How to Play</h2>
                        <p className="text-gray-700">
                            Select an empty cell by clicking or tapping on it, then use your keyboard or on-screen number pad to input a digit. The game will check for conflicts based on the rules. Once you fill in every cell correctly, the puzzle is solved.
                        </p>
                    </section>


                    
                </div></div>
            <div className='w-1/2'>
                <div className='w-full flex flex-col items-center justify-center'>

                    <div className="bg-white p-2 rounded-lg shadow-lg">
                        <div className="grid grid-cols-9 gap-px bg-gray-200 border-2 border-gray-300">
                            {board.map((row, i) => (
                                row.map((cell, j) => (
                                    <div
                                        key={`${i}-${j}`}
                                        className={`
                  relative h-12 w-12 flex items-center justify-center text-xl font-medium
                  ${(i + 1) % 3 === 1 && 'border-t-2 border-gray-300'}
                  ${(j + 1) % 3 === 0 && 'border-r-2 border-gray-300'}
                  ${selectedCell?.[0] === i && selectedCell?.[1] === j
                                                ? 'bg-blue-100'
                                                : 'bg-white'}
                  ${initialCells.has(`${i}-${j}`) ? 'text-gray-800' : 'text-blue-600'}
                  ${errors[`${i}-${j}`] ? 'text-red-500' : ''}
                  cursor-pointer
                `}
                                        onClick={() => handleCellClick(i, j)}
                                    >
                                        {cell !== 0 ? cell : ''}
                                        {selectedCell?.[0] === i && selectedCell?.[1] === j && (
                                            <div className="absolute inset-0 border-2 border-blue-400 pointer-events-none" />
                                        )}
                                    </div>
                                ))
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-5 gap-2 w-fit">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                            <button
                                key={num}
                                onClick={() => handleNumberInput(num)}
                                className="h-12 w-12 bg-blue-500 text-white rounded-lg font-bold
                     hover:bg-blue-600 active:bg-blue-700 transition-colors"
                            >
                                {num}
                            </button>
                        ))}
                        <button
                            onClick={() => handleNumberInput(0)}
                            className="h-12 w-12 bg-red-500 text-white rounded-lg font-bold
                   hover:bg-red-600 active:bg-red-700 transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    {isSolved && (
                        <div className="mt-4 text-2xl font-bold text-green-600 animate-bounce">
                            Congratulations! You won!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sudoku;