export const TopArtistsList = ({ artists }) => {
  return (
    <>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            <img src={artist.images[0].url} alt={artist.name} />
            <h2>{artist.name}</h2>
          </li>
        ))}
      </ul>
    </>
  )
};
