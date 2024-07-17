import { PropsWithChildren } from 'react';

interface CardProps extends PropsWithChildren {
  pokemon: string;
  id: string;
}

interface PaginationProps extends PropsWithChildren {}

interface NavBarProps extends PropsWithChildren {}

interface ProfileData {
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}

interface UserContextProps {
  userData: string | null;
  setUserData: (email: string | null) => void;
}

type Pokemon = {
  name: string;
  url: string;
};

type SetProfileData = (
  firstName: string | undefined, 
  lastName: string | undefined, 
  imageUrl: string | undefined, 
  userUid: string | null
) => void;

export type {
  Pokemon,
  CardProps,
  PaginationProps,
  NavBarProps,
  UserContextProps,
  ProfileData,
  SetProfileData
};
