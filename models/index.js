const User = require("./User");
const Language = require("./Language");
const Word = require("./Word");
const Scores = require("./Scores");
const UserLanguages = require("./UserLanguages")

User.hasMany(Scores, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

Scores.belongsTo(User, {
    foreignKey: "user_id"
});

User.belongsToMany(Language, {through: UserLanguages});
Language.belongsToMany(User, {through: UserLanguages});

module.exports = {
    User,
    Language,
    Word,
    Scores,
    UserLanguages
};