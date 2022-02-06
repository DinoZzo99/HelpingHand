import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Grid, Typography, Divider } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { GetUserById } from "../fakeAPI/FakeBackend";

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
        padding:"15px 20px",
        alignItems:"flex-start",
        "&:hover":{
            backgroundColor:"rgb(240,240,255)",
        }
    },

    notfound: {
        fontFamily: "'Raleway','sans-serif",
        fontSize:"20px",
        color:"gray",
        margin:"15px"
    },
    
    title: {
        fontFamily: "'Raleway','sans-serif'",
        fontSize:"24px",
        fontWeight: 600,
        margin: "5px 0 5px 20px",
        color: "#005c7a",
    },

    subtitle: {
        fontFamily: "'Raleway','sans-serif",
        fontSize:"18px",
    },

    userText: {
        fontFamily: "'Raleway','sans-serif",
        fontSize:"16px",
        color: "#005c7a",
    },

    usericon: {
        fontSize:"20px",
        color:"gray",
        marginRight:"5px",
        color: "#005c7a",
    }
}));

function SearchTabsServDona(props) {
    const classes = useStyles();

    return(
        <Grid container>
        {
            props.jobs.map((job) => {
                const user = GetUserById(job.owner);
                return(
                    <Grid container className={classes.column + " " + classes.root}>
                        <Typography className={classes.title}>{job.title}</Typography>
                        <Typography className={classes.subtitle}>{job.secondary}</Typography>
                        {props.index == 2 ? <Typography className={classes.subtitle}>{job.payment}</Typography> : null}
                        <Grid container className={classes.row}>
                            <AccountCircleIcon className={classes.usericon}/><Typography className={classes.userText}>{user.username}</Typography>
                        </Grid>
                    </Grid>
                )
            })
        }
        {
            props.jobs.length > 0 ? null : <Typography className={classes.notfound}>No services found</Typography>
        }

        </Grid>
    )
}

export default SearchTabsServDona;