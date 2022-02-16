import React from "react";
import { Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Grid } from "@mui/material";
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
        height:"170px",
        borderRadius: "4px",
        boxShadow: "0px 1px 3px #000000",
        fontFamily: ['"Raleway"','sans-serif'].join(','),
        [theme.breakpoints.up('sm')]: {
            borderRadius:"4px"
        },
        [theme.breakpoints.down('sm')]: {
            borderRadius:"0"
        },
        [theme.breakpoints.down('xs')]:{
            height:"250px"
        },
        "&:hover":{
            cursor:"pointer"
        }
    },

    jobHeader:{
        fontSize:"24px",
        marginLeft:"15px",
        fontFamily: ['"Raleway"','sans-serif'].join(','),
        fontWeight:"bold",
        [theme.breakpoints.down('xs')]:{
            fontSize:"20px"
        }
    },

    jobBody:{
        fontFamily: ['"Raleway"','sans-serif'].join(','),
        fontSize:"16px",
        color:"black",
        margin:"15px 0 0 25px",
        textAlign: "left",
        [theme.breakpoints.down('xs')]:{
            fontSize:"14px"
        }
    },

    jobUserInfo:{
        height:"170px",
        borderRadius:"4px 0 0 4px",
        padding:"10px",
        backgroundColor:"#007ea7",
        justifyContent:"space-between",
        alignItems: "center",
        [theme.breakpoints.up('sm')]: {
            borderRadius:"4px 0 0 4px"
        },
        [theme.breakpoints.down('md')]: {
            borderRadius:"0"
        },
        [theme.breakpoints.down('xs')]:{
            height:"90px"
        }
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
        height:"100%"
    },

    typographyUser:{
        fontFamily: ['"Raleway"','sans-serif'].join(","),
        color:"white",
        fontSize:"16px",
        textAlign:"center",
        [theme.breakpoints.down('xs')]:{
            fontSize:"14px"
        }
    },

    typographyUser2: {
        fontFamily: ['"Raleway"','sans-serif'].join(","),
        color:"white",
        fontSize:"12px",
        textAlign:"center"
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
    const date = new Date(props.isService ? props.post.date_from : props.post.date_due);

    return(
        <Grid container direction="row" justifyContent="center" className={classes.jobContainer}>
            <Grid xl={props.width} lg={props.width+0.5} md={props.width} xs={props.width + 1} container item direction="row" justifyContent="center" className={classes.jobUserInfo} onClick={() => navigate(`/users/${props.post.owner}`)}>
                <Grid xs={12} min={4} container item direction="row" justifyContent="center">
                    <img src={`../material/${props.user.profile_picture}`} className={classes.profilePicture} alt="profile"/>
                </Grid>
                <Grid xs={12} min={4} container item direction="row" justifyContent="center">
                    <Typography className={classes.typographyUser}>{props.user.username}</Typography>
                </Grid>
                <Grid xs={12} min={4} container item direction="row" justifyContent="center">
                    <Typography className={classes.typographyUser2}>{date.getDate()}/{(date.getMonth() + 1).toString()}/{date.getFullYear()}</Typography>
                </Grid>
            </Grid>
            <Grid xl={12 - props.width} lg={11.5 - props.width} md={12 - props.width} xs={11 - props.width} container className={classes.column + " " + classes.jobInfo} onClick={() => navigate(`/${props.isService ? "service" : "donation"}/${props.post.id}`)}>
                <Grid container className={classes.column}>
                    <Typography className={classes.jobHeader}>{props.post.title}</Typography>
                    <Typography className={classes.jobBody}>{props.post.secondary}</Typography>
                    {props.isService ? null : <Typography className={classes.jobBody}>{props.post.payment}</Typography>}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default JobContainer;