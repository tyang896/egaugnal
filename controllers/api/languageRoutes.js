const router = require("express").Router();
const withAuth = require("../../utils/auth");
const {Language, UserLanguages} = require("../../models");
const translate = require('@vitalets/google-translate-api');

//ROUTE: api/languages/
//Add a new language to the db
router.post('/', withAuth, async (req, res) => {
    try{
        let langExists = false;
        const languageCheck = await Language.findOne(
            {
                where: {
                    name: req.body.name
                },
                raw: true
            });

        if(languageCheck){
            const userLang = await UserLanguages.findAll({
                where: {
                  user_id: req.session.userID,
                },
                raw: true
              })
            const userLangIds = userLang.map(lang => lang.language_id)
              if(userLangIds.includes(languageCheck.id)){
                langExists = true;
              }
            if(langExists){
                res.status(400).json({message: "This language already exists in the database!"});
                return;
            }
            const userLangData = await UserLanguages.create({
                user_id: req.session.userID,
                language_id: languageCheck.id,
            })

            res.status(200).json(userLangData);
            return;
        }
        const transformWord = await translate(req.body.name, { to: req.body.name });
        const native = transformWord.text;
        const languageData = await Language.create({
            name: req.body.name,
            short: req.body.short,
            native: native
        });
        await UserLanguages.create({
            user_id: req.session.userID,
            language_id: languageData.id,
        })
        res.status(200).json(languageData);
        return;
    } catch(err) {
        res.status(500).json(err);
    }

})



module.exports = router;

