import React from "react";
import { Button, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Grid } from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import {GetOwnerServiceList, GetServicesById} from "../fakeAPI/FakeBackend";
import {GetUserById} from "../fakeAPI/FakeBackend";
import {GetServicesByUser} from "../fakeAPI/FakeBackend";
import {GetCategoryById} from "../fakeAPI/FakeBackend";
import UserInfo from "../components/UserInfo";
import Carousel from "../components/Carousel";

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

    },

    profilePicture: {
        borderRadius:"200px",
        height: "200px",
        margin:"20px 0",
        borderStyle:"solid",
        borderColor:"#005c7a"
    },

    userInfoContainer: {
        padding:"50px 20px",
    },

    content: {
        padding:"10px",
    },
}));

function User(props) {
    const classes = useStyles();
    const {id} = useParams();
    const [ID, setID] = React.useState(id);
    const location = useLocation();

    const user = GetUserById(ID);
    const serviceList = GetOwnerServiceList(ID);

    React.useEffect(() => {
        if(`/users/${ID}` !== location.pathname){
            setID(location.pathname.slice(-1));
            console.log('id has changed');
        }
    },[ID]);

    return(
        <Grid container className={classes.topLeft}>
            <Grid xs={9} container className={classes.column}>
                {ID}
                <Grid xs={9} container className={classes.content}>
                    <Carousel services={serviceList} username={null} service_id={null}/>
                </Grid>
            </Grid>
            <Grid xs={3} container className={classes.userInfoContainer}>
                <UserInfo user={user}/>
            </Grid>
        </Grid>
    )
}

export default User;