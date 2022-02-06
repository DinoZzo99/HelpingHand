import React, { useCallback } from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Button, Grid, TextField, Typography } from "@mui/material";
import { GetUserByLogin } from "../fakeAPI/FakeBackend";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../redux/actions/user";
import { useNavigate } from "react-router-dom";
import { userLogIn } from "../redux/actions/loginStatus";

const useStyles = makeStyles((theme)=>({
    column: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    },

    root: {
        width:"350px",
        marginTop:"20px",
        borderRadius:"4px",
        padding:"20px 40px",
        boxShadow:"0px 1px 4px #000000",
    },
    
    textfield: {
        width:"100%",
        marginBottom:"20px"
    },

    button: {
        width:"100%",
        margin:"20px 0",
    },

    typography: {
        fontSize:"14px"
    },
    
}));

function Login(props) {
    const classes = useStyles();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        console.log("entered 'handle login'");
        if(email.length < 3 || password.length < 6) {
            console.log("username or password is invalid");
            return null;
        }
        let user = GetUserByLogin(email);
        if(user === null) {
            console.log("user not found");
            return null;
        }
        if(user.password === password) {
            dispatch(userLoggedIn(parseInt(user.id)));
            dispatch(userLogIn());
            setEmail("");
            setPassword("");
            navigate('/home');
        }
    }
    const handleEmailValue = (event) => {
        setEmail(event.target.value);
    }
    const handlePassValue = (event) => {
        setPassword(event.target.value);
    }

    return(
        <Grid container className={classes.column}>
            <Grid container className={classes.root}>
                <TextField
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    value={email}
                    onChange={handleEmailValue}
                    className={classes.textfield}
                />
                <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    value={password}
                    onChange={handlePassValue}
                    className={classes.textfield}
                />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => handleLogin()}
                >Login</Button>
                <Grid container>
                    <Typography className={classes.typography}>Not a member?</Typography>
                    <Typography className={classes.typography} color="primary">Register here.</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Login;