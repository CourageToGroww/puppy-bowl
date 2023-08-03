import React, { useState, useEffect, useCallback } from "react";
import NewPlayerForm from "./NewPlayerForm";
import { Link } from "react-router-dom";

interface Player {
  id: number;
  name: string;
  breed: string;
  imageUrl: string;
}

const COHORT = "2302-ACC-CT-WEB-PT-A";

const AllPlayers: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [creationSuccess, setCreationSuccess] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [playersCreated, setPlayersCreated] = useState(0);

  const fetchPlayers = useCallback(async () => {
    try {
      const response = await fetch(
        `https://fsa-puppy-bowl.herokuapp.com/api/${COHORT}/players`
      );
      const data = await response.json();
      setPlayers(data.data.players);
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  //fetch them players
  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  //conditional for the success div to appear
  useEffect(() => {
    if (creationSuccess === true) {
      setMessage("Player created successfully!");
      setShowMessage(true);
    } else if (creationSuccess === false) {
      setMessage("There was an error creating the player");
      setShowMessage(true);
    }
  }, [creationSuccess, playersCreated]);

  //timer for the div to disappear
  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);

      return () => clearTimeout(timer); //  will clear the timer if the component unmounts before the 5 seconds are up
    }
  }, [showMessage]);

  const deletePlayer = async (id: number) => {
    try {
      const response = await fetch(
        `https://fsa-puppy-bowl.herokuapp.com/api/${COHORT}/players/${id}`,
        { method: "DELETE" }
      );
      const result = await response.json();
      if (result.success) {
        fetchPlayers(); // Refresh the list after a player is deleted
      } else {
        alert("There was an error deleting the player");
      }
    } catch (err) {
      console.error(err);
      alert("There was an error deleting the player");
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase())
  );

  const getFontSize = (name: string) => {
    let baseSize = 16;
    if (name.length > 20) {
      baseSize = 12;
    } else if (name.length > 15) {
      baseSize = 14;
    }
    return `${baseSize}px`;
  };

  return (
    <>
      <div>
        {showMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="h-24 bg-green-500 bg-opacity-25 rounded w-72 backdrop-blur">
              <h2 className="mt-8 font-bold text-center">{message}</h2>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 bg-blue-300">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bungee">
          All Players
        </h1>
        <p className="mt-2 mb-4 text-sm sm:text-base md:text-lg font-bungee">
          Search Players:
        </p>
        <input
          type="text"
          placeholder="Search players"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-4 sm:w-3/4 lg:w-1/2 xl:w-1/3 font-bungee"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredPlayers.map((player) => (
            <div
              key={player.id}
              className="p-4 overflow-auto border rounded bg-amber-200"
            >
              <h2
                className="font-bungee"
                style={{ fontSize: getFontSize(player.name) }}
              >
                {player.name.charAt(0).toUpperCase() + player.name.slice(1)}
              </h2>
              <p className="font-bungee">{player.breed}</p>
              <img
                src={player.imageUrl}
                alt={player.name}
                className="object-cover object-center w-full rounded-md h-60"
              />
              <div className="flex justify-between mt-2">
                <Link
                  to={`/players/${player.id}`}
                  className="px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-700"
                >
                  See Details
                </Link>
                <button
                  onClick={() => deletePlayer(player.id)}
                  className="px-2 py-1 ml-2 text-xs text-white bg-red-500 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {!showForm && (
          <div className="mt-4">
            <button
              onClick={() => setShowForm(true)}
              className="inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Add New Player
            </button>
          </div>
        )}
        {showForm && (
          <NewPlayerForm
            setCreationSuccess={setCreationSuccess}
            setPlayersCreated={setPlayersCreated}
            handleFormClose={handleFormClose}
            refreshPlayers={fetchPlayers}
          />
        )}
      </div>
    </>
  );
};

export default AllPlayers;
