const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const ScoreSchema = new Schema({
    scored: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
      user: 
          {
          type: Schema.Types.ObjectId,
            ref: 'User',
          }
        
      },
    {
      toJSON: {
        getters: true,
      },
    },
)

const Score = model('Score', ScoreSchema);
  
module.exports = Score;