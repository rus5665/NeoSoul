import React from 'react';
import Animated from 'react-native-reanimated';
import { styles } from './styles';
import { colors } from '../../utils/colors';
import { scale } from '../../utils/scale';
import { TextProps } from 'react-native';

export const TextTypes = {
  REGULAR: 'regular',
  BOLD: 'bold',
  MEDIUM: 'medium',
  SEMI_BOLD: 'semiBold',
  EXTRA_BOLD: 'extraBold',
  MEDIUM_ITALIC: 'mediumItalic',
  SEMI_BOLD_ITALIC: 'semiBoldItalic',
  BOLD_ITALIC: 'boldItalic',
  ITALIC: 'italic',
};

interface DefaultTextProps extends TextProps {
  type?: string;
  color?: string;
  fontSize?: number;
  lineHeight?: number;
  letterSpacing?: number;
}

const DefaultText = (props: DefaultTextProps) => {
  const {
    children,
    style,
    type = TextTypes.REGULAR,
    color = colors.text.black,
    fontSize = 14,
    lineHeight,
    letterSpacing = 0,
    ...other
  } = props;

  const typeStyle = styles[type as keyof typeof styles];
  const extraStyles = [
    {
      color,
    },
    !!fontSize && { fontSize: scale(fontSize) },
    !!lineHeight && { lineHeight: scale(lineHeight) },
    letterSpacing !== 0 && { letterSpacing },
  ];

  return (
    <Animated.Text
      {...other}
      style={[styles.text, typeStyle, extraStyles, style]}
    >
      {children}
    </Animated.Text>
  );
};

export default DefaultText;
