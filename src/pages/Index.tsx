
import React from 'react';
import ChatContainer from '@/components/ChatContainer';

const Index = () => {
  return (
    <div className="min-h-screen reflection-gradient flex flex-col justify-center items-center p-4 sm:p-6">
      <main className="bg-reflectbot-background bg-opacity-50 backdrop-blur-md rounded-xl shadow-xl w-full max-w-2xl h-[80vh] min-h-[500px] overflow-hidden border border-gray-800">
        <ChatContainer />
      </main>
      
      <footer className="mt-6 text-sm text-reflectbot-text opacity-60 text-center">
        <p>ReflectBot • A tool for mindful self-reflection</p>
        <p className="mt-1">
          © {new Date().getFullYear()} • 
          <span className="text-reflectbot-accent ml-1">
            Share your thoughts, track your mood over time
          </span>
        </p>
      </footer>
    </div>
  );
};

export default Index;
