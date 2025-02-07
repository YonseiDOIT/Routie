import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";
import { resetToMain } from './NavigationHelper';
import X from './assets/images/X.png'
import link from './assets/images/link.png'

export default function AddRoutinList() {
    const navigation = useNavigation();
    const [selectedDays, setSelectedDays] = useState(Array(7).fill(false)); // 7개의 요일 상태 관리
    
    const categories = ['학교 프로그램', '운동', '자기계발', '생활', '식사' ];
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

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
              <View>
                <View style={{paddingHorizontal: 20, backgroundColor: '#F5F1E9'}}>
                    <View style={{paddingVertical: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={handleReturnMain}>
                        <Image source={X} style={{width: 24, height: 24}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: routie_02, paddingHorizontal: 15, height: 28, alignItems: 'center', justifyContent: 'center', borderRadius: 50, borderWidth: 1, borderColor: routie_04}} onPress={() => navigation.navigate('AddRoutin')}>
                        <Text style={{fontFamily: 'Pretendard_Medium',fontSize: 14, color: routie_06}}>직접 추가</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={{paddingLeft: 20, paddingVertical: 15, backgroundColor: '#F5F1E9'}}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {categories.map((category, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.categoryTab,
                          {
                              backgroundColor: selectedCategory === category ? '#FF622A' : '#E7E3DC',
                              borderColor: selectedCategory === category ? '#FF622A' : '#E7E3DC',
                          },
                          ]}
                        onPress={() => setSelectedCategory(category)} // 선택된 카테고리 업데이트
                      >
                        <Text
                          style={{
                              color: selectedCategory === category ? '#FFFFFF' : '#61605E',
                              fontFamily: 'Pretendard_Medium',
                          }}
                        >
                        {category}
                        </Text>
                      </TouchableOpacity>

                    ))}
                    </ScrollView>
                  </View>
                </View>
                {/* 리스트 */}
                <View style={{padding:20, borderBottomWidth: 1.5, borderBottomColor: routie_03}}>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2}}>
                    <View style={styles.boxLayout}>
                      <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 11, marginBottom: 2, color: routie_06}}>진로</Text>
                    </View>
                    <TouchableOpacity style={{height: 30, width: 50, borderWidth: 1, borderColor: routie_03, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                      <Image source={link} style={{width: 18, height: 18}}/>
                    </TouchableOpacity>
                  </View>
                  <Text style={{fontFamily: 'Pretendard_Bold', fontSize: 18, color: routie_07, width: '100%'}} numberOfLines={1} ellipsizeMode='tail'>The MIRAE Festival</Text>
                  <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 14, color: routie_06}}>미래인재개발원ㅣ11월 11일 - 11월 14일</Text>
                </View>
                <View style={{padding:20, borderBottomWidth: 1.5, borderBottomColor: routie_03}}>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2}}>
                    <View style={styles.boxLayout}>
                      <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 11, marginBottom: 2, color: routie_06}}>진로</Text>
                    </View>
                    <TouchableOpacity style={{height: 30, width: 50, borderWidth: 1, borderColor: routie_03, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                      <Image source={link} style={{width: 18, height: 18}}/>
                    </TouchableOpacity>
                  </View>
                  <Text style={{fontFamily: 'Pretendard_Bold', fontSize: 18, color: routie_07, width: '100%'}} numberOfLines={1} ellipsizeMode='tail'>진로·취업 스트레스 관리법 특강 ‘취업 스트레스 뽀개기'</Text>
                  <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 14, color: routie_06}}>미래인재개발원ㅣ11월 12일</Text>
                </View>
                <View style={{padding:20, borderBottomWidth: 1.5, borderBottomColor: routie_03}}>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2}}>
                    <View style={styles.boxLayout}>
                      <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 11, marginBottom: 2, color: routie_06}}>진로</Text>
                    </View>
                    <TouchableOpacity style={{height: 30, width: 50, borderWidth: 1, borderColor: routie_03, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                      <Image source={link} style={{width: 18, height: 18}}/>
                    </TouchableOpacity>
                  </View>
                  <Text style={{fontFamily: 'Pretendard_Bold', fontSize: 18, color: routie_07, width: '100%'}} numberOfLines={1} ellipsizeMode='tail'>직업심리검사 eDISC해석 특강</Text>
                  <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 14, color: routie_06}}>미래인재개발원ㅣ11월 18일</Text>
                </View>
                <View style={{padding:20, borderBottomWidth: 1.5, borderBottomColor: routie_03}}>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2}}>
                    <View style={styles.boxLayout}>
                      <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 11, marginBottom: 2, color: routie_06}}>일상</Text>
                    </View>
                    <TouchableOpacity style={{height: 30, width: 50, borderWidth: 1, borderColor: routie_03, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                      <Image source={link} style={{width: 18, height: 18}}/>
                    </TouchableOpacity>
                  </View>
                  <Text style={{fontFamily: 'Pretendard_Bold', fontSize: 18, color: routie_07, width: '100%'}} numberOfLines={1} ellipsizeMode='tail'>일상 Break! 나를 위한 휴식: 나른한 오후에 힘을 더하는 </Text>
                  <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 14, color: routie_06}}>상담코칭센터ㅣ11월 15일 - 28일ㅣ매주 목요일</Text>
                </View>
                <View style={{padding:20, borderBottomWidth: 1.5, borderBottomColor: routie_03}}>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2}}>
                    <View style={styles.boxLayout}>
                      <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 11, marginBottom: 2, color: routie_06}}>비교과</Text>
                    </View>
                    <TouchableOpacity style={{height: 30, width: 50, borderWidth: 1, borderColor: routie_03, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                      <Image source={link} style={{width: 18, height: 18}}/>
                    </TouchableOpacity>
                  </View>
                  <Text style={{fontFamily: 'Pretendard_Bold', fontSize: 18, color: routie_07, width: '100%'}} numberOfLines={1} ellipsizeMode='tail'>2024-2 YONSEI MIRAE 독서마라톤 대회</Text>
                  <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 14, color: routie_06}}>원주학술정보원 문헌정보팀ㅣ9월 2일 - 11월 29일</Text>
                </View>
                <View style={{padding:20, borderBottomWidth: 1.5, borderBottomColor: routie_03}}>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2}}>
                    <View style={styles.boxLayout}>
                      <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 11, marginBottom: 2, color: routie_06}}>종교</Text>
                    </View>
                    <TouchableOpacity style={{height: 30, width: 50, borderWidth: 1, borderColor: routie_03, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                      <Image source={link} style={{width: 18, height: 18}}/>
                    </TouchableOpacity>
                  </View>
                  <Text style={{fontFamily: 'Pretendard_Bold', fontSize: 18, color: routie_07, width: '100%'}} numberOfLines={1} ellipsizeMode='tail'>2024-2학기 수요찬양예배</Text>
                  <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 14, color: routie_06}}>원주교목실ㅣ9월 4일 - 현재ㅣ매주 수요일</Text>
                </View>
                <View style={{padding:20, borderBottomWidth: 1.5, borderBottomColor: routie_03}}>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2}}>
                    <View style={styles.boxLayout}>
                      <Text style={{fontFamily: 'Pretendard_Medium', fontSize: 11, marginBottom: 2, color: routie_06}}>Test</Text>
                    </View>
                    <TouchableOpacity style={{height: 30, width: 50, borderWidth: 1, borderColor: routie_03, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                      <Image source={link} style={{width: 18, height: 18}}/>
                    </TouchableOpacity>
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
    }
    });
