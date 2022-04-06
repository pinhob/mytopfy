import { useEffect, useState } from "react";
import { getUserTopArtists } from "../api";
import { TopArtistsList } from "../components";

export const TopArtists = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUserTopArtists();

        setArtists(data.items);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [])

  return (
    <main>
      <h1>Top Artists</h1>
      {artists && artists.length > 0 && <TopArtistsList artists={artists} />}
    </main>
  )
};
