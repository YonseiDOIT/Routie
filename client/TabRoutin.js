import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Svg, { Circle, Path } from 'react-native-svg';
import { ScrollView } from 'react-native-gesture-handler';
import dot from './assets/images/3dot.png';
import check from './assets/images/check.png';

export default function TabRoutin() {
  const navigation = useNavigation();
  const scrollRef = useRef(null); // ScrollView의 ref 생성

  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [isChecked4, setChecked4] = useState(false);
  const [isChecked5, setChecked5] = useState(false);
  const [percent, setPercent] = useState(0);
  const [currentTime, setCurrentTime] = useState('');

  const routie_Main = '#FF622A'
  const routie_01 = '#FFFFFF'
  const routie_02 = '#F5F1E9'
  const routie_03 = '#E7E3DC'
  const routie_04 = '#D0D0D0'
  const routie_05 = '#B8B8B8'
  const routie_06 = '#61605E'
  const routie_07 = '#2B2927'

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      const progress = (totalSeconds / 86400) * 100;
      setPercent(progress);
      setCurrentTime(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const size = Dimensions.get('window').width * 0.8;
  const outerSize = Dimensions.get('window').width * 0.73;
  const innerSize = Dimensions.get('window').width * 0.6;
  const outerRadius = outerSize / 2;
  const innerRadius = innerSize / 2;

  const segmentCount = 24;
  const angleIncrement = (2 * Math.PI) / segmentCount;

  const segments_out = [];
  const segments_in = [];
  const Colors_out= [
    routie_02, routie_02, routie_02, routie_02, routie_02, routie_02,     
    routie_02, routie_02, routie_03, routie_03, routie_03, routie_03,
    routie_02, routie_03, routie_03, routie_03, routie_02, routie_02, 
    routie_05, routie_05, routie_02, routie_02, routie_02, routie_02, 
  ];
  const Colors_in = [
    routie_01, routie_01, routie_01, routie_01, routie_01, routie_01,
    routie_Main, routie_01, routie_01, routie_01, routie_01, routie_01, 
    '#FF3C8C', routie_01, routie_01, routie_01, routie_01, routie_01,
    '#FF3C8C', routie_01, routie_01, '#F9B506', routie_01, '#61CCBF', 
  ];

  // ScrollView의 ref는 이미 선언되어 있다고 가정 (예: const scrollRef = useRef(null);)
  const allowedMapping = {
    6: 440,    // 6-7시 segment → 첫 번째 컴포넌트 (offset 0)
    12: 550,  // 12-13시 segment → 두 번째 컴포넌트 (offset 60)
    18: 660, // 18-19시 segment → 세 번째 컴포넌트 (offset 120)
    21: 770, // 21-22시 segment → 네 번째 컴포넌트 (offset 180)
    23: 880, // 23-24시 segment → 다섯 번째 컴포넌트 (offset 240)
  };

  const handleSegmentPress = (index) => {
    // 만약 index가 허용된 값에 포함되어 있다면 target offset을 구하고 스크롤
    if (allowedMapping.hasOwnProperty(index)) {
      const targetOffset = allowedMapping[index];
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ y: targetOffset, animated: true });
      }
    } else {
      // 허용되지 않은 segment를 터치한 경우 아무 동작도 하지 않음
    }
  };

  for (let i = 0; i < segmentCount; i++) {
    const startAngle = i * angleIncrement - Math.PI / 2;;
    const endAngle = (i + 1) * angleIncrement - Math.PI / 2;;

    const x1 = outerRadius + outerRadius * Math.cos(startAngle);
    const y1 = outerRadius + outerRadius * Math.sin(startAngle);
    const x2 = outerRadius + outerRadius * Math.cos(endAngle);
    const y2 = outerRadius + outerRadius * Math.sin(endAngle);

    const x1_inner = outerRadius + innerRadius * Math.cos(startAngle);
    const y1_inner = outerRadius + innerRadius * Math.sin(startAngle);
    const x2_inner = outerRadius + innerRadius * Math.cos(endAngle);
    const y2_inner = outerRadius + innerRadius * Math.sin(endAngle);

    const path_out = `
      M ${outerRadius},${outerRadius} 
      L ${x1},${y1} 
      A ${outerRadius},${outerRadius} 0 0,1 ${x2},${y2} 
      Z
    `;
    const path_in = `
      M ${outerRadius},${outerRadius} 
      L ${x1_inner},${y1_inner} 
      A ${innerRadius},${innerRadius} 0 0,1 ${x2_inner},${y2_inner} 
      Z
    `;

    const fillColor = Colors_out[i % Colors_out.length];
    const fillColor_in = Colors_in[i % Colors_in.length];

    // segments_out에 onPress 추가 (예: 해당 segment를 터치하면 스크롤 이동)
    segments_out.push(
      <Path
        key={`segment-${i}`}
        d={path_out}
        fill={fillColor}
        stroke="#FFF"
        strokeWidth={0}
      />
    );
    segments_in.push(
      <Path
        key={`segment-in-${i}`}
        d={path_in}
        fill={fillColor_in}
        stroke="#FFF"
        strokeWidth={0}
        pointerEvents="auto" // 또는 "auto"
        onPressIn={() => handleSegmentPress(i)}
      />
    );
  }
  
  return (
    <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.timeBar}>
          <Text style={[styles.timeLabel]}>24</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={[styles.timeLabel]}>18 </Text>
            <AnimatedCircularProgress
              size={size}
              width={6}
              fill={percent}
              tintColor="#FF622A"
              backgroundColor="#E7E3DC"
              rotation={0}
            >
              {() => (
                <Svg width={outerSize} height={outerSize} pointerEvents="box-none">
                  <Circle cx={outerRadius} cy={outerRadius} r={outerRadius} fill="#F5F1E9" />
                  {segments_out}
                  <Circle cx={outerRadius} cy={outerRadius} r={innerRadius} fill="#FFFFFF" />
                  {segments_in}
                </Svg>
              )}
            </AnimatedCircularProgress>
            <Text style={[styles.timeLabel]}> 6  </Text>
          </View>
          <Text style={[styles.timeLabel]}>12</Text>
        </View>
        {/* 하단 컴포넌트들 */}
        <View style={[styles.box, { backgroundColor: isChecked1 ? '#B8B8B8' : '#FF622A' }]}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setChecked1(!isChecked1)} // 체크 상태 토글
          >
            {isChecked1 && (<Image source={check} style={{width: 24, height: 24,}}/>)}
          </TouchableOpacity>
          <View style={{width: '75%'}}>
            <Text style={{fontFamily: 'Pretendard_Bold', fontSize: 18, color: '#FFFFFF' }}>미라클 모닝</Text>
          </View>
          <TouchableOpacity style={{width: 25.5, height: 25.5, justifyContent: 'center'}} onPress={() => navigation.navigate('AddRoutin')}>
            <Image source={dot} style={{width: 25.5, height: 6, opacity: 0.3, justifyContent: 'center', alignItems: 'flex-end'}} />            
          </TouchableOpacity>
        </View>
        <View style={[styles.box, { backgroundColor: isChecked2 ? '#B8B8B8' : '#FF3C8C' }]}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setChecked2(!isChecked2)} // 체크 상태 토글
          >
            {isChecked2 && (<Image source={check} style={{width: 24, height: 24,}}/>)}
          </TouchableOpacity>
          <View style={{width: '75%'}}>
            <Text style={{fontFamily: 'Pretendard_Bold', fontSize: 18, color: '#FFFFFF' }}>닭가슴살 먹기(점심)</Text>
          </View>
          <TouchableOpacity style={{width: 25.5, height: 25.5, justifyContent: 'center'}} onPress={() => navigation.navigate('AddRoutin')}>
            <Image source={dot} style={{width: 25.5, height: 6, opacity: 0.3, justifyContent: 'center', alignItems: 'flex-end'}} />            
          </TouchableOpacity>
        </View>
        <View style={[styles.box, { backgroundColor: isChecked3 ? '#B8B8B8' : '#FF3C8C' }]}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setChecked3(!isChecked3)} // 체크 상태 토글
          >
            {isChecked3 && (<Image source={check} style={{width: 24, height: 24,}}/>)}
          </TouchableOpacity>
          <View style={{width: '75%'}}>
            <Text style={{fontFamily: 'Pretendard_Bold', fontSize: 18, color: '#FFFFFF'}}>닭가슴살 먹기(저녁)</Text>
          </View>
          <TouchableOpacity style={{width: 25.5, height: 25.5, justifyContent: 'center'}} onPress={() => navigation.navigate('AddRoutin')}>
            <Image source={dot} style={{width: 25.5, height: 6, opacity: 0.3, justifyContent: 'center', alignItems: 'flex-end'}} />            
          </TouchableOpacity>
        </View>
        <View style={[styles.box, { backgroundColor: isChecked4 ? '#E7E3DC' : '#FFBC0E' }]}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setChecked4(!isChecked4)} // 체크 상태 토글
          >
            {isChecked4 && (<Image source={check} style={{width: 24, height: 24,}}/>)}
          </TouchableOpacity>
          <View style={{width: '75%'}}>
            <Text style={{fontFamily: 'Pretendard_Bold', fontSize: 18, color: '#FFFFFF'}}>독서</Text>
          </View>
          <TouchableOpacity style={{width: 25.5, height: 25.5, justifyContent: 'center'}} onPress={() => navigation.navigate('AddRoutin')}>
            <Image source={dot} style={{width: 25.5, height: 6, opacity: 0.3, justifyContent: 'center', alignItems: 'flex-end'}} />            
          </TouchableOpacity>
        </View>
        <View style={[styles.box, { backgroundColor: isChecked5 ? '#D0D0D0' : '#61CCBF' }]}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setChecked5(!isChecked5)} // 체크 상태 토글
          >
            {isChecked5 && (<Image source={check} style={{width: 24, height: 24,}}/>)}
          </TouchableOpacity>
          <View style={{width: '75%'}}>
            <Text style={{fontFamily: 'Pretendard_Bold', fontSize: 18, color: '#FFFFFF'}}>일기 쓰기</Text>
          </View>
          <TouchableOpacity style={{width: 25.5, height: 25.5, justifyContent: 'center'}} onPress={() => navigation.navigate('AddRoutin')}>
            <Image source={dot} style={{width: 25.5, height: 6, opacity: 0.3, justifyContent: 'center', alignItems: 'flex-end'}} />            
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF', 
    padding: 20
  },
  timeBar: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  timeLabel: {
    fontSize: 14,
    color: '#B8B8B8',
  },
  box: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    borderRadius: 15,
    width: '100%',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  }
});
