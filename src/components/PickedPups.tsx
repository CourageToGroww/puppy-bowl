import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface PickedPupsProps {}

const PickedPups: React.FC<PickedPupsProps> = () => {
  // Fetch benched players from the Redux store
  const pickedPups = useSelector((state: RootState) => state.pickedPlayers);

  return (
    <div className="min-h-screen bg-blue-400 font-bungee">
      <h2 className="p-4 text-2xl font-bold font-bungee">Picked Pups</h2>
      <div className="grid grid-rows-3 gap-4 border-2">
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-16 h-16 border-2 border-amber-200"
            >
              {pickedPups[index] && (
                <img
                  className="rounded w-14 h-14"
                  src={pickedPups[index].imageUrl}
                  alt={pickedPups[index].name}
                />
              )}
            </div>
          ))}
      </div>
      <div className="flex justify-center mt-4">
        <button className="px-4 py-2 bg-green-500 rounded hover:bg-green-700">
          Go To Field
        </button>
      </div>
    </div>
  );
};

export default PickedPups;
