import React, { createContext, useContext, useState, ReactNode } from 'react';

type FavoritesContextType = {
  favorites: Set<number>;
  addFavorite: (trackId: number) => void;
  removeFavorite: (trackId: number) => void;
  isInFavorites: (trackId: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

type FavoritesProviderProps = {
  children: ReactNode;
};

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const addFavorite = (trackId: number) => {
    setFavorites((prevFavorites) => new Set(prevFavorites).add(trackId));
  };

  const removeFavorite = (trackId: number) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = new Set(prevFavorites);
      updatedFavorites.delete(trackId);
      return updatedFavorites;
    });
  };

  const isInFavorites = (trackId: number) => {
    return favorites.has(trackId);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isInFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
