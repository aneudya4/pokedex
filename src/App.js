import React,{useState,useEffect,Suspense} from 'react'
import './App.css';

const PokemonComponent = React.lazy(()=> import('./pokemonCard')) 

function App() {
  const [pkms, setpkms]= useState([])
  // const [allTypes, setAllTypes]= useState([])

  useEffect(  () => {
    const fetchPkm =  async () => {
       const results =  await  fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151')
       const resultsJson = await results.json()
        setpkms(resultsJson.results)
      }
      fetchPkm()
        }, [])

  // useEffect(() => {
  //   fetch('https://pokeapi.co/api/v2/type/').then(data=>{
  //     return data.json()
  //   }).then(types=>setAllTypes(types.results))
  // }, [])

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <div className='pokemons'>
        <Suspense fallback={<div>...Loading</div>}>
      {pkms.map(pkm=>{
   return <PokemonComponent key={pkm.name} {...pkm}/>
      })}
      </Suspense>
      </div>
    </div>
  );
}

export default App;
