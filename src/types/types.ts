import { Dispatch, PropsWithChildren } from 'react';


interface CardProps extends PropsWithChildren {
  pokemon: string;
  id: string;
}

interface PaginationProps extends PropsWithChildren {}

interface NavBarProps extends PropsWithChildren {}

interface ProtectedRouteProps extends PropsWithChildren {
  authorizedUser: string | null | undefined;
}

interface ProfileData {
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}

interface UserStoreProps {
  userUid: string | null;
  userName: string | null;
  userLastName: string | null;
  userPicUrl: string | null;
}

interface UserContextProps {
  currentUserID: string | null;
  setCurrentUserID: (email: string | null) => void;
}

type Pokemon = {
  name: string;
  url: string;
};

type SetProfileData = (
  firstName: string | null,
  lastName: string | null,
  imageUrl: string | null,
  userUid: string | null
) => void;

type GetProfileData = {
  firstName: {
    firstName: string | null;
  };
  lastName: {
    lastName: string | null;
  };
  imageUrl: {
    imageUrl: string | null;
  };
};

type UserStoreAction = {
  type: 'setUserUid' | 'setUserName' | 'setUserPicUrl' | 'setUserLastName' | 'signOutClear';
  payload: string | null ;
};

type UserStoreReducerFunction = {
  (state: UserStoreProps, action: UserStoreAction): UserStoreProps;
};

type UserStoreContextProps = {
  userStore: UserStoreProps;
  dispatch: Dispatch<UserStoreAction>;
};

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
  UserStoreReducerFunction,
  UserStoreContextProps,
};
