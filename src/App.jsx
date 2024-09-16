import { useState, useEffect } from 'react'
import './App.css'
import  CardsBoard from './components/CardsBoard'

function App() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    let ignore = false;
    const fetchPokemonData = async (pokemonId) => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`, {
          mode: 'cors'
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const pokemonData = await response.json();
        const imageUrl = pokemonData.sprites.other.dream_world.front_default;
        const pokemonName = pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1);
        if (!ignore) {
          setPokemonData(prevData => [
            ...prevData,
            { imageUrl, pokemonName, key: crypto.randomUUID() }
          ]);
        }

      } catch (error) {
        console.error('Failed to fetch Pokemon data:', error);
      }
    };

    const fetchAllPokemonData = async () => {
      for (let i = 1; i <= 12; i++) {
        await fetchPokemonData(i);
      }
    };

    fetchAllPokemonData();
    return () => {
      ignore = true;
    };
    
  }, []);

  return (
    <div>
      <CardsBoard pokemonData={pokemonData}/>     
    </div>
  )
}

export default App
