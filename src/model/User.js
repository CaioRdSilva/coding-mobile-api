import mongoose from "mongoose";
const Schema = mongoose.Schema;

let User = new Schema({
    name: {
        type: String 
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
},{
    collation: {locale: 'en_US', strength: 1}
});

export default mongoose.model('User',User)