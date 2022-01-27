import React from "react";
import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";

import WorkIcon from '@material-ui/icons/Work';
import CreateIcon from '@material-ui/icons/Create';
import PeopleIcon from '@material-ui/icons/People';
import EmailIcon from '@material-ui/icons/Email';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import NotesIcon from '@material-ui/icons/Notes';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme)=>({
    column: {
        display: "flex",
        flexDirection: "column",
        justifyContent:"flex-start",
        alignItems:"center",
    },

    side: {
        display: "flex",
        flexDirection: "column",
        justifyContent:"space-between",
        alignItems:"center",
        position:"-webkit-sticky",
        position:"sticky",
        top:"50px",
        paddingTop:"20px",
        marginBottom:"-100vh",
        height: "100vh",
        backgroundColor: "rgb(30,30,40)",
    },

    bottomMark: {
        fontFamily:['"Raleway"','sans-serif'].join(","),
        position:"fixed",
        bottom:"20px",
        color:"white",
        justifyContent:"center",
        alignItems:"center"
    },

    menuItem: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"20px",
        color: "white",
        padding:"10px 0px 10px 25px",

        "&:hover":{
            backgroundColor: "rgb(35,35,50)",
            cursor:"pointer"
        }
    },

    menuSubitem: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"16px",
        color: "white",
        padding:"10px 0px 10px 75px ",

        "&:hover":{
            backgroundColor: "rgb(35,35,50)",
            cursor:"pointer"
        }
    },

    icon: {
        marginRight:"15px",
    },

}));

function SideGrid(props) {
    const classes = useStyles();

    const navigate = useNavigate();

    return(
        <Grid md={2} container className={classes.side}>
            <Grid container className={classes.column}>
                <Grid container className={classes.menuItem} onClick={() => navigate("../services")}><WorkIcon className={classes.icon}/>Jobs</Grid>
                <Grid container className={classes.menuSubitem}><CreateIcon className={classes.icon}/>Created jobs</Grid>
                <Grid container className={classes.menuSubitem}><PeopleIcon className={classes.icon}/>Joined jobs</Grid>
                <Grid container className={classes.menuItem}><EmailIcon className={classes.icon}/>Messages</Grid>
                <Grid container className={classes.menuItem}><WorkIcon className={classes.icon}/>Notifications</Grid>
                <Grid container className={classes.menuItem}><WorkIcon className={classes.icon}/>Tools</Grid>
                <Grid container className={classes.menuSubitem}><AddCircleIcon className={classes.icon}/>Create job</Grid>
                <Grid container className={classes.menuSubitem}><NotesIcon className={classes.icon}/>Set status</Grid>
                <Grid container className={classes.menuItem}><AccountCircleIcon className={classes.icon}/>My account</Grid>
                <Grid container className={classes.menuItem}><WorkIcon className={classes.icon}/>Log out</Grid>
            </Grid>
            <Grid md={2} container className={classes.bottomMark}>Helping Hand - Zavrsni Rad</Grid>
        </Grid>
    )
}

export default SideGrid;