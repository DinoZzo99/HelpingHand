import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Button, Grid, StepConnector, TextField, Typography } from "@mui/material";
import {Stepper, StepButton, Step, MenuItem} from "@mui/material";
import { useNavigate } from "react-router-dom";

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
        marginTop:"60px",
        borderRadius:"4px",
        padding:"20px 40px",
        boxShadow:"0px 1px 4px #000000",
        alignItems:"space-between"
    },

    infoContainer: {
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-start",
        alignItems:"space-between",
        padding:"20px 100px"
    },
    
    textfield: {
        width:"100%",
        marginTop:"20px"
    },

    button: {
        width:"100%",
    },

    typography: {
        fontSize:"14px"
    },

    hoverPointer: {
        "&:hover":{
            cursor:"pointer"
        }
    }
    
}));

const steps = ['Personal information', 'Login information', 'Other'];

function Register(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    const navigate = useNavigate();

    const [gender, setGender] = React.useState(undefined);

    
    const handleStep = (step) => () => {
        setActiveStep(step);
    };
    const handleGender = (value) => {
        setGender(value);
    }

    return(
        <Grid container className={classes.column}>
            <Grid xl={7} lg={8} container className={classes.column}>
                <Grid xs={9} container className={classes.root}>
                    <Grid container direction="column" justifyContent="flex-start" aligntItems="space-between">
                        <Stepper nonLinear activeStep={activeStep} connector={<StepConnector/>}>
                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepButton color="inherit" onClick={handleStep(index)}>
                                        {label}
                                    </StepButton>
                                </Step>
                            ))}
                        </Stepper>
                    </Grid>
                    {
                        (activeStep == 0) &&
                        <Grid container className={classes.infoContainer}>
                            <TextField
                                id="firstname"
                                label="Firstname"
                                variant="outlined"
                                className={classes.textfield}
                            />
                            <TextField
                                id="lastname"
                                label="Lastname"
                                variant="outlined"
                                className={classes.textfield}
                            />
                            <TextField
                                id="gender"
                                select
                                label="Gender"
                                value={gender}
                                onChange={handleGender}
                                className={classes.textfield}
                            >
                                <MenuItem value={"Male"}>
                                    Male
                                </MenuItem>
                                <MenuItem value={"Female"}>
                                    Female
                                </MenuItem>
                                <MenuItem value={"None"}>
                                    Do not specify
                                </MenuItem>
                            </TextField>
                        </Grid>
                    }{
                        (activeStep == 1) &&
                        <Grid container className={classes.infoContainer}>
                            <TextField
                                id="email"
                                label="Email"
                                variant="outlined"
                                className={classes.textfield}
                            />
                            <TextField
                                id="username"
                                label="Username"
                                variant="outlined"
                                className={classes.textfield}
                            />
                            <TextField
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                                className={classes.textfield}
                            />
                        </Grid>
                    }{
                        (activeStep == 2) &&
                        <Grid container className={classes.infoContainer}>
                            <TextField
                                id="location"
                                label="Location"
                                variant="outlined"
                                className={classes.textfield}
                            />
                        </Grid>
                    }
                    <Grid container className={classes.infoContainer}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >Register</Button>
                    </Grid>
                    <Grid container className={classes.row}>
                        <Typography className={classes.typography}>Already a member?&nbsp;</Typography>
                        <Typography className={classes.typography + " " + classes.hoverPointer} color="primary" onClick={() => navigate("/welcome")}>Login here.</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Register;