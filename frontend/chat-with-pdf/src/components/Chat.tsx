import React, { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { Upload, MessageCircleQuestion, SendHorizontal, Loader2 } from 'lucide-react';

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
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
          <ul key={index} className="list-disc pl-5 text-gray-700">
            <li>{paragraph.replace('•', '').trim()}</li>
          </ul>
        );
      }

      if (isNumberedList) {
        return (
          <ol key={index} className="list-decimal pl-5 text-gray-700">
            <li>{paragraph.replace(/^\d+\./, '').trim()}</li>
          </ol>
        );
      }

      return <p key={index} className="text-gray-800">{paragraph}</p>;
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !question) {
      alert('Please upload a file and ask a question!');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('question', question);

    try {
      setLoading(true);
      const response = await axios.post('https://chat-with-pdf-a7bl.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const answer = response.data.answer && response.data.answer[0].text
        ? response.data.answer[0].text
        : 'No answer received.';

      const formattedAnswer = formatResponse(answer);

      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { question, answer: formattedAnswer, fileName },
      ]);
      setQuestion('');
    } catch (error) {
      console.error('Error fetching the answer:', error);
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { question, answer: formatResponse('An error occurred while fetching the answer.'), fileName },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex items-center justify-center">
        <MessageCircleQuestion className="w-8 h-8 mr-3 text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-800">Chat with PDF</h1>
      </div>

      {/* Chat History or Initial State */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {chatHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <MessageCircleQuestion className="w-24 h-24 text-gray-300 mb-6" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              Upload a PDF and Start Asking Questions
            </h2>
            <p className="text-gray-500 max-w-md">
              Easily get insights from your documents by uploading a PDF and asking specific questions.
            </p>
          </div>
        ) : (
          chatHistory.map((chat, index) => (
            <div key={index} className="space-y-4">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white p-4 rounded-xl max-w-xl shadow-md">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold">You</span>
                    <span className="text-xs text-blue-100 truncate max-w-[150px]">
                      ({chat.fileName})
                    </span>
                  </div>
                  <p>{chat.question}</p>
                </div>
              </div>

              {/* AI Response */}
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-xl max-w-2xl shadow-md">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold text-indigo-600">AI Assistant</span>
                  </div>
                  <div className="text-gray-700">{chat.answer}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Box */}
      <div className="p-6 bg-white border-t border-gray-200 shadow-2xl">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <div className="flex-1 relative">
            <input
              type="file"
              id="pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".pdf"
            />
            <div className="p-3 border-2 border-dashed border-indigo-300 rounded-md flex items-center justify-between bg-indigo-50 text-indigo-600">
              <div className="flex items-center">
                <Upload className="mr-2" />
                <span>{fileName ? fileName : 'Upload PDF'}</span>
              </div>
            </div>
          </div>

          <div className="flex-[2]">
            <input
              type="text"
              id="question"
              value={question}
              onChange={handleQuestionChange}
              placeholder="Ask a question about your PDF..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`p-3 rounded-md text-white transition-all ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-md'
            }`}
          >
            {loading ? (
              <Loader2 className="animate-spin mx-auto" />
            ) : (
              <SendHorizontal />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiQuestionAnswer;