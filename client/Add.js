import React, { useRef, useState } from 'react';
import { View, Pressable, StyleSheet, Image, Animated, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import plus from './assets/images/plus.png';
import addRoutin from './assets/images/addRoutin.png';
import addSchedule from './assets/images/addSchedule.png';

export default function Add() {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false); // 플로팅 버튼 확장 상태
  const rotation = useRef(new Animated.Value(0)).current; // 회전 애니메이션 값 (useRef로 관리)

  const toggleMenu = () => {
    // 애니메이션 상태 업데이트
    Animated.timing(rotation, {
      toValue: isOpen ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setIsOpen(!isOpen);
  };

  const rotationInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  const animatedStyle = {
    transform: [{ rotate: rotationInterpolate }],
  };

  return (
    <View style={styles.container}>
      {/* 첫 번째 추가 버튼 */}
      {isOpen && (
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
          {/* 설명 태그 */}
          <View style={styles.tag}>
            <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 14, color: '#61605E'}}>일정</Text>
          </View>

          {/* 버튼 */}
          <Pressable
            style={[styles.Button, { backgroundColor: "#2B2927" }]}
            onPress={() => navigation.navigate('AddSchedule')} // 네비게이션 동작
          >
            <Image source={addSchedule} style={{ width: 24, height: 24, tintColor: '#FFF' }} />
          </Pressable>
        </View>
      )}

      {/* 두 번째 추가 버튼 */}
      {isOpen && (
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
          {/* 설명 태그 */}
          <View style={styles.tag}>
            <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 14, color: '#61605E'}}>루틴</Text>
          </View>

          {/* 버튼 */}
          <Pressable
            style={[styles.Button, { backgroundColor: "#2B2927" }]}
            onPress={() => navigation.navigate('AddRoutinList')} // 네비게이션 동작
          >
            <Image source={addRoutin} style={{ width: 24, height: 24, tintColor: '#FFF' }} />
          </Pressable>
        </View>
      )}

      {/* 메인 플로팅 버튼 */}
      <View style={{alignItems: 'flex-end'}}>
        <Pressable style={[styles.Button, {backgroundColor: "#61605E"}]} onPress={toggleMenu}>
          <Animated.Image
            source={plus}
            style={[{ width: 24, height: 24, tintColor: '#FFF' }, animatedStyle]}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  Button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  tag: {
    height: 28,
    paddingHorizontal: 10,
    backgroundColor: '#F5F1E9',
    borderRadius: 4,
    marginRight: 15, // 버튼과의 간격
    justifyContent: 'center',
  }
});
