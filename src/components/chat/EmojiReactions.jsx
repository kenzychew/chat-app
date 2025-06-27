import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus } from 'lucide-react';

const EMOJI_REACTIONS = ['👍', '❤️', '👏', '🔥', '🥰', '🤯', '😢', '☹️'];

const EmojiPicker = ({ onEmojiSelect }) => {
  return (
    <div className="grid grid-cols-4 gap-1 p-3 bg-white rounded-lg shadow-lg border">
      {EMOJI_REACTIONS.map((emoji) => (
        <Button
          key={emoji}
          variant="ghost"
          size="sm"
          onClick={() => onEmojiSelect(emoji)}
          className="h-10 w-10 p-0 text-xl hover:bg-gray-100 rounded-lg transition-colors"
        >
          {emoji}
        </Button>
      ))}
    </div>
  );
};

const EmojiReactions = ({ reactions = [], onAddReaction, currentUserId, messageId, isOwn }) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  // Group reactions by emoji type to show counts and user participation
  const groupedReactions = reactions.reduce((acc, reaction) => {
    if (!acc[reaction.emoji]) {
      acc[reaction.emoji] = [];
    }
    acc[reaction.emoji].push(reaction);
    return acc;
  }, {});

  const handleEmojiSelect = (emoji) => {
    onAddReaction(messageId, emoji);
    setIsPickerOpen(false);
  };

  const handleReactionClick = (emoji) => {
    // Toggle reaction: if user already reacted with this emoji, remove it; otherwise add it
    const userReaction = groupedReactions[emoji]?.find(r => r.userId === currentUserId);
    if (userReaction) {
      // User clicked their existing reaction - remove it
      onAddReaction(messageId, emoji, true);
    } else {
      // User selected a different reaction - this will replace any existing reaction
      onAddReaction(messageId, emoji);
    }
  };

  const hasReactions = Object.keys(groupedReactions).length > 0;

  return (
    <div className={`flex items-center gap-1 mt-1 ${isOwn ? 'justify-end' : 'justify-start'}`}>
      {/* Display existing reactions with counts */}
      {hasReactions && (
        <div className="flex flex-wrap gap-1">
          {Object.entries(groupedReactions).map(([emoji, emojiReactions]) => {
            const userReacted = emojiReactions.some(r => r.userId === currentUserId);
            const count = emojiReactions.length;
            
            return (
              <Button
                key={emoji}
                variant="ghost"
                size="sm"
                onClick={() => handleReactionClick(emoji)}
                className={`h-6 px-2 py-1 rounded-full border text-xs transition-all ${
                  userReacted 
                    ? 'bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200' 
                    : 'bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="mr-1">{emoji}</span>
                <span className="text-xs font-medium">{count}</span>
              </Button>
            );
          })}
        </div>
      )}
      
      {/* Add reaction button - appears on message hover */}
      <div className={`${hasReactions ? 'opacity-0 group-hover:opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
        <Popover open={isPickerOpen} onOpenChange={setIsPickerOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-0 shadow-lg" align={isOwn ? "end" : "start"}>
            <EmojiPicker onEmojiSelect={handleEmojiSelect} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default EmojiReactions;
