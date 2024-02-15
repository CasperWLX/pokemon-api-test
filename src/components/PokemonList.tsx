import { useEffect, useState } from "react";


interface pokemonInterface {
    id: number
    name: string
    types: {type: {name: string}}[]
    sprites: {front_default: string}
};

interface Props{
    pokemonName: string
    setLoading: (loading: boolean) => void;
}


const PokemonList: React.FC<Props> = ({pokemonName, setLoading}) => {

    const [pokemonData, setPokemonData] = useState<pokemonInterface[]>([]);

    useEffect(() => {
        setLoading(true);
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`, {method: 'GET'})
        .then((response) => {
            if(!response.ok){
                throw new Error('Pokemon not found')
            }
            return response.json();
        })
        .then((data) => {
            setPokemonData([data]);
        })
        .catch((error) => {
            console.error('could not find that pokemon: ' + error);

            alert('No such pokemon');

        })
        .finally(() => {
            setLoading(false);
        })
        
        console.log(pokemonData)
    },[pokemonName, setLoading])

  return (
    <div>
        {pokemonData.map((pokemon) => (
            <li key={pokemon.id}>
                <h1>{pokemon.id}</h1>
                <p>{pokemon.name}</p>
                {pokemon.types.map((typeName) => (
                    <p key={typeName.type.name}>{typeName.type.name}</p>
                ))}
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </li>
        ))}
    </div>
  )
}

export default PokemonList