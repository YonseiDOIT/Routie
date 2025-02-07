import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";
import { resetToMain } from './NavigationHelper';
import left from './assets/images/left.png';

export default function AddRoutin() {
    const navigation = useNavigation();
    
    const routie_Main = '#FF622A'
    const routie_01 = '#FFFFFF'
    const routie_02 = '#F5F1E9'
    const routie_03 = '#E7E3DC'
    const routie_04 = '#D0D0D0'
    const routie_05 = '#B8B8B8'
    const routie_06 = '#61605E'
    const routie_07 = '#2B2927'

    const handleReturnMain = () => {
      // resetToMain 함수를 호출하여 내비게이션 스택을 재설정합니다.
      resetToMain(navigation);
    };

  return (
    <SafeAreaProvider>
        <SafeAreaView edges={[ 'top', 'bottom']} style={{ flex: 1, backgroundColor: '#F5F1E9'}}>
            <ScrollView style={{ flex: 1, backgroundColor: routie_01}} stickyHeaderIndices={[0]}>
              <View style={{paddingVertical: 15, paddingHorizontal: 20, backgroundColor: '#F5F1E9', alignItems: 'flex-start', justifyContent: 'center'}}>
                <TouchableOpacity onPress={handleReturnMain}>
                    <Image source={left} style={{width: 24, height: 24}}/>
                </TouchableOpacity>
              </View>
              <View style={{paddingHorizontal: 20, paddingBottom: 10, backgroundColor: '#F5F1E9'}}>
                <Text style={{fontFamily: 'Pretendard_Bold', fontSize: 24, color: '#000000', marginTop: 20}}>이런 프로그램{"\n"}어때요?</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{flexDirection: 'row', paddingVertical: 15, width: '100%'}}>
                  <View style={[styles.eventBox, {backgroundColor: routie_Main, marginRight: 15}]}>
                    <View style={{height: '100%', justifyContent: 'space-between',}}>
                      <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 16, color: routie_02, lineHeight: 31}}>DO IT</Text>
                      <Text style={{fontFamily: 'Pretendard_ExtraBold', fontSize: 20, color: routie_02, lineHeight: 25, letterSpacing: -1, height: 80}}>DO IT 2기{"\n"}DEV IT 최종발표</Text>
                      <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 16, color: routie_02, lineHeight: 31}}>진로ㅣ2월 8일 14시</Text>
                    </View>
                  </View>
                  <View style={[styles.eventBox, {backgroundColor: routie_06, marginRight: 15}]}>
                    <TouchableOpacity onPress={() => Linking.openURL('https://wjdorm.yonsei.ac.kr/wjdorm/index.do')}>
                      <View style={{height: '100%', justifyContent: 'space-between',}}>
                        <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 16, color: routie_02, lineHeight: 31}}>생활관</Text>
                        <Text style={{fontFamily: 'Pretendard_ExtraBold', fontSize: 20, color: routie_02, lineHeight: 25, letterSpacing: -1, height: 80}}>세연3학사 나눔방</Text>
                        <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 16, color: routie_02, lineHeight: 31}}>생활ㅣ매주 20시</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.eventBox, {backgroundColor: routie_06}]}>
                    <View style={{height: '100%', justifyContent: 'space-between',}}>
                      <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 16, color: routie_02, lineHeight: 31}}>원주 교목실</Text>
                      <Text style={{fontFamily: 'Pretendard_ExtraBold', fontSize: 20, color: routie_02, lineHeight: 25, letterSpacing: -1, height: 80}}>2024-2학기{"\n"}수요찬양예배</Text>
                      <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 16, color: routie_02, lineHeight: 31}}>종교ㅣ매주 수 08시</Text>
                    </View>
                  </View>
                </ScrollView>
              </View>
              {/* 리스트 */}
              <View style={styles.list}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2}}>
                  <View style={styles.boxLayout}>
                    <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 11, marginBottom: 2, color: routie_06}}>진로</Text>
                  </View>
                </View>
                <Text style={{fontFamily: 'Pretendard_Bold', fontSize: 18, color: routie_07, width: '100%'}} numberOfLines={1} ellipsizeMode='tail'>The MIRAE Festival</Text>
                <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 14, color: routie_06}}>미래인재개발원ㅣ11월 11일 - 11월 14일</Text>
              </View>
              <View style={styles.list}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2}}>
                  <View style={styles.boxLayout}>
                    <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 11, marginBottom: 2, color: routie_06}}>진로</Text>
                  </View>
                </View>
                <Text style={{fontFamily: 'Pretendard_Bold', fontSize: 18, color: routie_07, width: '100%'}} numberOfLines={1} ellipsizeMode='tail'>진로·취업 스트레스 관리법 특강 ‘취업 스트레스 뽀개기'</Text>
                <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 14, color: routie_06}}>미래인재개발원ㅣ11월 12일</Text>
              </View>
              <View style={styles.list}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2}}>
                  <View style={styles.boxLayout}>
                    <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 11, marginBottom: 2, color: routie_06}}>진로</Text>
                  </View>
                </View>
                <Text style={{fontFamily: 'Pretendard_Bold', fontSize: 18, color: routie_07, width: '100%'}} numberOfLines={1} ellipsizeMode='tail'>직업심리검사 eDISC해석 특강</Text>
                <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 14, color: routie_06}}>미래인재개발원ㅣ11월 18일</Text>
              </View>
              <View style={styles.list}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2}}>
                  <View style={styles.boxLayout}>
                    <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 11, marginBottom: 2, color: routie_06}}>일상</Text>
                  </View>
                </View>
                <Text style={{fontFamily: 'Pretendard_Bold', fontSize: 18, color: routie_07, width: '100%'}} numberOfLines={1} ellipsizeMode='tail'>일상 Break! 나를 위한 휴식: 나른한 오후에 힘을 더하는 </Text>
                <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 14, color: routie_06}}>상담코칭센터ㅣ11월 15일 - 28일ㅣ매주 목요일</Text>
              </View>
              <View style={styles.list}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2}}>
                  <View style={styles.boxLayout}>
                    <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 11, marginBottom: 2, color: routie_06}}>비교과</Text>
                  </View>
                </View>
                <Text style={{fontFamily: 'Pretendard_Bold', fontSize: 18, color: routie_07, width: '100%'}} numberOfLines={1} ellipsizeMode='tail'>2024-2 YONSEI MIRAE 독서마라톤 대회</Text>
                <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 14, color: routie_06}}>원주학술정보원 문헌정보팀ㅣ9월 2일 - 11월 29일</Text>
              </View>
              <View style={styles.list}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2}}>
                  <View style={styles.boxLayout}>
                    <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 11, marginBottom: 2, color: routie_06}}>종교</Text>
                  </View>
                </View>
                <Text style={{fontFamily: 'Pretendard_Bold', fontSize: 18, color: routie_07, width: '100%'}} numberOfLines={1} ellipsizeMode='tail'>2024-2학기 수요찬양예배</Text>
                <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 14, color: routie_06}}>원주교목실ㅣ9월 4일 - 현재ㅣ매주 수요일</Text>
              </View>
              <View style={styles.list}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2}}>
                  <View style={styles.boxLayout}>
                    <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 11, marginBottom: 2, color: routie_06}}>Test</Text>
                  </View>
                </View>
                <Text style={{fontFamily: 'Pretendard_Bold', fontSize: 18, color: routie_07, width: '100%'}} numberOfLines={1} ellipsizeMode='tail'>Test 페이지 입니다</Text>
                <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 14, color: routie_06}}>예은이의 연세ㅣ2월 8일</Text>
              </View>
            </ScrollView>
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
        borderWidth: 1,
        borderColor: '#E7E3DC'
    },
    boxLayout: {
      height: 18, 
      backgroundColor: '#E7E3DC', 
      alignItems: 'center', 
      justifyContent: 'center', 
      borderRadius: 2, 
      paddingHorizontal: 8
    },
    list: {
      paddingHorizontal: 20, 
      paddingVertical: 25, 
      borderBottomWidth: 1.5, 
      borderBottomColor: '#E7E3DC'
    },
    eventBox: {
      width: 180, 
      height: 200, 
      paddingHorizontal: 15,
      paddingVertical:20,
      borderRadius: 22, 
      color: '#F5F1E9'}
    });
