import { artistAllSongs } from '@/api/artist';
import PlayAllButton from '@/components/PlayAllButton';
import SongTable from '@/components/SongTable';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Artist = () => {  
  const [songs, setSongs] = useState([]);
  const { id } = useParams();

  const numericId = Number(id);

  if (isNaN(numericId)) {
    console.error("Invalid ID format");
    return <div>Invalid Artist ID</div>;
  }

  const GetAllArtistSongs = async () => {
    const res = await artistAllSongs(numericId)
    setSongs(res.songs);
  }

  useEffect(() => {
    GetAllArtistSongs();
  }, []);


  return (
    <div className="artist-container">
      <div className="artist-songs" style={{marginTop: 0}}>
        <div className='text'>Hot Hits</div>
        <PlayAllButton text={`Play All`} count={20} />        
      </div>
      <SongTable songs={songs}/>
    </div>
  );
};

export default Artist;
