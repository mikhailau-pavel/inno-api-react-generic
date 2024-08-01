import { Pokemon, SortingStrategy, UserStoreAction, UserStoreProps } from '../types/types';

const userReducer = (state: UserStoreProps, action: UserStoreAction) => {
  switch (action.type) {
    case 'setUserUid':
      return { ...state, userUid: action.payload };
    case 'setUserName':
      return { ...state, userName: action.payload };
    case 'setUserLastName':
      return { ...state, userLastName: action.payload };
    case 'setUserPicUrl':
      return { ...state, userPicUrl: action.payload };
    default:
      return state;
  }
};

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

export { userReducer, sortByName, sortByIdDescend };
