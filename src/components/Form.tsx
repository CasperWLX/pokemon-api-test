import { ChangeEvent, useState, FormEvent } from "react"
import PokemonList from "./PokemonList";


const Form = () => {

    const [pokemonName, setPokemonName] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [submittedName, setSubmittedName] = useState('');


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPokemonName(event.target.value);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmittedName(pokemonName);
        setPokemonName('');
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>
                <p>Enter a pokemon name or ID</p>
                <input type="text" placeholder="Type here" value={pokemonName} onChange={handleInputChange}/>
            </label>
            <button type='submit' disabled={loading} >Submit</button>
        </form>
        {submittedName && <PokemonList pokemonName={submittedName} setLoading={setLoading}/>}
    </div>
  )
}

export default Form