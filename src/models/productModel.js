const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    price:{
        type:String,
        require:true
    }
}, { timestamps: true });

module.exports = new mongoose.model('Product', productSchema);
