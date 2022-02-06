import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { useSelector } from "react-redux";
import userIdReducer from "../redux/reducers/user";




const useStyles = makeStyles((theme)=>({
    
}));

function About(props) {
    const classes = useStyles();

    const user = useSelector(state => state.userId);

    return(
        <div>
            <h1>ABOUT</h1>
            <p>learn more about us!</p>
            
        </div>
    )
}

export default About;