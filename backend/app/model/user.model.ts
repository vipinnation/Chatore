import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';

// Email Validation
const validateEmail = function (email: any) {
    const re = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    return re.test(email);
};


const UserSchema: Schema = new Schema<any>(
    {
        full_name: {
            type: String,
            trim: true,
            required: [true, 'First is required']
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, 'Please fill a valid email address']
        },
        password: { type: String, required: true, select: false },
        is_verified: { type: Boolean, default: false },
        is_blocked: { type: Boolean, default: false },
        is_deleted: { type: Boolean, default: false },
        last_logged_in: { type: Date, default: null },
        avatar: { type: String, default: '' },
        status: { type: String, default: 'ROLE_USER', enum: ['ROLE_USER', 'ROLE_ADMIN'] },
        login_history: {
            select: false,
            type: [{ login_time: { type: Date }, logout_time: { type: Date }, isCleared: { type: Boolean, default: false } }],
        },
        token: { type: String, select: false }

    },
    { timestamps: true }
);

// Generate User token for authentication
UserSchema.methods.isSignedToken = function () {
    return jwt.sign({ id: this._id }, config.jwt.JWT_SECRET, {
        expiresIn: config.jwt.JWT_EXPIRE
    });
};

export default mongoose.model<any>('user', UserSchema); 
