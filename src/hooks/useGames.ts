import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Game {
  id: number;
  name: string;
  background_image: string;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  const controller = new AbortController();
  const [games, setgames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  // {
  //   signal: controller.signal;
  // }

  useEffect(() => {
    apiClient
      .get<FetchGamesResponse>("/games")
      .then((respond) => setgames(respond.data.results))
      .catch((error) => {
        // if (error instanceof CanceledError) return;
        setError(error.message);
      });

    // return () => controller.abort();
  }, []);

  return { games, error };
};

export default useGames;
