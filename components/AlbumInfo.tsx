import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type AlbumInfoProps = {
  album: Album;
};

const AlbumInfo = ({ album }: AlbumInfoProps) => {
  return (
    <View style={styles.albumContainer}>
      <Text style={styles.albumTitle}>Album</Text>
      <Image source={{ uri: album.cover_medium }} style={styles.albumImage} />
      <Text style={styles.albumName}>{album.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  albumContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 50,
  },
  albumTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
    color: 'white'
  },
  albumName: {
    fontSize: 22,
    color: '#B3B3B3',
    marginBottom: 20,
    textAlign: 'center',
  },
  albumImage: {
    width: 160,
    height: 160,
    borderRadius: 15,
    marginBottom: 20,
  },
});

export default AlbumInfo;
