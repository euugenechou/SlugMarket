/* React imports */
import React, { Component } from "react";
import {
  SafeAreaView,
  AppRegistry,
  Text,
  View,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Image,
  Alert
} from "react-native";
import SettingsList from 'react-native-settings-list';
import { Title } from "native-base";
import EditProfile from "../EditProfile";

const items = [
  { name: "Edit account" },
  { name: "Edit profile" },
  { name: "Change password" },
  { name: "Notifications (?)" }
];

export default class ListViewComponent extends Component {
  constructor(){
    super();
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {switchValue: false};
  }

  render() {
    return (
      <View style={{backgroundColor:'white',flex:1}}>
        <View style={{flex:1, marginTop:50}}>
          <SettingsList>
            <SettingsList.Item
              icon={
                <View style={{height:30,marginLeft:10,alignSelf:'center'}}>
                  <Image style={{alignSelf:'center',height:40, width:40}} source={require("../../assets/darrell.png")}/>
                </View>
              }
              itemWidth={50}
              title='Darrell Long'
            />
            <SettingsList.Item
              hasNavArrow={false}
              switchState={this.state.switchValue}
              switchOnValueChange={this.onValueChange}
              hasSwitch={true}
              title='Dark Mode'/>
            <SettingsList.Header headerText='Different Grouping' headerStyle={{color:'white', marginTop:50}}/>
            <SettingsList.Item  
              title='Profile'
              hasNavArrow={true}
              arrowStyle={{tintColor:'blue'}}/>
            <SettingsList.Item 
              title='Edit location'
              hasNavArrow={true}
              arrowStyle={{tintColor:'blue'}}
              onPress = {() => {Alert.alert('Change location')}}/>
            <SettingsList.Item
              title='Edit description'
              hasNavArrow={true}
              arrowStyle={{tintColor:'blue'}}
              onPress = {() => {Alert.alert('Change Description')}}/> 
            <SettingsList.Header headerText='Authors' headerStyle={{color:'white', marginTop:50}}/>
            <SettingsList.Item
              title='Authors'
              arrowStyle={{tintColor:'blue'}}
              />
              
          </SettingsList>
        </View>
      </View>
    );
  }
  
  onValueChange(value){
    this.setState({switchValue: value});
  }
}
//   constructor() {
//     super();
//     const ds = new ListView.DataSource({
//       rowHasChanged: (r1, r2) => r1 !== r2
//     });
//     this.state = {
//       itemsDataSource: ds.cloneWithRows(items)
//     };
//     this.pressRow = this.pressRow.bind(this);
//     this.renderRow = this.renderRow.bind(this);
//   }
//   pressRow(rowId) {
//     console.log("Row" + rowId + "Pressed...");
//   }
//   renderRow(items, sectionId, rowId, highlightRow) {
//     return (
//       <TouchableHighlight
//         onPress={() => {
//           this.pressRow(rowId);
//           highlightRow(sectionId, rowId);
//         }}
//       >
//         <View style={styles.row}>
//           <Text style={styles.text}>{items.name}</Text>
//         </View>
//       </TouchableHighlight>
//     );
//   }

//   render() {
//     return (
//       <View>
//         <SafeAreaView style={{ flex: 1 }}>
//           <View style={{ flex: 1, backgroundColor: "white", paddingTop: 10 }}>
//             <Title style={styles.settigns}> Settings </Title>
//           </View>
//         </SafeAreaView>
//         <ListView
//           dataSource={this.state.itemsDataSource}
//           renderRow={this.renderRow}
//         />

//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  settings:{
    flex: 1,
    fontSize: 30, 
    justifyContent: 'flex-start',
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

