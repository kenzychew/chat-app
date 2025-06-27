import React from 'react';
import ThreadList from '@/components/chat/ThreadList';
import MessageList from '@/components/chat/MessageList';
import MessageInput from '@/components/chat/MessageInput';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useChat } from '@/hooks/useChat';
import TypingIndicator from '@/components/chat/TypingIndicator';

const ChatLayout = () => {
  const {
    threads,
    messages,
    activeThreadId,
    users,
    currentUser,
    sendMessage,
    selectThread,
    clearChat,
    typingUsers,
    addReaction,
  } = useChat();
  
  const activeThread = threads.find(t => t.id === activeThreadId);
  const activeMessages = messages[activeThreadId] || [];
  const otherUser = activeThread?.participants.find(p => p.id !== currentUser.id);
  const isOtherUserTyping = typingUsers[activeThreadId] && typingUsers[activeThreadId].length > 0;

  const handleSendMessage = (content) => {
    sendMessage(content);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
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
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearChat}
              className="text-xs"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Thread List */}
        <ThreadList
          threads={threads}
          activeThreadId={activeThreadId}
          onThreadSelect={selectThread}
          typingUsers={typingUsers}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        {activeThread && (
          <div className="h-16 bg-white border-b border-gray-200 flex items-center px-6">
            <div className="flex items-center space-x-3">
              {/* Avatar with online/typing status indicator */}
              <div className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
                  <AvatarFallback>{otherUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                {/* Status indicator: typing animation, online dot, or nothing if offline */}
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-white border border-gray-200 rounded-full flex items-center justify-center">
                  {isOtherUserTyping ? (
                    <TypingIndicator isTyping={true} size="xs" />
                  ) : otherUser.isOnline ? (
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  ) : null}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">{otherUser.name}</h2>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-500">
                    {isOtherUserTyping ? (
                      <span className="italic">typing...</span>
                    ) : otherUser.isOnline ? (
                      'Online'
                    ) : (
                      'Offline'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Messages Area */}
        <div className="flex-1 bg-gray-50">
          <MessageList messages={activeMessages} users={users} onAddReaction={addReaction} />
        </div>

        {/* Message Input */}
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatLayout;
