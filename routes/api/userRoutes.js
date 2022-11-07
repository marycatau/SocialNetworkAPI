const router = require('express').Router();


const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  createfriend,
  deletefriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers)
                .post(createUser);
                

// /api/users/:id
router.route('/:id').get(getUser)
                    .put(updateUser)
                    .delete(deleteUser);

router.route('/:id/friends/:friendid')  .post(createfriend)
                                        .delete(deletefriend);

module.exports = router;
