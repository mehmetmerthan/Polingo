import React from "react";
import { SearchBar } from "@rneui/themed";
import styles from "../../styles/wordsStyles";

export const SearchBarComponent = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
}) => {
  return (
    <SearchBar
      placeholder="Search a word..."
      onChangeText={(text) => {
        setSearchTerm(text);
        handleSearch(text);
      }}
      value={searchTerm}
      platform="android"
      containerStyle={styles.searchBar}
    />
  );
};
