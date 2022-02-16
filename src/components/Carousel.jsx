import React from "react";
import { Typography, Fade } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {GetCategoryById, GetDonationsById, GetServicesById} from "../fakeAPI/FakeBackend";

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
        borderRadius:"10px",
        boxShadow: "0px 1px 5px #000000",
        alignItems:"flex-start",
    },

    container: {
        [theme.breakpoints.only('xl')]: {
            padding:"15px",
        },
        [theme.breakpoints.down('xl')]: {
            padding:"10px",
        },
        [theme.breakpoints.only('sm')]: {
            padding:"15px",
        },
    },

    content: {
        position:"relative",
        top:"0",
        padding:"10px",
        borderRadius:"5px",
        boxShadow: "0px 1px 5px #000000",
        backgroundColor:"rgb(245,245,255)",
        aspectRatio: 1,
        justifyContent:"center",
        "&:hover": {
            cursor: "pointer",
            backgroundColor:"rgb(228,228,250)",
        },
    },

    containerText: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"20px",
        fontWeight: 600,
        textAlign:"center",
        [theme.breakpoints.only('xl')]: {
            fontSize:"20px",
        },
        [theme.breakpoints.down('xl')]: {
            fontSize:"18px",
        },
        [theme.breakpoints.down('xs')]: {
            fontSize:"14px"
        },
    },

    viewMore: {
        backgroundColor:"#007ea7",
        color:"white",
        "&:hover":{
            backgroundColor: "#005c7a",
        }
    },

    containerBottomText: {
        fontFamily:"'Raleway','sans-serif'",
        [theme.breakpoints.down('xs')]: {
            fontSize:"12px"
        },
    },

    categoryText: {
        fontFamily:"'Raleway','sans-serif'",
        textAlign:"center",
        [theme.breakpoints.only('xl')]: {
            fontSize:"16px",
        },
        [theme.breakpoints.down('xl')]: {
            fontSize:"14px",
        },
        [theme.breakpoints.down('xs')]: {
            fontSize:"12px"
        },
        
    }
}));

function Carousel(props) {
    const classes = useStyles();

    const navigate = useNavigate();

    return(
        <Grid container className={classes.row}>
            {
                props.services.filter(service => service.job_id !== props.service_id).slice(0,3).map((serviceList, index)=>{
                    let service = props.isService ? GetServicesById(serviceList.job_id) : GetDonationsById(serviceList.post_id);
                    let category = GetCategoryById(service.category);

                    return (
                        <Grid lg={3} md={4} xs={6} container item className={classes.container}>
                            <Grid container
                                className={classes.column + " " + classes.content}
                                onClick={()=>navigate(`../service/${service.id}`)}
                            >
                                <Typography className={classes.containerText}>{service.title}</Typography>
                                <Typography className={classes.categoryText}>{category.category_name}</Typography>
                                <Typography className={classes.containerBottomText}>{props.isService ? service.date_from : service.date_due}</Typography>
                            </Grid>
                        </Grid>
                    )
                })
            }
            {
                props.services.filter(service => service.job_id !== props.service_id).length > 3 ? 
                    <Grid lg={3} md={4} xs={6} container className={classes.column + " " + classes.container}>
                        <Grid container className={classes.column + " " + classes.content+ " " + classes.viewMore}>
                            <Typography className={classes.containerText}>View More</Typography>
                        </Grid>
                    </Grid>
                    : null
            }
                
        </Grid>
    )
}

export default Carousel;