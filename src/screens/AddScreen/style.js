import React from "react";
import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'; 
import Colors from '../../../styles/colors' 
import common from '../../../styles/common'

 // css
 const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        backgroundColor: 'white', 
        alignItems: "center",
        marginBottom: hp('2%'),
        paddingHorizontal: wp('3%')
        // padding: wp('5%')
    }, 
    nav: { 
        flex: 1,
        width: wp('100%'), 
        height: wp('100%'), 
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginLeft: wp('1%'),
        marginTop: hp('1%'),
        paddingTop: wp('3%')
   
    }, 
    mainText: { 
        flex: 1.3,
        width: wp('100%'), 
        height: wp('100%'),
        paddingHorizontal: wp('3%') 
    }, 

    content: { 
        flex: 8,
        width: "100%", 
        height: "100%",
        flexDirection: 'column',
    },

    content_element: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: hp('0.5%')
    },

    content_element_sub: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'flex-start',
        marginTop: hp('3%')
    },

    textForm: { 
        borderWidth: 0.6, 
        borderColor: '#888', 
        width: '100%', 
        paddingLeft: wp('2%'), 
        paddingRight:wp('2%'), 
        marginBottom: 5,
        paddingVertical:hp('3%'),
        justifyContent:'center'
       },

    descriptionForm: {
        marginLeft: wp('3%'),
        borderBottomColor: Colors.gray,
        borderBottomWidth:0.7,
        width:wp('80%'),
        paddingVertical:1
    },

    tab_btn:{
        borderRadius:50,
        borderWidth:1,
        borderColor: Colors.darkPrimary,
        padding:wp('2%'),
        width:wp('20%'),
        height:hp('5%'),
        backgroundColor:Colors.darkPrimary,
        marginLeft: wp('2.5%')
    },  

    on:{
        color: "white",
        backgroundColor: Colors.darkPrimary,
        textAlign: 'center'
    },

    off:{
        color: Colors.darkPrimary,
        backgroundColor: "white",
        textAlign: 'center'
    }

}) 


export default styles;