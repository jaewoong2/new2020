const passport = require('passport');
const { User } = require('../models');
const local = require('./local');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });


    passport.deserializeUser( async (id, done) => {
        try {
            const user = await User.findOne({
                where : { id : id } // passport에서 id를 갖고 있음
            });
            done(null, user)

        } catch (err) {
            console.error(err);
            done(err)
        }
    });


    local();
}