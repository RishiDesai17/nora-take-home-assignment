import { useState } from 'react';
import { TextInput, Text, StyleSheet } from "react-native";
import { DebouncedFuncLeading } from 'lodash';
import { Box } from '@/gluestack/ui/box';
import { Input, InputField } from '@/gluestack/ui/input';

type Props = {
  handleSearch: DebouncedFuncLeading<(query: string) => void>
}

const SearchBar = ({ handleSearch }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");

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
    backgroundColor: '#666666', // Input field background for a subtle contrast
    color: '#ffffff', // White text for better visibility
    borderRadius: 10,
    fontSize: 18,
    height: 55,
    paddingLeft: 12
  },
});

export default SearchBar;