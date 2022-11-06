const { Schema, model } = require('mongoose');
const {thoughtSchema, thoughtModel} = require('./Thought');

const userSchema = new Schema(
    {
      userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        pattern: '/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/',
      },
      thoughts: [thoughtSchema],
      friends: [this],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
);

    
// Create a virtual property `friendCount` that gets the amount of friends per user
userSchema
.virtual('friendCount')
// Getter
.get(function () {
  return `${this.friends.length}`;
});
  
const userModel = model('user', userSchema);

module.exports = userModel;  