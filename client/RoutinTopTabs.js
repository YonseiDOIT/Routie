import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RoutinTabScreen from './TabRoutin';   // 위에서 만든 루틴 탭 컴포넌트
import ScheduleTabScreen from './TabSchedule'; // 일정 탭 컴포넌트

const Tab = createMaterialTopTabNavigator();

export default function RoutinTopTabs() {
  return (
    <Tab.Navigator
      initialRouteName="RoutinTab"
      screenOptions={{
        tabBarActiveTintColor: '#61605E',
        tabBarInactiveTintColor: '#B8B8B8',
        tabBarLabelStyle: { fontFamily: 'Pretendard_semiBold', fontSize: 14, width: 'auto' },
        tabBarStyle: { paddingHorizontal: 20, backgroundColor: '#F5F1E9' , elevation: 0, shadowOpacity: 0, borderBottomWidth: 2, borderBottomColor: '#E7E3DC'},
        tabBarIndicatorStyle: {marginHorizontal: 20, backgroundColor: '#61605E', height: 3, marginBottom: -2},
        tabBarItemStyle: {
          alignItems: 'flex-start', // 탭 아이템을 좌측 정렬
          width: 'auto', // 탭의 넓이를 자동 조절
        },
      }}
    >
      <Tab.Screen
        name="RoutinTab"
        component={RoutinTabScreen}
        options={{ tabBarLabel: '루틴' }}
      />
      <Tab.Screen
        name="ScheduleTab"
        component={ScheduleTabScreen}
        options={{ tabBarLabel: '일정' }}
      />
    </Tab.Navigator>
  );
}