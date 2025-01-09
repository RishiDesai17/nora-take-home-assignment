import { Dispatch, SetStateAction } from 'react';
import { StyleSheet } from "react-native";
import { DebouncedFuncLeading } from 'lodash';
import { Box } from '@/gluestack/ui/box';
import { Input, InputField } from '@/gluestack/ui/input';

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>,
  handleSearch: DebouncedFuncLeading<(query: string) => void>
}

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch } : SearchBarProps) => {

  return (
    <Box style={styles.container}>
      <Input variant="outline" size="md" style={{ width: "100%" }}>
        <InputField
          placeholder="Search for songs..."
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            handleSearch(text);
          }}
          placeholderTextColor="#000000"
          style={styles.inputField}
        />
      </Input>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  inputField: {
    backgroundColor: '#666666',
    color: '#ffffff',
    borderRadius: 10,
    fontSize: 18,
    height: 55,
    paddingLeft: 12
  },
});

export default SearchBar;