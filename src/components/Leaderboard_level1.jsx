import React, { useEffect, useState } from "react";
import axios from 'axios';
const Leaderboard_level1 = () => {
  const [teams, setTeams] = useState([]);

  // Function to fetch teams from backend
  const fetchTeams = async () => {
      try {
          const response = await axios.get('http://localhost:5000/teams');
          setTeams(response.data); // Update state with sorted teams
      } catch (error) {
          console.error('Error fetching teams:', error);
      }
  };

  // Fetch teams every second
  useEffect(() => {
    
      fetchTeams(); // Initial fetch
      const interval = setInterval(fetchTeams, 1000); // Fetch every second
      
      return () => clearInterval(interval); // Clear interval on component unmount
  }, []);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Team Leaderboard</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full text-center">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4">Rank</th>
              <th className="py-3 px-4">Team Name</th>
              <th className="py-3 px-4">Points</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 transition duration-300"
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{team.Teamname}</td>
                <td className="py-2 px-4">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard_level1;
