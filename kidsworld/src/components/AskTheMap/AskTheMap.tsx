import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Globe, Loader2 } from 'lucide-react';
import { apiClient } from '../../lib/api-client';
import { useLanguage } from '../../contexts/LanguageContext';

interface Message {
  id: string;
  type: 'question' | 'answer';
  content: string;
  timestamp: Date;
}

export function AskTheMap() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      type: 'answer',
      content: language === 'ar'
        ? '👋 مرحبًا! أنا ليو 🦁\nهيا نكتشف العالم معًا 🌍\nاسألني عن أي بلد، حيوان، طعام، أو مكان'
        : '👋 Hi! I\'m Leo 🦁\nLet\'s discover the world together!\nAsk me about any country, animal, food, or place 🌍',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, [language]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const questionText = input.trim();
    setInput('');

    // Add user question to messages
    const userMessage: Message = {
      id: `q-${Date.now()}`,
      type: 'question',
      content: questionText,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await apiClient.askTheMap(questionText, language);

      // Add AI answer to messages
      const answerMessage: Message = {
        id: `a-${Date.now()}`,
        type: 'answer',
        content: response.answer,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, answerMessage]);

    } catch (error) {
      console.error('Error asking question:', error);

      // Error message
      const errorMessage: Message = {
        id: `e-${Date.now()}`,
        type: 'answer',
        content: language === 'ar'
          ? '🤔 هممم… لنجرب بلدًا آخر!'
          : '🤔 Hmm… let\'s try another country!',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = language === 'ar' ? [
    'أخبرني عن مصر',
    'ما هي عاصمة فرنسا؟',
    'ما هي الحيوانات الشهيرة في أستراليا؟',
    'ما هو الطعام الشهير في إيطاليا؟',
  ] : [
    'Tell me about Egypt',
    'What is the capital of France?',
    'What animals live in Australia?',
    'What food is Italy famous for?',
  ];

  const handleSuggestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-t-3xl shadow-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="bg-white bg-opacity-20 p-4 rounded-2xl">
            <Globe className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-3xl font-black flex items-center gap-2">
              <Sparkles className="w-8 h-8" />
              {language === 'ar' ? 'اكتشف مع ليو 🦁' : 'Discover with Leo 🦁'}
            </h1>
            <p className="text-lg opacity-90">
              {language === 'ar'
                ? 'رحلة مرحة حول العالم'
                : 'A fun journey around the world'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 bg-white overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'question' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.type === 'question'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-gradient-to-r from-green-50 to-blue-50 text-gray-800 border-2 border-blue-200'
              }`}
            >
              {message.type === 'answer' && (
                <div className="flex items-center gap-2 mb-2 text-blue-600 font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">{language === 'ar' ? 'ليو 🦁' : 'Leo 🦁'}</span>
                </div>
              )}
              <p className="text-lg leading-relaxed whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 text-gray-800 border-2 border-blue-200 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                <span>{language === 'ar' ? 'ليو يفكر... 🦁' : 'Leo is thinking... 🦁'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Suggested Questions (show when no messages or just welcome) */}
        {messages.length <= 1 && (
          <div className="mt-6">
            <p className="text-gray-600 font-semibold mb-3">
              {language === 'ar' ? '💡 جرب هذه الأسئلة:' : '💡 Try these questions:'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestion(q)}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-gray-700 p-3 rounded-xl text-left border-2 border-blue-200 transition-all transform hover:scale-105 hover:shadow-md"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t-2 border-gray-200 rounded-b-3xl shadow-2xl p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              language === 'ar'
                ? 'اسأل ليو عن أي مكان في العالم... 🌍'
                : 'Ask Leo about any place in the world... 🌍'
            }
            disabled={loading}
            className={`flex-1 px-6 py-4 rounded-2xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none text-lg ${
              language === 'ar' ? 'text-right' : 'text-left'
            }`}
            maxLength={500}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className={`px-8 py-4 rounded-2xl font-bold text-white transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
              loading
                ? 'bg-gray-400'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg'
            }`}
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Send className="w-6 h-6" />
            )}
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-500 text-center">
          {language === 'ar'
            ? '🦁 ليو جاهز للإجابة عن البلدان، الحيوانات، الطعام، والأماكن المدهشة!'
            : '🦁 Leo is ready to tell you about countries, animals, food, and amazing places!'}
        </div>
      </div>
    </div>
  );
}
