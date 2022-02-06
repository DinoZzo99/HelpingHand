import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Grid } from "@mui/material";
import SearchInput from "../components/SearchInput";

const useStyles = makeStyles((theme)=>({
    root: {
        marginTop:"40px",
    },
}));

function Search(props) {
    const classes = useStyles();

    return(
        <Grid container className={classes.root}>
            <Grid xs={6} container>
                hi
            </Grid>
            <Grid xs={6} container>
                <SearchInput/>
            </Grid>
        </Grid>
    )
}

export default Search;