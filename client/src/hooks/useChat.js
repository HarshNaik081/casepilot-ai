import { useState } from 'react';
import { sendMessage } from '../utils/api';
import { API_URL } from '../utils/api';

export const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = async (e) => {
        if (e) e.preventDefault();

        if (!inputValue.trim()) return;

        const userMessage = { role: 'user', content: inputValue };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInputValue('');
        setIsLoading(true);

        try {
            const aiResponse = await sendMessage(inputValue, messages);
            const aiMessage = { role: 'assistant', content: aiResponse };
            setMessages([...updatedMessages, aiMessage]);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = {
                role: 'assistant',
                content: `Error: ${error.message}. Please make sure the backend server is running on ${API_URL}`,
            };
            setMessages([...updatedMessages, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setMessages([]);
        setInputValue('');
    };

    return {
        messages,
        inputValue,
        setInputValue,
        isLoading,
        handleSendMessage,
        handleReset,
    };
};
