"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Avatar from "boring-avatars";

interface Message {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: Date;
  type: "text" | "payment" | "system";
  paymentAmount?: number;
  paymentStatus?: "pending" | "completed" | "failed";
}

interface GroupChatProps {
  groupId: string;
  groupName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function GroupChat({ groupId, groupName, isOpen, onClose }: GroupChatProps) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [onlineMembers, setOnlineMembers] = useState(3);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Demo data for demo user
  useEffect(() => {
    if (session?.user?.email === 'demo@example.com') {
      const demoMessages: Message[] = [
        {
          id: "1",
          userId: "user1",
          userName: "Sarah Johnson",
          userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
          content: "Hi everyone! Just made my monthly contribution. Looking forward to our group meeting next week!",
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          type: "text"
        },
        {
          id: "2",
          userId: "user2",
          userName: "Michael Chen",
          userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
          content: "Great! I'll be contributing tomorrow. How's everyone's savings goal coming along?",
          timestamp: new Date(Date.now() - 1000 * 60 * 25),
          type: "text"
        },
        {
          id: "3",
          userId: "user3",
          userName: "Lisa Thompson",
          userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
          content: "I'm at 85% of my target. This group has been so helpful for staying disciplined!",
          timestamp: new Date(Date.now() - 1000 * 60 * 20),
          type: "text"
        },
        {
          id: "4",
          userId: "demo",
          userName: "Demo User",
          userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
          content: "I'm at 90%! The group accountability really helps. Should we plan our next payout?",
          timestamp: new Date(Date.now() - 1000 * 60 * 15),
          type: "text"
        },
        {
          id: "5",
          userId: "system",
          userName: "System",
          userAvatar: "",
          content: "Payment received: ₹3,000 from Sarah Johnson",
          timestamp: new Date(Date.now() - 1000 * 60 * 10),
          type: "payment",
          paymentAmount: 3000,
          paymentStatus: "completed"
        },
        {
          id: "6",
          userId: "user1",
          userName: "Sarah Johnson",
          userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
          content: "Perfect! Let's schedule the meeting for next Tuesday at 7 PM. Does that work for everyone?",
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
          type: "text"
        }
      ];
      setMessages(demoMessages);
    }
  }, [session]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !session?.user) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const message: Message = {
        id: Date.now().toString(),
        userId: session.user?.id || "demo",
        userName: session.user?.email === 'admin@dhukuti.com' ? 'User' : session.user?.name || "Demo User",
        userAvatar: session.user?.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
        content: newMessage,
        timestamp: new Date(),
        type: "text"
      };

      setMessages(prev => [...prev, message]);
      setNewMessage("");
      setIsLoading(false);
    }, 500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  const shouldShowDate = (message: Message, index: number) => {
    if (index === 0) return true;
    const prevMessage = messages[index - 1];
    const messageDate = new Date(message.timestamp).toDateString();
    const prevDate = new Date(prevMessage.timestamp).toDateString();
    return messageDate !== prevDate;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-start justify-center min-h-screen pt-16 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          {/* Header */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-lg">👥</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{groupName}</h3>
                  <p className="text-sm text-gray-500">{onlineMembers} members online</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-2">💬</div>
                  <p className="text-gray-500 text-sm">No messages yet. Start the conversation!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div key={message.id}>
                      {shouldShowDate(message, index) && (
                        <div className="flex justify-center my-4">
                          <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full border">
                            {formatDate(message.timestamp)}
                          </span>
                        </div>
                      )}
                      
                      <div className={`flex ${message.userId === session?.user?.id ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.userId === session?.user?.id ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          {message.type !== "system" && (
                            <Avatar
                              name={message.userName}
                              size={32}
                              variant="beam"
                              colors={["#1a73e8", "#4285f4", "#34a853", "#fbbc04", "#ea4335"]}
                            />
                          )}
                          
                          <div className={`flex flex-col ${message.userId === session?.user?.id ? 'items-end' : 'items-start'}`}>
                            {message.type !== "system" && (
                              <span className="text-xs text-gray-500 mb-1">{message.userName}</span>
                            )}
                            
                            <div className={`px-3 py-2 rounded-lg ${
                              message.type === "system" 
                                ? "bg-blue-50 text-blue-700 text-xs"
                                : message.userId === session?.user?.id
                                ? "bg-blue-600 text-white"
                                : "bg-white text-gray-900 border border-gray-200"
                            }`}>
                              {message.type === "payment" && (
                                <div className="flex items-center space-x-2">
                                  <span className="text-green-600">💰</span>
                                  <span>{message.content}</span>
                                  {message.paymentStatus === "completed" && (
                                    <span className="text-green-600 text-xs">✓</span>
                                  )}
                                </div>
                              )}
                              {message.type === "text" && (
                                <p className="text-sm">{message.content}</p>
                              )}
                            </div>
                            
                            <span className="text-xs text-gray-400 mt-1">
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-center space-x-2">
                        <Avatar
                          name="Typing"
                          size={32}
                          variant="beam"
                          colors={["#1a73e8", "#4285f4", "#34a853", "#fbbc04", "#ea4335"]}
                        />
                        <div className="bg-white border border-gray-200 rounded-lg px-3 py-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="mt-4">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  {isLoading && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!newMessage.trim() || isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => window.location.href = `/groups/${groupId}`}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              View Group Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 