import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Button } from "@material-ui/core";
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
        borderRadius: "20px",
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
        borderRadius:"20px 0 0 20px",
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
        height: "200px",
        padding: "10px",
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
    round: {
        borderRadius:"100px",
    },
    arrowContainer:{
        alignItems:"center",
        justifyContent:"center",
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
                <Typography className={classes.jobHeader}>{props.post.title}</Typography>
                <Typography className={classes.jobBody}>{props.post.secondary}</Typography>
            </Grid>
            <Grid xs={2}>
                <Button container className={classes.round + " " + classes.arrowContainer}>
                    <img src={arrowRightIcon} alt="view job" className={classes.arrowIcon} onClick={() => navigate(`../service/${props.post.id}`)}/>
                </Button>
            </Grid>
        </Grid>
    )
}

export default JobContainer;