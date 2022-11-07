const router = require('express').Router();

const {
  getThoughts,
  getThought,
  createThought,
  deleteThought,
  updateThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts)
                .post(createThought);
                

// /api/thoughts/:id
router.route('/:id').get(getThought)
                    .put(updateThought)
                    .delete(deleteThought);

router.route('/:id/reactions').post(createReaction)
                              .delete(deleteReaction);

module.exports = router;
