import React, { useState } from "react";
interface PickedPupsProps {
  players: Player[];
}

type Status = "bench";

interface Player {
  id: number;
  name: string;
  breed: string;
  imageUrl: string;
  status: Status;
}

const PickedPups: React.FC<PickedPupsProps> = ({ players }) => {
  const [pickedPups, setPickedPups] = useState<Player[]>([]);

  return (
    <div className="min-h-screen bg-blue-400 text-amber-200 font-bungee">
      <h2 className="p-4 text-2xl font-bold font-bungee">Picked Pups</h2>
      <div className="grid grid-cols-3 gap-4">
        {pickedPups.map((pup) => (
          <div key={pup.id} className="p-4 rounded-lg shadow-lg bg-amber-200">
            <img className="w-full rounded" src={pup.imageUrl} alt={pup.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PickedPups;
