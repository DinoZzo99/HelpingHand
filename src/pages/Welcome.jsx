import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Grid } from "@mui/material";
import Login from "../components/Login";

const useStyles = makeStyles((theme)=>({
    column: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    },

    root: {
        
    },

    leftGrid: {
        backgroundColor:"#007ea7"
    },

    rightGrid: {
        padding:"40px",
    },
    
}));

function Welcome(props) {
    const classes = useStyles();
    
    return(
        <Grid container className={classes.root}>
            <Grid xs={8} container className={classes.leftGrid}>

            </Grid>
            <Grid xs={4} container className={classes.rightGrid}>
                <Login/>
            </Grid>
        </Grid>
    )
}

export default Welcome;