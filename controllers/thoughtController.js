const { thoughtModel, userModel } = require('../models');

module.exports={
    getThoughts(req, res) {
        thoughtModel.find()
          .then((thought) => res.json(thought))
          .catch((err) => res.status(500).json(err));
      },

    getThought(req, res) {
        thoughtModel.findById(req.params.id).exec()
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },

    createThought(req, res) {
        thoughtModel.create(req.body)
        .then(async(thought) => {
            //update relevant user details
            var user = await userModel.findOne({"userName":req.body.userName}).exec();            
            if(!user){
                res.status(404).json({ message: 'No user with that name' });
                return;
            }
             
            var newThoughts = user.thoughts;            
            newThoughts.push(thought);            
            user = await userModel.findByIdAndUpdate(user._id, {"thoughts":newThoughts}).exec();
            if(!user){
                res.status(404).json({ message: 'No user with this id!' })
                return;
            }
            res.json(thought);
        }).catch((err) => {            
            console.log(err);
            return res.status(500).json(err);
        });       
    },

    deleteThought(req, res) {
        thoughtModel.findByIdAndDelete(req.params.id).exec()
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : false
          )
          .then(() => res.json({ message: 'thought deleted!' }))
          .catch((err) => res.status(500).json(err));
      },

    updateThought(req, res) {
        thoughtModel.findByIdAndUpdate(req.params.id,
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((thought)=>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },

    createReaction(req, res) {
        thoughtModel.findById(req.params.id).exec()
        .then((thought) => {
            var reactions = thought.reactions;
            reactions.push(req.body);
            thoughtModel.findByIdAndUpdate(req.params.id,
                { "reactions": reactions},
                { runValidators: true, new: true }
            ).then((thought)=>
                !thought
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(thought)
            ).catch((err) => res.status(500).json(err));
        }).catch((err) => {            
            console.log(err);
            return res.status(500).json(err);
        });       
    },

    deleteReaction(req, res) {
        thoughtModel.findById(req.params.id).exec()
        .then((thought) => {
            var reactions = thought.reactions;
            var newReactions = [];
            reactions.forEach(element => {
                if(element.reactionId != req.body.reactionId){
                    newReactions.push(element);
                }
            });
            thoughtModel.findByIdAndUpdate(req.params.id,
                { "reactions": newReactions},
                { runValidators: true, new: true }
            ).then((thought)=>
                !thought
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(thought)
            ).catch((err) => res.status(500).json(err));
        }).catch((err) => {            
            console.log(err);
            return res.status(500).json(err);
        });       
    },
    
}
