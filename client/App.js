import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Login';
import Signin from './Signin';
import Routin from './Routin';
import Calendar from './Calendar';
import Mypage from './Mypage';
import AddSchedule from './AddSchedule';
import AddRoutin from './AddRoutin';
import AddRoutinList from './AddRoutinList';
import ProgramList from './ProgramList';
import CustomTabBar from './CustomTabBar';
import loading_icon from './assets/images/splash/Routie_splash_icon.png';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: '#61605E',
        tabBarInactiveTintColor: '#D0D0D0',
        tabBarStyle: { backgroundColor: '#FFFFFF', height: 70, alignItems: 'center', paddingHorizontal: 50, elevation: 0, },
        headerShown: false,
        initialRouteName: "Routin" ,
        backBehavior: "none",
        tabBarPressColor: 'transparent',
        tabBarPressOpacity: 1,
        tabBarLabelStyle:{}
     }}
    >
      <Tab.Screen 
        name="Routin" 
        component={Routin} 
        options={{
          tabBarLabel: '루틴',
          tabBarIcon: ({ color }) => (
            <Image source={require('./assets/images/routin.png')} style={{ tintColor: color, width: 20.5, height: 24 }} />
          ),
        }} 
      />      
      <Tab.Screen 
        name="Calendar" 
        component={Calendar} 
        options={{
          tabBarLabel: '캘린더',
          tabBarIcon: ({ color}) => (
            <Image source={require('./assets/images/calendar.png')} style={{ tintColor: color, width: 24, height: 24 }} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Mypage" 
        component={Mypage} 
        options={{
          tabBarLabel: '마이페이지',
          tabBarIcon: ({ color }) => (
            <Image source={require('./assets/images/user.png')} style={{ tintColor: color, width: 24, height: 24 }} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Pretendard_Thin: require('./assets/fonts/Pretendard-Thin.otf'),
        Pretendard_ExtraLight: require('./assets/fonts/Pretendard-ExtraLight.otf'),
        Pretendard_Light: require('./assets/fonts/Pretendard-Light.otf'),
        Pretendard_Regular: require('./assets/fonts/Pretendard-Regular.otf'),
        Pretendard_Medium: require('./assets/fonts/Pretendard-Medium.otf'),
        Pretendard_SemiBold: require('./assets/fonts/Pretendard-SemiBold.otf'),
        Pretendard_Bold: require('./assets/fonts/Pretendard-Bold.otf'),
        Pretendard_ExtraBold: require('./assets/fonts/Pretendard-ExtraBold.otf'),
        Pretendard_Black: require('./assets/fonts/Pretendard-Black.otf'),
      });
      setFontsLoaded(true);

      // 폰트 로드 이후 전역 스타일 설정
      const customTextProps = {
        style: {
          fontFamily: 'Pretendard_Regular',
        },
      };
      setCustomText(customTextProps);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF622A' }}>
        <Image source={loading_icon} style={{width: 200, height: 200, resizeMode:"contain"}} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* 로그인 및 회원가입 화면 */}
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />

        {/* Bottom Tab Navigator를 포함하는 메인 화면 */}
        <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="ProgramList" component={ProgramList} options={{ headerShown: false }} />
        <Stack.Screen name="AddRoutinList" component={AddRoutinList} options={{ headerShown: false }} />
        <Stack.Screen name="AddRoutin" component={AddRoutin} options={{ headerShown: false }} />
        <Stack.Screen name="AddSchedule" component={AddSchedule} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}