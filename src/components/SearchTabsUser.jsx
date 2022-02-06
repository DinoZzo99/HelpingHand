import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Grid, Typography, Divider } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { GetUserById } from "../fakeAPI/FakeBackend";

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
        "&:hover":{
            backgroundColor:"rgb(240,240,255)",
        }
    },
    
    profile_picture: {
        height:"60px",
        margin:"10px 20px",
        borderRadius:"100px",
    },

    name: {
        fontFamily: "'Raleway','sans-serif",
        fontSize:"16px",
    },

    notfound: {
        fontFamily: "'Raleway','sans-serif",
        fontSize:"20px",
        color:"gray",
        margin:"15px"
    },

    userinfo: {
        alignItems:"flex-start",
        paddingLeft:"10px"
    },
}));

function SearchTabsUser(props) {
    const classes = useStyles();

    return(
        <Grid container>
        {
            props.users.map((user) => {
                return(
                    <Grid container className={classes.row + " " + classes.root}>
                        <Grid xs={2} container>
                            <img src={`../material/${user.profile_picture}`} className={classes.profile_picture}/>
                        </Grid>
                        <Grid xs={10} container className={classes.column + " " + classes.userinfo}>
                            <Typography className={classes.name}>{user.name} {user.lastname}</Typography>
                            <Typography className={classes.name}>{user.email}</Typography>
                        </Grid>
                    </Grid>
                )
            })
        }
        {
            props.users.length > 0 ? null : <Typography className={classes.notfound}>No users found</Typography>
        }

        </Grid>
    )
}

export default SearchTabsUser;