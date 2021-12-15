import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
        email: String,
        password: String,
        firstTime: Boolean,
        prefix: String,
        firstName: String,
        middleName: String,
        lastName: String,
        group: String,
        department: String,
        designation: String,
        profilePic: String,
        pending: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
        forwarded: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
        drafts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
        authored: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
        resolved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
        all: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }]

});

const User = new mongoose.model('User', userSchema);


export default User;