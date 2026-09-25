import { useState } from 'react'
import './App.css'

function App() {
  const [nombre, setNombre] = useState('')
  const [pokemon, setPokemon] = useState(null)
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const buscarPokemon = async () => {
    if (!nombre.trim()) return

    setError('')
    setPokemon(null)
    setCargando(true)

    try {
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`)

      if (!respuesta.ok) {
        throw new Error('No se encontró ese Pokémon')
      }

      const datos = await respuesta.json()
      setPokemon(datos)
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  const manejarTecla = (e) => {
    if (e.key === 'Enter') {
      buscarPokemon()
    }
  }

  return (
    <div className="contenedor">
      <div className="tarjeta">
        <h1 className="titulo">Buscador de Pokémon</h1>

        <div className="barra-busqueda">
          <input
            type="text"
            className="input"
            placeholder="Escribe el nombre de un Pokémon"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onKeyDown={manejarTecla}
          />
          <button className="boton" onClick={buscarPokemon} disabled={cargando}>
            {cargando ? 'Buscando...' : 'Buscar'}
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {pokemon && (
          <div className="resultado">
            <h2 className="nombre-pokemon">{pokemon.name}</h2>
            <img className="sprite" src={pokemon.sprites.front_default} alt={pokemon.name} />

            <div className="datos">
              <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
              <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
              <p><strong>Tipo(s):</strong> {pokemon.types.map((t) => t.type.name).join(', ')}</p>
            </div>

            <h3>Habilidades:</h3>
            <ul className="habilidades">
              {pokemon.abilities.map((a) => (
                <li key={a.ability.name}>{a.ability.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default App