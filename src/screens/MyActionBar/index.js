import React from 'react';
import {Component} from 'react'; 
// import { 
//      ActionBar
// } from 'react-native'; 
import { Appbar } from 'react-native-paper';
import styles from './style';
import {DrawerActions} from '@react-navigation/native';

export default class MyActionBar extends Component{ 

// functions
constructor(props) {
    super(props);
   
    console.log("action: ",props);
    this.state = {
        back : this.props.back
    }
   
}

    /*
        name:  gotoSideNav
        description: show Setting Nav
    */
    gotoSideNav = () => {
         if(!this.state.back) this.props.prev.navigation.dispatch(DrawerActions.toggleDrawer());
         else this.props.prev.navigation.navigate("Support");
    }

     render(){ 
        //  const title = this.state;
        //  alert(title);
         return ( 
                <Appbar.Header
                    style = {styles.bar}
                >
                <Appbar.BackAction
                    color = "#fff"
                    size = {35}
                    onPress = {() => this.gotoSideNav(this)}  />
                <Appbar.Content
                    title = {this.props.title}
                    titleStyle = {styles.barText}
                    // style = {styles.barText}
                />
            </Appbar.Header>     
         ); 
     } 
 } 