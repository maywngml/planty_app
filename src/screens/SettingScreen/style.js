import React from "react";
import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'; 
import Colors from '../../../styles/colors' 

 // css
 const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        // padding: wp('5%'), 
        marginBottom: hp('2%'),
        alignItems: "center",
        // paddingHorizontal: wp('3%'),
        backgroundColor: 'white'
    }, 

    content: { 
        flex: 10,
        width: "100%", 
        height: "100%", 
        paddingHorizontal: wp('3%')
    },
    
    theme_btn : {
       borderWidth : 1,
       borderColor : Colors._10,
       width : 25,
       height : 25,
       backgroundColor : Colors._10,
       borderRadius : 50,
       right : wp('-79%'),
       alignItems : 'center'
      
    },

    theme_toggle : {
        alignItems : 'center',
        right : wp('-60%')
        
    },

    selectWeek : {
        flexDirection : 'row',
        alignItems : 'center',
        right : wp('-60%')     
    }
}) 


export default styles;