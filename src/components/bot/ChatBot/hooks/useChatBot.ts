import type { Message, QuickOption } from '@/helpers/types/bot.types';
import { useEffect, useRef, useState } from 'react';
import { CHAT_BOT_CONSTANTS } from '../constants';

const useChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showQuickOptions, setShowQuickOptions] = useState<boolean>(true);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { BOT_RES, QUICK_OPTIONS } = CHAT_BOT_CONSTANTS;

  const getBotResponse = (message: string): string => {
    const text = message.toLowerCase();
    for (const [key, response] of Object.entries(BOT_RES)) {
      if (text.includes(key)) {
        return response;
      }
    }
    return BOT_RES.default;
  };

  useEffect(() => {
    const welcomeMessage: Message = {
      type: 'message',
      sender: 'other',
      text: 'Xin chào! Tôi là EduBot - Trợ lý tư vấn khóa học online. Tôi có thể giúp bạn tìm hiểu về các khóa học lập trình, thiết kế, marketing và nhiều lĩnh vực khác. Bạn cần tư vấn về vấn đề gì?',
      time: new Date().toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      timestamp: new Date().toISOString(),
      showOptions: true,
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  const handleQuickOption = (option: QuickOption) => {
    setShowQuickOptions(false);
    handleSendMessage(option.query);
  };

  const handleSendMessage = async (messageText: string | null = null) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;
    setShowQuickOptions(false);

    const now = new Date();
    const time = now.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMessage: Message = {
      type: 'message',
      sender: 'me',
      text,
      time,
      timestamp: now.toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        type: 'message',
        sender: 'other',
        text: getBotResponse(text),
        time: new Date().toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        timestamp: new Date().toISOString(),
        showOptions: Math.random() > 0.5,
      };

      setIsTyping(false);
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSend = () => {
    handleSendMessage();
  };

  const handleKeyPress = (e: { key: string; shiftKey: unknown; preventDefault: () => void }) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return {
    state: {
      messages,
      input,
      isLoading,
      isTyping,
      showQuickOptions,
      chatContainerRef,
      textareaRef,
      QUICK_OPTIONS,
    },
    handler: {
      setInput,
      handleQuickOption,
      handleSendMessage,
      handleSend,
      handleKeyPress,
      setShowQuickOptions,
    },
  };
};

export { useChatBot };
