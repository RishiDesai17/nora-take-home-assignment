import React from 'react';
import { View, Text, Image, StyleSheet, Linking } from 'react-native';

type Props = {
  artist: Artist;
};

const ArtistInfo = ({ artist }: Props) => {
  return (
    <View style={styles.artistInfoContainer}>
      <Text style={styles.artistInfoTitle}>About the Artist:</Text>
      <View style={styles.artistDetails}>
        <Image source={{ uri: artist.picture_medium }} style={styles.artistImage} />
        <Text style={styles.artistName}>{artist.name}</Text>
        <Text style={styles.artistBio}>
          <Text style={styles.linkText} onPress={() => Linking.openURL(artist.link)}>{artist.link}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  artistInfoContainer: {
    width: '100%',
    marginBottom: 40,
  },
  artistInfoTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  artistDetails: {
    alignItems: 'center',
    marginBottom: 25,
  },
  artistImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 20,
  },
  artistName: {
    fontSize: 22,
    color: 'white',
    marginBottom: 15,
  },
  artistBio: {
    fontSize: 18,
    color: '#B3B3B3',
  },
  linkText: {
    color: '#1DB954',
    textDecorationLine: 'underline',
  },
  noBioText: {
    fontSize: 18,
    color: '#B3B3B3',
  },
});

export default ArtistInfo;
