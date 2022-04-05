export const TopTracksList = ({ tracks }) => {
  return (
    <ol>
      {tracks.map((track) => (
        <li key={track.id}>
          {track.album.images[0].url && <img src={track.album.images[0].url} alt={track.name} />}
          {track.name && <h1>{track.name}</h1>}
          {track.artists && track.artists[0] && <h2>{track.artists[0].name}</h2>}
        </li>
      ))}
    </ol>
  )
};
