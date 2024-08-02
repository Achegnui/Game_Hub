import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Game {
  id: number;
  name: string;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  const controller = new AbortController();
  const [games, setgames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<FetchGamesResponse>("/games", { signal: controller.signal })
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
