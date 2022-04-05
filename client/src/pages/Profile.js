import { useState, useEffect } from "react";
import { getUserProfile, getUserTopArtists, getUserTopTracks, getUserPlaylists } from "../api";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: userData } = await getUserProfile();
        setProfile(userData);
        console.log("🚀 ~ file: Profile.js ~ line 15 ~ fetchData ~ userData", userData)

        const { data: playlistsData } = await getUserPlaylists();
        setPlaylists(playlistsData);
        console.log("🚀 ~ file: Profile.js ~ line 26 ~ fetchData ~ playlistsData", playlistsData)

        const { data } = await getUserTopTracks();
        setTopTracks(data);
        console.log("🚀 ~ file: Profile.js ~ line 22 ~ fetchData ~ data", data)

        const artistsData = await getUserTopArtists();
        setTopArtists(artistsData);
        console.log("🚀 ~ file: Profile.js ~ line 18 ~ fetchData ~ artistsData", artistsData)
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [])

  return (
    <>
      {
        profile
          ? <>
            <header>
              {profile.images && profile.images[0].url && <img src={profile.images[0].url} alt="User profile" />}
              <h1>{profile.display_name}</h1>
              <h2>{`${profile.followers.total} followers`}</h2>
            </header>
          </>
          : <p>Loading...</p>
      }
    </>
  )
};

export default Profile;