import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
        createdOn: {
                type: Date, 
                default: new Date()
        },
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        subject: String,
        documentBody: [{
                from:{
                        type: mongoose.Schema.Types.ObjectId, ref: 'User'
                },
                to:{
                        type: mongoose.Schema.Types.ObjectId, ref: 'User'
                },
                content: String,
                contentType: String,
                addedOn: {
                        type: Date, default: new Date()
                }
        }],
});

const Document = new mongoose.model('Document', documentSchema);

export default Document;