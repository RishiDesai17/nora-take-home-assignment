import React from 'react';
import { Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Box } from "@/gluestack/ui/box";
import ArtistInfo from '@/components/ArtistInfo';
import AlbumInfo from '@/components/AlbumInfo';

type Props = {
  route: any;
  navigation: any;
};

const TrackDetailsScreen = ({ route, navigation }: Props) => {
  const { track } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Box style={styles.container}>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"< Back"}</Text>
        </TouchableOpacity>

        <Image source={{ uri: track.album.cover_big }} style={styles.trackImage} />

        <Text style={styles.trackTitle}>{track.title}</Text>
        <Text style={styles.artistName}>{track.artist.name}</Text>

        <Box style={styles.infoRowContainer}>
          <Box style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Duration:</Text>
            <Text style={styles.infoText}>{formatDuration(track.duration)}</Text>
          </Box>
          <Box style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Rank:</Text>
            <Text style={styles.infoText}>{track.rank}</Text>
          </Box>
        </Box>

        <AlbumInfo album={track.album} />

        <ArtistInfo artist={track.artist} />
      </Box>
    </ScrollView>
  );
};

const formatDuration = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 30,
    backgroundColor: '#121212',
  },
  container: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#181818',
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 30,
    padding: 10,
  },
  backButtonText: {
    color: '#1DB954',
    fontSize: 20,
    fontWeight: 'bold',
  },
  trackImage: {
    width: 260,
    height: 260,
    borderRadius: 15,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#fff',
  },
  trackTitle: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  artistName: {
    fontSize: 22,
    color: '#B3B3B3',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  infoRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center",
    width: '100%',
    marginTop: 10,
    marginBottom: 25,
  },
  infoContainer: {
    width: '45%',
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  infoTitle: {
    fontSize: 22,
    color: '#1DB954',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 25,
  },
  previewContainer: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  previewTitle: {
    fontSize: 22,
    color: '#1DB954',
    marginBottom: 20,
  },
});

export default TrackDetailsScreen;
