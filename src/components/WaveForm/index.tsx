import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { colors } from '../../utils/colors';
import { styles } from './styles';

interface WaveFormProps {
  isActive?: boolean;
  color?: string;
  volume?: number;
}

const WaveForm: React.FC<WaveFormProps> = ({
  isActive = false,
  color = colors.blue.highlight,
  volume = 0,
}) => {
  const numberOfBars = 40;
  const animations = useRef(
    Array.from({ length: numberOfBars }, () => new Animated.Value(0.05)),
  ).current;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const volumeRef = useRef(volume);

  // Update volume ref
  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  useEffect(() => {
    if (isActive) {
      // Continuously animate based on volume
      intervalRef.current = setInterval(() => {
        const currentVolume = volumeRef.current;
        animations.forEach(anim => {
          let targetValue: number;

          if (currentVolume > 0) {
            // Voice detected - animate based on volume
            const baseValue = 0.15 + currentVolume * 0.7;
            targetValue = baseValue + Math.random() * 0.2;
          } else {
            // Idle - gentle movement
            targetValue = 0.05 + Math.random() * 0.08;
          }

          Animated.timing(anim, {
            toValue: targetValue,
            duration: 150,
            useNativeDriver: false,
          }).start();
        });
      }, 150);
    } else {
      // Stop animation and reset
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      animations.forEach(anim => {
        anim.setValue(0.05);
      });
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, animations]);

  return (
    <View style={styles.container}>
      {animations.map((anim, index) => {
        const height = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [3, 80],
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
