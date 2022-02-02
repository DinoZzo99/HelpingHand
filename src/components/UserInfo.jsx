import React from "react";
import { Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
    
    root: {
        boxShadow: "0px 1px 5px #000000",
        borderRadius:"10px",
        margin:"0px 30px",
    },

    mainInfoTop: {
        borderRadius:"10px 10px 0 0",
        backgroundColor:"#007ea7",
        aspectRatio: 1.5,
        justifyContent:"center",
    },

    mainInfoBottom: {
        backgroundColor:"#005c7a",
    },

    nametext: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"18px",
        padding:"8px",
        color: "white",
    },

    profilePicture: {
        borderRadius:"200px",
        borderStyle:"solid",
        borderColor:"white",
        [theme.breakpoints.down('xl')]: {
            height:"80px",
        },
        [theme.breakpoints.up('lg')]: {
            height:"100px",
        },
        [theme.breakpoints.up('xl')]: {
            height:"150px",
        },
    },

    btn: {
        fontFamily:"'Raleway','sans-serif'",
        color: "white",
        backgroundColor:"#007ea7",
        marginBottom:"10px",
        "&:hover":{
            cursor:"pointer",
            backgroundColor:"#005c7a",
        }
    },

    infoText: {
        fontFamily:"'Raleway','sans-serif'",
        textAlign:"left",
        margin:"5px 0"
    },

    infoContainer: {
        alignItems:"flex-start",
        padding:"10px",
    },
}));

function UserInfo(props) {
    const classes = useStyles();
    const [user, setUser] = React.useState(props.user);
    const [viewType, setViewType] = React.useState(props.type);

    const navigate = useNavigate();

    return(
        <Grid xs={12} container className={classes.column + " " + classes.root}>
            <Grid container className={classes.column + " " + classes.mainInfoTop}>
                <img src={`../material/${user.profile_picture}`} className={classes.profilePicture}/>
            </Grid>
            <Grid container className={classes.column + " " + classes.mainInfoBottom}>
                <Typography className={classes.nametext}>{user.name} {user.lastname}</Typography>
            </Grid>
            <Grid container className={classes.column}>
                <Grid container className={classes.column + " " + classes.infoContainer}>
                <Typography className={classes.infoText}>Username: {user.username}</Typography>
                <Typography className={classes.infoText}>e-mail: {user.email}</Typography>
                <Typography className={classes.infoText}>Gender: {user.gender}</Typography>
                <Typography className={classes.infoText}>Location: {user.location}</Typography>
                <Typography className={classes.infoText}>Status: {user.status ? "active" : "not job"}</Typography>
                </Grid>
                {
                    viewType === 'service' ? <Button className={classes.btn} onClick={() => navigate(`../users/${user.id}`)}>view user</Button> : null
                }
            </Grid>
        </Grid>
    )
}

export default UserInfo;