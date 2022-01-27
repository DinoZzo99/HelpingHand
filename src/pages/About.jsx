import React from "react";
import { makeStyles } from "@material-ui/core";




const useStyles = makeStyles((theme)=>({
    
}));

function About(props) {
    const classes = useStyles();
    return(
        <div>
            <h1>ABOUT</h1>
            <p>learn more about us!</p>
        </div>
    )
}

export default About;