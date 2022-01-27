import React from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import Carousel from "../components/Carousel";

import {GetServicesById} from "../fakeAPI/FakeBackend";
import {GetUserById} from "../fakeAPI/FakeBackend";
import {GetServicesByUser} from "../fakeAPI/FakeBackend";
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

    root: {
        height: "500px",
        backgroundColor:"lightblue",

    },

    profilePicture: {
        borderRadius:"200px",
        height: "200px",
        margin:"20px 0",
    }
}));

function User(props) {
    const classes = useStyles();
    const {id} = useParams();

    const user = GetUserById(id);

    return(
        <Grid container className={classes.topLeft}>
            <Grid xs={9} container className={classes.root}>

            </Grid>
            <Grid xs={3} container className={classes.column}>
                <img src={`../material/${user.profile_picture}`} className={classes.profilePicture}/>
            </Grid>
        </Grid>
    )
}

export default User;