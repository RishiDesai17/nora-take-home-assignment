import { useState, useCallback, useRef } from 'react';
import { FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { Box } from "@/gluestack/ui/box";

import { throttle } from 'lodash';

import { MUSIC_SERVICE_BASE_URL, TRACK_COUNT_LIMIT_PER_CALL, THROTTLE_DELAY_MILLISECONDS } from '@/constants';

import SearchBar from '@/components/SearchBar';
import TrackTile from '@/components/TrackTile';

const SearchScreen = ({ navigation }: any) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const limit = useRef(TRACK_COUNT_LIMIT_PER_CALL);
  const totalQueryResults = useRef(0);

  const fetchData = async (query: string, newQuery: boolean) => {
    try {
      let trimmedQuery = query.trim()
      if (!trimmedQuery) {
        setTracks([]);
        return;
      }
      setLoading(true);
      let index = tracks.length - 1;
      if (newQuery) {
        index = 0;
      }
      const response = await axios.get(`${MUSIC_SERVICE_BASE_URL}/search?q=${trimmedQuery}&index=${index}&limit=${limit.current}`);
      totalQueryResults.current = response.data.total;
      if (newQuery) {
        setTracks(response.data.data);
      }
      else {
        setTracks([...tracks, ...response.data.data]);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleSearch = useCallback(
    throttle((query: string) => {
      fetchData(query, true);
    }, THROTTLE_DELAY_MILLISECONDS),
    []
  );

  return (
    <Box style={styles.container}>

      <SearchBar handleSearch={handleSearch} />

      <FlatList
        data={tracks}
        renderItem={({ item: track } : { item: Track }) => (
          <TrackTile navigation={navigation} track={track} />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={loading ? <ActivityIndicator size="small" /> : null}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    flex: 1,
    padding: 4
  }
});

export default SearchScreen;
