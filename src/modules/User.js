import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
    {
    username: String,
    password: String,
    },
    {
        timestamps: true,
    },  
);

const User = mongoose.model('user', UserSchema);

export default User;