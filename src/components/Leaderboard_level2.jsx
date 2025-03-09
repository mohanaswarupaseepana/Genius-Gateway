import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { motion } from "framer-motion";

export default function Level2Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/l2leaderboard")
            .then(response => setLeaderboard(response.data))
            .catch(error => console.error("Error fetching leaderboard:", error));
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5"
        >
            <Card className="w-full max-w-4xl shadow-lg bg-white p-5 rounded-2xl">
                <h1 className="text-2xl font-bold text-center mb-5">🏆 Level 2 Leaderboard 🏆</h1>
                <Table className="w-full border-collapse">
                    <TableHead className="bg-blue-500 text-white">
                        <TableRow>
                            <TableCell className="p-2">Rank</TableCell>
                            <TableCell className="p-2">Team Name</TableCell>
                            <TableCell className="p-2">Points</TableCell>
                            <TableCell className="p-2">Questions Answered</TableCell>
                            <TableCell className="p-2">Checkpoint</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaderboard.map((team, index) => (
                            <TableRow key={index} className="hover:bg-gray-200">
                                <TableCell className="p-2 font-semibold">{index + 1}</TableCell>
                                <TableCell className="p-2">{team.Teamname}</TableCell>
                                <TableCell className="p-2">{team.points}</TableCell>
                                <TableCell className="p-2">{team.questions}</TableCell>
                                <TableCell className="p-2">{team.checkPoint1 && team.checkPoint2 && team.checkPoint3 ? "✅ Completed" : "⏳ In Progress"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </motion.div>
    );
}
