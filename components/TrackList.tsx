import { memo } from 'react';
import { FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import TrackTile from '@/components/TrackTile';

type TrackListProps = {
  tracks: Track[];
  loading: boolean;
  handleEndReached: () => void;
  navigation: any;
}

const TrackList = ({ tracks, loading, handleEndReached, navigation }: TrackListProps) => {
  return (
    <FlatList
      data={tracks}
      renderItem={({ item: track } : { item: Track }) => (
        <TrackTile navigation={navigation} track={track} />
      )}
      keyExtractor={(_, idx) => idx.toString()}
      onEndReached={handleEndReached}
      onEndReachedThreshold={1}
      ListFooterComponent={loading ? <ActivityIndicator size="large" color="#1DB954" /> : null}
    />
  )
}

export default memo(TrackList);