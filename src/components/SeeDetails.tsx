import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

interface Player {
  id: number;
  name: string;
  breed: string;
  imageUrl: string;
}

const SeeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [player, setPlayer] = useState<Player | null>(null);
  const [completion, setCompletion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      const response = await fetch(
        `https://fsa-puppy-bowl.herokuapp.com/api/2302-ACC-CT-WEB-PT-A/players/${id}`
      );
      const data = await response.json();
      setPlayer(data.data.player);

      if (data.data.player) {
        const fetchCompletion = async () => {
          const response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
              },
              body: JSON.stringify({
                model: "gpt-3.5-turbo",
                max_tokens: 220,
                temperature: 0,
                messages: [
                  {
                    role: "user",
                    content: `Generate a description of a dog with a name of ${data.data.player.name} and the breed  ${data.data.player.breed}. 
                    If you are about to hit the token limit do not write another sentence.`,
                  },
                ],
              }),
            }
          );
          const completionData = await response.json();
          setCompletion(completionData.choices[0].message.content);
          setIsLoading(false);
        };

        fetchCompletion();
      }
    };

    fetchPlayer();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-400 rounded">
          <div className="flex flex-col items-center justify-center w-full p-8 m-4 rounded-lg shadow-lg bg-amber-200 md:w-3/4 lg:w-1/2">
            <h1 className="font-bungee">
              Generating Puppy Description...Please wait
            </h1>
          </div>
        </div>
      ) : (
        player && (
          <div className="flex flex-col items-center justify-center min-h-screen bg-blue-400 rounded">
            <div className="flex flex-col items-center justify-center w-full p-8 m-4 rounded-lg shadow-lg bg-amber-200 md:w-3/4 lg:w-1/2">
              <h1 className="mb-4 text-2xl text-center font-bungee">
                {player.name.charAt(0).toUpperCase() + player.name.slice(1)}
              </h1>
              <img
                className="object-cover h-64 mx-auto mb-4 rounded w-86"
                src={player.imageUrl}
                alt={player.name}
              />
              <p className="font-bold">{completion}</p>
              <Link
                to="/"
                className="self-center p-2 mt-10 mb-4 bg-blue-400 rounded text-amber-200"
              >
                Home
              </Link>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default SeeDetails;
