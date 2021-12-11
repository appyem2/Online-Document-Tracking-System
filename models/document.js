import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
        createdOn: {
                type: Date, 
                default: new Date()
        },
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        subject: String,
        userChain: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});

const Document = new mongoose.model('Document', documentSchema);

export default Document;