import type { FirebaseConfig, User, Chat, Message } from './types';
import { COLLECTIONS } from './constants';

export class FirebaseService {
  constructor(private firebase: FirebaseConfig) {}

  async createUser(userId: string, userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    try {
      await this.firebase.firestore()
        .collection(COLLECTIONS.USERS)
        .doc(userId)
        .set({
          ...userData,
          createdAt: this.getServerTimestamp(),
          updatedAt: this.getServerTimestamp(),
        });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async createChat(chatData: Omit<Chat, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const chatRef = await this.firebase.firestore()
        .collection(COLLECTIONS.CHATS)
        .add({
          ...chatData,
          createdAt: this.getServerTimestamp(),
          updatedAt: this.getServerTimestamp(),
        });
      return chatRef.id;
    } catch (error) {
      console.error('Error creating chat:', error);
      throw error;
    }
  }

  async sendMessage(chatId: string, messageData: Omit<Message, 'id' | 'chatId' | 'timestamp'>): Promise<void> {
    try {
      await this.firebase.firestore()
        .collection(COLLECTIONS.CHATS)
        .doc(chatId)
        .collection(COLLECTIONS.MESSAGES)
        .add({
          ...messageData,
          chatId,
          timestamp: this.getServerTimestamp(),
        });
      
      // Update chat's last message
      await this.firebase.firestore()
        .collection(COLLECTIONS.CHATS)
        .doc(chatId)
        .update({
          lastMessage: messageData.text,
          lastMessageTime: this.getServerTimestamp(),
          updatedAt: this.getServerTimestamp(),
        });
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  getChatMessages(chatId: string, callback: (messages: Message[]) => void): () => void {
    return this.firebase.firestore()
      .collection(COLLECTIONS.CHATS)
      .doc(chatId)
      .collection(COLLECTIONS.MESSAGES)
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot: any) => {
        const messages = snapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(messages);
      });
  }

  getUserChats(userId: string, callback: (chats: Chat[]) => void): () => void {
    return this.firebase.firestore()
      .collection(COLLECTIONS.CHATS)
      .where('participants', 'array-contains', userId)
      .orderBy('updatedAt', 'desc')
      .onSnapshot((snapshot: any) => {
        const chats = snapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(chats);
      });
  }

  private getServerTimestamp() {
    // Try to use Firebase server timestamp, fallback to new Date()
    return this.firebase.firestore.FieldValue?.serverTimestamp?.() || new Date();
  }
}