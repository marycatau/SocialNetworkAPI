const { Schema, Types, model } = require('mongoose');

const reactionSchema = new Schema({
    reactionId :{ 
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody:{
        type: String,
        required: true,
        maxlength:280,
    },
    userName:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        get: val => {
          return val.toUTCString();
        },
    },
});

const thoughtSchema = new Schema(
    {
        thoughtText: {
          type: String,
          required: true,
          maxlength: 280,
          minlength: 1,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
          get: val => {
            return val.toUTCString();
          },
        },
        userName: {
            type:String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema
.virtual('reactionCount')
// Getter
.get(function () {
    return `${this.reactions.length}`;
});

const thoughtModel = model ('thought', thoughtSchema);

module.exports = {thoughtModel, thoughtSchema};