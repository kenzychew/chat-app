// User Model
interface User {
    id: string;
    name: string;
    avatar: string;
    isOnline: string;
    lastSeen?: Date;
}

// Message Model
interface Message {
    id: string;
    senderId: string;
    threadId: string;
    content: string;
    timestamp: Date;
    type: 'text' | 'image' | 'file';
    status: 'sending' | 'sent' | 'delivered' | 'read'
    reactions?: Reaction[];
}

// Thread/Conversation Model
interface Thread {
    id: string;
    participants: User[];
    lastMessage: Message;
    unreadCount: number;
    isTyping?: string[]; // user ids currently typing
}
