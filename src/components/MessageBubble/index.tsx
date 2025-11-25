import React from 'react';
import { View } from 'react-native';
import ButtonAnimation from '../ButtonAnimation';
import DefaultText from '../DefaultText';
import { styles } from './styles';

interface MessageBubbleProps {
  text: string;
  isQuestion?: boolean;
  onEdit?: () => void;
  onPlayAudio?: () => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  text,
  isQuestion = false,
  onEdit,
  onPlayAudio,
}) => {
  return (
    <View
      style={[
        styles.container,
        isQuestion ? styles.questionContainer : styles.answerContainer,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isQuestion ? styles.questionBubble : styles.answerBubble,
        ]}
      >
        <DefaultText
          style={[
            styles.text,
            isQuestion ? styles.questionText : styles.answerText,
          ]}
        >
          {text}
        </DefaultText>
      </View>

      {onPlayAudio && (
        <ButtonAnimation
          style={[styles.iconButton, styles.audioButton]}
          onPress={onPlayAudio}
        >
          <DefaultText style={styles.iconText}>🔊</DefaultText>
        </ButtonAnimation>
      )}

      {onEdit && (
        <ButtonAnimation
          style={[styles.iconButton, styles.editButton]}
          onPress={onEdit}
        >
          <DefaultText style={styles.iconText}>✏️</DefaultText>
        </ButtonAnimation>
      )}
    </View>
  );
};

export default MessageBubble;
