import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [chatgptToken, setChatgptToken] = useState('');
  const [claudeToken, setClaudeToken] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);

  const validateToken = async (token: string, type: 'chatgpt' | 'claude'): Promise<boolean> => {
    const minLength = type === 'chatgpt' ? 32 : 20;
    return token.length >= minLength;
  };


  const handleChatGPTConnect = async () => {
    // Validate and process ChatGPT token
    if(await validateToken(chatgptToken, 'chatgpt')) {
      navigate('/chat', {
        state: {
          chatgptToken: chatgptToken
        }
      });
    }
  };

  const handleClaudeConnect = async () => {
    // Validaate and process Claude Tokens
    if(await validateToken(claudeToken, 'claude')){
      navigate('/chat', {
        state: {
          claudeToken: claudeToken
        }
      });
    }
  };

  const Instructions = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-2xl">
        <h3 className="text-xl font-bold mb-4">How to Find Your Session Tokens</h3>
        
        <div className="mb-6">
          <h4 className="font-bold text-green-600 mb-2">ChatGPT Token:</h4>
          <ol className="list-decimal list-inside space-y-2">
            <li>Go to chat.openai.com and make sure you're logged in</li>
            <li>Right-click anywhere and select 'Inspect' (or press F12)</li>
            <li>In the developer tools, go to 'Application' → 'Cookies'</li>
            <li>Find the cookie named "__Secure-next-auth.session-token"</li>
            <li>Copy the entire value</li>
          </ol>
        </div>

        <div className="mb-6">
          <h4 className="font-bold text-purple-600 mb-2">Claude Token:</h4>
          <ol className="list-decimal list-inside space-y-2">
            <li>Go to claude.ai and ensure you're logged in</li>
            <li>Right-click anywhere and select 'Inspect' (or press F12)</li>
            <li>In the developer tools, go to 'Application' → 'Cookies'</li>
            <li>Find the cookie named "sessionKey"</li>
            <li>Copy the entire value</li>
          </ol>
        </div>

        <button 
          onClick={() => setShowInstructions(false)}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Got it!
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full">
      {/* ChatGPT Side */}
      <div className="w-1/2 bg-gray-800 flex items-center justify-center">
        <div className="bg-gray-700 p-8 rounded-lg w-96">
          <h2 className="text-white text-2xl font-bold mb-6">ChatGPT Session</h2>
          <div className="mb-4">
            <label className="text-white block mb-2">Session Token</label>
            <input 
              type="password"
              value={chatgptToken}
              onChange={(e) => setChatgptToken(e.target.value)}
              className="w-full p-2 rounded bg-gray-600 text-white placeholder-gray-400"
              placeholder="Paste your ChatGPT session token"
              required
            />
          </div>
          <button
            onClick={handleChatGPTConnect}
            className="w-full p-2 rounded text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
            Connect to ChatGPT
            </button>
  
        </div>
      </div>

      {/* Claude Side */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="border border-gray-200 p-8 rounded-lg w-96 shadow-lg">
          <h2 className="text-gray-800 text-2xl font-bold mb-6">Claude Session</h2>
          <div className="mb-4">
            <label className="text-gray-700 block mb-2">Session Token</label>
            <input 
              type="password"
              value={claudeToken}
              onChange={(e) => setClaudeToken(e.target.value)}
              className="w-full p-2 rounded border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Paste your Claude session token"
              required
            />
          </div>
          <button 
            onClick={handleClaudeConnect}
            className="w-full p-2 rounded text-white bg-purple-600 hover:bg-purple-700 transition-colors"
          >
              Connect to Claude
          </button>
        </div>
      </div>

      {/* Help Button */}
      <button 
        onClick={() => setShowInstructions(true)}
        className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
      >
        How to get tokens?
      </button>

      {/* Instructions Modal */}
      {showInstructions && <Instructions />}
    </div>
  );
};

export default Login;