import React, {useState,useEffect,useRef} from "react";
import { Avatar, Grid ,Button, Paper, TextField } from "@mui/material";
import ScreenLockLandscapeIcon from '@mui/icons-material/ScreenLockLandscape';
import { Stack } from "@mui/system";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FaceMask from './face_mask.png';
import { useNavigate} from "react-router-dom";
import { isValid } from "./components/validator";
import session from './components/session';
import Head from "./components/head";



let faceimg = null;
let stream;
const Login=()=>{

    const paperStyle={padding:20,height:'70vh',width:'380px',margin:'20px auto'}
    const avatarstyle={backgroundcolor:'#FFFF00',size:"8799"}
    const headerstyle={margin:0}
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inputErrors,setInputErrors] = useState([]);
    const canvasElement = useRef();
    const videoElement = useRef();
    // const [action,setAction] = useState("normal");

    const [user, setUser] = useState({
        faceimg: ""
    })


    const loginUser = async (e = null) => {
        if(e){
            e.preventDefault();
        }

        if(!isValid(email,'email')){
            setInputErrors((e) => {
                e[0] = "Enter Username";
                e[1] = undefined;
                return [...e];
            })
        } 

       
        else if(!faceimg && !isValid(password,'password')) {
            setInputErrors((e) => {
                e[0] = undefined;
                e[1] = window.alert("choose password or facelogin");
                return [...e];
            })
        } 
        else{
            setInputErrors((e) => {
                e[0] = false;
                e[1] = false;
                return [...e];
            })
            const res = await fetch('/login', {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    email,
                    password,
                    faceimg: faceimg,
                }),
    
            });
    
            const data = await res.json();

            if (res.status === 400 || !data)
            {

                // today
                
                window.alert(data.error);
                
                
            }
            else{
                faceimg = null;
                window.alert("Login Success");
                const token = data.token;
                session.set('token',token);
                navigate("/");
            }
    
        }


    }



    // camer function 

    function handleClose(){
        setOpen(false);
    }




    async function handleCapture(){
        const video = videoElement.current;
        const canvas = canvasElement.current;

        canvas.width = 1920;
        canvas.height = 1080;

        let ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        let temp_faceimg = canvas.toDataURL('image/jpeg');

        // send the faceimg to backend

        setUser((e)=>({...e,faceimg: temp_faceimg}));
        faceimg = temp_faceimg; 
        // setAction("face");
        loginUser();
        handleClose();
    }

    useEffect(()=>{
        console.log(user);
    });

    async function getMedia(constraints) {
        return new Promise(async (r, e) => {
            const mediaDevices = await navigator.mediaDevices.enumerateDevices();
            if (mediaDevices.length === 0) {
                e("no media devices found!");
            }
            stream = null;
            for (let i = 0; i < mediaDevices.length; i++) {
                if (mediaDevices[i].kind === 'videoinput') {
                    try {
                        constraints.video = {
                            deviceId: {
                                exact: mediaDevices[i].deviceId
                            }
                        }
                        stream = await window.navigator.mediaDevices.getUserMedia(constraints);
                    } catch (_) { }
                }
            }
            if (stream === null) {
                e("Unable to capture video stream from mediaDevices");
            } else {
                r(stream);
            }
        })
    }


    useEffect(() => {
        async function init() {
            try {
                stream = await getMedia({audio: false, video: true});
                const video = document.querySelector("#video");
                video.srcObject = stream;
                video.onloadedmetadata = () => {
                    video.play();
                };
            } catch (e) {
                console.log(e);
                alert(e);
                setOpen(true);
            }
        }
        if (open) {
            init();
        }
    }, [open]);
    
    
    
    async function openDialog(){
        setOpen(true);  
    }

    function loadChatbot(){
        window.charlando.init("0943c15863464c4fa09dd6de936bbc46");
    }

    useEffect(()=>{
        const charlandoScript = document.querySelector("script.charlandoScript");
        if(!charlandoScript){
            const script = document.createElement("script");
    
            script.classList.add('charlandoScript');
    
            script.src = "https://cdn.jsdelivr.net/gh/pratyushtiwary/charlando-lib/charlando.js";
    
            script.onload = loadChatbot;
    
            document.querySelector("body").append(script);
        }
    },[]);

    return(
        <>
        <Head>
            <title>Login | Acceso</title>
            <link href="https://cdn.jsdelivr.net/gh/pratyushtiwary/charlando-lib/prod/charlando.css" rel="stylesheet" />
        </Head>
        <Grid>
            <Paper elevation={10} style={paperStyle} className="round">
                <Stack spacing={2}>
                <Grid  align='center'>
                    <Avatar  style={avatarstyle} ><ScreenLockLandscapeIcon/></Avatar>
                    <h2 style={headerstyle}>Sign In</h2>
                </Grid >
                
                <TextField label="Username" placeholder="Enter email" value={email}
                            onClick = {(e) => setEmail(e.target.value)} 
                            fullWidth required
                            error={Boolean(inputErrors[0])} helperText={inputErrors[0]}
                            onChange={e => setEmail(e.currentTarget.value)}
                            ></TextField >

                <TextField label="Password" placeholder="Enter password" type ='password'
                            value={password}
                            onClick = {(e) => setPassword(e.target.value)}
                            fullWidth required
                            error={Boolean(inputErrors[1])} helperText={inputErrors[1]}
                            onChange={e => setPassword(e.currentTarget.value)}
                            ></TextField>
                <a href="/forget_password">Forget Password?</a>
                <label className="remember_me_chk_box">
                    <input type="checkbox" /> Remember me
                </label>
                <Button  variant="contained" onClick={loginUser}>login</Button>
                </Stack>
                <Stack spacing={1}>
                <text style={{margin: "10px"}}>
                    Do you have an account?  
                    <a href="/signup">Sign-up</a>
                </text>
                <br/>
                    <Button variant="contained" style={{margin: "0"}} onClick={openDialog}>login with face</Button>
                </Stack>
            </Paper>
        </Grid>

        <canvas className="display-none hidden canvas" ref={canvasElement}></canvas>
        
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login with Face</DialogTitle>
        <DialogContent>
            <div className="camera">
                <video id="video" ref={videoElement}> video stream not available</video>
                <img src={FaceMask} alt="Face Mask" className="face_mask"/>
                <div className="opacity"></div>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCapture} id="startbutton">login</Button>
        </DialogActions>
      </Dialog>
      </>
        
    )
}
export default Login
