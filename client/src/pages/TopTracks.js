import { useEffect, useState } from "react";
import { getUserTopTracks } from "../api";
import { TimeRangeButtons, TopTracksList } from "../components";

export const TopTracks = () => {
  const [tracks, setTracks] = useState([]);
  const [activeRange, setActiveRange] = useState('short');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUserTopTracks(`${activeRange}_term`);

        setTracks(data.items);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [activeRange]);

  return (
    <main>
      <TimeRangeButtons activeRange={activeRange} setActiveRange={setActiveRange} />
      <h1>Top Tracks</h1>
      {tracks && tracks.length > 0 && <TopTracksList tracks={tracks} />}
    </main>
  )
};
