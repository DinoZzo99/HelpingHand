import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { Grid, Button } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";

import {GetCategoryById} from "../fakeAPI/FakeBackend";

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
        padding:"30px",
    },

    content: {
        borderRadius:"5px",
        boxShadow: "0px 1px 5px #000000",
        backgroundColor:"rgb(240,240,255)",
        aspectRatio: 1,
        justifyContent:"center",
        "&:hover": {
            cursor: "pointer",
            backgroundColor:"rgb(230,230,245)",
        }
    },

    title: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"24px",
        color: "white",
    },

    containerText: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"24px",
    },
    
    titleContainer: {
        padding:"0 20px",
        borderBottom: '1px solid rgba(0, 0, 0, .25)',
        borderRadius: "10px 10px 0 0",
        backgroundColor: "#005c7a",
    },
}));

function Carousel(props) {
    const classes = useStyles();

    const navigate = useNavigate();

    return(
        <Grid xs={12} container className={classes.column + " " + classes.root}>
            <Grid container className={classes.titleContainer}>
                <Typography className={classes.title}>See more from {props.username}</Typography>
            </Grid>
            <Grid container className={classes.row}>
            {
                props.services.filter(service => service.id !== props.service_id).slice(0,3).map((service, index)=>{
                    let category = GetCategoryById(service.category);

                    return (
                        <Grid xs={4} container className={classes.column + " " + classes.container}>
                            <Grid container className={classes.column + " " + classes.content} onClick={()=>navigate(`../service/${service.id}`)}>
                                <Typography className={classes.containerText}>{service.title}</Typography>
                                <Typography>{category.category_name}</Typography>
                            </Grid>
                        </Grid>
                    )
                })
            }
            </Grid>
        </Grid>
    )
}

export default Carousel;