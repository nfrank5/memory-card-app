import { useState, useEffect } from 'react';

  function Card() {
    const [pokemonData, setPokemonData] = useState(null);
   
    useEffect(() => {
      const fetchPokemonData = async () => {
        try {
          const response = await fetch("https://pokeapi.co/api/v2/pokemon/1", {
            mode: 'cors'
          });
  
          if (!response.ok) {
            throw new Error(`Error: Response status ${response.status}`);
          }
  
          const pokemonData = await response.json();
          const imageUrl = pokemonData.sprites.other.dream_world.front_default;
          const pokemonName = pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1);;
          setPokemonData({imageUrl:imageUrl, name:pokemonName});
        } catch (error) {
          console.error("Error fetching Pokemon image:", error);
        }
      };
      fetchPokemonData();
    }, []);
  
    return (
      <>

        <div>
          {pokemonData && <h3>{pokemonData.name}</h3>}
        </div>
        <div>
          {pokemonData && <img src={pokemonData.imageUrl} alt="Ditto" />}
          {!pokemonData && <p>Loading...</p>}
        </div>

      </>
    );
  }



export default Card