import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Button, Grid, TextField, Typography } from "@mui/material";
import {Stepper, StepButton, Step} from "@mui/material";

const useStyles = makeStyles((theme)=>({
    column: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    },

    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    root: {
        width:"1050px",
        marginTop:"60px",
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

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

function Register(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    
    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    return(
        <Grid container className={classes.column}>
            <Grid container className={classes.root}>
                <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepButton color="inherit" onClick={handleStep(index)}>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                <TextField
                    id="firstname"
                    label="Firstname"
                    variant="standard"
                    className={classes.textfield}
                />
                <TextField
                    id="lastname"
                    label="Lastname"
                    variant="standard"
                    className={classes.textfield}
                />
                <TextField
                    required
                    id="email"
                    label="Email"
                    variant="standard"
                    className={classes.textfield}
                />
                <TextField
                    required
                    id="username"
                    label="Username"
                    variant="standard"
                    className={classes.textfield}
                />
                <TextField
                    required
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    className={classes.textfield}
                />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >Register</Button>
                <Grid container className={classes.row}>
                    <Typography className={classes.typography}>Already a member?&nbsp;</Typography>
                    <Typography className={classes.typography} color="primary">Login here.</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Register;