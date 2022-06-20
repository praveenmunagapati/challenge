import React, {createContext, useState} from 'react';

export interface ContextState {
  // set the type of state you want to handle with context
  searchQuery: string;
  searchTitle: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSearchTitle: React.Dispatch<React.SetStateAction<string>>
}

export const SearchContext = createContext({} as ContextState);

const SearchContextProvider = (props:any) => {
  const [searchQuery, setSearchQuery] = useState('fiction');
  const [searchTitle, setSearchTitle] = useState('Fiction');
  return (
    <SearchContext.Provider value={{ searchQuery, searchTitle, setSearchQuery, setSearchTitle }}>
      {props.children}
    </SearchContext.Provider>
  )
};

export default SearchContextProvider;