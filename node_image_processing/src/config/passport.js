import mongoose from 'mongoose';
import nconf from "nconf";
import path from "path";
import JwtStrategy from 'passport-jwt/lib/strategy';
import { ExtractJwt } from 'passport-jwt/lib';

nconf.argv()
     .env()
     .file({ file: path.resolve("config.json")});

const User = mongoose.model('users');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = nconf.get("SECRET_KEY");


module.exports = passport =>{
  passport.use(
    new JwtStrategy(opts,async (jwt_payload,done) => {
        try{
            const user = await User.findById(jwt_payload.id)
            if(user){
                return done(null, user);
            }
            return done(null, null);
        }
        catch(err){
            return done(null, null);
        }
    })
  )
}