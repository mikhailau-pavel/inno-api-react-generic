import { PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
  pokemon: string;
  id: string;
}

interface PaginationProps extends PropsWithChildren {
}

interface NavBarProps extends PropsWithChildren {
}

interface UserContextProps {
  username?: string;
  isAuthorized?: boolean;
  uid?: number;
}

type Pokemon = {
  name: string;
  url: string;
}

export type { Pokemon, CardProps, PaginationProps, NavBarProps, UserContextProps }