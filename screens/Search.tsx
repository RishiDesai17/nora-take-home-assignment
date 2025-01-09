import { useState, useCallback, useRef } from 'react';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import { Box } from "@/gluestack/ui/box";

import { throttle } from 'lodash';

import { MUSIC_SERVICE_BASE_URL, TRACK_COUNT_LIMIT_PER_CALL, THROTTLE_DELAY_MILLISECONDS } from '@/constants';

import SearchBar from '@/components/SearchBar';
import TrackList from '@/components/TrackList';

const SearchScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
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
      let index = tracks.length;
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
      alert("Unable to fetch songs, Please try again later");
    }
    setLoading(false);
  };

  const handleSearch = useCallback(
    throttle((query: string) => {
      fetchData(query, true);
    }, THROTTLE_DELAY_MILLISECONDS),
    []
  );

  const handleEndReached = () => {
    if (tracks.length < totalQueryResults.current) {
      fetchData(searchQuery, false);
    }
  };

  return (
    <Box style={styles.container}>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <TrackList
        tracks={tracks}
        loading={loading}
        handleEndReached={handleEndReached}
        navigation={navigation}
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
