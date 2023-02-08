const dotenv = require('dotenv');

let ENV_LOADED = false;

const env = {};

env.load = (path = '../config.env') => {
    if(!ENV_LOADED){
        dotenv.config({ path });
    }
}

module.exports = env;