import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { colors } from '../../utils/colors';
import { styles } from './styles';

interface WaveFormProps {
  isActive?: boolean;
  color?: string;
}

const WaveForm: React.FC<WaveFormProps> = ({
  isActive = false,
  color = colors.blue.highlight,
}) => {
  const numberOfBars = 40;
  const animations = useRef(
    Array.from({ length: numberOfBars }, () => new Animated.Value(0.3)),
  ).current;

  useEffect(() => {
    if (isActive) {
      const animateBar = (index: number) => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(animations[index], {
              toValue: Math.random() * 0.7 + 0.3,
              duration: Math.random() * 300 + 200,
              useNativeDriver: false,
            }),
            Animated.timing(animations[index], {
              toValue: Math.random() * 0.7 + 0.3,
              duration: Math.random() * 300 + 200,
              useNativeDriver: false,
            }),
          ]),
        ).start();
      };

      animations.forEach((_, index) => {
        setTimeout(() => animateBar(index), index * 20);
      });
    } else {
      animations.forEach(anim => {
        anim.setValue(0.3);
      });
    }
  }, [isActive, animations]);

  return (
    <View style={styles.container}>
      {animations.map((anim, index) => {
        const height = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 80],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.bar,
              {
                height,
                backgroundColor: color,
                opacity: isActive ? 1 : 0.4,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

export default WaveForm;
