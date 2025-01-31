const sequelize = require('../config/connection');
const { User, Language, Word, Scores, UserLanguages } = require('../models');

const userData = require('./userData.json');
const languageData = require('./languageData.json');
const wordData = require('./wordData.json')
const scoreData = require("./scoreData.json")
const userLangData = require('./userlangData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await Language.bulkCreate(languageData);
    await Word.bulkCreate(wordData);
    await Scores.bulkCreate(scoreData);
    await UserLanguages.bulkCreate(userLangData);


    process.exit(0);
};

seedDatabase();