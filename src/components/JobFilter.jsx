import React from "react";
import { Button } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Grid, Typography } from "@mui/material";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from "react-router-dom";

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const useStyle = makeStyles((theme)=>({
    column: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    },

    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    
    root: {
        width: "220px",
        margin:"30px 0",
        alignItems:"center",
        padding:"20px 40px",
        borderRadius:"4px",
        boxShadow: "0px 1px 5px #000000",
        [theme.breakpoints.down('xl')]:{
            boxShadow: "0 0 0 #ffffff",
        }
    },

    sortBy: {
        fontFamily:"'Raleway' , 'sans-serif'",
    },

    btn: {
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-between",
        marginTop:"15px",
        backgroundColor: "#007ea7",
        color: "white",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "#005c7a",
        }
    }
}));

function JobFilter(props){
    const classes = useStyle();
    
    let navigate = useNavigate();
  
    const handleRadio = (event) => {
        props.handleFilter(event.target.value);
    };

    const handleArrow = () => {
        props.handleOrder();
    };

    return(
        <Grid container className={classes.column + " " + classes.root}>
            <Grid container className={classes.column}>
                <Grid container className={classes.row}>
                    <Typography>Sort By</Typography>
                    <Grid onClick={() => handleArrow()}>
                    {
                        props.order === 'asc' ? <ArrowDropDownIcon /> : <ArrowDropUpIcon/>
                    }
                    </Grid>
                </Grid>
                <FormControl component="fieldset">
                        <RadioGroup aria-label="gender" name="gender1" value={props.radioValue} onChange={handleRadio}>
                            <FormControlLabel value="name" control={<Radio />} label={
                                <Typography className={classes.sortBy}>Name</Typography>
                            }/>
                            <FormControlLabel value="date" control={<Radio />} label={
                                <Typography className={classes.sortBy}>Date</Typography>
                            }/>
                            <FormControlLabel value="popularity" control={<Radio />} label={
                                <Typography className={classes.sortBy}>Popularity</Typography>
                            }/>
                        </RadioGroup>
                </FormControl>
            </Grid>
                <Button className={classes.btn} onClick={()=>navigate("../categories")}>Categories<CategoryIcon/></Button>
        </Grid>
    )
}

export default JobFilter;