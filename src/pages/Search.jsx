import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Grid, Typography, Divider } from "@mui/material";
import SearchInput from "../components/SearchInput";

const useStyles = makeStyles((theme)=>({
    column: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
    },

    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    
    root: {
        marginTop:"100px",
        [theme.breakpoints.down('md')]:{
            marginTop:"50px"
        }
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
}));

function Search(props) {
    const classes = useStyles();

    return(
        <Grid container direction="row" justifyContent="center">
            <Grid container item xl={7} lg={8} md={11} direction="row" justifyContent="center">
                <Grid container item className={classes.titleContainer}>
                    <Typography className={classes.title}>Search</Typography>
                </Grid>
                <Divider style={{width:"100%"}}/>
                <Grid container item md={6} sm={9} min={11} className={classes.root}>
                    <SearchInput input={true}/>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Search;