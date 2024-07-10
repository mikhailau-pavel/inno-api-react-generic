import { PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
  pokemon: string;
  id: string;
}

type Pokemon = {
  name: string;
  url: string;
}

export type { Pokemon, CardProps }