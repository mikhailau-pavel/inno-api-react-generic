import { PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
  pokemon: string;
  id: string;
}

interface PaginationProps extends PropsWithChildren {
}

type Pokemon = {
  name: string;
  url: string;
}

export type { Pokemon, CardProps, PaginationProps }