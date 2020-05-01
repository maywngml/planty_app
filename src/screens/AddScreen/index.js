//addscreen-index
import React from 'react';
import { Component, useState } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    TouchableHighlight,
    Picker,
    TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../styles/colors';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ReactNativePickerModule from 'react-native-picker-module';
/* import { TouchableOpacity } from 'react-native-gesture-handler'; */
import ScrollPicker from 'react-native-wheel-scroll-picker';
import { Calendar } from 'react-native-calendars';

import { getApi, postApi, getDateString } from '../../common/common'

//styles
import common from '../../../styles/common';
import styles from './style';
import { RotationGestureHandler } from 'react-native-gesture-handler';

// 시간을 저장하는 배열 생성
var hour_arr = new Array();
// 분을 저장하는 배열 생성
var minute_arr = new Array();

//현재 년도/월/일자/요일/시간 저장
var year, month, date, day, hour, minute;
// var am_pm, am_pm_i;

// 출력값 계산 결과
var result = {
    final_date: null,//최종 날짜
    am_pm: null,
    am_pm_i: null
}

export default class AddScreen extends Component {

    //datepicker 생성자 추가
    constructor() {
        super();

        /*  selected: undefined */
        this.state = {
            CalendarModalVisible: false,
            ColorModalVisible: false,
            isVisible: false,
            selectedAlarm: '알림 안함',
            selectedRepeat: '반복 안함',
            theme_color: '#2980b9',
            final_date: null
        }

        //시간배열에 데이터 삽입
        for (var i = 0; i < 12; i++) {
            var j = String(i + 1)
            hour_arr.push(j)
        }

        //분배열에 데이터 삽입
        for (var i = 0; i < 59; i++) {
            var j = String(i + 1)
            minute_arr.push(j)
        }


        this.getCurrentDate();

    }


    onDayPress = (day) => {
        this.setState({ selected: day.dateString });
    }


    // functions

    /*
       name:  gotoHomeScreen
       description: show Home Screen
   */
    gotoHomeScreen() {
        this.props.navigation.navigate("Home");
    }

    /*
        name:  gotoToDoScreen
        description: show ToDo Screen
    */
    gotoToDoScreen() {
        this.props.navigation.navigate("ToDo");
    }

    /*
        name:  Back
        description: screen back,
    */
    Back() {
        // this.props.navigation.goBack(); // 로 하면 스택에 쌓인 할일/일정 페이지들이 나옴
        this.props.navigation.navigate("Home");
    }

    /*
       name:  toggleCalendarModal
       description: show Calendar modal
   */
    toggleCalendarModal = (flag, text) => {
        if (flag == 'fresh') this.getCurrentDate(); // 현재 날짜로 초기화
        // else if(flag == 'save'){
        //     this.setState({final_date: text})
        // }

        this.setState({ CalendarModalVisible: !this.state.CalendarModalVisible });
    }

    /*
        name:  toggleColorModal
        description: show color picker
    */
    toggleColorModal = () => {
        this.setState({ ColorModalVisible: !this.state.ColorModalVisible });
    }

    /*
        name:  setThemeColor
        description: set theme color
    */
    setThemeColor(Color) {
        this.state.theme_color = Color;
    }

    /*
    * @name: getCurrentDate
    * @description: 현재 날짜,시간으로 변수 초기화
    * @params: 
    * @history: 이지운
    */
    getCurrentDate() {
        //현재 년도 저장
        year = new Date().getFullYear();
        //현재 월 저장
        month = new Date().getMonth() + 1;
        //현재 일자 저장
        date = new Date().getDate();
        //현재 요일 저장
        day = new Date().getDay();
        //현재 시간 저장
        hour = new Date().getHours();
        //현재 분 저장
        minute = new Date().getMinutes();

        // 현재 출력날짜 저장
        result = getDateString(year, day, month, date, hour, minute, null);
        this.setState({ final_date: result.final_date }); // 출력날짜 상태 변경

        result.am_pm == '오전' ? result.am_pm_i = 0 : 1;


        // alert(final_date);
        // console.log("i: ",result.am_pm_i);
    }

