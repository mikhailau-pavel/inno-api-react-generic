import { useEffect, useState } from 'react';
import { Pokemon } from '../../types/types';
import Card from '../Card/Card';
import { BASE_URL } from '../../constants/constants';
import axios from 'axios';
import Pagination from '../Pagination/Pagination';

const MainPage: React.FC = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    axios.get(BASE_URL).then((response) => {
      const data = response.data;
      console.log('response', response);
      setPokemonList(data.results);
    });
  }, []);

  return (
    <>
      <h1>Welcome to Pokemon Center</h1>
      {pokemonList.map((el: Pokemon) => (
        <Card pokemon={el.name} id={el.url.slice(-2, -1)} />
      ))}
      <Pagination totalItems={100} itemsPerPage={10}/>
    </>
  );
};
export default MainPage;
