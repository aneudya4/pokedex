import React, { useState, useEffect, Suspense, useCallback } from 'react';
import './App.css';

const PokemonComponent = React.lazy(() => import('./pokemonCard'));

function App() {
  const [pkms, setpkms] = useState([]);
  const [pkmsNumbers, setpkmsNumbers] = useState(1);

  const fetchPkm = useCallback(async (value) => {
    const results = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${value}`
    );
    const resultsJson = await results.json();
    setpkms(resultsJson.results);
  }, []);

  useEffect(() => {
    fetchPkm(150);
  }, [fetchPkm]);

  const onSubmit = (e) => {
    e.preventDefault();
    fetchPkm(pkmsNumbers);
  };

  return (
    <div className='App'>
      <h1>Pokedex</h1>
      <form onSubmit={onSubmit}>
        <label>
          <input
            type='number'
            max='893'
            min='1'
            placeholder=' 1 to 893'
            onChange={(e) => setpkmsNumbers(e.target.value)}
          />
        </label>
        <button>Search</button>
      </form>
      <div className='pokemons'>
        <Suspense fallback={<div>...Loading</div>}>
          {pkms.map((pkm) => {
            return <PokemonComponent key={pkm.name} {...pkm} />;
          })}
        </Suspense>
      </div>
    </div>
  );
}

export default App;
