import { useEffect, useState } from "react"
import { Pokemon } from "../../types/types"
import Card from "../Card/Card"

const MainPage: React.FC = () => {
  let [pokemonList, setPokemonList] = useState([])

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then(response => response.json())
      .then(data => setPokemonList(data.results))
  }, []) 

  return (
    <> 
      <h1>Welcome to Pokemon Center</h1>
      {pokemonList.map((el: Pokemon) => <Card pokemon={el.name} id={el.url.slice(-2,-1)}/>)}
    </>
  )
}
export default MainPage;