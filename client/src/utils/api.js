const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const sendMessage = async (message, history = []) => {
    const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message,
            history,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to get response from AI');
    }

    const data = await response.json();
    return data.response;
};

export { API_URL };
