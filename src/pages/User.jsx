import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";

import {GetOwnerServiceList} from "../fakeAPI/FakeBackend";
import {GetUserById} from "../fakeAPI/FakeBackend";
import UserInfo from "../components/UserInfo";
import Carousel from "../components/Carousel";

const useStyles = makeStyles((theme)=>({
    column: {
        display: "flex",
        flexDirection: "column",
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
        position:"absolute",
        right:0,
        padding:"50px 20px",
    },

    content: {
        padding:"50px",
        borderLeft: '1px solid rgba(0, 0, 0, .25)',
        borderRight: '1px solid rgba(0, 0, 0, .25)',
    },
}));

function User(props) {
    const classes = useStyles();
    const {id} = useParams();

    const user = GetUserById(id);
    const serviceList = GetOwnerServiceList(id);

    const [index, setIndex] = React.useState(true);

    React.useEffect(() => (
        index ? (
            console.log(serviceList),
            setIndex(false)
        ) : null
    ))

    return(
        <Grid container className={classes.topLeft}>
            <Grid xs={12} container className={classes.column + " " + classes.content}>
                {serviceList.length > 1 ? <Carousel services={serviceList} username={null} service_id={null}/> : null}
            </Grid>
            <Grid xs={2.5} container className={classes.userInfoContainer}>
                <UserInfo user={user}/>
            </Grid>
        </Grid>
    )
}

export default User;