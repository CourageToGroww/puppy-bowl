import React, { useState } from "react";
import breedsData from "../data/breeds";

//to pass props
interface NewPlayerFormProps {
  setCreationSuccess: React.Dispatch<React.SetStateAction<boolean | null>>;
  setPlayersCreated: React.Dispatch<React.SetStateAction<number>>;
  handleFormClose: () => void;
  refreshPlayers: () => void;
}

const COHORT = "2302-ACC-CT-WEB-PT-A";

const NewPlayerForm: React.FC<NewPlayerFormProps> = ({
  setCreationSuccess,
  handleFormClose,
  refreshPlayers,
  setPlayersCreated,
}) => {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [subBreed, setSubBreed] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  interface Breeds {
    [key: string]: string[];
  }

  const breeds = breedsData.message as Breeds;
  const breedNames = Object.keys(breeds);

  const handleBreedChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBreed = e.target.value;
    setBreed(selectedBreed);
    setSubBreed(""); // reset sub-breed when breed changes

    const imageURL = await fetchDogImage(selectedBreed);
    setImageUrl(imageURL || "");
  };

  const handleSubBreedChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedSubBreed = e.target.value;
    setSubBreed(selectedSubBreed);

    if (breed) {
      // fetch dog image for selected breed/sub-breed
      const imageURL = await fetchDogImage(`${breed}/${selectedSubBreed}`);
      setImageUrl(imageURL || "");
    }
  };

  async function fetchDogImage(breed: string) {
    try {
      const response = await fetch(
        `https://dog.ceo/api/breed/${breed}/images/random`
      );
      const data = await response.json();
      return data.message; // URL of  fetched dog image is in the 'message' property of  response data
    } catch (err) {
      console.error(err);
      return null; //  error occurs while fetching the image, return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPlayer = {
      name,
      breed,
      imageUrl,
    };

    try {
      const response = await fetch(
        `https://fsa-puppy-bowl.herokuapp.com/api/${COHORT}/players`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPlayer),
        }
      );

      const result = await response.json();

      // if success set creationSuccess state to true
      if (result.success) {
        setCreationSuccess(true);
        setPlayersCreated((playersCreated) => playersCreated + 1);
        handleFormClose();
        refreshPlayers();
      } else {
        // if result fails set creationSuccess state to false
        setCreationSuccess(false);
      }
    } catch (err) {
      console.error(err);
      // if  exception is thrown set creationSuccess state to false
      setCreationSuccess(false);
    }
  };

  return (
    <div className="">
      <h1 className="mt-2 mb-2 font-bungee">New Player Form:</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4"
      >
        <div className="w-1/2">
          <label className="block mb-2 font-bungee" htmlFor="name">
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-2 py-1 border rounded font-bungee"
          />
        </div>
        <div className="w-1/2 font-bungee">
          <label className="block mb-2" htmlFor="breed">
            Breed:
          </label>
          <select
            id="breed"
            value={breed}
            onChange={handleBreedChange}
            required
            className="w-full px-2 py-1 border rounded"
          >
            <option value="">-- Select a breed --</option>
            {breedNames.map((breedName: string, index: number) => (
              <option value={breedName} key={index}>
                {breedName}
              </option>
            ))}
          </select>
          {breeds[breed] && breeds[breed].length > 0 && (
            <div className="mt-2">
              <label className="block mb-2" htmlFor="subBreed">
                Sub-Breed:
              </label>
              <select
                id="subBreed"
                value={subBreed}
                onChange={handleSubBreedChange}
                className="w-full px-2 py-1 border rounded"
              >
                <option value="">-- Select a sub-breed --</option>
                {breeds[breed].map((subBreedName: string, index: number) => (
                  <option value={subBreedName} key={index}>
                    {subBreedName}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="px-1 py-1 text-sm text-white bg-blue-500 rounded cursor-pointer w-65"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewPlayerForm;
