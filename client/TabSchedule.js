import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Svg, { Circle, Path } from 'react-native-svg';
import { ScrollView } from 'react-native-gesture-handler';
import dot from './assets/images/3dot.png';

export default function TabRoutin() {
  const navigation = useNavigation();
  const scrollRef = useRef(null); // ScrollView의 ref 생성

  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [percent, setPercent] = useState(0); // 현재 시간의 퍼센트
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

      // 하루 총 초: 24h * 60m * 60s = 86400
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      const progress = (totalSeconds / 86400) * 100; // 현재 시간 퍼센트 계산

      setPercent(progress);
      setCurrentTime(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      );
    };

    updateTime(); // 초기 호출
    const interval = setInterval(updateTime, 1000); // 매초 업데이트

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
  }, []);

  const size = Dimensions.get('window').width * 0.8; // 원형 크기
  const outerSize = Dimensions.get('window').width * 0.73; // 원형 크기
  const innerSize = Dimensions.get('window').width * 0.6; // 원형 크기
  const outerRadius = outerSize / 2; // 외부 원의 반지름
  const innerRadius = innerSize / 2; // 내부 원의 반지름

  const segmentCount = 24; // 분할 개수
  const angleIncrement = (2 * Math.PI) / segmentCount; // 각 분할의 각도

  const segments_out = [];
  const segments_in = [];
  const Colors_out= [
    routie_02, routie_02, routie_02, routie_02, routie_02, routie_02,     
    routie_02, routie_02, routie_Main, routie_Main, routie_Main, routie_Main, 
    routie_02, routie_Main, routie_Main, routie_Main, routie_02, routie_02, 
    '#61CCBF', '#61CCBF', routie_02, routie_02, routie_02, routie_02, 
  ];
  const Colors_in = [
    routie_01, routie_01, routie_01, routie_01, routie_01, routie_01,
    routie_03, routie_01, routie_01, routie_01, routie_01, routie_01, 
    routie_05, routie_01, routie_01, routie_01, routie_01, routie_01,
    routie_05, routie_01, routie_01, routie_03, routie_01, routie_06, 
  ];

  // ScrollView의 ref는 이미 선언되어 있다고 가정 (예: const scrollRef = useRef(null);)
  const allowedMapping = {
    8: 440,
    9: 440,
    10: 440,
    11: 440,
    13: 550,
    14: 550,
    15: 550,
    18: 660,
    19: 660,
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

    // 시작점과 끝점 계산
    const x1 =  outerRadius +  outerRadius * Math.cos(startAngle);
    const y1 =  outerRadius +  outerRadius * Math.sin(startAngle);
    const x2 =  outerRadius +  outerRadius * Math.cos(endAngle);
    const y2 =  outerRadius +  outerRadius * Math.sin(endAngle);

    const x1_inner = outerRadius + innerRadius * Math.cos(startAngle); // 동일한 중심 좌표 사용
    const y1_inner = outerRadius + innerRadius * Math.sin(startAngle);
    const x2_inner = outerRadius + innerRadius * Math.cos(endAngle);
    const y2_inner = outerRadius + innerRadius * Math.sin(endAngle);

    // Path를 사용해 부채꼴 모양 섹션 생성
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

    // 랜덤 색상 적용
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
        pointerEvents="auto" // 또는 "auto"
        onPressIn={() => handleSegmentPress(i)}
      />
    );
    segments_in.push(
      <Path
        key={`segment-in-${i}`}
        d={path_in}
        fill={fillColor_in}
        stroke="#FFF"
        strokeWidth={0}
      />
    );
  }
  
  return (
    <ScrollView ref={scrollRef}>
      <View style={styles.container}>
        <View style={styles.timeBar}>
          <Text style={[styles.timeLabel]}>24</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={[styles.timeLabel]}>18 </Text>
            <AnimatedCircularProgress
              size={size} // 원형 크기
              width={6} // 테두리 두께
              fill={percent} // 퍼센트 값 (채워질 비율)
              tintColor="#FF622A" // 진행 색상
              backgroundColor="#E7E3DC" // 배경 색상
              rotation={0} // 0도부터 시작
            >
              {() => (
                <Svg width={outerSize} height={outerSize}>
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
        <View style={[styles.box, { backgroundColor: '#FF622A' }]}>
          <View style={{width: '75%'}}>
            <Text style={{fontFamily: 'Pretendard_Bold', fontSize: 18, color: '#FFFFFF' }}>오전 수업</Text>
          </View>
          <TouchableOpacity style={{width: 25.5, height: 25.5, justifyContent: 'center'}} onPress={() => navigation.navigate('AddSchedule')}>
            <Image source={dot} style={{width: 25.5, height: 6, opacity: 0.3, justifyContent: 'center', alignItems: 'flex-end'}} />            
          </TouchableOpacity>
        </View>
        <View style={[styles.box, { backgroundColor: '#FF622A' }]}>
          <View style={{width: '75%'}}>
            <Text style={{fontFamily: 'Pretendard_Bold', fontSize: 18, color: '#FFFFFF' }}>오후 수업</Text>
          </View>
          <TouchableOpacity style={{width: 25.5, height: 25.5, justifyContent: 'center'}} onPress={() => navigation.navigate('AddSchedule')}>
            <Image source={dot} style={{width: 25.5, height: 6, opacity: 0.3, justifyContent: 'center', alignItems: 'flex-end'}} />            
          </TouchableOpacity>
        </View>
        <View style={[styles.box, { backgroundColor: '#61CCBF' }]}>
          <View style={{width: '75%'}}>
            <Text style={{fontFamily: 'Pretendard_Bold', fontSize: 18, color: '#FFFFFF'}}>DO IT 팀 회의</Text>
          </View>
          <TouchableOpacity style={{width: 25.5, height: 25.5, justifyContent: 'center'}} onPress={() => navigation.navigate('AddSchedule')}>
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
  timeBar:{
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  timeLabel:{
    alignItems: 'center',
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
    borderStyle: 'none',
    borderWidth: 0
  }
});