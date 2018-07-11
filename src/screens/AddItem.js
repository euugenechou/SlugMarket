/* React imports */
import React from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Button,
  ScrollView
} from "react-native";

export default class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      itemName: "",
      price: "",
      timeAdded: "",
      category: "",
      description: "",
    };
  }

  onChangeText(key, value) {
    this.setState({
      [key]: value
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.container}
          centerContent={true}
        >
          <TextInput
            onChangeText={value => this.onChangeText("itemName", value)}
            style={styles.input}
            placeholder="item name"
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            onChangeText={value => this.onChangeText("price", value)}
            style={styles.input}
            placeholder="price (USD)"
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            onChangeText={value => this.onChangeText("category", value)}
            style={styles.input}
            placeholder="category"
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            onChangeText={value => this.onChangeText("description", value)}
            style={styles.input}
            placeholder="description"
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoCorrect={true}
          />
          <Button
            style={{
              flex: 2,
              justifyContent: 'center',
            }}
            color='black'
            onPress={() => console.log("adding item")}
            title="Add Item!"
          >
          </Button>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    color: "black",
    borderBottomWidth: 2,
    borderBottomColor: "teal",
    margin: 10,
    width: 300
  },
  box: {
    height: 100,
    width: 300,
    borderColor: "gray",
    borderWidth: 3
  },
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "white",
    alignItems: "center"
  },
  titleText: {
    fontSize: 36,
    padding: 50,
    color: "teal"
  }
});