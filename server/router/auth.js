// const sha256 = require('crypto-js/sha256');
const Base64 = require('crypto-js/enc-base64');
const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const env = require('../utils/env');
const {matchFace} = require("../utils");
// const {spawn} = require('fac')

require('../db/conn')
env.load();
const User = require("../model/userSchema")

router.get('/', (req, res) => {
   res.send(`hello client`);
});

// bye 

//router.post('./register', (req, res) => {

//    const { name, email, contact, password, cpassword } = req.body;
//    console.log(req.body); //which things has to show in body

//    if (!name || !email || !contact || !password || !cpassword) {
//        return res.status(422).json({ error: "Fill All detail" });
//    }

//    User.findOne({ email: email })
//        .then((userExist) => {
//            if (userExist) {
//                return res.status(422).json({ error: 'Email already exist' });
//            }

//            const user = new User({ name, email, contact, password, cpassword })
//            user.save().then(() => {
//                res.status(201).json({ message: 'user registered successful' });
//            }).catch((err) => res.status(500).json({ error: "failed to registered" }));
//        }).catch(err => { console.log(err); });
//})


// router.post('/signup', async (req, res) => {
//     // let { name, email, phone, password, cpassword, faceimg} = req.body;                 work
//     let { name, email, phone, password, cpassword, faceimg} = req.body;

//     if (!name || !email || !phone || !password || !cpassword || !faceimg) {
//         return res.status(422).json({ error: "Fill all detail" });
//     }

//     if (password !== cpassword) {
//         return res.status(422).json({ error: "Please recheck your passwords" });
//     }

//     try {
//         // password = Base64.stringify(sha256(password));   this for encrepting the password in Database

//         const userExist = await User.findOne({ email: email });

//         if (userExist) {
//             return res.status(422).json({ error: 'Email already exist' });
//         } else {
//             const user = new User({ name, email, phone, password, faceimg})
//             await user.save();
//             // console.log("data detail");
//             res.status(201).json({ message: 'user registered successful' });

//         }
//     } catch (err) {
//         console.log(err);
//     }

// })


router.post('/signup', async (req, res) => {
    // console.log("testets");
    // let { name, email, phone, password, cpassword, faceimg} = req.body;                 work
    let { name, email, phone, password, cpassword, faceimg} = req.body;

    if (!name || !email || !phone || !password || !cpassword || !faceimg) {
        return res.status(400).json({ error: "Fill all detail" });
    }

    if (password !== cpassword) {
        return res.status(400).json({ error: "Please recheck your passwords" });
    }

    try {
        // password = Base64.stringify(sha256(password));   this for encrepting the password in Database

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(400).json({ error: 'Email already exist' });
        } else {
            const user = new User({ name, email, phone, password, faceimg})
            await user.save();
            console.log("data detail");
            res.status(201).json({ message: 'user registered successful' });

        }
    } catch (err) {
        console.log(err);
    }

})




//login routh 
router.post('/login', async (req, res) => {
   
    
    try {
        // console.log("test");
        let token;
        const { email, password,faceimg } = req.body;
        if (!email ) {
            return res.status(400).json({ error: "Enter Username" });
        }
        if (!password && !faceimg ) {
            return res.status(400).json({ error: "fill the data" });
        }

        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            if(password){
                const isMatch = await bcrypt.compare(password, userLogin.password);
                token = await userLogin.generateAuthToken();
                // console.log(token);
    
    
                if(!isMatch){
                    res.status(400).json({error : " Invelid User pass", threshold});
                } 
                else {
                    res.json({ message: "use login success", token: token });
                }
            } else {
                try{
                    
                    const data = await matchFace(email, faceimg);
                    console.log(data);
                    const {verified} = data;
                    // const face_threshold = parseFloat(process.env.FACE_THRESHOLD);
                    console.log(verified);
                    if(verified){
                        return res.status(200).json({ message : data});
                        
                    }
                    else {
                        return res.status(400).json({error : "Your face is not proper, get a plastic surgery! 🔥 small", data});
                    }
                } catch(e){
                    console.log(e);
                    return res.status(400).json({error : "Your face is not proper, get a plastic surgery!  🔥 big"});
                }
            }
        } 
        else{
            res.status(400).json({error : " Inveled User"});
        }
    } catch (err) {
        console.log(err);
    }
});





// login validation

// router.post('/login', (req, res) => {
//     try {
//         // let token;
//         const { email, password } = req.body;
//         if (!email || !password) {
//             return res.status(400).json({ error: "fill the data" })
//         }

//         const userLogin = await User.findOne({ email: email });

//         console.log(userLogin);

//         if (!userLogin) {
//             // 2
//             res.status(400).json({ error: "user error" });
//         } else {
//             res.json({ message: "use login success" })
//         }
//     } catch (err) {
//         console.log(err);
//     }

//     // console.log(req.body);
//     // res.json({message: "awesome"});
// });



module.exports = router;