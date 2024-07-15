import { PropsWithChildren } from 'react';

interface CardProps extends PropsWithChildren {
  pokemon: string;
  id: string;
}

interface PaginationProps extends PropsWithChildren {}

interface NavBarProps extends PropsWithChildren {}

interface UserContextProps {
  userData: string | null;
  setUserData: (email: string | null) => void;
}

type Pokemon = {
  name: string;
  url: string;
};

export type {
  Pokemon,
  CardProps,
  PaginationProps,
  NavBarProps,
  UserContextProps,
};
