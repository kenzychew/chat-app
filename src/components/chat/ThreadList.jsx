import React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import TypingIndicator from './TypingIndicator';

const ThreadItem = ({ thread, isActive, onClick, isTyping = false }) => {
  const otherUser = thread.participants.find(p => p.id !== 'user-1');
  
  return (
    <Card 
      className={`p-3 cursor-pointer transition-colors hover:bg-gray-50 ${
        isActive ? 'bg-blue-50 border-blue-200' : ''
      }`}
      onClick={() => onClick(thread.id)}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
            <AvatarFallback>{otherUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 h-3 w-3 bg-white border border-gray-200 rounded-full flex items-center justify-center">
            {isTyping ? (
              <TypingIndicator isTyping={true} size="xs" />
            ) : otherUser.isOnline ? (
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            ) : null}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {otherUser.name}
            </h3>
            <div className="flex items-center space-x-2">
              {thread.lastMessage && (
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(thread.lastMessage.timestamp, { addSuffix: true })}
                </span>
              )}
              {thread.unreadCount > 0 && (
                <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {thread.unreadCount}
                </Badge>
              )}
            </div>
          </div>
          
          {thread.lastMessage && (
            <p className="text-sm text-gray-600 truncate mt-1 text-left">
              {isTyping ? (
                <span className="italic text-gray-500">typing...</span>
              ) : (
                thread.lastMessage.content
              )}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

const ThreadList = ({ threads, activeThreadId, onThreadSelect, typingUsers = {} }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-2 space-y-1">
        {threads.map((thread) => {
          const isTyping = typingUsers[thread.id] && typingUsers[thread.id].length > 0;
          return (
            <ThreadItem
              key={thread.id}
              thread={thread}
              isActive={activeThreadId === thread.id}
              onClick={onThreadSelect}
              isTyping={isTyping}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ThreadList;