    // AddScreen: 일정(0), 할일(1) (전달된 파라미터에 따라 다른 view 생성하기!!!)
    render() {
        //  const params = this.props.navigation.state;
        //  const itemId = params ? params.itemId : null;

        const { onValueChange } = this;


        return (

            <View style={styles.container}>
                <View style={styles.nav}>
                    <TouchableOpacity style={[styles.tab_btn, styles.on]}>
                        <Text style={styles.on}>일정</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tab_btn, styles.off]} onPress={this.gotoToDoScreen.bind(this)}>
                        <Text style={styles.off}>할일</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.mainText}>
                    <TextInput style={[common.font_small, styles.textForm]} placeholder={'일정을 입력하세요'}></TextInput>
                </View>
                <View style={styles.content}>
                    <View style={[styles.content_element, common.mt2]}>
                        <Text style={[common.font_mid, common.font_gray]}>시작일</Text>
                        <TouchableOpacity onPress={() => { this.toggleCalendarModal() }}>
                            <Text style={[common.font_mid, common.font_bold]}>{result.final_date}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content_element}>
                        <Text style={[common.font_mid, common.font_gray]}>종료일</Text>
                        <TouchableOpacity onPress={() => { this.toggleCalendarModal() }}>
                            <Text style={[common.font_mid, common.font_bold]}>{result.final_date}</Text>
                        </TouchableOpacity>

                        {/* select date Modal -- start -- */}
                        <Modal isVisible={this.state.CalendarModalVisible} onBackdropPress={() => { this.toggleCalendarModal('fresh') }}>
                            <View style={styles.modal_container}>
                                <View style={styles.modalheader}>
                                </View>
                                <View style={styles.modalyearmonth}>
                                    <TouchableHighlight  >
                                        <Text style={[common.font_title, { color: 'black' }, { fontSize: 30 }]}>{year}년{month}월</Text>
                                    </TouchableHighlight>
                                </View>
                                <View style={styles.modalCalendar}>
                                    <Calendar
                                        style={styles.calendar}
                                        hideExtraDays
                                        // 캘린더 날짜 선택 시, 해당 날짜로 year, month, date, day변수 변경
                                        onDayPress={(thisDay) => { this.onDayPress, year = thisDay.year, month = thisDay.month, date = thisDay.day, day = new Date(thisDay.dateString).getDay() }}
                                        markedDates={{
                                            [this.state.selected]: {
                                                selected: true,
                                                disableTouchEvent: true,
                                                selectedDotColor: "orange"
                                            }
                                        }}
                                    />

                                </View>
                                <View style={styles.modalHourContainer}>
                                    <View style={styles.modalAmPm} >
                                        <ScrollPicker
                                            dataSource={['오전', '오후']}
                                            selectedItem={result.am_pm} // 첫번째 인덱스는 무조건 선택 안됨.(시간, 분도 마찬가지)
                                            itemHeight={40}
                                            wrapperWidth={110}
                                            wrapperHeight={150}
                                            wrapperBackground={"white"}
                                            highlightColor={Colors.gray}
                                            highlightBorderWidth={1}
                                            activeItemColor={"white"}
                                            onValueChange={(data, selectedIndex) => {
                                                result.am_pm = data;
                                                result.am_pm_i = selectedIndex;
                                                alert(result.am_pm);
                                            }}
                                            itemColor={Colors.darkPrimary}
                                        />
                                    </View>
                                    <View style={styles.modalHour} >
                                        <ScrollPicker
                                            dataSource={hour_arr}
                                            selectedIndex={0}
                                            itemHeight={40}
                                            wrapperWidth={110}
                                            wrapperHeight={150}
                                            wrapperBackground={"white"}
                                            highlightColor={Colors.gray}
                                            highlightBorderWidth={1}
                                            activeItemColor={"white"}
                                            onValueChange={(data, selectedIndex) => {
                                                hour = data;
                                            }}
                                            itemColor={"red"}
                                        />
                                    </View>
                                    <View style={styles.modalMin} >
                                        <ScrollPicker
                                            dataSource={minute_arr}
                                            selectedIndex={minute - 1}
                                            itemHeight={40}
                                            wrapperWidth={110}
                                            wrapperHeight={150}
                                            wrapperBackground={"white"}
                                            highlightColor={Colors.gray}
                                            highlightBorderWidth={1}
                                            activeItemColor={"white"}
                                            onValueChange={(data, selectedIndex) => {
                                                minute = data;
                                            }}
                                            itemColor={Colors.darkPrimary}
                                        />
                                    </View>
                                </View>
                                <View style={styles.modalButton}>
                                    <View style={styles.modalCnButton}>
                                        <TouchableHighlight onPress={() => { this.toggleCalendarModal() }}>
                                            <Text style={[common.font_mid, { color: Colors.darkPrimary }, { marginTop: wp("2%") }]}>취소</Text>
                                        </TouchableHighlight>
                                    </View>
                                    <View style={styles.modalSvButton}>
                                        <TouchableHighlight onPress={() => {
                                            result = getDateString(year, day, month, date, hour, minute, result.am_pm);
                                            this.setState({ final_date: result.final_date });
                                            this.setState({ apiData: { end_date: result.final_date } })
                                            this.toggleCalendarModal()
                                        }}>
                                            <Text style={[common.font_mid, { color: Colors.darkPrimary }, { marginTop: wp("2%") }]} >저장</Text>
                                            {/* 변수 확인용:  onPress = {(e) => {alert("최종: "+year+"년"+month+ "월"+date+"일"+day+ "요일"+ hour+ "시"+ minute+ "분"+ result.am_pm)}}  */}
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </View>

                        </Modal>
                        {/* select date Modal -- end -- */}

                    </View>

                    <View style={styles.content_element_sub}>
                        {/* 아이콘 바꿔야 함 */}
                        <MIcon name="file-document-outline" size={30} color={Colors.gray}></MIcon>
                        <TextInput style={[common.font_small, styles.descriptionForm]} placeholder={'설명'}></TextInput>
                    </View>

                    <View style={styles.content_element_sub}>
                        <Icon name="ios-alarm" size={30} color={Colors.gray}></Icon>
                        {/*알람설정 부분*/}
                        <Picker
                            selectedValue={this.state.selectedAlarm}
                            style={{ height: 30, width: 370 }}
                            onValueChange={(itemValue, itemIndex) => this.setState({ selectedAlarm: itemValue })}
                        >
                            <Picker.Item label="설정안함" value="설정안함" />
                            <Picker.Item label="5분전" value="5분전" />
                            <Picker.Item label="10분전" value="10분전" />
                            <Picker.Item label="15분전" value="15분전" />
                            <Picker.Item label="30분전" value="30분전" />
                            <Picker.Item label="45분전" value="45분전" />
                            <Picker.Item label="1시간전" value="1시간전" />
                        </Picker>

                    </View>

                    <View style={styles.content_element_sub}>
                        <Icon name="ios-color-palette" size={30} color={Colors.gray}></Icon>
                        {/*색상설정 부분*/}
                        <TouchableOpacity title="Theme" style={[styles.theme_btn, { borderColor: this.state.theme_color }, { backgroundColor: this.state.theme_color }]} onPress={() => { this.toggleColorModal() }}>
                        </TouchableOpacity>
                        <Modal isVisible={this.state.ColorModalVisible} onBackdropPress={() => { this.toggleColorModal() }}>
                            <View style={styles.colormodal_container}>
                                <View style={styles.colorModalTitle}>
                                    <Text style={[common.font_mid, common.font_bold, common.mb1, { color: Colors.gray }]}>일정 색상 설정</Text>
                                </View>
                                <View style={styles.colorModalUp}>
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._0 }, { backgroundColor: Colors._0 }, { left: wp("4%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor('#e74c3c') }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._1 }, { backgroundColor: Colors._1 }, { left: wp("8%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor('#e67e22') }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._2 }, { backgroundColor: Colors._2 }, { left: wp("12%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor('#f1c40f') }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._3 }, { backgroundColor: Colors._3 }, { left: wp("16%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor('#f39c12') }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._4 }, { backgroundColor: Colors._4 }, { left: wp("20%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor('#FF8D78') }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._5 }, { backgroundColor: Colors._5 }, { left: wp("24%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor('#fde296') }} />

                                </View>
                                <View style={styles.colorModalDown}>
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._6 }, { backgroundColor: Colors._6 }, { left: wp("4%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor('#1abc9c') }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._7 }, { backgroundColor: Colors._7 }, { left: wp("8%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor('#2ecc71') }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._8 }, { backgroundColor: Colors._8 }, { left: wp("12%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor('#27ae60') }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._9 }, { backgroundColor: Colors._9 }, { left: wp("16%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor('#3498db') }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._10 }, { backgroundColor: Colors._10 }, { left: wp("20%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor('#2980b9') }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._11 }, { backgroundColor: Colors._11 }, { left: wp("24%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor('#0E2C40') }} />
                                </View>
                                <View style={styles.colorModalButton}>
                                    <TouchableOpacity onPress={() => this.toggleColorModal()}>
                                        <Text style={[common.font_mid, { color: Colors.darkPrimary }]}>취소</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>

                    </View>

                    <View style={styles.content_element_sub}>
                        <Icon name="ios-repeat" size={30} color={Colors.gray}></Icon>
                        {/*반복설정 부분*/}
                        <Picker
                            selectedValue={this.state.selectedRepeat}
                            style={{ height: 30, width: 370 }}
                            onValueChange={(itemValue, itemIndex) => this.setState({ selectedRepeat: itemValue })}
                        >
                            <Picker.Item label="반복안함" value="반복안함" />
                            <Picker.Item label="매일" value="매일" />
                            <Picker.Item label="매주" value="매주" />
                            <Picker.Item label="매월" value="매월" />
                            <Picker.Item label="매년" value="매년" />
                        </Picker>
                    </View>





                    <TouchableOpacity style={[common.addButton, { left: 10 }]}
                        underlayColor={Colors.clicked} onPress={this.gotoHomeScreen.bind(this)}>
                        <Text style={{ fontSize: 30, color: 'white' }}>X</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={common.addButton}
                        underlayColor={Colors.clicked} onPress={this.gotoHomeScreen.bind(this)}>
                        <Text style={{ fontSize: 30, color: 'white' }}>V</Text>
                    </TouchableOpacity>
                </View>
            </View>


        );
    }
} 