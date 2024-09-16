import { Fragment } from 'react';

function Card({data}) {
  return (
    <Fragment>
      <div>
        {data && <h3>{data.pokemonName}</h3>}
      </div>
      <div>
        {data && <img src={data.imageUrl} alt={data.pokemonName} />}
        {!data && <p>Loading...</p>}
      </div>
    </Fragment>
  );
}



export default Card