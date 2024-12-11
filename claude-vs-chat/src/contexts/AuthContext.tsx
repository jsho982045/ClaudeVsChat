// ADDED: New context file
import { createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  tokens: {
    claudeToken?: string;
    chatgptToken?: string;
  };
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  tokens: {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // We'll implement this later if needed
  return (
    <AuthContext.Provider value={{ isAuthenticated: false, tokens: {} }}>
      {children}
    </AuthContext.Provider>
  );
};