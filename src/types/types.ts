import { Dispatch, PropsWithChildren, Reducer, ReducerAction, ReducerState } from 'react';


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
  userUid: string | undefined;
  userName: string | undefined;
  userLastName: string | undefined;
  userPicUrl: string | undefined;
}

interface UserContextProps {
  currentUserID: string | undefined;
  setCurrentUserID: (email: string | undefined) => void;
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
  };
  lastName: {
    lastName: string;
  };
  imageUrl: {
    imageUrl: string;
  };
};

type UserStoreAction = {
  type: 'setUserUid' | 'setUserName' | 'setUserPicUrl' | 'setUserLastName';
  payload: string | undefined;
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
