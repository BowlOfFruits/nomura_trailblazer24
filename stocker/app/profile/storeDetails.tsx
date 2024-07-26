'use client';
import { profileDetails as initialProfileDetails } from './page';

// Function to save the details to localStorage
const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

// Function to load details from localStorage
const loadFromLocalStorage = (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : {};
};

// Load initial profile details from localStorage
const storedProfileDetails = loadFromLocalStorage('profileDetails');

// Initialize profileDetails with a fallback to an empty object if necessary
export const profileDetails = { ...initialProfileDetails, ...storedProfileDetails };

// StoreDetails function to save the updated details
export const storeDetails = (endpoint, values) => {
    // Store details in the local dictionary
    profileDetails[endpoint] = values;

    // Save updated details to localStorage
    saveToLocalStorage('profileDetails', profileDetails);
    
    return Promise.resolve({ success: true });
};
