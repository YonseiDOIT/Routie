import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import egg from './assets/images/egg.png';
import { setCustomText } from 'react-native-global-props';
import { ScrollView } from 'react-native-gesture-handler';

export default function LogIn() {
  const navigation = useNavigation();
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!userid || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
  
    try {
      const response = await fetch('http://<YOUR_BACKEND_URL>/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userid,
          password: password,
        }),
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        alert("로그인 성공!");
        navigation.navigate('Routin'); // 로그인 성공 후 이동
      } else {
        alert(data.error || "로그인 실패: 아이디 또는 비밀번호를 확인해주세요.");
      }
    } catch (error) {
      console.error(error);
      alert("서버에 연결할 수 없습니다.");
    }
  };
  
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={[ 'top', 'bottom']} style={{ flex: 1, backgroundColor: '#FF622A'}}>
        <KeyboardAvoidingView style={{flex:1}} behavior='height' enabled={false}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex:10, paddingVertical: 36, paddingHorizontal: 20, position: 'relative'}}>
              <Text style={styles.text_title}>
                내 루틴과 학교일정{"\n"}
                루티에서 원클릭으로! 
              </Text>
              <Text style={styles.text_sub}>
                루틴을 이루고{"\n"}
                캐릭터를 성장시키세요
              </Text>
              <Image source={egg} style={{ width: 170, height: 197, position: 'absolute', right: 20, bottom: 36 }}/>
            </View>
            {/* 상단 하단 구분 기준 */}
            <View style={styles.logincontainer}>
              <View style={styles.login_label}>
                <TextInput
                  value={userid}
                  onChangeText={setUserid}
                  autoCapitalize="none"
                  style={styles.input}
                  placeholder="아이디"
                  placeholderTextColor="#B8B8B8"
                />
              </View>
              <View style={styles.login_label}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  style={styles.input}
                  placeholder="비밀번호"
                  placeholderTextColor="#B8B8B8"
                />
              </View>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', { screen: 'Routin' })}>
                <Text style={{ color: "#FFFFFF", fontSize: 16 }}>로그인</Text>
              </TouchableOpacity>
              <View style={{flexDirection: 'row', justifyContent:'center'}}>
                <TouchableOpacity onPress={() => {}}><Text style={styles.login_etc}>아이디 찾기</Text></TouchableOpacity>
                <Text style={styles.login_etc}>  l  </Text>
                <TouchableOpacity onPress={() => {}}><Text style={styles.login_etc}>비밀번호 찾기</Text></TouchableOpacity>
                <Text style={styles.login_etc}>  l  </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signin')}><Text style={styles.login_etc}>회원가입</Text></TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  text_title: {
    fontSize: 28,
    color: '#FFFFFF',
    marginTop: 60,
    marginBottom: 15,
    lineHeight: 34,
    fontFamily: 'Pretendard_Bold',
    letterSpacing: -1
  },
  text_sub: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 20,
    fontFamily: 'Pretendard_Medium',
    letterSpacing: -1
  },
  logincontainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    backgroundColor: '#FFFFFF'
  },
  login_label: {
    backgroundColor: '#F5F1E9',
    marginBottom: 10,
    borderRadius: 10
  },
  input: {
    paddingVertical:20,
    justifyContent: 'center',
    alignItems:'center',
    fontSize: 14,
    fontFamily: 'Pretendard_Medium',
    paddingHorizontal: 10
  },
  button: {
    paddingVertical:20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#FF622A',
    borderRadius: 10,

    fontFamily: 'Pretendard_Medium',
  },
  login_etc: {
    color: "#B8B8B8", 
    fontSize: 14, 
    textAlign: 'center', 
    fontFamily: 'Pretendard_Medium'
  },

});
