import { Pokemon, SortingStrategy } from '../types/types';

const sortByName: SortingStrategy = (pokemonList) => {
  return pokemonList.toSorted((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
};

const sortByIdDescend: SortingStrategy = (pokemonList: Pokemon[]) => {
  return pokemonList.toSorted(
    (a, b) => Number(b.url.slice(34, -1)) - Number(a.url.slice(34, -1))
  );
};

export { sortByName, sortByIdDescend };
