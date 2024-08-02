import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { PaginationProps, Pokemon } from '../../types/types';
import styles from './Pagination.module.css';
import { BASE_URL } from '../../constants/constants';
import axios from 'axios';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import { sortByIdDescend, sortByName } from '../../utils/utils';

const Pagination: React.FC<PaginationProps> = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [sortedPokemonList, setSortedPokemonList] = useState<Pokemon[]>([]);
  const [sortingStrategyType, setSortingStrategyType] = useState('none');
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(2);

  useEffect(() => {
    setIsLoading(true);
    axios.get(BASE_URL).then((response) => {
      const data = response.data;
      setPokemonList(data.results);
    });
    setIsLoading(false);
  }, []);

  const fetchData = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    await axios
      .get(`${BASE_URL}?offset=${index}0&limit=10`)
      .then((response) => {
        const data: Pokemon[] = response.data.results;
        setPokemonList((previous) => [...previous, ...data]);
      })
      .catch((error) => {
        throw error;
      });
    setIndex((previous) => previous + 1);
    setIsLoading(false);
  }, [index, isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        fetchData();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchData]);

  useEffect(() => {
    setSortedPokemonList(sorting(sortingStrategyType, pokemonList));
  }, [fetchData, pokemonList, sortingStrategyType]);

  const sorting = (sortingStrategyType: string, pokemonList: Pokemon[]): Pokemon[] => {
    switch(sortingStrategyType) {
    case 'name': 
      return sortByName(pokemonList)
    case 'id': 
      return sortByIdDescend(pokemonList)
    default: 
      return pokemonList
  }}

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortingStrategyType(e.target.value);
  };

  return (
    <div className={styles.paginationWrapper}>
      <div className={styles.mainFlow}>
        <label htmlFor="strategy">Sort by: </label>
        <select name="strategy" id="filter" onChange={handleSelectChange}>
          <option value="none" selected>
            Ascending ID
          </option>
          <option value="name">Name</option>
          <option value="id">Descending ID</option>
        </select>
        {sortedPokemonList.map((el: Pokemon) => (
          <Card pokemon={el.name} id={el.url.slice(34)} />
        ))}
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Pagination;
