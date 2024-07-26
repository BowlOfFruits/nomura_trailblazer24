import { createContext, useContext } from 'react';
import { User } from '../types';

export type UserContextType = {
	userDetails: User;
	setUserDetails: (userDetails: User) => void;
};

export const UserContext = createContext<UserContextType>({
	userDetails: "cyc",
	setUserDetails: () => {}
});
export const useUser = () => useContext(UserContext);
