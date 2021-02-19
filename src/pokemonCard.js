import React, { useEffect, useState } from 'react';

const PokemonCard = ({ name }) => {
  const [pkmData, setPkmData] = useState([]);
  useEffect(() => {
    const fetchPkmData = async () => {
      const results = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const resultsJson = await results.json();
      setPkmData(resultsJson);
    };
    fetchPkmData();
  }, [name]);

  const pkmImg = pkmData.id
    ? `https://pokeres.bastionbot.org/images/pokemon/${pkmData.id}.png`
    : null;
  const pkmType = pkmData.types ? pkmData.types[0].type.name : 'normal';
  return (
    <div className={`pokemon-card ${pkmType}`}>
      <div className='img-container'>
        <img width='150' loading='lazy' src={pkmImg} alt={name} />
      </div>
      <div className='pokemon-info'>
        <h2 className='name'>{name}</h2>
        <p className='number'>#{pkmData.id}</p>
        <p className='type'>Type: {pkmType}</p>
      </div>
    </div>
  );
};

export default React.memo(PokemonCard);
