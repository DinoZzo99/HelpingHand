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
        [theme.breakpoints.down('md')]:{
            fontSize:"18px"
        }
    },

    bodyText: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"18px",
        textAlign:"left",
        padding:"10px 20px",
        [theme.breakpoints.down('sm')]:{
            fontSize:"14px",
            padding:"5px"
        }
    },

    leftGrid: {
        justifyContent:"flex-end"
    },

    rightGrid: {
        justifyContent:"flex-start"
    },

    image: {
        height:"220px",
        borderRadius:"200px",
        [theme.breakpoints.down('md')]:{
            height:"190px",
            marginTop:"20px"
        },
        [theme.breakpoints.down('sm')]:{
            height:"160px",
            marginTop:"20px"
        },
        [theme.breakpoints.down('xs')]:{
            height:"130px",
            marginTop:"20px"
        }
    },

    container: {
        padding:"0 40px 40px 40px",
        [theme.breakpoints.down('xs')]:{
            width:"220px",
            padding:"0 20px 20px 20px"
        }
    },
}));

function User(props) {
    const classes = useStyles();
    const {id} = useParams();

    return(
        <Grid container direction="row" justifyContent="center">
            <Grid xl={7} lg={9} md={10} sm={11} container item direction="row" justifyContent="center">
                <Grid container item className={classes.titleContainer}>
                    <Typography className={classes.title}>User Profile</Typography>
                </Grid>
                <Divider style={{width:"100%"}}/>
                <Grid container item>
                    <Typography className={classes.subtitle + " " + classes.subtitleExtra}>Main information</Typography>
                </Grid>
                <Grid container item direction="row" justifyContent="center">
                    <Grid md={6} container item>
                        <Grid container item>
                            <Grid min={5} container item className={classes.leftGrid}>
                                <Typography className={classes.bodyText + " " + classes.subtitle}>Name:</Typography>
                            </Grid>
                            <Grid min={7} container item>
                                <Typography className={classes.bodyText}>{props.user.name} {props.user.lastname}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.row}>
                            <Grid min={5} container item className={classes.leftGrid}>
                                <Typography className={classes.bodyText + " " + classes.subtitle}>Username:</Typography>
                            </Grid>
                            <Grid min={7} container item>
                                <Typography className={classes.bodyText}>{props.user.username}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.row}>
                            <Grid min={5} container item className={classes.row + " " + classes.leftGrid}>
                                <Typography className={classes.bodyText + " " + classes.subtitle}>Email:</Typography>
                            </Grid>
                            <Grid min={7} container item>
                                <Typography className={classes.bodyText}>{props.user.email}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item className={classes.row}>
                            <Grid min={5} container className={classes.row + " " + classes.leftGrid}>
                                <Typography className={classes.bodyText + " " + classes.subtitle}>Gender:</Typography>
                            </Grid>
                            <Grid min={7} container item>
                                <Typography className={classes.bodyText}>
                                    {props.user.gender == "F" ? "Female" : (
                                        props.user.gender == "M" ? "Male" : "Undefined"
                                    )}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.row}>
                            <Grid min={5} container item className={classes.row + " " + classes.leftGrid}>
                                <Typography className={classes.bodyText + " " + classes.subtitle}>Location:</Typography>
                            </Grid>
                            <Grid min={7} container item>
                                <Typography className={classes.bodyText}>{props.user.location}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid md={6} container direction="row" justifyContent="center">
                        <img src={`../material/${props.user.profile_picture}`} alt="profile picture" className={classes.image}/>
                    </Grid>
                </Grid>
                <Divider style={{width:"100%", marginTop:"20px"}}/>
                <Grid container item>
                    <Typography className={classes.subtitle + " " + classes.subtitleExtra}>User posts</Typography>
                </Grid>
                <Grid container item className={classes.container}>
                    {props.serviceList.length > 1 ? <Carousel services={props.serviceList} username={null} service_id={null}/> : null}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default User;