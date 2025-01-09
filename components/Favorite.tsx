import { useFavorites } from '@/context/FavoritesContext';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

type FavoriteProps = {
  trackId: number;
}

const Favorite = ({ trackId }: FavoriteProps) => {
  const { favorites, isInFavorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = isInFavorites(trackId);
  console.log("favorites", favorites);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(trackId);
    }
    else {
      addFavorite(trackId);
    }
  }

  return (
    <TouchableOpacity onPress={toggleFavorite}>
      <Ionicons
        name={isFavorite ? 'heart' : 'heart-outline'}
        size={32}
        color={isFavorite ? 'red' : 'white'}
      />
    </TouchableOpacity>
  );
}

export default Favorite;