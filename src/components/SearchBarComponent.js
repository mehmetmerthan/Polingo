import React from "react";
import { SearchBar } from "@rneui/themed";
import styles from "../styles/dictionaryStyles";

export const SearchBarComponent = ({ searchTerm, setSearchTerm }) => {
  return (
    <SearchBar
      placeholder="Search a word..."
      onChangeText={setSearchTerm}
      value={searchTerm}
      platform="android"
      containerStyle={styles.searchBar}
    />
  );
};
