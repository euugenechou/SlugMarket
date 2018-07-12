/* React imports */
import React, { Component } from "react";
import {
  SafeAreaView,
  AppRegistry,
  Text,
  View,
  ListView,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import { Title } from "native-base";
import EditProfile from "../EditProfile";

const items = [
  { name: "Edit account" },
  { name: "Edit profile" },
  { name: "Change password" },
  { name: "Notifications (?)" }
];

export default class ListViewComponent extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      itemsDataSource: ds.cloneWithRows(items)
    };
    this.pressRow = this.pressRow.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }
  pressRow(rowId) {
    console.log("Row" + rowId + "Pressed...");
  }
  renderRow(items, sectionId, rowId, highlightRow) {
    return (
      <TouchableHighlight
        onPress={() => {
          this.pressRow(rowId);
          highlightRow(sectionId, rowId);
        }}
      >
        <View style={styles.row}>
          <Text style={styles.text}>{items.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: "white", paddingTop: 10 }}>
            <Title style={styles.settigns}> Settings </Title>
          </View>
        </SafeAreaView>
        <ListView
          dataSource={this.state.itemsDataSource}
          renderRow={this.renderRow}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  settings:{
    flex: 1,
    fontSize: 30, 
    justifyContent: 'left',
  },
  row: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f6f6f6",
    marginBottom: 8
  },
  text: {
    flex: 1
  }
});
AppRegistry.registerComponent("ListViewComponent", () => ListViewComponent);
