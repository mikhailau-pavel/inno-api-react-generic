import { useEffect, useState } from "react"
import { Pokemon } from "../../types/types"
import Card from "../Card/Card"

const MainPage: React.FC = () => {
  let [pokemonList, setPokemonList] = useState([])
  let [pokemonIndexes, setPokemonIndexes] = useState([])
  let [temp, setTemp] = useState([])

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then(response => response.json())
      .then(data => data.results.map((elem: Pokemon) => elem.name))
      .then(name => setPokemonList(name))
  }, []) 

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then(response => response.json())
      .then(data => data.results.map((elem: Pokemon) => elem.url.slice(-2,-1)))
      .then(id => setPokemonIndexes(id))
  }, []) 

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then(response => response.json())
      //.then(data => console.log('data whole', data.results))
      .then(data => setTemp(data.results))
  }, []) 

  return (
    <> 
      <h1>Welcome to Pokemon Center</h1>
      {temp.map((el: Pokemon) => <Card pokemon={el.name} id={el.url.slice(-2,-1)}/>)}
    </>
  )
}
export default MainPage;
//{pokemonList.map((el: string) => <Card pokemon={el}/>)} last
//{pokemonList.map(el => <li>{el}</li>)}