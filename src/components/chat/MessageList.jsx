import React, { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import EmojiReactions from './EmojiReactions';

const MessageBubble = ({ message, user, isOwn, onAddReaction }) => {
  return (
    <div className={`group flex items-end space-x-2 ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {!isOwn && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
      )}
      
      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isOwn 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-100 text-gray-900'
        }`}>
          <p className="text-sm text-left">{message.content}</p>
          
          <div className={`flex items-center justify-between mt-1 text-xs ${
            isOwn ? 'text-blue-100' : 'text-gray-500'
          }`}>
            <span>{format(message.timestamp, 'HH:mm')}</span>
            {isOwn && (
              <Badge 
                variant={message.status === 'read' ? 'default' : 'secondary'} 
                className="h-4 text-xs ml-2"
              >
                {message.status}
              </Badge>
            )}
          </div>
        </div>
        
        {/* Emoji reactions - shows below message bubble */}
        <EmojiReactions
          reactions={message.reactions || []}
          onAddReaction={onAddReaction}
          currentUserId="user-1"
          messageId={message.id}
          isOwn={isOwn}
        />
      </div>
    </div>
  );
};

const MessageList = ({ messages, users, onAddReaction }) => {
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-1" ref={scrollRef}>
      <div className="p-4 space-y-4 min-h-full">
        {messages.map((message) => {
          const user = users[message.senderId];
          const isOwn = message.senderId === 'user-1';
          
          return (
            <MessageBubble
              key={message.id}
              message={message}
              user={user}
              isOwn={isOwn}
              onAddReaction={onAddReaction}
            />
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default MessageList;
