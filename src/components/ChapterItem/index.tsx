import React from 'react';
import { View } from 'react-native';
import DefaultText from '../DefaultText';
import { TextTypes } from '../DefaultText';
import { styles } from './styles';
import ButtonAnimation from '../ButtonAnimation';

export interface Chapter {
  id: string;
  title: string;
  icon: string;
}

interface ChapterItemProps {
  chapter: Chapter;
  onPress: (chapter: Chapter) => void;
}

const ChapterItem = ({ chapter, onPress }: ChapterItemProps) => {
  return (
    <ButtonAnimation
      onPress={() => onPress(chapter)}
      style={styles.chapterItem}
    >
      <View style={styles.iconContainer}>
        <DefaultText style={styles.icon}>{chapter.icon}</DefaultText>
      </View>
      <DefaultText fontSize={16} type={TextTypes.SEMI_BOLD}>
        {chapter.title}
      </DefaultText>
    </ButtonAnimation>
  );
};

export default ChapterItem;
