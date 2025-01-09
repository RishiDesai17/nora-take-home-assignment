import { Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Box } from "@/gluestack/ui/box";

type Props = {
  navigation: any;
  track: Track;
}

const TrackTile = ({ navigation, track }: Props) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Track Details', { track })} activeOpacity={0.7} style={{ margin: 5 }}>
      <Box style={styles.container}>
        <Image source={{ uri: track.album.cover }} style={styles.image} />
        <Box style={{ marginLeft: 20 }}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{track.title}</Text>
          <Text style={styles.artistName}>{track.artist.name}</Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    padding: 4,
    borderRadius: 8,
    width: "80%"
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
    marginVertical: 2,
    overflow: "hidden",
  },
  artistName: {
    fontSize: 16,
    color: "white",
    marginVertical: 2
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5
  }
});

export default TrackTile;