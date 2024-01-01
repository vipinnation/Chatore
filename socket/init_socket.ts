
import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken'
import { config } from '../config/config';
import User from '../app/model/user.model'
import { MessageDAO } from '../app/dao-layers/message.dao';


function initializeSocketIO (server: any): Server {
    const io = new Server(server, {
        cors: { origin: "*" }
    });

    io.use(async (socket: any, next) => {
        try {
            const token = socket.handshake.query.token;
            if (!token) {
                return next(new Error('Authentication error'));
            }
            const decoded: any = jwt.verify(token, config.jwt.JWT_SECRET);
            const user = await User.findById(decoded.id);

            socket.user = user;
            next();
        } catch (error) {
            console.log(error)
            return next(new Error('Authentication error'));
        }
    }).on('connection', (socket: Socket) => {
        console.log('A user connected');

        socket.on('join_room', (room) => {
            socket.join(room);
            console.log(`User joined room: ${room}`);
        });

        socket.on('chat_message', async (data) => {
            let { user }: any = socket
            const { room, message, chat_id } = data;
            let saveMessage = await MessageDAO.saveMessage({ content: message, chat: chat_id, sender: user._id })
            // socket.to(room.toString()).emit('chat', saveMessage);
            // socket.broadcast.to(room).emit('chat_message', saveMessage);
            io.emit('chat_message', { room, saveMessage });
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    return io;
}

export default initializeSocketIO
