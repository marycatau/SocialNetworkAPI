const { userModel } = require('../models');

module.exports = {
  // Get all user
  getUsers(req, res) {
    userModel.find()
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Get a user
  getUser(req, res) {
    userModel.findById(req.params.id).exec()
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a user
  createUser(req, res) {
    userModel.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a user
  deleteUser(req, res) {
    userModel.findByIdAndDelete(req.params.id).exec()
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : false
      )
      .then(() => res.json({ message: 'user deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a user
  updateUser(req, res) {
    userModel.findByIdAndUpdate(req.params.id,
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  createfriend(req, res) {
    userModel.findById(req.params.friendid).exec()
    .then((user) => {
            if(!user){
                res.status(404).json({ message: 'No friends user with that ID' });
            }else {
                userModel.findById(req.params.id).exec()
                .then((user2) => {
                    var newFriends = user2.friends;
                    newFriends.push(user);
                    userModel.findByIdAndUpdate(req.params.id,{"friends":newFriends}).exec().then((user3) =>
                    !user3
                      ? res.status(404).json({ message: 'No user with this id!' })
                      : res.json({ message: 'friend added!' })
                  );
            })
            }
        }
    )
    .catch((err) => res.status(500).json(err));
  },

  deletefriend(req, res) {
    userModel.findById(req.params.id).exec()
    .then((user2) => {
        var newFriends = []
        user2.friends.forEach(element => {
            if (element._id != req.params.friendid){
                newFriends.push(element); 
            }
        });
        userModel.findByIdAndUpdate(req.params.id,{"friends":newFriends}).exec()
        .then((user3) =>
            !user3
            ? res.status(404).json({ message: 'No user with this id!' })
            : res.json({ message: 'friend deleted!' })
        );
    });       
  }
}