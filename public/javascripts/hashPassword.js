"use strict";
const bcrypt = require("bcrypt");
class HashPassword {
    constructor(){
    }
    get_hashed_password(passwrod) {
        return bcrypt.hashSync(passwrod, 10);
    }
    check_password(plain, hash){
        return bcrypt.compareSync(plain, hash);
    }
}
module.exports = HashPassword;