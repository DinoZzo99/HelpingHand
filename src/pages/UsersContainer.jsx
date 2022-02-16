import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Grid } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";

import {GetOwnerServiceList} from "../fakeAPI/FakeBackend";
import {GetUserById} from "../fakeAPI/FakeBackend";
import User from "../components/User";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme)=>({
    column: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
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

function UsersContainer(props) {
    const classes = useStyles();
    const {id} = useParams();
    const userId = useSelector(state => state.userId);
    const [Id, setId] = React.useState(id == null  ? userId : id);
    const [user, setUser] = React.useState(GetUserById(Id));
    const [serviceList, setServiceList] = React.useState(GetOwnerServiceList(Id));

    const location = useLocation();

    React.useEffect(() => (
        id ? (
            id != Id ? (
                setId(id),
                setUser(GetUserById(id)),
                setServiceList(GetOwnerServiceList(id)),
                console.log("reset everything"),
                console.log(user),
                console.log(serviceList)
            ) : null
        ) : null
    ))

    return(
        <Grid container className={classes.column}>
            <User user={user} serviceList={serviceList}/>
        </Grid>
    )
}

export default UsersContainer;