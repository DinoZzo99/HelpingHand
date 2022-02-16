import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import AppBar from '@mui/material/AppBar';
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import logo from "../pictures/logo.png";
import { useSelector } from "react-redux";


const useStyles = makeStyles((theme)=>({
    appbar: {
        //main
        backgroundColor: "#007ea7",
        // [theme.breakpoints.only('xs')]: {
        //     backgroundColor: "yellow",
        // },
        // [theme.breakpoints.only('sm')]: {
        //     backgroundColor: "orange",
        // },
        // [theme.breakpoints.only('md')]: {
        //     backgroundColor: "red",
        // },
        // [theme.breakpoints.only('lg')]: {
        //     backgroundColor: "blue",
        // },
        // [theme.breakpoints.only('xl')]: {
        //     backgroundColor: "darkblue",
        // },
        [theme.breakpoints.down('sm')]:{
            display:"none"
        }
    },

    logoImage:{
        height:"150px"
    },

    title: {
        fontFamily:"'Raleway','sans-serif'",
        color:"white",
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
                    <Grid xs={2} container item className={classes.column}>
                        <img className={classes.logoImage} src={logo}/>
                    </Grid>
                    <Grid xs={10} container item className={classes.rowStart}>
                        <Typography className={classes.title}>Helping Hand</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </AppBar>
    )
}

export default MainHeader;