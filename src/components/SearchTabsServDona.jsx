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

    root: {
        padding:"10px",
        "&:hover":{
            cursor:"pointer",
            backgroundColor:"rgb(240,240,255)",
        }
    },

    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems:"center",
    },

    paymentStyle: {
        padding:"0 20px",
        justifyContent:"flex-end",
    },

    notfound: {
        fontFamily: "'Raleway','sans-serif",
        fontSize:"20px",
        color:"gray",
        margin:"15px"
    },

    title: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"24px",
        fontWeight:"bold",
        color:"#005c7a",
        marginLeft:"20px",
        [theme.breakpoints.only('xl')]: {
            fontSize:"24px"
        },
        [theme.breakpoints.down('lg')]: {
            fontSize:"18px"
        },
    },

    subtitle: {
        fontFamily:"'Raleway','sans-serif'",
        fontWeight:500,
        margin:"5px 0 10px 40px",
        [theme.breakpoints.only('xl')]: {
            fontSize:"18px"
        },
        [theme.breakpoints.only('lg')]: {
            fontSize:"16px"
        },
        [theme.breakpoints.down('sm')]: {
            fontSize:"14px"
        }
    },

    userContainer: {
        justifyContent:"flex-end",
        paddingRight:"20px",
        color:"#005c7a",
        [theme.breakpoints.down('xs')]:{
            marginLeft:"25px",
            justifyContent:"flex-start"
        }
    }
}));

function SearchTabsServDona(props) {
    const classes = useStyles();
    const navigate = useNavigate();

    return(
        <Grid container>
        {
            props.jobs.map((job) => {
                const user = GetUserById(job.owner);
                return(
                    <Grid container className={classes.root} onClick={() => navigate(`/${props.index == 1 ? "service" : "donation"}/${job.id}`)}>
                        <Grid container className={classes.column}>
                            <Grid container className={classes.row}>
                                <Grid xs={7}>
                                    <Typography className={classes.title}>{job.title}</Typography>
                                </Grid>
                                <Grid xs={5} container className={classes.userContainer}>
                                    <AccountCircleIcon/>
                                    <Typography>{user.username}</Typography>
                                </Grid>
                            </Grid>
                            <Divider style={{width:"100%"}}/>
                            <Grid container>
                                <Typography className={classes.subtitle}>{job.secondary}</Typography>
                            </Grid>
                            <Grid container>
                                {
                                    props.index == 2 ?
                                    <Grid container className={classes.row + " " + classes.paymentStyle}>
                                        <Typography>{job.payment}</Typography>
                                    </Grid>
                                    : null
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                )
            })
        }
        {
            props.jobs.length > 0 ? null : <Typography className={classes.notfound}>No {props.index == 1 ? "services" : "donations"} found</Typography>
        }

        </Grid>
    )
}

export default SearchTabsServDona;