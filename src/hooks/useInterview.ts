import { useMutation, useQuery } from '@tanstack/react-query';
import { interviewApi, ChatMessage } from '../services/api';

// Hook для получения первого вопроса
export const useInitialQuestion = (chapterId: string) => {
  return useQuery({
    queryKey: ['initialQuestion', chapterId],
    queryFn: () => interviewApi.getInitialQuestion(chapterId),
    enabled: !!chapterId,
    staleTime: Infinity, // Не перезапрашивать
  });
};

// Hook для отправки ответа и получения следующего вопроса
export const useSendAnswer = () => {
  return useMutation({
    mutationFn: ({
      chapterId,
      messages,
      answer,
    }: {
      chapterId: string;
      messages: ChatMessage[];
      answer: string;
    }) => interviewApi.sendAnswer(chapterId, messages, answer),
  });
};

// Hook для управления состоянием интервью
export const useInterviewState = (chapterId: string) => {
  const initialQuestion = useInitialQuestion(chapterId);
  const sendAnswer = useSendAnswer();

  return {
    initialQuestion,
    sendAnswer,
    isLoading: initialQuestion.isLoading || sendAnswer.isPending,
    error: initialQuestion.error || sendAnswer.error,
  };
};
