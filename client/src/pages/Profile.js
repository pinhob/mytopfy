import { useState, useEffect } from "react";
import {
  getUserProfile,
  getUserTopArtists,
  getUserTopTracks
} from "../api";
import {
  TopArtistsList,
  TopTracksList
} from "../components";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: userData } = await getUserProfile();
        setProfile(userData);
        console.log("🚀 ~ file: Profile.js ~ line 15 ~ userData", userData)

        const { data: tracks } = await getUserTopTracks();
        setTopTracks(tracks.items);
        console.log("🚀 ~ file: Profile.js ~ line 22 ~ tracks", tracks)

        const { data: artists } = await getUserTopArtists();
        setTopArtists(artists.items);
        console.log("🚀 ~ file: Profile.js ~ line 18 ~ artists", artists)
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

            {topArtists && topTracks && (
              <section>
                <TopArtistsList artists={topArtists.slice(0, 10)} />
                <TopTracksList tracks={topTracks.slice(0, 10)} />
              </section>
            )}
          </>
          : <p>Loading...</p>
      }
    </>
  )
};

export default Profile;