import { useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface ChatState {
    chatgptToken?: string;
    claudeToken?: string;
}

const Chat = () => {
    const location = useLocation();
    const state = location.state as ChatState;
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const setupBrowsers = async () => {
            try {
                const response = await fetch('http://localhost:8000/setup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        claudeToken: state.claudeToken,
                        chatgptToken: state.chatgptToken
                    })
                });
                
                if (!response.ok) {
                    throw new Error('Failed to connect to services');
                }
                
                setIsLoading(false);
            } catch (err) {
                setError('Failed to connect to backend server');
                setIsLoading(false);
            }
        };

        setupBrowsers();
    }, [state.claudeToken, state.chatgptToken]);


    return (
        <div className="flex h-screen">
            {/* ChatGPT side */}
            <div className="w-1/2 bg-gray-800">
                {state.chatgptToken ? (
                    isLoading ? (
                        <div className="text-white p-4">Connecting to ChatGPT...</div>
                    ) : (
                        <h2 className="text-white text-xl p-4">ChatGPT Connected</h2>
                    )
                ) : (
                    <div className="text-white p-4">ChatGPT not connected</div>
                )}
            </div>

            {/* Claude side */}
            <div className="w-1/2 bg-white">
                {state.claudeToken ? (
                    isLoading ? (
                        <div className="text-gray-800 p-4">Connecting to Claude...</div>
                    ) : (
                        <h2 className="text-gray-800 text-xl p-4">Claude Connected</h2>
                    )
                ) : (
                    <div className="text-gray-800 p-4">Claude not connected</div>
                )}
            </div>

            {/* Error message */}
            {error && (
                <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded">
                    {error}
                </div>
            )}
        </div>
    );
};

export default Chat;