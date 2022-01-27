import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { Grid, Typography } from "@material-ui/core";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import CategoryIcon from '@material-ui/icons/Category';
import { useNavigate } from "react-router-dom";

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const useStyle = makeStyles((theme)=>({
    column: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    
    root: {
        margin:"0px 30px",
        borderRadius:"20px",
        boxShadow: "0px 1px 5px #000000",
        padding: "30px 50px",
        alignItems:"center"
    },

    sortBy: {
        fontFamily:"'Raleway' , 'sans-serif'",
    },

    btn: {
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-between",
        width:"150px",
        marginTop:"20px",
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
        <Grid xs={12} container className={classes.column + " " + classes.root}>
            <Grid container className={classes.column}>
                <Grid container className={classes.row}>
                    <Typography c>Sort By</Typography>
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