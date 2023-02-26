import React from 'react';

export const USER_ID = 'USER_ID';

export const AuthContext = React.createContext({
  handleAfterSignIn: () => {},
  handleAfterSignOut: () => {},
});

export const USER_COLLECTION = 'user';

export type AppRouteParamList = {
  //Home: undefined; // undefined means Home route doesn't have route parameters
  VerifyPage: {email: string} | undefined;
};
