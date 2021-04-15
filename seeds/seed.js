const sequelize = require('../config/connection');
// const { User, Project } = require('../models');
const { User, Faves } = require('../models');

const userData = require('./userData.json');
const FaveData = require('./FaveData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const faves of FaveData) {
    await Faves.create({
      ...faves,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
