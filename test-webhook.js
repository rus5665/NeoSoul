// Тестовый скрипт для проверки n8n webhook
const axios = require('axios');

const WEBHOOK_URL = 'https://disturbingly-diapasonal-sherita.ngrok-free.dev/webhook-test/interview';

async function testWebhook() {
  console.log('🧪 Testing n8n webhook...');
  console.log('URL:', WEBHOOK_URL);
  
  try {
    // Тест 1: Получить первый вопрос
    console.log('\n📝 Test 1: Get initial question');
    const response1 = await axios.post(WEBHOOK_URL, {
      text: 'Start an interview about Work. Ask the first meaningful question.',
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });
    
    console.log('✅ Success!');
    console.log('Status:', response1.status);
    console.log('Data:', JSON.stringify(response1.data, null, 2));
    
    // Extract question
    if (response1.data.output && response1.data.output[0]) {
      const question = response1.data.output[0].content[0].text;
      console.log('📝 Extracted question:', question);
    }
    
    // Тест 2: Отправить ответ
    console.log('\n📝 Test 2: Send answer');
    const response2 = await axios.post(WEBHOOK_URL, {
      text: 'Continue the interview about Work.\n\nConversation history:\nassistant: What was your first job?\nuser: I worked at a coffee shop\n\nLatest answer: I worked at a coffee shop\n\nAsk the next follow-up question.',
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });
    
    console.log('✅ Success!');
    console.log('Status:', response2.status);
    console.log('Data:', JSON.stringify(response2.data, null, 2));
    
  } catch (error) {
    console.error('❌ Error:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received');
      console.error('Request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
  }
}

testWebhook();

