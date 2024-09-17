import { useState, useEffect } from 'react'
import './App.css'
import  CardsBoard from './components/CardsBoard'

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);
  const [record, setRecord] = useState(0);

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
            { imageUrl, pokemonName, clicked: false, key: crypto.randomUUID() }
          ]);
        }

      } catch (error) {
        console.error('Failed to fetch Pokemon data:', error);
      }
    };

    const fetchAllPokemonData = async () => {
      const PokemonsIndex = createPokemonsIndex(12);
      for (let i = 1; i <= 12; i++) {
        await fetchPokemonData(PokemonsIndex[i]);
      }
    };

    fetchAllPokemonData();
    return () => {
      ignore = true;
    };
    
  }, []);

  function createPokemonsIndex(quantity){
    let PokemonsIndex = [];
    while(PokemonsIndex.length <= quantity){
        var r = Math.floor(Math.random() * 100) + 1;
        if(PokemonsIndex.indexOf(r) === -1) PokemonsIndex.push(r);
    }
    return PokemonsIndex
  }

  function handleClick(key){
    let index = pokemonData.map(function(e) { return e.key; }).indexOf(key);
    if(pokemonData[index].clicked){
      totalClicks > record && setRecord(totalClicks);
      setTotalClicks(0);
      console.log("game over");
    }else{
      setTotalClicks(prevTotal => prevTotal + 1);
    }

    let copyPokemonData = [...pokemonData];
    copyPokemonData[index].clicked = true
    shuffleArray(copyPokemonData)
    setPokemonData(copyPokemonData)
    
  }

  function shuffleArray(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

  return (
    <>
      <div className="title">
        <h2>Click on an image but don&apos;t click more than once!</h2>
        {totalClicks>=12? <div>You won!</div>:<div className="score">
          <div>Score: {totalClicks} - Best Score: {record}</div>
        </div> }
      </div>
      <div>
        <CardsBoard pokemonData={pokemonData}
                    handleClick={handleClick}
        />     
      </div>
      
    </>
  )
}

export default App
