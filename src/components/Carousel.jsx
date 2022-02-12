import React from "react";
import { Typography, Fade } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {GetCategoryById, GetServicesById} from "../fakeAPI/FakeBackend";

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
        padding:"20px",
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
            backgroundColor:"rgb(238,238,255)",
        }
    },

    contentHover: {
        position:"absolute",
        top:"0",
        left:"0",
        padding:"10px",
        borderRadius:"5px",
        backgroundColor:"#007ea7",
        aspectRatio: 1,
        justifyContent:"center"
    },

    title: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"24px",
        color: "white",
    },

    containerText: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"20px",
        fontWeight: 600,
        textAlign:"center"
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
    },

    subtitle: {
        fontFamily:"'Raleway','sans-serif'",
        color:"white",
        fontSize:"16px"
    }
}));

function Carousel(props) {
    const classes = useStyles();
    const [hover, setHover] = React.useState(undefined);

    const navigate = useNavigate();

    const handleHover = (value) => {
        setHover(value);
    }

    return(
        <Grid container className={classes.row}>
            {
                props.services.filter(service => service.job_id !== props.service_id).slice(0,3).map((serviceList, index)=>{
                    let service = GetServicesById(serviceList.job_id)
                    let category = GetCategoryById(service.category);

                    return (
                        <Grid xs={3} container className={classes.column + " " + classes.container}>
                            <Grid container
                                className={classes.column + " " + classes.content}
                                onClick={()=>navigate(`../service/${service.id}`)}
                                onMouseEnter={() => handleHover(serviceList.job_id)}
                                onMouseLeave={() => handleHover(undefined)}
                            >
                                <Typography className={classes.containerText}>{service.title}</Typography>
                                <Typography>{category.category_name}</Typography>
                                <Typography className={classes.containerBottomText}>{service.date_from}</Typography>
                                <Fade in={hover == serviceList.job_id ? true : false}>
                                    <Grid container
                                    className={classes.column + " " + classes.contentHover}
                                    onMouseEnter={() => handleHover(serviceList.job_id)}
                                    onMouseLeave={() => handleHover(undefined)}
                                    >
                                        <Typography className={classes.subtitle}>{service.secondary}</Typography>    
                                    </Grid>
                                </Fade>
                            </Grid>
                        </Grid>
                    )
                })
            }
            {
                props.services.filter(service => service.job_id !== props.service_id).length > 3 ? 
                    <Grid xs={3} container className={classes.column + " " + classes.container}>
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