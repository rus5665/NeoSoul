import React from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ButtonAnimationProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const ButtonAnimation: React.FC<ButtonAnimationProps> = ({
  children,
  onPress,
  style,
  disabled = false,
}) => {
  const scale = useSharedValue(1);

  const onPressHandler = () => {
    scale.value = withTiming(0.93, { duration: 70 }, () => {
      scale.value = withTiming(1, { duration: 70 });
    });
    onPress();
  };

  const animateStyle = useAnimatedStyle(() => {
    return { transform: [{ scale: scale.value }] };
  }, [scale]);

  return (
    <AnimatedPressable
      style={[style, animateStyle]}
      onPress={onPressHandler}
      disabled={disabled}
    >
      {children}
    </AnimatedPressable>
  );
};

export default ButtonAnimation;
