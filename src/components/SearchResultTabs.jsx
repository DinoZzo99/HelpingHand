import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Grid, Typography } from "@mui/material";

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
        margin:"10px",
        border: "2px solid rgb(0,20,100,0.25)",
        borderRadius:"4px"
    },
    
    profile_picture: {
        height:"60px",
        borderRadius:"100px",
        margin:"10px 20px",
    },

    name: {
        fontFamily: "'Raleway','sans-serif",
        fontSize:"20px",
    },

    title: {
        fontFamily: "'Raleway','sans-serif",
        fontSize:"24px",
        fontWeight: 600,
        margin:"0 20px"
    },

    subtitle: {
        fontFamily: "'Raleway','sans-serif",
        fontSize:"20px",
        color:"gray"
    },

    notfound: {
        fontFamily: "'Raleway','sans-serif",
        fontSize:"20px",
        color:"gray",
        margin:"15px"
    }
}));

function SearchResultTabs(props) {
    const classes = useStyles();

    return(
        <Grid xs={12} container className={classes.column}>
            {
                props.data.map((item) => {
                    return(
                        <Grid container className={classes.row + " " + classes.root}>
                            {
                                props.index == 0 ?
                                <Grid className={classes.row}>
                                    <img src={`../material/${item.profile_picture}`} className={classes.profile_picture}/>
                                    <Typography className={classes.name}>{item.text1} {item.text2}</Typography>
                                </Grid> :
                                <Grid container className={classes.row}>
                                    <Typography className={classes.title}>{item.text1}</Typography>
                                    <Typography className={classes.subtitle}>{item.text2}</Typography>
                                </Grid>
                            }
                        </Grid>
                    )
                })
            }
            {
                props.data.length > 0 ? null :
                
                <Typography className={classes.notfound}>No {props.index == 0 ? "users" : (props.index == 1 ? "services" : (props.index == 2 ? "donations" : "categories"))} found
                </Typography>
            }
        </Grid>
    )
}

export default SearchResultTabs;