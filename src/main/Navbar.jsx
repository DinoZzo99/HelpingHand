import React from "react";
import { makeStyles } from "@material-ui/core";
import Toolbar from '@material-ui/core/Toolbar';
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { AppBar } from "@material-ui/core";
import { BrowserRouter, Link, Router, Routes, useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme)=>({
    navbar: {
        width:"100%",
        padding: "0",
        backgroundColor: "#005c7a",
        boxShadow: "0px 1px 5px #000000"
    },

    navbarElement: {
        color: "#ffffff",
        marginLeft:"30px"
    },

    rowEnd: {
        display: "flex",
        flexDirection: "row",
        justifyContent:"flex-end",
        alignItems:"center"
    },
}));

function Navbar(props) {
    const classes = useStyles();

    return(
        <AppBar position="sticky">
            <Toolbar className={classes.navbar}>
                <Grid xs={2}></Grid>
                <Grid xs={7} container>
                    <Link to="/home" style={{ textDecoration: 'none' }}><Typography className={classes.navbarElement}>Home</Typography></Link>
                    <Link to="/about" style={{ textDecoration: 'none' }}><Typography className={classes.navbarElement}>About</Typography></Link>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;