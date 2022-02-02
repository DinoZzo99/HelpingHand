import React from "react";
import { Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import Services from "./Services";

const useStyles = makeStyles((theme)=>({
    column: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },

    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent:"flex-start",
        alignItems:"center",
    },

    topLeft:{
        display: "flex",
        flexDirection: "row",
        justifyContent:"flex-start",
        alignItems:"flex-start",
    },
}));

function Home(props) {
    const classes = useStyles();

    return(
        <Services/>
    )
}

export default Home;