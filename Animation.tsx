import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';

const Animation = () => {
  const progress = useRef(new Animated.Value(0.5)).current;
  const textFontSize = useRef(new Animated.Value(0.5)).current;
  const HEIGHT = Dimensions.get('window').height;
  const WIDTH = Dimensions.get('window').width;
  const SIZE = 100.0;
  const BORDERRADIUS = 40;
  useEffect(() => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 0.5,
          useNativeDriver: false,
        }),
        Animated.timing(progress, {
          toValue: 1,
          useNativeDriver: false,
          duration: 1500,
        }),
      ]),
      Animated.sequence([
        Animated.spring(textFontSize, {
          toValue: 0.5,
          useNativeDriver: true,
        }),
        Animated.spring(textFontSize, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.square,
          {
            width: progress.interpolate({
              inputRange: [0.5, 1],
              outputRange: [SIZE, WIDTH],
            }),
            height: progress.interpolate({
              inputRange: [0.5, 1],
              outputRange: [SIZE, HEIGHT],
            }),
            borderRadius: progress.interpolate({
              inputRange: [0.5, 1],
              outputRange: [SIZE / 2, SIZE / 4],
            }),
            opacity: progress,
          },
        ]}>
        <Animated.Text
          style={[
            styles.welcomeText,
            {
              fontSize: progress.interpolate({
                inputRange: [0.5, 1],
                outputRange: [4, 20],
              }),
              transform: [
                {
                  translateY: progress.interpolate({
                    inputRange: [0.5, 1],
                    outputRange: [0, -100],
                  }),
                },
              ],
            },
          ]}>
          Animation Example
        </Animated.Text>

        <Animated.Image
          source={require('../assets/images/background.jpg')}
          style={{
            width: progress.interpolate({
              inputRange: [0.5, 1],
              outputRange: [10, 200],
            }),
            height: progress.interpolate({
              inputRange: [0.5, 1],
              outputRange: [10, 220],
            }),
            borderRadius: BORDERRADIUS,
          }}
        />

        <Animated.Text
          style={[
            styles.welcomeText,
            {
              fontSize: progress.interpolate({
                inputRange: [0.5, 1],
                outputRange: [4, 30],
              }),
              transform: [
                {
                  translateY: progress.interpolate({
                    inputRange: [0.5, 1],
                    outputRange: [0, 100],
                  }),
                },
              ],
            },
          ]}>
          Happy New Year 🎄 {'\n'}
          {'\n'}
          Mutlu Yıllar 🎄
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    backgroundColor: '#E64646',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
});
export default Animation;
