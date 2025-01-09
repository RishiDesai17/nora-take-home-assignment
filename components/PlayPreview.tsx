import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';

type PlayPreviewProps = {
  previewUrl: string;
};

const PlayPreview = ({ previewUrl }: PlayPreviewProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const sound = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    return () => {
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, []);

  const handlePlayPause = async () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (sound.current) {
        await sound.current.pauseAsync();
      }
    } else {
      if (!sound.current) {
        sound.current = new Audio.Sound();
        try {
          await sound.current.loadAsync(
            { uri: previewUrl },
            { shouldPlay: true }
          );
          sound.current.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded && status.didJustFinish) {
              setIsPlaying(false);
              sound.current?.unloadAsync();
              sound.current = null;
            }
          });
        } catch (error) {
          console.error('Error loading audio:', error);
        }
      } else {
        await sound.current.playAsync();
      }
      setIsPlaying(true);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePlayPause}>
        <View style={styles.ring}>
          <Text style={styles.buttonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.previewText}>Preview</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: '#1DB954',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  ring: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 5,
    borderColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    opacity: 0.6
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
  },
  previewText: {
    color: "white",
    marginTop: 12,
    fontSize: 17
  }
});

export default PlayPreview;
