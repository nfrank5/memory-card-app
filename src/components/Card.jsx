import '../App.css';

function Card({data, handleClick}) {


  return (
    <div className="card" onClick={() => handleClick(data.key)} >
      <div>
        {data && <h4>{data.pokemonName}</h4>}
      </div>
      <div>
        {data && <button><img src={data.imageUrl} alt={data.pokemonName} /></button>}
        {!data && <p>Loading...</p>}
      </div>
    </div>
  );
}



export default Card