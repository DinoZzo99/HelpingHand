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

    rootContainer: {
        paddingTop:"75px",
    },
    
    root: {
        boxShadow: "0px 1px 5px #000000",
        borderRadius:"4px",
    },

    mainInfoTop: {
        position:"relative",
        top:"0",
        borderRadius:"4px 4px 0 0",
        backgroundColor:"#007ea7",
        justifyContent:"center",
        height: "85px",
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
        position:"absolute",
        top:"-75px",
        borderRadius:"200px",
        borderStyle:"solid",
        borderWidth:"4px",
        borderColor:"#007ea7",
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
        fontSize:"14px",
        color:"#007ea7",
        fontWeight: 600,
        marginBottom:"10px",
    },

    text: {
        fontFamily:"'Raleway','sans-serif'",
        textAlign:"left",
        fontSize:"14px",
        marginLeft:"5px",
        marginBottom:"10px",
    },

    infoContainer: {
        alignItems:"flex-start",
        padding:"10px",
    },
}));

function UserInfo(props) {
    const classes = useStyles();

    const navigate = useNavigate();

    return(
        <Grid container className={classes.rootContainer}>
            <Grid container className={classes.column + " " + classes.root}>
                <Grid container className={classes.column + " " + classes.mainInfoTop}>
                    <img src={`../material/${props.user.profile_picture}`} className={classes.profilePicture}/>
                </Grid>
                <Grid container className={classes.column + " " + classes.mainInfoBottom}>
                    <Typography className={classes.nametext}>{props.user.name} {props.user.lastname}</Typography>
                </Grid>
                <Grid container className={classes.column}>
                    <Grid container className={classes.column + " " + classes.infoContainer}>
                        <Grid container>
                            <Typography className={classes.infoText}>Username:</Typography><Typography className={classes.text}>{props.user.username}</Typography>
                        </Grid>
                        <Grid container>
                            <Typography className={classes.infoText}>e-mail:</Typography><Typography className={classes.text}>{props.user.email}</Typography>
                        </Grid>
                        <Grid container>
                            <Typography className={classes.infoText}>Gender:</Typography><Typography className={classes.text}>{props.user.gender}</Typography>
                        </Grid>
                        <Grid container>
                            <Typography className={classes.infoText}>Location:</Typography><Typography className={classes.text}>{props.user.location}</Typography>
                        </Grid>
                        <Grid container>
                            <Typography className={classes.infoText}>Status:</Typography><Typography className={classes.text}>{props.user.status ? "active" : "not job"}</Typography>
                        </Grid>
                    </Grid>
                    {
                        props.type === 'service' ? <Button className={classes.btn} onClick={() => navigate(`../users/${props.user.id}`)}>view user</Button> : null
                    }
                </Grid>
            </Grid>
        </Grid>
        
    )
}

export default UserInfo;