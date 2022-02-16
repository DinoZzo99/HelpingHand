import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Grid, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { GetAppliedListByUserId, GetServicesById, GetUserById } from "../fakeAPI/FakeBackend";
import JobContainer from "../components/JobContainer";

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
        justifyContent: "flex-start",
        alignItems: "center"
    },

    titleContainer: {
        justifyContent:"space-between",
        padding:"20px 20px 0 20px",
    },
    
    title: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"32px",
        fontWeight:"bold",
        color:"#005c7a",
        [theme.breakpoints.down('md')]:{
            fontSize:"24px",
        }
    },

    subtitle: {
        fontFamily:"'Raleway','sans-serif'",
        fontWeight:"bold",
        color:"#007ea7",
        [theme.breakpoints.down('md')]:{
            fontSize:"18px"
        }
    },

    subtitleExtra: {
        margin:"5px 0 20px 40px",
        fontSize:"20px",
    },
    
    jobsContainer: {
        [theme.breakpoints.only('xl')]: {
            padding:"0 120px"
        },
        [theme.breakpoints.only('lg')]: {
            padding:"0 70px"
        },
    },

    notfound: {
        fontFamily:"'Raleway','sans-serif'",
        color:"gray",
        fontSize:"20px"
    },

    finished: {
        opacity: 0.6,
        filter:"grayscale(100%)",
        padding:"15px 0",
        "&:hover": {
            opacity: 1
        }
    },

    upcoming: {
        opacity: 0.6,
        padding:"15px 0",
        "&:hover": {
            opacity: 1
        }
    },

    active: {
        padding:"15px 0"
    }
}));

function ActiveJobs(props) {
    const classes = useStyles();
    const id = useSelector(state => state.userId);
    const current = new Date();

    const appliedJobs = GetAppliedListByUserId(id);

    const newActive = appliedJobs.map((job) => {
        const service = GetServicesById(job.job_id);
        const date_from = new Date(service.date_from);
        const date_to = new Date(service.date_to);
        if(date_from < current && date_to > current) return service;
    });
    
    const newUpcoming = appliedJobs.map((job) => {
        const service = GetServicesById(job.job_id);
        const date = new Date(service.date_from);
        return date > current ? service : null
    });
    
    const newFinished = appliedJobs.map((job) => {
        const service = GetServicesById(job.job_id);
        const date = new Date(service.date_to);
        if(date < current) return service;
    });

    const upcoming = newUpcoming.filter(job => job != null);
    const finished = newFinished.filter(job => job != null);
    const active = newActive.filter(job => job != null);

    return(
        <Grid container direction="row" justifyContent="center">
            <Grid xl={7} lg={8} md={11} container item>
                <Grid container className={classes.titleContainer}>
                    <Typography className={classes.title}>Applied Jobs</Typography>
                </Grid>
                <Divider style={{width:"100%"}}/>
                <Grid container>
                    <Typography className={classes.subtitle + " " + classes.subtitleExtra}>Active</Typography>
                </Grid>
                <Grid container className={classes.column + " " + classes.jobsContainer}>
                    {
                        active.length > 0 ? active.map((service) => {
                            const user = GetUserById(service.owner);

                            return(
                                <Grid container className={classes.active}>
                                    <JobContainer width={2.5} user={user} post={service} isService={true}/>
                                </Grid>
                            )
                        }) : 
                        <Grid container className={classes.column}>
                            <Typography className={classes.notfound}>No active services found</Typography>
                        </Grid>
                    }
                </Grid>
                <Divider style={{width:"100%", marginTop:"20px"}}/>
                <Grid container>
                    <Typography className={classes.subtitle + " " + classes.subtitleExtra}>Upcoming</Typography>
                </Grid>
                <Grid container className={classes.column + " " + classes.jobsContainer}>
                    {
                        upcoming.length > 0 ? upcoming.map((service) => {
                            const user = GetUserById(service.owner);

                            return(
                                <Grid container className={classes.upcoming}>
                                    <JobContainer width={2.5} user={user} post={service} isService={true}/>
                                </Grid>                            )
                        }) : 
                        <Grid container className={classes.column}>
                            <Typography className={classes.notfound}>No upcoming services found</Typography>
                        </Grid>
                    }
                </Grid>
                <Divider style={{width:"100%", marginTop:"20px"}}/>
                <Grid container>
                    <Typography className={classes.subtitle + " " + classes.subtitleExtra}>Finished</Typography>
                </Grid>
                <Grid container className={classes.column + " " + classes.jobsContainer}>
                    {
                        finished.length > 0 ? finished.map((service) => {
                            const user = GetUserById(service.owner);

                            return(
                                <Grid container className={classes.finished}>
                                    <JobContainer width={2.5} user={user} post={service} isService={true}/>
                                </Grid>
                            )
                        }) : 
                        <Grid container className={classes.column}>
                            <Typography className={classes.notfound}>No finished services found</Typography>
                        </Grid>
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ActiveJobs;