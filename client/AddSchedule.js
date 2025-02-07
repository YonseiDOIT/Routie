import React, { useEffect, useState, Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Modal, Button, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from 'react-native-picker-select';
import ScrollPicker from "react-native-wheel-scrollview-picker";
import Checkbox from 'expo-checkbox';
import { resetToMain } from './NavigationHelper';
import X from './assets/images/X.png'
import down from './assets/images/down.png'

// 오전/오후 + 1~12시 -> 24시간 숫자로 변환하는 함수
function convertTo24Hour(amPm, hour) {
    // amPm: '오전' or '오후', hour: 1~12
    let isAm = (amPm === '오전');
    
    if (isAm) {
      // 오전
      if (hour === 12) {
        return 0; // 오전 12시 = 0시
      } else {
        return hour; // 오전 1~11시
      }
    } else {
      // 오후
      if (hour === 12) {
        return 12; // 오후 12시 = 12시
      } else {
        return hour + 12; // 오후 1시 -> 13, 오후 2시 -> 14, ...
      }
    }
  }

export default function AddRoutin() {
    const navigation = useNavigation();
    const [text, setText] = useState('');
    const [isChecked, setChecked] = useState(false);
    const [selectedDays, setSelectedDays] = useState(Array(7).fill(false)); // 7개의 요일 상태 관리
    const toggleDay = (index) => {
        const updatedDays = [...selectedDays];
        updatedDays[index] = !updatedDays[index];
        setSelectedDays(updatedDays);
    };
    
    const handleReturnMain = () => {
        // resetToMain 함수를 호출하여 내비게이션 스택을 재설정합니다.
        resetToMain(navigation);
      };

    const categories = ['학교 프로그램', '운동', '자기계발', '생활', '식사' ];
    const [selectedCategory, setSelectedCategory] = useState(null);

    const itemsNotification = [
        { label: '있음', value: 'True' },
        { label: '없음', value: 'False' },
    ];
    const itemsColor = [
        { label: '오렌지', value: '#FF622A', color: '#FF622A' },
        { label: '민트', value: '#61CCBF', color: '#61CCBF' },
        { label: '옐로우', value: '#FFBC0E', color: '#FFBC0E' },
        { label: '퍼플', value: '#8C5DD0', color: '#8C5DD0' },
        { label: '네온핑크', value: '#FF3C8C', color: '#FF3C8C' },
        { label: '핑크', value: '#FD65DA', color: '#FD65DA' },
        { label: '블루', value: '#5254DC', color: '#5254DC' },
        { label: '레드', value: '#FF2D2D', color: '#FF2D2D' },
        { label: '그린', value: '#9EDA35', color: '#9EDA35' },
        { label: '브라운', value: '#9A5D2F', color: '#9A5D2F' },
    ];

    const [selectedValueNoti, setSelectedValueNoti] = useState(itemsNotification[1].value);
    const [selectedValueColor, setSelectedValueColor] = useState(itemsColor[0].value);
    
    const routie_Main = '#FF622A'
    const routie_01 = '#FFFFFF'
    const routie_02 = '#F5F1E9'
    const routie_03 = '#E7E3DC'
    const routie_04 = '#D0D0D0'
    const routie_05 = '#B8B8B8'
    const routie_06 = '#61605E'
    const routie_07 = '#2B2927'  
    const pointColor_01 = '#FF622A'  
    const pointColor_02 = '#61CCBF'  
    const pointColor_03 = '#FFBC0E'  
    const pointColor_04 = '#8C5DD0'  
    const pointColor_05 = '#FF3C8C'  
    const pointColor_06 = '#E554C3'  
    const pointColor_07 = '#5254DC'
    const pointColor_08 = '#FF8B2D'  
    const pointColor_09 = '#9EDA35'  
    const pointColor_10 = '#9A5D2F' 

    // 시작 시간
    const [amPmStart, setAmPmStart] = useState('오전');
    const [hourStart, setHourStart] = useState(1);

    // 모달 (시작 시간)
    const [startModalVisible, setStartModalVisible] = useState(false);
    const toggleStartModal = () => {
    setStartModalVisible(!startModalVisible);
    };

    // 종료 시간 (동일 패턴으로 구현 가능)
    const [amPmEnd, setAmPmEnd] = useState('오전');
    const [hourEnd, setHourEnd] = useState(2);

    // 모달 (종료 시간)
    const [endModalVisible, setEndModalVisible] = useState(false);
    const toggleEndModal = () => {
    setEndModalVisible(!endModalVisible);
    };

    // Wheel Picker에 전달할 데이터
    const amPmData = ['오전', '오후'];
    const hourData = Array.from({ length: 12 }, (_, i) => i + 1); // [1,2,3,...,12]

  return (
    <SafeAreaProvider>
        <SafeAreaView edges={[ 'top', 'bottom']} style={{ flex: 1, backgroundColor: '#F5F1E9'}}>
            <ScrollView style={{ flex: 1, backgroundColor: routie_01}} stickyHeaderIndices={[0]}>
                <View style={{paddingHorizontal: 20, backgroundColor: '#F5F1E9'}}>
                    <View style={{paddingVertical: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <TouchableOpacity style={{width: 24, height: 24, zIndex: 10}} onPress={handleReturnMain}>
                            <Image source={X} style={{width: 24, height: 24}}/>
                        </TouchableOpacity>
                        <Text style={[styles.text_header, { position: 'absolute', left: 0, right: 0, textAlign: 'center' }]}>일정 추가</Text>
                        <TouchableOpacity style={{backgroundColor: routie_03, paddingHorizontal: 15, height: 28, alignItems: 'center', justifyContent: 'center', borderRadius: 50}} onPress={handleReturnMain}>
                            <Text style={{fontFamily: 'Pretendard_Medium',fontSize: 14, color: routie_06}}>완료</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{paddingHorizontal: 20, paddingVertical: 12, backgroundColor: '#F5F1E9'}}>
                    <View style={styles.text_name}>
                        <TextInput
                            autoCapitalize="none"
                            style={{width: '90%'}}
                            placeholder='일정이름'
                            placeholderTextColor='#B8B8B8'
                            value={text} // 상태를 TextInput에 연결
                            onChangeText={setText} // 입력 시 상태 업데이트
                        />
                        <TouchableOpacity onPress={() => setText('')}>
                            <Image source={X} style={{width: 16, height: 16}}/>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* 설정 값 */}
                <View style={{paddingHorizontal: 20, paddingVertical: 12}}>
                    <Text style={{fontFamily: 'Pretendard_ExtraBold', fontSize: 16, color: routie_07, paddingVertical: 10}}>시간</Text>
                    <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between'}}>
                        <Text style={{fontFamily:'Pretendard_Medium', fontSize: 16, color: routie_06, width: '30%'}}>시작</Text>
                        <Text style={{fontFamily:'Pretendard_Medium', fontSize: 16, color: routie_06, width: '30%'}}>종료</Text>
                        <View style={{width: '30%'}}></View>
                    </View>
                    <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between', marginTop: 10, marginBottom: 22}}>
                        <TouchableOpacity style={styles.pickerBox} onPress={toggleStartModal}>
                            <Text style={styles.pickerText}>{`${amPmStart} ${hourStart}시`}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pickerBox} onPress={toggleEndModal}>
                            <Text style={styles.pickerText}>{`${amPmEnd} ${hourEnd}시`}</Text>
                        </TouchableOpacity>
                        <View style={{flexDirection: 'row', width: '30%', alignItems: 'center'}}>
                            <Checkbox
                                style={styles.checkbox}
                                value={isChecked}
                                onValueChange={setChecked}
                                color={isChecked ? routie_06 : undefined}
                            />
                            <Text style={{fontFamily:'Pretendard_Medium', fontSize: 16, color: routie_06, marginLeft: 8}}>매주</Text>
                        </View>
                    </View>
                    <Text style={{fontFamily: 'Pretendard_ExtraBold', fontSize: 16, color: routie_07, paddingVertical: 10}}>요일</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22}}>
                        {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => (
                            <TouchableOpacity
                            key={index}
                            style={[
                                styles.day,
                                {
                                backgroundColor: selectedDays[index] ? routie_Main : routie_02,
                                borderColor: selectedDays[index] ? routie_02 : routie_03,
                                },
                            ]}
                            onPress={() => toggleDay(index)}
                            >
                            <Text
                                style={{
                                fontFamily: 'Pretendard_Medium',
                                fontSize: 16,
                                color: selectedDays[index] ? routie_01 : routie_06,
                                marginBottom: 2,
                                }}
                            >
                                {day}
                            </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Text style={{fontFamily: 'Pretendard_ExtraBold', fontSize: 16, color: routie_07, paddingVertical: 10}}>알림</Text>
                    <View style={{position: 'relative', marginBottom: 22}}>
                        <RNPickerSelect
                            onValueChange={(value) => setSelectedValueNoti(value)}
                            items={itemsNotification}
                            value={selectedValueNoti} // 초기값 설정
                            placeholder={{}}
                            style={{
                                inputIOS: styles.picker,
                                inputAndroid: styles.picker,
                            }}
                            useNativeAndroidPickerStyle={false} // Android 네이티브 스타일 비활성화
                        />
                        <Image source={down} style={{width: 10, height: 10, position: 'absolute', bottom: 15, left: 85}}/>
                    </View>
                    <Text style={{fontFamily: 'Pretendard_ExtraBold', fontSize: 16, color: routie_07, paddingVertical: 10}}>컬러</Text>
                    <View style={{position: 'relative', marginBottom: 22}}>
                        <RNPickerSelect
                            onValueChange={(value) => setSelectedValueColor(value)}
                            items={itemsColor}
                            value={selectedValueColor} // 초기값 설정
                            placeholder={{}}
                            style={{
                                inputIOS: {...styles.picker, color: selectedValueColor || 'black'},
                                inputAndroid: {...styles.picker, color: selectedValueColor || 'black'},
                            }}
                            useNativeAndroidPickerStyle={false} // Android 네이티브 스타일 비활성화
                        />
                        <Image source={down} style={{width: 10, height: 10, position: 'absolute', bottom: 15, left: 85}}/>
                    </View>
                    <Text style={{fontFamily: 'Pretendard_ExtraBold', fontSize: 16, color: routie_07, paddingVertical: 10}}>메모</Text>
                    <View style={{height: 100, paddingHorizontal: 12, borderWidth: 1, borderColor: routie_03, borderRadius: 15, backgroundColor: routie_02}}>
                        <TextInput
                            style={{fontFamily: 'Pretendard_Medium'}}
                            placeholder='메모'
                            placeholderTextColor='#B8B8B8'
                        />
                    </View>
                </View>
            </ScrollView>

            {/* ▼ 시작 시간 모달 */}
            <Modal
                visible={startModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={toggleStartModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={{width: '100%', height: 24, alignItems: 'flex-end'}}  onPress={toggleStartModal}>
                            <Image source={X} style={{width: 24, height: 24}}/>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 }}>
                            {/* 오전/오후 Wheel */}
                            <ScrollPicker
                            dataSource={amPmData}
                            selectedIndex={amPmStart === '오전' ? 0 : 1}
                            onValueChange={(data, selectedIndex) => setAmPmStart(data)}
                            wrapperHeight={180}
                            wrapperWidth={80}
                            itemHeight={40}
                            highlightColor="#ddd"
                            activeItemColor="#000"
                            itemColor="#999"
                            />
                            {/* 시(hour) Wheel */}
                            <ScrollPicker
                            dataSource={hourData}
                            selectedIndex={hourStart - 1} // hourStart가 1이면 index 0
                            onValueChange={(data, selectedIndex) => setHourStart(data)}
                            wrapperHeight={180}
                            wrapperWidth={80}
                            itemHeight={40}
                            highlightColor="#ddd"
                            activeItemColor="#000"
                            itemColor="#999"
                            />
                        </View>
                        <TouchableOpacity style={styles.button} onPress={toggleStartModal} >
                            <Text style={{fontFamily:'Pretendard_Medium', fontSize: 16, color: routie_01}}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* ▼ 종료 시간 모달 (여기서 시작 ≤ 종료 검사) */}
            <Modal visible={endModalVisible} transparent={true} animationType="slide" onRequestClose={toggleEndModal}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={{width: '100%', height: 24, alignItems: 'flex-end'}}  onPress={toggleEndModal}>
                            <Image source={X} style={{width: 24, height: 24}}/>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 }}>
                            {/* 오전/오후 Wheel */}
                            <ScrollPicker
                                dataSource={amPmData}
                                selectedIndex={amPmEnd === '오전' ? 0 : 1}
                                onValueChange={(data, selectedIndex) => setAmPmEnd(data)}
                                wrapperHeight={180}
                                wrapperWidth={80}
                                itemHeight={40}
                                highlightColor="#ddd"
                                activeItemColor="#000"
                                itemColor="#999"
                            />
                            {/* 시(hour) Wheel */}
                            <ScrollPicker
                                dataSource={hourData}
                                selectedIndex={hourEnd - 1}
                                onValueChange={(data, selectedIndex) => setHourEnd(data)}
                                wrapperHeight={180}
                                wrapperWidth={80}
                                itemHeight={40}
                                highlightColor="#ddd"
                                activeItemColor="#000"
                                itemColor="#999"
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                // 시작 시간과 종료 시간을 24시간제로 변환
                                const start24 = convertTo24Hour(amPmStart, hourStart);
                                const end24 = convertTo24Hour(amPmEnd, hourEnd);

                                // 종료 시간이 시작 시간보다 같거나 빠른지 검사
                                if (end24 <= start24) {
                                Alert.alert('안내', '종료 시간은 시작 시간보다 늦어야 합니다.');
                                // 모달을 닫지 않고 그대로 유지
                                return;
                                }

                                // 정상적인 경우에만 모달 닫기
                                toggleEndModal();
                            }}
                        >
                            <Text style={{fontFamily:'Pretendard_Medium', fontSize: 16, color: routie_01}}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
    text_header: {
        fontSize: 16,
        color: '#2B2927',
        fontFamily: 'Pretendard_Bold',
    },
    text_name: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingHorizontal: 16, 
        paddingVertical: 5, 
        borderRadius: 100,
        backgroundColor: '#FFFFFF'
    },
    categoryTab: {
        height: 35,
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 2,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderWidth: 1,
        borderColor: '#E7E3DC'
    },
    day: {
        height: 40,
        width: '12%',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderWidth: 1,
        borderColor: '#E7E3DC'
    },
    picker: {
        fontSize: 14,
        fontFamily: 'Pretendard_SemiBold',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#E7E3DC',
        padding: 10,
        borderRadius: 50,
        width: '30%',
        height: 40,
        backgroundColor: '#F5F1E9'
    },
    pickerBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#E7E3DC',
        padding: 10,
        borderRadius: 50,
        width: '30%',
        height: 40,
        backgroundColor: '#F5F1E9'
    },
    pickerText: {
        fontFamily: 'Pretendard_SemiBold',
        fontSize: 13,
        color: '#61605E'
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContainer: {
        marginHorizontal: 30,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: 'Pretendard_Bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    button: {
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12,
        backgroundColor: '#FF622A',
        borderRadius: 10,
        fontFamily: 'Pretendard_Medium',
    },

    });
