import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { resetToMain } from './NavigationHelper';
import left from './assets/images/left.png';

export default function SignIn() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    userId: '',
    userPw: '',
    userPwRe: '',
    userName: '',
    phoneNumber: '',
    birthDate: '',
    email: '', 
  })

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async () => {
    const {userId, userPw, userPwRe, userName, phoneNumber, birthDate, email} = formData;

    if (!userName || !userId || !userPw || !userPwRe || !email || !phoneNumber || !birthDate) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
  
    if (userPw !== userPwRe) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    console.log("회원가입 요청 시작...");
    try {
      const fetchData = {
        userId,
        username: userName,
        password: userPw,
        passwordRe: userPwRe,
        email,
        phonenumber: phoneNumber,
        birthday: birthDate,
      };
      console.log(fetchData);
      
      const response = await fetch('http://192.168.45.126:8000/users/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fetchData),
      });
  
      const data = await response.json();
      console.log("응답:", data);
      
      if (response.status === 201) {
        alert("회원가입 성공!");
        navigation.navigate('Login'); // 회원가입 후 로그인 페이지로 이동
      } else {
        alert(data.error || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("서버에 연결할 수 없습니다.");
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={[ 'top', 'bottom']} style={{ flex: 1, backgroundColor: '#F5F1E9', paddingHorizontal: 20, paddingBottom: 20}}>
        <KeyboardAwareScrollView
          style={{flexGrow:1}}
          enableOnAndroid={true}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
        >
          <View>
            <View style={{paddingVertical: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F5F1E9'}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={left} style={{width: 24, height: 24}}/>
              </TouchableOpacity>
              <Text style={styles.text_header}>회원가입</Text>
              <View style={{width: 24, height: 24}}></View>
            </View>
          </View>
          <Text style={styles.text_title}>
            기본 정보를{"\n"}
            입력해주세요
          </Text>
          <View style={styles.inputBox}>
            <Text style={styles.text}>이름</Text>
            <TextInput
              value={formData.userName}
              onChangeText={(value) => handleChange('userName', value)}
              style={styles.text_input}
              placeholder='홍길동'
              placeholderTextColor='#B8B8B8'/>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>아이디</Text>
            <TextInput
              value={formData.userId}
              onChangeText={(value) => handleChange('userId', value)}
              autoCapitalize="none"
              style={styles.text_input}
              placeholder='아이디'
              placeholderTextColor='#B8B8B8'/>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>비밀번호</Text>
            <TextInput
              value={formData.userPw}
              onChangeText={(value) => handleChange('userPw', value)}
              secureTextEntry
              autoCapitalize="none"
              style={styles.text_input}
              placeholder='비밀번호'
              placeholderTextColor='#B8B8B8'/>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>비밀번호 확인</Text>
            <TextInput
              value={formData.userPwRe}
              onChangeText={(value) => handleChange('userPwRe', value)}
              secureTextEntry
              autoCapitalize="none"
              style={styles.text_input}
              placeholder='비밀번호 확인'
              placeholderTextColor='#B8B8B8'/>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>이메일</Text>
            <TextInput
              value={formData.email}
              onChangeText={(value) => handleChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.text_input}
              placeholder='abc1234@routie.com'
              placeholderTextColor='#B8B8B8'/>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>전화번호</Text>
            <TextInput
              value={formData.phoneNumber}
              onChangeText={(value) => handleChange('phoneNumber', value)}
              keyboardType="phone-pad"
              style={styles.text_input}
              placeholder='01012345678'
              placeholderTextColor='#B8B8B8'/>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>생년월일</Text>
            <TextInput
              value={formData.birthDate}
              onChangeText={(value) => handleChange('birthDate', value)}
              keyboardType="phone-pad"
              style={styles.text_input}
              placeholder='20000101'
              placeholderTextColor='#B8B8B8'/>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={{color: "#FFFFFF", fontSize: 16 }}>회원가입</Text>
          </TouchableOpacity>
          
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
//안드로이드에서 키보드 입력시에 비율이 이상해지는 문제
//아이폰에선 키보드가 올라오고 다시 안내려가는 문제&입력 폼 안보임
const styles = StyleSheet.create({
    text_header: {
        fontSize: 16,
        color: '#2B2927',
        fontFamily: 'Pretendard_Bold',
    },
    text_title: {
        marginVertical: 28,
        fontSize: 24,
        color: '#2B2927',
        fontFamily: 'Pretendard_Bold',
        lineHeight: 30,
        letterSpacing: -1
    },
    text: {
        fontSize: 16,
        color: '#2B2927',
        fontFamily: 'Pretendard_Regular',
    },
    text_input: {
        fontSize: 20,
        color: '#2B2927',
        fontFamily: 'Pretendard_Regular',
    },
    inputBox: {
        marginVertical: 14,
        borderBottomWidth: 1, 
        borderBottomColor: '#B8B8B8'
    },
    button: {
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12,
        backgroundColor: '#FF622A',
        borderRadius: 10,
        fontFamily: 'Pretendard_Medium',
      },
    
});
