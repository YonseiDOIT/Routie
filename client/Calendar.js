import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function Routin() {
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={[ 'top', 'bottom']} style={{ flex: 1, backgroundColor: '#F5F1E9', paddingHorizontal: 20}}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
        >
          <View>
            {/* <View style={{ flexDirection: 'row', paddingVertical: 15, backgroundColor: '#F5F1E9', alignItems: 'center'}}>
              <TouchableOpacity onPress={()=> {}}>
                <Text>날짜 들어갈 공간</Text>
              </TouchableOpacity>
            </View> */}
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center', height: '100%'}}>
            <Text style={{fontFamily: 'Pretendard_SemiBold', fontSize: 24, color: '#61605E'}}>Coming Soon!</Text>
          </View>
          </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
});
