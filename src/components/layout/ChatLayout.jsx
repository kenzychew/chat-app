import React, { useState } from 'react';
import ThreadList from '@/components/chat/ThreadList';
import MessageList from '@/components/chat/MessageList';
import MessageInput from '@/components/chat/MessageInput';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { mockThreads, mockMessages, mockUsers, currentUser } from '@/utils/mockData';

const ChatLayout = () => {
  const [activeThreadId, setActiveThreadId] = useState('thread-1');
  
  const activeThread = mockThreads.find(t => t.id === activeThreadId);
  const activeMessages = mockMessages[activeThreadId] || [];
  const otherUser = activeThread?.participants.find(p => p.id !== currentUser.id);

  const handleSendMessage = (content) => {
    // TODO: Add message sending logic in Phase 2
    console.log('Sending message:', content);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Messages</h1>
              <p className="text-sm text-gray-500">#{currentUser.name}</p>
            </div>
          </div>
        </div>

        {/* Thread List */}
        <ThreadList
          threads={mockThreads}
          activeThreadId={activeThreadId}
          onThreadSelect={setActiveThreadId}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        {activeThread && (
          <div className="h-16 bg-white border-b border-gray-200 flex items-center px-6">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
                <AvatarFallback>{otherUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-medium text-gray-900">{otherUser.name}</h2>
                <p className="text-sm text-gray-500">
                  {otherUser.isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Messages Area */}
        <MessageList messages={activeMessages} users={mockUsers} />

        {/* Message Input */}
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatLayout;
