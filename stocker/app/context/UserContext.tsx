import { createContext, useContext, useState } from 'react';
import { User } from '../types';

// Initialize profileDetails
const initialProfileDetails = {
	'name': undefined,
	'riskTolerance': undefined,
	'sector': undefined,
	'investmentHorizon': undefined};
const profileDetails = { ...initialProfileDetails }; // Create a mutable reference

export type UserContextType = {
    userDetails: User;
    setUserDetails: (userDetails: User) => void;
    profileDetails: typeof profileDetails; // Add profile details to the context
    storeProfileDetails: (endpoint: string, values: any) => void; // Function to store profile details
};

export const UserContext = createContext<UserContextType>({
    userDetails: "John Doe",
    setUserDetails: () => {},
    profileDetails,
    storeProfileDetails: () => {}, // Default implementation
});

// Context provider component
export const UserProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState<User>("John Doe"); // Initialize userDetails state

    // Function to update profile details
    const storeProfileDetails = (endpoint, values) => {
        // Store details in the mutable profileDetails object
        profileDetails[endpoint] = values;
    };

    return (
        <UserContext.Provider value={{ userDetails, setUserDetails, profileDetails, storeProfileDetails }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
