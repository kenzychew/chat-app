import { useState, useEffect } from "react";
import { mockThreads, mockMessages, mockUsers, currentUser } from "@/utils/mockData";

const generateId = () => `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const saveChatState = (threads, messages) => {
  try {
    localStorage.setItem("chatThreads", JSON.stringify(threads));
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  } catch (error) {
    console.error("Failed to save chat state:", error);
  }
};

const loadChatState = () => {
  try {
    const savedThreads = localStorage.getItem("chatThreads");
    const savedMessages = localStorage.getItem("chatMessages");

    return {
      threads: savedThreads ? JSON.parse(savedThreads) : mockThreads,
      messages: savedMessages ? JSON.parse(savedMessages) : mockMessages,
    };
  } catch (error) {
    console.error("Failed to load chat state:", error);
    return {
      threads: mockThreads,
      messages: mockMessages,
    };
  }
};

export const useChat = () => {
  const [threads, setThreads] = useState([]);
  const [messages, setMessages] = useState({});
  const [activeThreadId, setActiveThreadId] = useState("thread-1");
  const [typingUsers, setTypingUsers] = useState({});

  useEffect(() => {
    const { threads: loadedThreads, messages: loadedMessages } = loadChatState();
    setThreads(loadedThreads);
    setMessages(loadedMessages);
  }, []);

  // Save state whenever it changes
  useEffect(() => {
    if (threads.length > 0) {
      saveChatState(threads, messages);
    }
  }, [threads, messages]);

  const sendMessage = (content, threadId = activeThreadId) => {
    const newMessage = {
      id: generateId(),
      senderId: currentUser.id,
      threadId,
      content,
      timestamp: new Date(),
      type: "text",
      status: "sending",
    };

    // Add message to messages
    setMessages((prev) => ({
      ...prev,
      [threadId]: [...(prev[threadId] || []), newMessage],
    }));

    // Update thread's last message
    setThreads((prev) =>
      prev.map((thread) => (thread.id === threadId ? { ...thread, lastMessage: newMessage } : thread))
    );

    // Simulate message status updates
    setTimeout(() => {
      updateMessageStatus(newMessage.id, "sent");
      setTimeout(() => {
        updateMessageStatus(newMessage.id, "delivered");
        setTimeout(() => {
          updateMessageStatus(newMessage.id, "read");
        }, 1000);
      }, 500);
    }, 200);

    // Simulate auto-response
    if (Math.random() > 0.3) {
      simulateResponse(threadId);
    }
  };

  const updateMessageStatus = (messageId, status) => {
    setMessages((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((threadId) => {
        updated[threadId] = updated[threadId].map((msg) => (msg.id === messageId ? { ...msg, status } : msg));
      });
      return updated;
    });
  };

  const simulateTyping = (threadId, userId) => {
    setTypingUsers((prev) => ({
      ...prev,
      [threadId]: [...(prev[threadId] || []), userId],
    }));

    setTimeout(() => {
      setTypingUsers((prev) => ({
        ...prev,
        [threadId]: (prev[threadId] || []).filter((id) => id !== userId),
      }));
    }, 2000 + Math.random() * 1000);
  };

  const simulateResponse = (threadId) => {
    const responses = [
      "That's interesting!",
      "I see what you mean.",
      "Thanks for sharing!",
      "Let me think about that.",
      "Good point!",
      "I agree with you.",
      "That makes sense.",
      "Tell me more about that.",
    ];

    const thread = threads.find((t) => t.id === threadId);
    const otherUser = thread.participants.find((p) => p.id !== currentUser.id);

    // Start typing indicator
    simulateTyping(threadId, otherUser.id);

    setTimeout(() => {
      const responseMessage = {
        id: generateId(),
        senderId: otherUser.id,
        threadId,
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        type: "text",
        status: "sent",
      };

      setMessages((prev) => ({
        ...prev,
        [threadId]: [...(prev[threadId] || []), responseMessage],
      }));

      setThreads((prev) =>
        prev.map((thread) =>
          thread.id === threadId
            ? {
                ...thread,
                lastMessage: responseMessage,
                unreadCount: threadId === activeThreadId ? 0 : thread.unreadCount + 1,
              }
            : thread
        )
      );
    }, 2000 + Math.random() * 1000); // Show typing for 2-3 seconds before response
  };

  const selectThread = (threadId) => {
    setActiveThreadId(threadId);

    // Mark messages as read
    setThreads((prev) => prev.map((thread) => (thread.id === threadId ? { ...thread, unreadCount: 0 } : thread)));
  };

  const clearChat = () => {
    localStorage.removeItem("chatThreads");
    localStorage.removeItem("chatMessages");
    setThreads(mockThreads);
    setMessages(mockMessages);
  };

  return {
    threads,
    messages,
    activeThreadId,
    users: mockUsers,
    currentUser,
    sendMessage,
    selectThread,
    clearChat,
    typingUsers,
    simulateTyping,
  };
};
