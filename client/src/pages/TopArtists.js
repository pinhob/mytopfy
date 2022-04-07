import { useEffect, useState } from "react";
import { getUserTopArtists } from "../api";
import { TimeRangeButtons, TopArtistsList } from "../components";

export const TopArtists = () => {
  const [artists, setArtists] = useState([]);
  const [activeRange, setActiveRange] = useState('short');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUserTopArtists(`${activeRange}_term`);
        setArtists(data.items);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [activeRange]);

  return (
    <main>
      <TimeRangeButtons activeRange={activeRange} setActiveRange={setActiveRange} />
      <h1>Top Artistas</h1>
      {artists && artists.length > 0 ? <TopArtistsList artists={artists} /> : <p>Carregando...</p>}
    </main>
  )
};
