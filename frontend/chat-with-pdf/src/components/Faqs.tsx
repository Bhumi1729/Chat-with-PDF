import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, MessageSquare, Search, HelpCircle } from 'lucide-react';

const GlassmorphicFAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How does the PDF chat system work?",
      answer: "Our AI-powered system analyzes your uploaded PDF documents and creates a knowledge base from their content. You can then ask questions in natural language, and our system will provide accurate answers extracted directly from your documents, complete with source citations.",
      icon: <FileText size={24} />
    },
    {
      question: "What types of PDFs are supported?",
      answer: "Our system supports most PDF document types including text-based PDFs, scanned documents with OCR, research papers, reports, manuals, and more. For best results, we recommend using PDFs with clear text content rather than heavily image-based files.",
      icon: <Search size={24} />
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We take data security seriously. Your uploaded PDFs are encrypted, processed securely, and never shared with third parties. You can delete your documents at any time, and they'll be completely removed from our systems.",
      icon: <HelpCircle size={24} />
    },
    {
      question: "Can I ask questions about multiple PDFs at once?",
      answer: "Yes! You can upload multiple PDFs to create a comprehensive knowledge base, and our AI will search across all of them to find the most relevant answers to your questions.",
      icon: <FileText size={24} />
    },
    {
      question: "How accurate are the answers?",
      answer: "Our AI provides highly accurate answers based directly on the content of your PDFs. Each response includes citations to the specific sections in your documents where the information was found, allowing you to verify the accuracy.",
      icon: <MessageSquare size={24} />
    }
  ];

  return (
    <div id='faqs' className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-4 py-16 bg-black">
      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-300 rounded-full filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative max-w-5xl w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 p-2 bg-gradient-to-r from-teal-700 via-teal-500 to-teal-200 text-transparent bg-clip-text">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg mb-8">Everything you need to know about our PDF chat system</p>
          
          {/* Animated process icons */}
          <div className="relative flex items-center justify-center my-12 py-4">
            <div className="hidden md:flex absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent -translate-y-1/2"></div>
            
            <div className="flex items-center justify-around w-full relative z-10">
              <div className="flex flex-col items-center group">
                <div className="w-14 h-14 rounded-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-md border border-gray-700 flex items-center justify-center shadow-lg shadow-teal-500/20 mb-3 group-hover:border-teal-400 transition-all duration-300">
                  <FileText className="text-teal-400" />
                </div>
                <span className="text-teal-400 text-sm font-medium">Upload PDFs</span>
              </div>
              
              <div className="flex flex-col items-center group">
                <div className="w-14 h-14 rounded-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-md border border-gray-700 flex items-center justify-center shadow-lg shadow-teal-500/20 mb-3 group-hover:border-teal-400 transition-all duration-300">
                  <Search className="text-teal-400" />
                </div>
                <span className="text-teal-400 text-sm font-medium">Ask Questions</span>
              </div>
              
              <div className="flex flex-col items-center group">
                <div className="w-14 h-14 rounded-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-md border border-gray-700 flex items-center justify-center shadow-lg shadow-teal-500/20 mb-3 group-hover:border-teal-400 transition-all duration-300">
                  <MessageSquare className="text-teal-400" />
                </div>
                <span className="text-teal-400 text-sm font-medium">Get Answers</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Cards */}
        <div className="max-h-78 overflow-y-auto pr-2 custom-scrollbar">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Glassmorphic card */}
                <div 
                  className={`relative z-10 backdrop-filter backdrop-blur-lg border rounded-xl overflow-hidden transition-all duration-500 
                    ${openIndex === index 
                      ? 'border-teal-400/50 bg-black/40' 
                      : hoveredIndex === index 
                        ? 'border-gray-700/70 bg-black/30' 
                        : 'border-gray-800/30 bg-black/20'}`}
                >
                  <button
                    className="flex justify-between items-center w-full p-5 text-left focus:outline-none group"
                    onClick={() => toggleFAQ(index)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center 
                        ${openIndex === index 
                          ? 'bg-teal-400/20 text-teal-400' 
                          : 'bg-gray-800/50 text-gray-400 group-hover:text-teal-400 transition-colors duration-300'}`}>
                        {faq.icon}
                      </div>
                      <span className={`text-lg font-medium transition-colors duration-300 
                        ${openIndex === index ? 'text-teal-400' : 'text-white group-hover:text-teal-400'}`}>
                        {faq.question}
                      </span>
                    </div>
                    <span className={`transition-all duration-300 transform 
                      ${openIndex === index ? 'text-teal-400 rotate-180' : 'text-gray-400 group-hover:text-teal-400'}`}>
                      <ChevronDown size={20} />
                    </span>
                  </button>
                  
                  {/* Answer section with animation */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out 
                      ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="p-5 pt-0 border-t border-gray-700/30">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
                
                {/* Glow effect behind card */}
                {(openIndex === index || hoveredIndex === index) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-cyan-500/5 to-purple-500/5 blur-xl rounded-xl -z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact support section */}
        {/* <div className="mt-12 text-center">
          <div className="inline-block backdrop-filter backdrop-blur-lg bg-black/30 border border-gray-700/50 rounded-lg p-6 shadow-lg">
            <p className="text-gray-300 mb-4">Still have questions about our PDF chat system?</p>
            <button className="bg-gradient-to-r from-teal-400 to-cyan-500 text-black font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/30">
              Contact Support
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default GlassmorphicFAQSection;
