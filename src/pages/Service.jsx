import React from "react";
import { Button, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import Carousel from "../components/Carousel";

import {GetServicesById} from "../fakeAPI/FakeBackend";
import {GetUserById} from "../fakeAPI/FakeBackend";
import {GetOwnerServiceList} from "../fakeAPI/FakeBackend";
import {GetCategoryById} from "../fakeAPI/FakeBackend";

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
        justifyContent:"flex-start",
        alignItems:"center",
    },

    topLeft: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },

    userInfoContainer: {
        padding:"50px 20px",
    },

    header: {
        borderRadius:"4px",
        boxShadow: "0px 1px 5px #000000",
        marginTop:"40px",
        justifyContent:"space-between",
    },

    titleContainer: {
        justifyContent:"space-between",
        padding:"10px",
    },

    title: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"34px",
        textAlign:"left",
    },

    subtitle: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"20",
        textAlign: "left",
    },

    body: {
        padding:"30px",
    },

    bodyText: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"18px",
        textAlign:"left"
    },

    btn: {
        padding:"13px",
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"18px",
        borderLeft: '1px solid rgba(0, 0, 0, .125)',
        whiteSpace:"nowrap",
        backgroundColor:"#007ea7",
        color:"white",
        "&:hover":{
            backgroundColor:"rgb(240,240,255)",
            pointer:"cursor",
        }
    },

    buttonContainer: {
        borderRadius:"0 0 4px 4px",
        borderTop: '1px solid rgba(0, 0, 0, .125)',
    },

    content: {
        padding:"10px",
    },
}));

function Service(props) {
    const classes = useStyles();
    const {id} = useParams();

    const navigate = useNavigate();

    const service = GetServicesById(id);
    const user = GetUserById(service.owner);
    const serviceList = GetOwnerServiceList(service.owner);
    const category = GetCategoryById(service.category);

    return(
        <Grid container className={classes.topLeft}>
            <Grid xs={9} container className={classes.column}>
                <Grid xs={9} container className={classes.column + " " + classes.header}>
                    <Grid xs={12} conatiner className={classes.column + " " + classes.titleContainer}>
                        <Grid container>
                            <Typography className={classes.subtitle}>{category.category_name}</Typography>
                        </Grid>
                        <Grid xs={12} container className={classes.content}>
                            <Grid xs={5} container>
                                <Typography className={classes.title}>{service.title}</Typography>
                            </Grid>
                            <Grid xs={7} container>
                                <Typography className={classes.subtitle + " " + classes.content}>{service.secondary}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs={12} container className={classes.row + " " + classes.buttonContainer}>
                        <Grid xs={4} container className={classes.column + " " + classes.btn} style={{borderRadius:"0 0 0 4px"}}>Apply</Grid>
                        <Grid xs={4} container className={classes.column + " " + classes.btn}>Contact</Grid>
                        <Grid xs={4} container onClick={() => navigate(`../services/${category.category_id}`)} className={classes.column + " " + classes.btn} style={{borderRadius:"0 0 4px 0"}}>View Category</Grid>
                    </Grid>
                </Grid>
                <Grid xs={9} container className={classes.body}>
                    <Typography className={classes.bodyText}>
                        {service.body}
                    </Typography>
                </Grid>
                <Grid xs={9} container className={classes.content}>
                    <Carousel services={serviceList} username={user.username} service_id={service.id}/>
                </Grid>
            </Grid>
            <Grid xs={3} container className={classes.userInfoContainer}>
                <UserInfo user={user} type='service'/>
            </Grid>
        </Grid>
    )
}

export default Service;