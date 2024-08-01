import { useCallback, useEffect, useState } from 'react';
import { PaginationProps, Pokemon } from '../../types/types';
import styles from './Pagination.module.css';
import { BASE_URL } from '../../constants/constants';
import axios from 'axios';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';

const Pagination: React.FC<PaginationProps> = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
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
        throw error
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

  return (
    <div className={styles.paginationWrapper}>
      <div className={styles.mainFlow}>
        {pokemonList.map((el: Pokemon) => (
          <Card pokemon={el.name} id={el.url.slice(34)} />
        ))}
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Pagination;
