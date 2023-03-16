import React, { useState } from 'react'
import Axios from 'axios';

const typeColors = {
    "rock": [182, 158, 49],
    "ghost": [112, 85, 155],
    "steel": [183, 185, 208],
    "water": [100, 147, 235],
    "grass": [116, 203, 72],
    "psychic": [251, 85, 132],
    "ice": [154, 214, 223],
    "dark": [117, 87, 76],
    "fairy": [230, 158, 172],
    "normal": [170, 166, 127],
    "fighting": [193, 34, 57],
    "flying": [168, 145, 236],
    "poison": [164, 62, 158],
    "ground": [222, 193, 107],
    "bug": [167, 183, 35],
    "fire": [245, 125, 49],
    "electric": [249, 207, 48],
    "dragon": [112, 55, 255]
}

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemon, setPokemon] = useState({
    id: 1,
    type: "grass",
    name: "bulbasaur",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
    hp: 39,
    atk: 52,
    def: 43,
    spatk: 60,
    spdef: 50,
    spd: 65
  });
  const [search, setSearch] = useState("");
  
  let pokemonColor = typeColors[pokemon.type];

  const handleChange = (event) => {
    const searchInput = event.target.value;
    setSearch(searchInput);
    setPokemonName(searchInput.toLowerCase());
  }

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (response) => {
        console.log(response);
        setPokemon({
          type: response.data.types[0].type.name,
          name: response.data.name,
          img: response.data.sprites.other.home.front_default,
          id: response.data.id,
          hp: response.data.stats[0].base_stat,
          atk: response.data.stats[1].base_stat,
          def: response.data.stats[2].base_stat,
          spatk: response.data.stats[3].base_stat,
          spdef: response.data.stats[4].base_stat,
          spd: response.data.stats[5].base_stat
        });
        setSearch("");
    }).catch(
      setPokemon({
        name: "invalid pokemon"
      })
    )
  }

  // style={{backgroundColor: `rgb(${pokemonColor[0]}, ${pokemonColor[1]}, ${pokemonColor[2]})`}}

  return (
    <div id="pokedex-screen">
      <div id="pokedex-container">
        <div id="content">
          <div>
            <input 
              className="search-input"
              type="text"
              placeholder="Enter Pokemon Name"
              onChange={handleChange}
              value={search}
            />
            <button
              onClick={searchPokemon}
              className="search-button">
                <i className="fa fa-search"/>
            </button>
          </div>
          <div id="pokemon-window">
            <img className="pokemon-img" src={pokemon.img}/>
            <div className="pokemon-id"> {pokemon.id} </div>
          </div>
          <section id="pokemon-stats">
          <h1 className="display-name"> 
            {pokemon.name}
          </h1>
            <div className="stat-names">
              <h3>HP</h3>
              <h3>ATK</h3>
              <h3>DEF</h3>
              <h3>Sp. ATK</h3>
              <h3>Sp. DEF</h3>
              <h3>SPD</h3>
            </div>
            <div className="stat-numbers">
              <h3>{pokemon.hp}</h3>
              <h3>{pokemon.atk}</h3>
              <h3>{pokemon.def}</h3>
              <h3>{pokemon.spatk}</h3>
              <h3>{pokemon.spdef}</h3>
              <h3>{pokemon.spd}</h3>
            </div>
          </section>
        </div>
      </div>
    </div>
    
  )
}

export default App;
