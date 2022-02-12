import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Grid, TextField, Button, Typography } from "@mui/material";
import SearchResultTabs from "./SearchResultTabs";
import SearchIcon from '@mui/icons-material/Search';
import SearchResults from "../pages/SearchResults";

import {useNavigate} from "react-router-dom"

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

    topLeft: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },

    search: {
        width:"100%",
    },

    searchBtn: {
        borderRadius:"4px",
        fontFamily:"'Raleway','sans-serif'",
        width:"100%",
        height:"50px",
        marginTop:"20px",
        color: "white",
        backgroundColor:"rgb(30 , 205 , 30)",
        "&:hover":{
            backgroundColor:"rgb(50 , 180 , 50)",
        }
    },

    tip: {
        fontFamily:"'Raleway','sans-serif'",
        color:"gray",
        fontSize:"20px",
        marginBottom:"20px",
    },
}));

function SearchInput(props) {
    const classes = useStyles();
    const [textValue, setTextValue] = React.useState("");

    const navigate = useNavigate();
    
    const handleTextValue = (event) => {
        setTextValue(event.target.value);
    }

    const handleInput = () => {
        navigate(`/search/${textValue}`);
    }

    return(
        <Grid container className={classes.column}>
            {
                props.input ? 
                <Grid container>
                    <Typography className={classes.tip}>Search for users, posts or categories</Typography>
                </Grid> : null
            }
            <Grid container className={classes.column}>
                <TextField
                    id="standard-basic"
                    label="Search"
                    variant="outlined"
                    color="primary"
                    type="search"
                    value = {textValue}
                    className={classes.search}
                    onChange={handleTextValue}
                />
                <Button className={classes.searchBtn} onClick={() => handleInput()}>Search {props.searchAgain ? "Again" : null}</Button>
            </Grid>
        </Grid>
    )
}

export default SearchInput;