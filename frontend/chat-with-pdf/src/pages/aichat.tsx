import React, { useState, FormEvent, ChangeEvent, useRef, useEffect } from 'react';
import axios from 'axios';
import { Upload, MessageCircleQuestion, SendHorizontal, Loader2, File, Sparkles, Bot, User } from 'lucide-react';

interface ChatEntry {
  question: string;
  answer: React.ReactNode[];
  fileName: string;
}

const AiQuestionAnswer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');
  const [isFileHovered, setIsFileHovered] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const [typingIndex, setTypingIndex] = useState<number | null>(null);
  const [showUploadAnimation, setShowUploadAnimation] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-scroll to bottom when chat updates
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, typingIndex]);

  // Simulate typing effect when a new answer is added
  useEffect(() => {
    if (chatHistory.length > 0 && typingIndex === chatHistory.length - 1) {
      const timer = setTimeout(() => {
        setTypingIndex(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [chatHistory, typingIndex]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setShowUploadAnimation(true);
      setTimeout(() => setShowUploadAnimation(false), 1500);
    }
  };

  const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const formatResponse = (responseText: string): React.ReactNode[] => {
    const paragraphs = responseText.split('\n').filter((p) => p.trim() !== '');

    return paragraphs.map((paragraph, index) => {
      const isBulletPoint = paragraph.trim().startsWith('•');
      const isNumberedList = paragraph.trim().match(/^\d+\./);

      if (isBulletPoint) {
        return (
          <ul key={index} className="list-disc pl-5 text-gray-300">
            <li>{paragraph.replace('•', '').trim()}</li>
          </ul>
        );
      }

      if (isNumberedList) {
        return (
          <ol key={index} className="list-decimal pl-5 text-gray-300">
            <li>{paragraph.replace(/^\d+\./, '').trim()}</li>
          </ol>
        );
      }

      return <p key={index} className="text-gray-300">{paragraph}</p>;
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !question) {
      alert('Please upload a file and ask a question!');
      return;
    }

    setErrorMessage(null);
    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('question', question);

    try {
      setLoading(true);
      console.log('Sending request to backend...');
      
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Received response:', response.data);

      // Check if response structure is as expected
      if (!response.data || !response.data.answer) {
        console.error('Unexpected response structure:', response.data);
        throw new Error('Unexpected response structure from server');
      }

      const answer = response.data.answer && response.data.answer[0] && response.data.answer[0].text
        ? response.data.answer[0].text
        : 'No answer received.';

      const formattedAnswer = formatResponse(answer);
      
      const newIndex = chatHistory.length;
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { question, answer: formattedAnswer, fileName },
      ]);
      setTypingIndex(newIndex);
      setQuestion('');
    } catch (error) {
      console.error('Error fetching the answer:', error);
      
      let errorMsg = 'An error occurred while fetching the answer.';
      
      if (axios.isAxiosError(error)) {
        errorMsg += ` Status: ${error.response?.status || 'unknown'}. ${error.message}`;
        console.error('Response data:', error.response?.data);
        console.error('Response status:', error.response?.status);
        console.error('Response headers:', error.response?.headers);
      }
      
      setErrorMessage(errorMsg);
      
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { question, answer: formatResponse(errorMsg), fileName },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex flex-col overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-teal-500 opacity-10"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                transform: 'translate(-50%, -50%)',
                filter: 'blur(60px)',
                animation: `float ${Math.random() * 20 + 10}s infinite ease-in-out`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="bg-zinc-900 bg-opacity-60 backdrop-blur-lg border-b border-teal-800/30 p-5 flex items-center justify-center shadow-xl z-10">
        <div className="max-w-6xl w-full flex items-center">
          <div className="flex items-center transition-all duration-300 hover:scale-105">
            <div className="relative">
              <MessageCircleQuestion className="w-8 h-8 mr-3 text-teal-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-500 rounded-full" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Chat with <span className="bg-gradient-to-r from-teal-400 to-purple-500 text-transparent bg-clip-text">PDF</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-900/50 text-red-200 p-3 mx-6 mt-4 rounded-lg backdrop-blur-sm border border-red-700/50 max-w-6xl ">
          <p className="font-medium">Error: {errorMessage}</p>
          <p className="text-sm mt-1">Please check that your backend server is running at http://localhost:3000</p>
        </div>
      )}

      {/* Chat History or Initial State */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 z-10 scroll-smooth">
        <div className="max-w-6xl mx-auto">
          {chatHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center mt-15">
              <div className="bg-zinc-900 bg-opacity-60 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-teal-900/30 w-full max-w-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-teal-900/20 hover:shadow-lg">
                <div className="relative mx-auto mb-8 w-24 h-24">
                  <div className="absolute inset-0 bg-teal-500 rounded-full opacity-20 animate-ping" />
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-purple-600 rounded-full opacity-70 animate-pulse" />
                  <File className="w-24 h-24 text-white relative z-10 p-5" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-teal-300 to-purple-400  bg-clip-text">
                  Upload a PDF and Start Asking Questions
                </h2>
                <p className="text-gray-300 max-w-md mx-auto leading-relaxed">
                  Easily get insights from your documents by uploading a PDF and asking specific questions about its content.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-10">
              {chatHistory.map((chat, index) => (
                <div key={index} className="space-y-6">
                  {/* User Message */}
                  <div className="flex justify-end transform transition-all duration-500" 
                       style={{ 
                         animation: `fadeInRight 0.5s ease-out ${index * 0.2}s both`
                       }}>
                    <div className="bg-gradient-to-br from-teal-600 to-teal-700 text-white p-5 rounded-2xl rounded-tr-sm max-w-xl shadow-lg relative group">
                      <div className="absolute -right-3 -top-3 bg-teal-500 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="font-semibold text-teal-100">You</span>
                        <span className="text-xs bg-teal-800/50 py-1 px-2 rounded-full text-teal-100 truncate max-w-[150px]">
                          {chat.fileName}
                        </span>
                      </div>
                      <p className="text-teal-50">{chat.question}</p>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex justify-start transform transition-all duration-500"
                       style={{ 
                         animation: `fadeInLeft 0.5s ease-out ${index * 0.2 + 0.2}s both`,
                         opacity: typingIndex === index ? 0.7 : 1
                       }}>
                    <div className="bg-zinc-800/80 backdrop-blur-sm p-5 rounded-2xl rounded-tl-sm max-w-2xl shadow-lg border border-zinc-700/50 relative group">
                      <div className="absolute -left-3 -top-3 bg-purple-600 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">AI Assistant</span>
                        {typingIndex === index && (
                          <span className="typing-indicator">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                          </span>
                        )}
                      </div>
                      <div className="text-gray-200 space-y-3">{chat.answer}</div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Box */}
      <div className="p-6 bg-zinc-900/90 backdrop-blur-lg border-t border-zinc-800/80 shadow-2xl z-20">
        <form onSubmit={handleSubmit} className="flex space-x-4 max-w-6xl mx-auto">
          <div className="flex-1 relative group">
            <input
              type="file"
              id="pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              accept=".pdf"
              onDragEnter={() => setIsFileHovered(true)}
              onDragLeave={() => setIsFileHovered(false)}
              onDrop={() => setIsFileHovered(false)}
            />
            <div className={`p-3 border-2 border-dashed rounded-lg flex items-center justify-between bg-zinc-800/80 hover:bg-zinc-700/80 transition duration-300 ${
              isFileHovered ? 'border-teal-400 scale-105' : 'border-teal-800/70'
            } ${showUploadAnimation ? 'animate-pulse border-teal-400' : ''}`}>
              <div className="flex items-center">
                <Upload className={`mr-2 ${showUploadAnimation ? 'text-teal-400 animate-bounce' : 'text-teal-500'}`} />
                <span className="truncate text-teal-300">
                  {fileName ? fileName : 'Upload PDF'}
                </span>
              </div>
              {showUploadAnimation && (
                <Sparkles className="text-teal-400 animate-spin" />
              )}
            </div>
          </div>

          <div className="flex-[2] relative">
            <input
              type="text"
              id="question"
              value={question}
              onChange={handleQuestionChange}
              placeholder="Ask a question about your PDF..."
              className="w-full p-3 border border-zinc-700/50 rounded-lg bg-zinc-800/80 backdrop-blur-sm text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all placeholder-gray-400 shadow-inner"
            />
            <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-teal-500 to-purple-600 transition-all duration-300" style={{ width: question.length > 0 ? '100%' : '0%' }} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`p-3 rounded-lg text-white transition-all transform hover:scale-105 ${
              loading 
                ? 'bg-zinc-700 cursor-not-allowed' 
                : 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-600 hover:shadow-lg hover:shadow-teal-500/30'
            }`}
          >
            {loading ? (
              <Loader2 className="animate-spin mx-auto" />
            ) : (
              <SendHorizontal className="transform transition-transform group-hover:translate-x-1" />
            )}
          </button>
        </form>
      </div>

      {/* Global Styles */}
      <style>{`
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px);
          }
          50% {
            transform: translate(-50%, -50%) translateY(20px);
          }
        }
        
        .typing-indicator {
          display: inline-flex;
          align-items: center;
        }
        
        .typing-indicator .dot {
          display: inline-block;
          width: 4px;
          height: 4px;
          margin: 0 1px;
          background-color: #4fd1c5;
          border-radius: 50%;
          animation: typing 1.5s infinite ease-in-out;
        }
        
        .typing-indicator .dot:nth-child(1) {
          animation-delay: 0s;
        }
        
        .typing-indicator .dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .typing-indicator .dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.6;
          }
          30% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default AiQuestionAnswer;