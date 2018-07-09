import React, {Component} from 'react';
import {AppRegistry, Text, View, ListView, StyleSheet, TouchableHighlight} from 'react-native';

const items = [
    {name: 'Edit account'},
    {name: 'Edit profile'},
    {name: 'Change password'},
    {name: 'Notifications (?)'}
];

export default class ListViewComponent extends Component{
    constructor(){
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            itemsDataSource: ds.cloneWithRows(items)
        }
        this.pressRow = this.pressRow.bind(this);
        this.renderRow = this.renderRow.bind(this);

    }
    pressRow(rowId){
        console.log('Row' + rowId + 'Pressed...');
    }
    renderRow(items, sectionId, rowId, highlightRow){
        return(
            <TouchableHighlight onPress={() => {
                this.pressRow(rowId);
                highlightRow(sectionId, rowId)
            }}>
                <View style = {styles.row}>
                    <Text style={styles.text}>{items.name}</Text>
                </View>
            </TouchableHighlight>
        ); 
    }

    render(){
        return(
        <ListView 
            dataSource = {this.state.itemsDataSource}
            renderRow = {this.renderRow}
        />
        )
    }
}

const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 80, 
        backgroundColor: '#f6f6f6',
        marginBottom: 8

    },
    text:{
        flex:1
    }
});
AppRegistry.registerComponent('ListViewComponent', () => ListViewComponent);