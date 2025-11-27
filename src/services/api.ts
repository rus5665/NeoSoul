import axios from 'axios';
import { API_CONFIG } from '../constants/config';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface InterviewRequest {
  text: string;
}

export interface N8nOutput {
  output: Array<{
    id: string;
    type: string;
    status: string;
    content: Array<{
      type: string;
      text: string;
      annotations?: any[];
      logprobs?: any[];
    }>;
    role: string;
  }>;
}

export interface InterviewResponse {
  question: string;
  completed?: boolean;
}

const api = axios.create({
  baseURL: API_CONFIG.N8N_WEBHOOK_URL,
  timeout: API_CONFIG.REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper функция для извлечения текста из n8n ответа
const extractTextFromN8nResponse = (data: N8nOutput): string => {
  try {
    if (data.output && data.output.length > 0) {
      const firstOutput = data.output[0];
      if (firstOutput.content && firstOutput.content.length > 0) {
        return firstOutput.content[0].text || '';
      }
    }
    return '';
  } catch (error) {
    console.error('Failed to extract text from n8n response:', error);
    return '';
  }
};

export const interviewApi = {
  // Получить первый вопрос
  getInitialQuestion: async (chapterId: string): Promise<InterviewResponse> => {
    try {
      const requestData = {
        text: `Start an interview about topic: ${chapterId}. Ask the first meaningful question.`,
      };
      console.log('🚀 Sending initial question request:', requestData);
      
      const response = await api.post<N8nOutput>('', requestData);
      console.log('✅ Initial question raw response:', response.data);
      
      const questionText = extractTextFromN8nResponse(response.data);
      console.log('📝 Extracted question:', questionText);
      
      return {
        question: questionText,
        completed: false,
      };
    } catch (error) {
      console.error('❌ Failed to get initial question:', error);
      if (axios.isAxiosError(error)) {
        console.error('Response data:', error.response?.data);
        console.error('Response status:', error.response?.status);
        console.error('Request URL:', error.config?.url);
      }
      throw error;
    }
  },

  // Отправить ответ и получить следующий вопрос
  sendAnswer: async (
    chapterId: string,
    messages: ChatMessage[],
    answer: string,
  ): Promise<InterviewResponse> => {
    try {
      // Формируем контекст из истории сообщений
      const conversationHistory = messages
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');
      
      const requestData = {
        text: `Continue the interview about ${chapterId}.\n\nConversation history:\n${conversationHistory}\n\nLatest answer: ${answer}\n\nAsk the next follow-up question based on this answer.`,
      };
      
      console.log('🚀 Sending answer:', requestData);
      
      const response = await api.post<N8nOutput>('', requestData);
      console.log('✅ Next question raw response:', response.data);
      
      const questionText = extractTextFromN8nResponse(response.data);
      console.log('📝 Extracted question:', questionText);
      
      return {
        question: questionText,
        completed: false,
      };
    } catch (error) {
      console.error('❌ Failed to send answer:', error);
      if (axios.isAxiosError(error)) {
        console.error('Response data:', error.response?.data);
        console.error('Response status:', error.response?.status);
        console.error('Request URL:', error.config?.url);
        console.error('Request headers:', error.config?.headers);
      }
      throw error;
    }
  },
};
