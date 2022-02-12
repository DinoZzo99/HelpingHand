import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Divider, Grid, Typography } from "@mui/material";
import {  useParams } from "react-router-dom";

import UserInfo from "./UserInfo";
import Carousel from "./Carousel";

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
        justifyContent: "flex-start",
        alignItems: "center"
    },

    topLeft: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },

    root: {
        position:"relative",
        top:"0"
    },

    titleContainer: {
        justifyContent:"space-between",
        padding:"20px 20px 0 20px",
    },
    
    title: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"32px",
        fontWeight:"bold",
        color:"#005c7a",
    },

    subtitle: {
        fontFamily:"'Raleway','sans-serif'",
        fontWeight:"bold",
        color:"#007ea7",
    },

    subtitleExtra: {
        margin:"5px 0 20px 40px",
        fontSize:"20px",
    },

    bodyText: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"18px",
        textAlign:"left",
        padding:"10px 20px",
    },

    leftGrid: {
        justifyContent:"flex-end"
    },

    rightGrid: {
        justifyContent:"flex-start"
    },

    image: {
        width:"100%",
        borderRadius:"200px"
    },
}));

function User(props) {
    const classes = useStyles();
    const {id} = useParams();

    return(
        <Grid container className={classes.topLeft + " " + classes.root}>
            <Grid container className={classes.column}>
                <Grid container className={classes.titleContainer}>
                    <Typography className={classes.title}>User Profile</Typography>
                </Grid>
                <Divider style={{width:"100%"}}/>
                <Grid container>
                    <Typography className={classes.subtitle + " " + classes.subtitleExtra}>Main information</Typography>
                </Grid>
                <Grid container className={classes.row}>
                    <Grid xs={6} container className={classes.column}>
                        <Grid container className={classes.row}>
                            <Grid xs={6} container className={classes.row + " " + classes.leftGrid}>
                                <Typography className={classes.bodyText + " " + classes.subtitle}>Name:</Typography>
                            </Grid>
                            <Grid xs={6} container>
                                <Typography className={classes.bodyText}>{props.user.name} {props.user.lastname}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.row}>
                            <Grid xs={6} container className={classes.row + " " + classes.leftGrid}>
                                <Typography className={classes.bodyText + " " + classes.subtitle}>Username:</Typography>
                            </Grid>
                            <Grid xs={6} container>
                                <Typography className={classes.bodyText}>{props.user.username}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.row}>
                            <Grid xs={6} container className={classes.row + " " + classes.leftGrid}>
                                <Typography className={classes.bodyText + " " + classes.subtitle}>Email:</Typography>
                            </Grid>
                            <Grid xs={6} container>
                                <Typography className={classes.bodyText}>{props.user.email}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.row}>
                            <Grid xs={6} container className={classes.row + " " + classes.leftGrid}>
                                <Typography className={classes.bodyText + " " + classes.subtitle}>Gender:</Typography>
                            </Grid>
                            <Grid xs={6} container>
                                <Typography className={classes.bodyText}>
                                    {props.user.gender == "F" ? "Female" : (
                                        props.user.gender == "M" ? "Male" : "Undefined"
                                    )}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.row}>
                            <Grid xs={6} container className={classes.row + " " + classes.leftGrid}>
                                <Typography className={classes.bodyText + " " + classes.subtitle}>Location:</Typography>
                            </Grid>
                            <Grid xs={6} container>
                                <Typography className={classes.bodyText}>{props.user.location}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs={6} container className={classes.column}>
                        <Grid xs={5} container>
                            <img src={`../material/${props.user.profile_picture}`} alt="profile picture" className={classes.image}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider style={{width:"100%", marginTop:"20px"}}/>
                <Grid container>
                    <Typography className={classes.subtitle + " " + classes.subtitleExtra}>User posts</Typography>
                </Grid>
                <Grid container>
                    {props.serviceList.length > 1 ? <Carousel services={props.serviceList} username={null} service_id={null}/> : null}
                </Grid>


            </Grid>
        </Grid>
    )
}

export default User;