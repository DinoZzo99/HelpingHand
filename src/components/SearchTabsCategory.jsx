import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Grid, Typography, Divider } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { GetUserById } from "../fakeAPI/FakeBackend";

const useStyles = makeStyles((theme)=>({
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent:"flex-start",
        alignItems:"center",
    },

    root: {
        "&:hover":{
            backgroundColor:"rgb(240,240,255)",
            cursor:"pointer"
        }
    },

    notfound: {
        fontFamily: "'Raleway','sans-serif",
        fontSize:"20px",
        color:"gray",
        margin:"15px"
    },
    
    title: {
        fontFamily: "'Raleway','sans-serif'",
        fontWeight: 600,
        margin: "5px 0 5px 20px",
        color: "#005c7a",
        [theme.breakpoints.only('xl')]:{
            fontSize:"24px",
        },
        [theme.breakpoints.only('lg')]:{
            fontSize:"20px",
        }
    },
}));

function SearchTabsCategory(props) {
    const classes = useStyles();
    const navigate = useNavigate();

    return(
        <Grid container>
        {
            props.categories.map((category) => {
                return(
                    <Grid container className={classes.row + " " + classes.root} onClick={() => navigate(`/services/${category.category_id}`)}>
                            <Typography className={classes.title}>{category.category_name}</Typography>
                    </Grid>
                )
            })
        }
        {
            props.categories.length > 0 ? null : <Typography className={classes.notfound}>No categories found</Typography>
        }

        </Grid>
    )
}

export default SearchTabsCategory;