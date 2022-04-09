import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
        createdOn: {
                type: Date, 
                default: Date.now
        },
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        subject: String,
        documentBody: [{
                from:{
                        ID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
                        name: String,
                        email: String
                },
                to:{
                        ID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
                        name: String,
                        email: String
                },
                content: String,
                contentType: String,
                addedOn: {
                        type: Date, default: Date.now
                }
        }],
});

const Document = new mongoose.model('Document', documentSchema);

export default Document;