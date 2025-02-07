import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { resetToMain } from './NavigationHelper';
import egg from './assets/images/egg.png';

export default function Login() {
  const navigation = useNavigation();
  const [userId, setUserid] = useState('');
  const [password, setPassword] = useState('');

  const handleReturnMain = () => {
    resetToMain(navigation);
  };

  // useFocusEffect를 사용하여 로그인 화면에 포커스되었을 때 StatusBar 설정, 벗어날 때 복원
  useFocusEffect(
    React.useCallback(() => {
      // 로그인 화면 포커스 시 StatusBar 설정
      StatusBar.setBackgroundColor('#FF622A');
      StatusBar.setTranslucent(false);

      // 클린업 함수: 로그인 화면을 벗어날 때 원하는 기본 스타일로 복원
      return () => {
        // 예를 들어, 기본 상태로 복원하거나 다른 화면에 맞게 설정 (여기서는 예시로 흰색 배경, translucent true로 설정)
        StatusBar.setBackgroundColor('#F5F1E9');
        StatusBar.setTranslucent(true);
      };
    }, [])
  );

  const handleLogin = async () => {
    if (!userId || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
  
    try {
      console.log("로그인 시도");
      // 실제 백엔드 URL과 로그인 API 엔드포인트로 수정하세요.
      const response = await fetch('http://192.168.45.126:8000/users/Login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 백엔드가 기대하는 필드명이 다를 수 있으니 맞춰주세요.
        body: JSON.stringify({ 
          userId: userId, 
          password: password 
        }),
      });
  
      const data = await response.json();
      console.log("로그인 응답:", data);
  
      if (response.status === 200) {
        // 예: 서버가 토큰을 반환한다고 가정
        // 토큰을 AsyncStorage 등에 저장하는 로직을 추가할 수 있습니다.
        alert("로그인 성공!");
        // 로그인 성공 후 메인 화면으로 이동하며 스택을 초기화합니다.
        resetToMain(navigation);
      } else {
        alert(data.error || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("서버에 연결할 수 없습니다.");
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#FF622A' }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" enabled={false}>
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
              <Image source={egg} style={{ width: 145, height: 163, position: 'absolute', right: 20, bottom: 36 }}/>
            </View>
            {/* 로그인 폼 영역 */}
            <View style={styles.logincontainer}>
              <View style={styles.login_label}>
                <TextInput
                  value={userId}
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
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={{ color: "#FFFFFF", fontSize: 16 }}>로그인</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', justifyContent:'center' }}>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.login_etc}>아이디 찾기</Text>
                </TouchableOpacity>
                <Text style={styles.login_etc}>  l  </Text>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.login_etc}>비밀번호 찾기</Text>
                </TouchableOpacity>
                <Text style={styles.login_etc}>  l  </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                  <Text style={styles.login_etc}>회원가입</Text>
                </TouchableOpacity>
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
