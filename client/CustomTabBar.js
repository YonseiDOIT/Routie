import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';

export default function CustomTabBar({ state, descriptors, navigation }) {
  // 시각적으로 렌더링할 순서를 지정 (원하는 순서로 재배열 가능)
  const visualOrder = ['Calendar', 'Routin', 'Mypage'];

  // 각 탭에 사용할 아이콘 매핑 (파일 경로에 맞게 수정)
  const icons = {
    Calendar: require('./assets/images/calendar.png'),
    Routin: require('./assets/images/routin.png'),
    Mypage: require('./assets/images/user.png'),
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 70,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 0,
        paddingHorizontal: 30
      }}
    >
      {visualOrder.map((routeName) => {
        // state.routes 배열에서 해당 route 정보를 가져옵니다.
        const route = state.routes.find((r) => r.name === routeName);
        if (!route) return null;

        const { options } = descriptors[route.key];
        // label 우선순위: options.tabBarLabel > options.title > route.name
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === state.routes.indexOf(route);

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <View style={{ alignItems: 'center' }}>
              {/* 각 탭에 매핑된 아이콘 이미지 */}
              <Image
                source={icons[routeName]}
                style={{
                  tintColor: isFocused ? '#61605E' : '#D0D0D0',
                  width: 24,
                  height: 24,
                }}
              />
              {/* 아이콘 아래에 탭 제목(label) 표시 */}
              <Text
                style={[
                  {
                    color: isFocused ? '#61605E' : '#D0D0D0',
                    fontFamily: 'Pretendard_Medium',
                    fontSize: 11,
                    marginTop: 5,
                  },
                  // 스크린 옵션으로 전달된 라벨 텍스트 스타일을 병합
                  options.tabBarLabelStyle,
                ]}
              >
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
