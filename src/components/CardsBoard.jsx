import Card from "./Card";
import '../App.css';

function CardsBoard({pokemonData, handleClick}) {
  return (
    <div className="cards-board">
    {pokemonData.map((pokemon) => (
      <Card key={pokemon.key} 
            data={pokemon}
            handleClick={handleClick}
      ></Card>
    ))}
    </div>
  );
}

export default CardsBoard;
