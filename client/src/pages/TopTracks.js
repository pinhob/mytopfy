import { useEffect, useState } from "react";
import { getUserTopTracks } from "../api";
import { TopTracksList } from "../components";

export const TopTracks = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUserTopTracks();

        setTracks(data.items);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [])

  return (
    <main>
      <h1>Top Tracks</h1>
      {tracks && tracks.length > 0 && <TopTracksList tracks={tracks} />}
    </main>
  )
};
