// Configuration file for API endpoints and other constants

export const API_CONFIG = {
  // n8n webhook URL (используйте production URL из активного workflow)
  // Убедитесь что workflow активен (Active, не Inactive)
  N8N_WEBHOOK_URL:
    'https://disturbingly-diapasonal-sherita.ngrok-free.dev/webhook/interview',

  // Timeout для запросов (в миллисекундах)
  REQUEST_TIMEOUT: 30000,
};

export const INTERVIEW_CONFIG = {
  // Максимальное количество вопросов в интервью
  MAX_QUESTIONS: 10,

  // Минимальная длина ответа
  MIN_ANSWER_LENGTH: 10,
};
