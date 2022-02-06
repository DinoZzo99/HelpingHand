import React from "react";
import { Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import arrowRightIcon from "../pictures/arrowRight2.png";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme)=>({
    column: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },

    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent:"flex-start",
        alignItems:"center",
    },

    jobContainer:{
        alignItems:"flex-start",
        height:"150px",
        borderRadius: "4px",
        marginBottom:"40px",
        boxShadow: "0px 1px 5px #000000",
        fontFamily: ['"Raleway"','sans-serif'].join(','),
    },

    jobHeader:{
        fontSize:"24px",
        marginLeft:"15px",
        fontFamily: ['"Raleway"','sans-serif'].join(','),
        fontWeight:"bold"
    },

    jobBody:{
        fontFamily: ['"Raleway"','sans-serif'].join(','),
        fontSize:"16px",
        color:"black",
        margin:"15px 0 0 25px",
        textAlign: "left",
    },

    jobUserInfo:{
        height:"150px",
        borderRadius:"4px 0 0 4px",
        padding:"10px",
        backgroundColor:"#007ea7",
        justifyContent:"space-between",
        alignItems: "center"
    },

    profilePicture:{
        height:"50px",
        borderRadius:"100px",
        borderStyle:"solid",
        borderColor:"white",
        margin:"10px"
    },

    jobInfo: {
        padding: "10px",
        justifyContent:"space-between",
    },

    typographyUser:{
        fontFamily: ['"Raleway"','sans-serif'].join(","),
        color:"white",
        fontSize:"16px",
    },

    typographyUser2: {
        fontFamily: ['"Raleway"','sans-serif'].join(","),
        color:"white",
        fontSize:"12px",
    },
    arrowIcon:{
        height:"80px",
        "&:hover": {
            cursor: "pointer",
        }
    },
    arrowContainer:{
        borderRadius:"100px",
        justifyContent:"flex-end",
        height:"150px"
    },
}));

function JobContainer(props){
    const classes = useStyles();

    let navigate = useNavigate();

    return(
        <Grid container className={classes.row + " " + classes.jobContainer}>
            <Grid xs={2} container className={classes.column + " " + classes.jobUserInfo}>
                <img src={`../material/${props.profile}`} className={classes.profilePicture}/>
                <Typography className={classes.typographyUser}>{props.user.username}</Typography>
                <Typography className={classes.typographyUser2}>{props.post.date_from}</Typography>
            </Grid>
            <Grid xs={8} container className={classes.column + " " + classes.jobInfo}>
                <Grid container>
                    <Typography className={classes.jobHeader}>{props.post.title}</Typography>
                    <Typography className={classes.jobBody}>{props.post.secondary}</Typography>
                </Grid>
                {props.isService ? null : <Typography className={classes.jobBody}>{props.post.payment}</Typography>}
            </Grid>
            <Grid xs={2} container className={classes.row + " " + classes.arrowContainer}>
                <Button>
                    <img src={arrowRightIcon} alt="view job" className={classes.arrowIcon} onClick={() => navigate(`../service/${props.post.id}`)}/>
                </Button>
            </Grid>
        </Grid>
    )
}

export default JobContainer;