import { PropsWithChildren } from 'react';

interface CardProps extends PropsWithChildren {
  pokemon: string;
  id: string;
}

interface PaginationProps extends PropsWithChildren {}

interface NavBarProps extends PropsWithChildren {}

interface ProtectedRouteProps extends PropsWithChildren {
  authorizedUser: string | null;
}

interface ProfileData {
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}

interface UserStoreProps {
  userUid: string | null;
  userName: string | null;
  userPicUrl: string | null;
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

type GetProfileData = {
  firstName: {
    firstName: string;
  },
  lastName: {
    lastName: string;
  }
  imageUrl: {
    imageUrl: string;
  }
}

type UserStoreAction = {
  type: string;
  payload: string | undefined;
}

type UserStoreReducerFunction = {
  (state: UserStoreProps, action: UserStoreAction): void 
}

export type {
  Pokemon,
  CardProps,
  PaginationProps,
  NavBarProps,
  UserStoreProps,
  UserContextProps,
  ProtectedRouteProps,
  ProfileData,
  SetProfileData,
  GetProfileData,
  UserStoreAction,
  UserStoreReducerFunction
};
