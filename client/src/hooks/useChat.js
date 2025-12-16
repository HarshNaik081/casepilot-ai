import { useState } from 'react';
import { sendMessage } from '../utils/api';
import { API_URL } from '../utils/api';

export const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [interviewStage, setInterviewStage] = useState('problem_statement');
    const [messageCount, setMessageCount] = useState(0);
    const [sessionId] = useState(() => `session_${Date.now()}`);

    const handleSendMessage = async (e) => {
        if (e) e.preventDefault();

        if (!inputValue.trim()) return;

        const userMessage = { role: 'user', content: inputValue };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInputValue('');
        setIsLoading(true);

        try {
            // Send message with session tracking
            const response = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: inputValue,
                    history: messages,
                    sessionId: sessionId
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Handle interruption
            if (data.interrupted) {
                const aiMessage = { role: 'assistant', content: `⚠️ **[INTERRUPTED]**\n\n${data.response}` };
                setMessages([...updatedMessages, aiMessage]);
                setIsLoading(false);
                return;
            }

            // Update stage and message count if provided
            if (data.stage) setInterviewStage(data.stage);
            if (data.messageCount) setMessageCount(data.messageCount);

            const aiMessage = { role: 'assistant', content: data.response };
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
        setInterviewStage('problem_statement');
        setMessageCount(0);
    };

    return {
        messages,
        inputValue,
        setInputValue,
        isLoading,
        handleSendMessage,
        handleReset,
        interviewStage,
        messageCount,
    };
};
