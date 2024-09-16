import Card from "./Card";
import "./CardsBoard.css";

function CardsBoard({pokemonData}) {
  return (
    pokemonData.map((pokemon) => (
      <Card key={pokemon.key} className="cards-board" data={pokemon}/>
    ))
  );
}

export default CardsBoard;
