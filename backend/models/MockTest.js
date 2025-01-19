const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('../models/User');

const MockTestSchema = new Schema({
    user: 
    { type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
    },
    questions: 
    { type: [Schema.Types.ObjectId], 
    ref: "Question", 
    required: true 
    },
    score: 
    { type: Number, 
      default: 0 
    },
    createdAt: 
    { type: Date, 
      default: Date.now 
    },
  });
  module.exports = mongoose.model("MockTest", MockTestSchema);

  