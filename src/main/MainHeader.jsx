import React from "react";
import { makeStyles } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import logo from "../pictures/logo.png";

const useStyles = makeStyles((theme)=>({
    appbar: {
        backgroundColor: "#007ea7",
    },

    logoImage:{
        height: "140px",
        width:"140px",
    },

    title: {
        color:"#ffffff",
        fontSize:"50px",
    },

    rowStart: {
        display: "flex",
        flexDirection: "row",
        justifyContent:"flex-start",
        alignItems:"center"
    },

    column: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    }
}));

function MainHeader(props) {
    const classes = useStyles();

    return(
        <AppBar position="static" className={classes.appbar}>
            <Grid container className={classes.column}>
                <Grid container className={classes.rowStart}>
                    <Grid xs={2}>
                        <img className={classes.logoImage} src={logo}/>
                    </Grid>
                    <Grid xs={4} container className={classes.rowStart}>
                        <Typography className={classes.title}>Helping Hand</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </AppBar>
    )
}

export default MainHeader;