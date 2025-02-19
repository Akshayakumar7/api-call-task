import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { style } from "../utils/GeneralStyle";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slice/allListSlice";

const SearchScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backupData, setBackupData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [largePlanet, setLargePlanet] = useState("");
  const [fontSize, setFontSize] = useState([]);
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetch("https://swapi.dev/api/planets");
      const updatedData = await data.json();
      setListData(updatedData?.results ?? []);
      setBackupData(updatedData?.results ?? []);
      dispatch(addUser(updatedData?.results));
      setLoading(false);
    } catch (error) {
      console.log("error", error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const getLargePlanetCount = () => {
    const list = listData?.map((item) => item?.population.slice(0, 2));
    console.log("largePlanet", list);
    setFontSize(list ?? []);
    // console.log("list", list);
    let maxCount = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i] != "unknown") {
        if (parseInt(list[i]) > maxCount) {
          maxCount = parseInt(list[i]);
        }
      }
    }
    setLargePlanet(maxCount);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (listData && !loading) {
      getLargePlanetCount();
    }
  }, [listData]);

  const EmptyList = () => {
    return (
      <View>
        <Text style={styles.noDataTextStyle}>No Data Available</Text>
      </View>
    );
  };

  const renderListData = (item, index) => {
    return (
      <View key={item?.created} style={styles.cardStyle}>
        <Text
          style={[
            fontSize[index] != "unknown"
              ? { fontSize: parseInt(fontSize[index]) }
              : { fontSize: 12 },
          ]}
          numberOfLines={1}
        >
          {"Name : "}
          {item?.name}
        </Text>

        <Text
          style={[
            fontSize[index] != "unknown"
              ? { fontSize: parseInt(fontSize[index]) }
              : { fontSize: 12 },
          ]}
        >
          {"population : "}
          {item?.population}
        </Text>
      </View>
    );
  };

  const onChangeSearchText = (e) => {
    setSearchText(e);
    if (e !== "") {
      const filerData = listData?.filter((item) =>
        item?.name?.toLowerCase()?.includes(e?.toLowerCase())
      );
      setListData(filerData);
    } else {
      setListData(backupData);
    }
  };
  return (
    <View style={style.mainView}>
      <TextInput
        placeholder="Search"
        style={style.textinputStyle}
        onChangeText={(e) => onChangeSearchText(e)}
        value={searchText}
      />
      <View style={style.itemDivider} />
      <Button
        title="Check Redux Data"
        onPress={() => navigation.navigate("storedReduxData")}
      />
      <View style={style.itemDivider} />
      {!loading ? (
        <FlatList
          data={listData}
          keyExtractor={(item) => item?.created}
          renderItem={({ item, index }) => renderListData(item, index)}
          ListEmptyComponent={<EmptyList />}
          initialNumToRender={10}
        />
      ) : (
        <View>
          <ActivityIndicator size={"large"} />
        </View>
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  cardStyle: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: "90%",
    alignSelf: "center",
  },
  listItemTextStyle: {
    margin: 5,
  },
  noDataTextStyle: {
    margin: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  largeTextStye: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
