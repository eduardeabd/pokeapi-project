import { useState } from 'react'
import './App.css'

function App() {
  const [nombre, setNombre] = useState('')
  const [pokemon, setPokemon] = useState(null)
  const [error, setError] = useState('')

  const buscarPokemon = async () => {
    setError('')
    setPokemon(null)

    try {
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`)

      if (!respuesta.ok) {
        throw new Error('No se encontró ese Pokémon')
      }

      const datos = await respuesta.json()
      setPokemon(datos)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <h1>Buscador de Pokémon</h1>
      <input
        type="text"
        placeholder="Escribe el nombre de un Pokémon"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <button onClick={buscarPokemon}>Buscar</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h3>Habilidades:</h3>
          <ul>
            {pokemon.abilities.map((a) => (
              <li key={a.ability.name}>{a.ability.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App