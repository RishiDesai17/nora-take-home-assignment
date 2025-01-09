import { useState, useCallback, useRef } from 'react';
import { Text, FlatList, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { Box } from "@/gluestack/ui/box";

import { MUSIC_SERVICE_BASE_URL } from '@/constants';

import { throttle } from 'lodash';
import SearchBar from '@/components/SearchBar';

const SearchScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const limit = useRef(20);
  const totalQueryResults = useRef(0);

  const fetchData = async (query: string, newQuery: boolean) => {
    try {
      console.log(query);
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
      // console.log(response);
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
    }, 1000),
    []
  );

  const handleEndReached = () => {
    if (totalQueryResults.current < tracks.length) {
      fetchData(searchQuery, false);
    }
  }

  return (
    <Box flex={1} p={4} style={{ backgroundColor: "#121212" }}>

      <SearchBar handleSearch={handleSearch} />

      
    </Box>
  );
};

const styles = StyleSheet.create({

});

export default SearchScreen;
