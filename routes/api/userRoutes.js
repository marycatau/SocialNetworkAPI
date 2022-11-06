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

/*
// /api/students/:studentId/assignments
router.route('/:studentId/assignments').post(addAssignment);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);
*/

module.exports = router;
