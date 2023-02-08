const env = require("./env");
const {default: axios} = require("axios");

env.load();

async function matchFace(username,face){
    const pythonServerURL = process.env.PYTHON_BACKEND_URL;

    const data = {
        username,
        face
    }
    

    let result = await axios.post(pythonServerURL+"/compare",data);
    // console.log(result);

    return result.data;
}

module.exports = {
    matchFace
}