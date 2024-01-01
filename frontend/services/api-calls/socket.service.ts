// socket.ts

import { HOST } from '@/constants/constants';
import { CookieProvider } from '@/utils/cookies.util';
import { Socket, io } from 'socket.io-client';

class SocketManager {
  private socket: Socket | any;
  private room: string = 'default';

  constructor() {
    CookieProvider.getCookie('token').then((token) => (this.socket = io(HOST, { query: { token } })));
  }

  public async createConnection(): Promise<void> {
    const token = await CookieProvider.getCookie('token');
    this.socket = io(HOST, { query: { token } });
  }

  public joinRoom(newRoom: string): void {
    this.socket.emit('join_room', newRoom);
    this.room = newRoom;
  }

  public sendMessage(message: string, room: string, chat_id: string): void {
    this.socket.emit('chat_message', { message, room, chat_id });
  }

  public receiveMessage(callback: (msg: string) => void): void {
    this.socket.on('chat_message', (msg: string) => {
      callback(msg);
    });
  }

  public disconnectSocket(): void {
    this.socket.disconnect();
  }
}

export default SocketManager;
