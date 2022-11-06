const connection = require('../config/connection');
const user = require('../models/User');
const { getRandomName } = require('./data');

// Start the seeding runtime timer
console.time('seeding');

// Creates a connection to mongodb
connection.once('open', async () => {
  // Delete the entries in the collection
  await user.deleteMany({});

  // Empty arrays for randomly generated users
  const users = [];

  for (let i = 0; i < 10; i++) {
    const name = getRandomName();
    const newUser = {
      userName: name,
      email: name+'@gmail.com',
    };
    users.push(newUser);
  }
  console.log(users);

  // Wait for the users to be inserted into the database
  await user.collection.insertMany(users);

  console.table(users);
  console.timeEnd('seeding complete 🌱');
  process.exit(0);
});
