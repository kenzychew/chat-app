// Mock users data
export const mockUsers = {
  "user-1": {
    id: "user-1",
    name: "You",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    isOnline: true,
  },
  "user-2": {
    id: "user-2",
    name: "Sarah Tan",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b4d31c1b?w=32&h=32&fit=crop&crop=face",
    isOnline: true,
    lastSeen: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
  },
  "user-3": {
    id: "user-3",
    name: "Mike Lee",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    isOnline: false,
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  "user-4": {
    id: "user-4",
    name: "Emily Goh",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    isOnline: true,
  },
  "user-5": {
    id: "user-5",
    name: "David Lim",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
    isOnline: true,
  },
  "user-6": {
    id: "user-6",
    name: "Rachel Wong",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face",
    isOnline: false,
    lastSeen: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
  },
};

// Mock messages data
export const mockMessages = {
  "thread-1": [
    {
      id: "msg-1",
      senderId: "user-2",
      threadId: "thread-1",
      content: "Hey! How are you doing?",
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      type: "text",
      status: "read",
    },
    {
      id: "msg-2",
      senderId: "user-1",
      threadId: "thread-1",
      content: "I'm doing great! Just working on some new projects. How about you?",
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      type: "text",
      status: "read",
    },
    {
      id: "msg-3",
      senderId: "user-2",
      threadId: "thread-1",
      content: "That sounds exciting! I'd love to hear more about it.",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      type: "text",
      status: "read",
    },
  ],
  "thread-2": [
    {
      id: "msg-4",
      senderId: "user-3",
      threadId: "thread-2",
      content: "Are we still on for the meeting tomorrow?",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: "text",
      status: "delivered",
    },
  ],
  "thread-3": [
    {
      id: "msg-5",
      senderId: "user-4",
      threadId: "thread-3",
      content: "Thanks for the help earlier!",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      type: "text",
      status: "sent",
    },
  ],
  "thread-4": [
    {
      id: "msg-6",
      senderId: "user-5",
      threadId: "thread-4",
      content: "Let's grab coffee this weekend!",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      type: "text",
      status: "read",
    },
    {
      id: "msg-7",
      senderId: "user-1",
      threadId: "thread-4",
      content: "Sounds good! How about Sunday morning?",
      timestamp: new Date(Date.now() - 40 * 60 * 1000),
      type: "text",
      status: "delivered",
    },
  ],
  "thread-5": [
    {
      id: "msg-8",
      senderId: "user-6",
      threadId: "thread-5",
      content: "Did you see the news about the new project?",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      type: "text",
      status: "sent",
    },
  ],
};

// Mock threads data
export const mockThreads = [
  {
    id: "thread-1",
    participants: [mockUsers["user-1"], mockUsers["user-2"]],
    lastMessage: mockMessages["thread-1"][mockMessages["thread-1"].length - 1],
    unreadCount: 0,
    isTyping: [],
  },
  {
    id: "thread-2",
    participants: [mockUsers["user-1"], mockUsers["user-3"]],
    lastMessage: mockMessages["thread-2"][mockMessages["thread-2"].length - 1],
    unreadCount: 1,
    isTyping: [],
  },
  {
    id: "thread-3",
    participants: [mockUsers["user-1"], mockUsers["user-4"]],
    lastMessage: mockMessages["thread-3"][mockMessages["thread-3"].length - 1],
    unreadCount: 0,
    isTyping: [],
  },
  {
    id: "thread-4",
    participants: [mockUsers["user-1"], mockUsers["user-5"]],
    lastMessage: mockMessages["thread-4"][mockMessages["thread-4"].length - 1],
    unreadCount: 0,
    isTyping: [],
  },
  {
    id: "thread-5",
    participants: [mockUsers["user-1"], mockUsers["user-6"]],
    lastMessage: mockMessages["thread-5"][mockMessages["thread-5"].length - 1],
    unreadCount: 1,
    isTyping: [],
  },
];

// Current user
export const currentUser = mockUsers["user-1"];
