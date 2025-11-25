import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Voice from '@react-native-voice/voice';
import { RootStackParamList } from '../../navigation/InterviewStack';
import { ROUTES } from '../../navigation/routes';
import { styles } from './styles';
import DefaultText, { TextTypes } from '../../components/DefaultText';
import WaveForm from '../../components/WaveForm';
import MessageBubble from '../../components/MessageBubble';
import ButtonAnimation from '../../components/ButtonAnimation';

type InterviewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  typeof ROUTES.INTERVIEW
>;

type InterviewScreenRouteProp = RouteProp<
  RootStackParamList,
  typeof ROUTES.INTERVIEW
>;

type Props = {
  navigation: InterviewScreenNavigationProp;
  route: InterviewScreenRouteProp;
};

interface Message {
  id: string;
  text: string;
  isQuestion: boolean;
}

const chapterQuestions: Record<string, string> = {
  '1': 'Tell me about a random memory that brings a smile to your face?',
  '2': 'What is your earliest childhood memory?',
  '3': 'Who was your first love and what made them special?',
  '4': 'What was your first job and what did you learn from it?',
  '5': 'What is your favorite holiday memory?',
  '6': 'What family tradition means the most to you?',
  '7': 'Who was the most important person in your family?',
};

const chapterTitles: Record<string, string> = {
  '1': 'Mixed Questions',
  '2': 'Childhood',
  '3': 'Love',
  '4': 'Work',
  '5': 'Holidays',
  '6': 'Traditions',
  '7': 'Family',
};

const Interview = ({ navigation, route }: Props) => {
  const { chapterId } = route.params;
  const [isRecording, setIsRecording] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');

  const getInitialQuestion = (id: string): Message => ({
    id: '1',
    text: chapterQuestions[id] || 'Tell me about yourself.',
    isQuestion: true,
  });

  const [messages, setMessages] = useState<Message[]>([
    getInitialQuestion(chapterId),
  ]);
  const [isKeyboardMode, setIsKeyboardMode] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = () => {
    setIsRecording(true);
  };

  const onSpeechEnd = () => {
    setIsRecording(false);
  };

  const onSpeechResults = (event: any) => {
    const text = event.value?.[0] || '';
    setCurrentAnswer(text);
  };

  const onSpeechError = (event: any) => {
    console.error('Speech error:', event.error);
    setIsRecording(false);

    // Don't show alert for "no speech detected" - this is normal when stopping
    if (
      event.error?.code === '1110' ||
      event.error?.message?.includes('1110')
    ) {
      // This is expected when user stops recording without speaking
      return;
    }

    // Only show alert for actual errors
    if (event.error?.code && event.error.code !== 'recognition_fail') {
      Alert.alert('Error', 'Failed to recognize speech. Please try again.');
    }
  };

  const requestMicrophonePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message:
              'This app needs access to your microphone for voice recording',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS permissions are handled automatically
  };

  const startRecording = async () => {
    try {
      const hasPermission = await requestMicrophonePermission();

      if (!hasPermission) {
        Alert.alert(
          'Permission Denied',
          'Please grant microphone permission to use voice recording',
        );
        return;
      }

      await Voice.start('en-US');
      setCurrentAnswer('');
    } catch (error) {
      console.error('Failed to start recording:', error);
      Alert.alert(
        'Error',
        'Failed to start recording. Please check microphone permissions.',
      );
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleSendAnswer = () => {
    if (currentAnswer.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: currentAnswer,
        isQuestion: false,
      };
      setMessages([...messages, newMessage]);
      setCurrentAnswer('');

      // Simulate next question after a delay
      setTimeout(() => {
        const nextQuestion: Message = {
          id: (Date.now() + 1).toString(),
          text: 'What was the most valuable lesson they taught you?',
          isQuestion: true,
        };
        setMessages(prev => [...prev, nextQuestion]);
      }, 1000);
    }
  };

  const handleFinish = () => {
    Alert.alert(
      'Finish Interview',
      'Are you sure you want to finish the interview?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Finish',
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };

  const handleEditMessage = (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (message && !message.isQuestion) {
      setCurrentAnswer(message.text);
      setMessages(messages.filter(m => m.id !== messageId));
      setIsKeyboardMode(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <ButtonAnimation
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <DefaultText style={styles.backButtonText}>←</DefaultText>
        </ButtonAnimation>
        <DefaultText fontSize={18} type={TextTypes.BOLD}>
          {chapterTitles[chapterId] || 'AI Interview'}
        </DefaultText>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.waveFormContainer}>
        <WaveForm isActive={isRecording} />
      </View>

      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map(message => (
          <MessageBubble
            key={message.id}
            text={message.text}
            isQuestion={message.isQuestion}
            onEdit={
              !message.isQuestion
                ? () => handleEditMessage(message.id)
                : undefined
            }
            onPlayAudio={
              message.isQuestion ? () => console.log('Play audio') : undefined
            }
          />
        ))}
        {currentAnswer && !isKeyboardMode ? (
          <MessageBubble
            text={currentAnswer}
            isQuestion={false}
            onEdit={() => setIsKeyboardMode(true)}
          />
        ) : null}
      </ScrollView>

      {isKeyboardMode && (
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            value={currentAnswer}
            onChangeText={setCurrentAnswer}
            placeholder="Type your answer..."
            multiline
            autoFocus
          />
          <ButtonAnimation
            style={styles.sendButton}
            onPress={() => {
              handleSendAnswer();
              setIsKeyboardMode(false);
            }}
          >
            <DefaultText style={styles.sendButtonText}>Send</DefaultText>
          </ButtonAnimation>
        </View>
      )}

      {currentAnswer && !isKeyboardMode && !isRecording && (
        <View style={styles.actionButtonsContainer}>
          <ButtonAnimation
            style={styles.sendAnswerButton}
            onPress={handleSendAnswer}
          >
            <DefaultText style={styles.sendAnswerButtonText}>
              Send Answer
            </DefaultText>
          </ButtonAnimation>
        </View>
      )}

      <View style={styles.controlsContainer}>
        <ButtonAnimation
          style={styles.keyboardButton}
          onPress={() => setIsKeyboardMode(!isKeyboardMode)}
        >
          <DefaultText style={styles.keyboardIcon}>⌨️</DefaultText>
        </ButtonAnimation>

        <ButtonAnimation
          style={[styles.micButton, isRecording && styles.micButtonActive]}
          onPress={toggleRecording}
        >
          <DefaultText style={styles.micIcon}>🎤</DefaultText>
        </ButtonAnimation>

        <ButtonAnimation style={styles.finishButton} onPress={handleFinish}>
          <DefaultText style={styles.finishButtonText}>Finish</DefaultText>
        </ButtonAnimation>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Interview;
