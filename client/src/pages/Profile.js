import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
              <h2>{`${profile.followers.total} seguidores`}</h2>
            </header>

            {topArtists && topTracks && (
              <section>
                <h2>Top Artistas</h2>
                <Link to="/top-artists">Ver todos</Link>
                <TopArtistsList artists={topArtists.slice(0, 10)} />
                <h2>Top Músicas</h2>
                <Link to="/top-artists">Ver todas</Link>
                <TopTracksList tracks={topTracks.slice(0, 10)} />
              </section>
            )}
          </>
          : <p>Carregando...</p>
      }
    </>
  )
};

export default Profile;