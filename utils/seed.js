const connection = require('../config/connection');
const {userModel, thoughtModel}= require('../models');
const { getRandomName} = require('./data');

// Start the seeding runtime timer
console.time('seeding');

// Creates a connection to mongodb
connection.once('open', async () => {
  // Delete the entries in the collection
  await userModel.deleteMany({});

  await thoughtModel.deleteMany({});

  // Empty arrays for randomly generated users
  var users = [];
  var thoughts2=[];

  const thoughtTexts=[
    'That is a good idea',
    'I wanna to go swimming',
    'I decice to go to spanish',
    'I will study janpanese',
    'I love the sunshine this morning',
    'That is cool to have a go ',
    'I wanna to cry today',
    'The garden is full of bugs',
    'There is lots of things to do',
    'My favourite footballer is ',
    'I have allergy to nuts',
    'I wanna to watch The crown ',
    'It is too late to handin the homework'
  ];

  for (let i = 0; i < 10; i++) {
    const name = getRandomName();

    const newThought = {
        thoughtText: thoughtTexts[i],
        userName: name
    }
    thoughts2.push(newThought);
    
    //var thought=[];
    //thought.push(thoughtTexts[i]);

    const newUser = {
      userName: name,
      email: name+'@gmail.com',
    thoughts:[newThought],
    };
    console.log(thoughtTexts[i]);
    console.log(newUser.thoughts);
    users.push(newUser);
  }
  console.log(users);
  console.log(thoughts2);

  // Wait for the users to be nserted into the database
  await userModel.collection.insertMany(users);
  await thoughtModel.collection.insertMany(thoughts2);

  console.table(users);
  console.table(thoughts2);
  console.timeEnd('seeding complete 🌱');
  process.exit(0);
});
