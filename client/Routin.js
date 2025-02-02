import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import RoutinTopTabs from './RoutinTopTabs';
import FloatButton from './Add';
import megaphone from './assets/images/megaphone.png';
import logo from './assets/images/logo.png';
import list from './assets/images/program_list.png';


export default function Routin() {
  const navigation = useNavigation();
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={[ 'top', 'bottom']} style={{ flex: 1, backgroundColor: '#F5F1E9'}}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
        >
          {/* 헤더 */}
          <View style={{paddingHorizontal: 20}}>
            <View style={{paddingVertical: 15,flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F5F1E9'}}>
              <Image source={logo} style={{width: 125, height: 30}} />
              <TouchableOpacity onPress={() => navigation.navigate('ProgramList')}>
                <Image source={list} style={{ width: 28, height: 26.5}} />
              </TouchableOpacity>
            </View>
          </View>
          {/* 배너 */}
          <View style={{paddingHorizontal: 20}}>
            <TouchableOpacity style={[styles.notice_banner, { width: '100%'}]} onPress={() => navigation.navigate('ProgramList')}>
              <Image source={megaphone} style={{ width: 24, height: 24, marginRight: 12, marginBottom: -3}} />
              <Text style={{color: '#61605E', fontFamily: 'Pretendard_Medium', width: '90%'}} numberOfLines={1} ellipsizeMode='tail'>이번주의 추천활동: DO IT 2기 DEV IT 최종발표</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.topTabsContainer}>
            <RoutinTopTabs />
          </View>
        </ScrollView>
        <FloatButton />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  notice_banner: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 20,
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    fontFamily: 'Pretendard_Regular', // 추가
  },
  tab: {
    fontSize: 16,
    fontFamily: 'Pretendard_SemiBold'
  },
  topTabsContainer: {
    flex: 1,
    minHeight: 400, // 필요한 만큼 높이 설정 (혹은 flex: 1)
  },

});
