import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Grid } from "@mui/material";
import SearchInput from "../components/SearchInput";

const useStyles = makeStyles((theme)=>({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop:"40px",
    },
}));

function Search(props) {
    const classes = useStyles();

    return(
        <Grid container className={classes.root}>
            <Grid xs={6} container>
                <SearchInput input={true}/>
            </Grid>
        </Grid>
    )
}

export default Search;