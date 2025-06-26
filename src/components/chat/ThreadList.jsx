import React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

const ThreadItem = ({ thread, isActive, onClick }) => {
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
          {otherUser.isOnline && (
            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
          )}
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
            <p className="text-sm text-gray-600 truncate mt-1">
              {thread.lastMessage.content}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

const ThreadList = ({ threads, activeThreadId, onThreadSelect }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-2 space-y-1">
        {threads.map((thread) => (
          <ThreadItem
            key={thread.id}
            thread={thread}
            isActive={activeThreadId === thread.id}
            onClick={onThreadSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default ThreadList;
