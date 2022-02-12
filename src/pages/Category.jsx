import React from "react";
import { Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Grid, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {GetServiceCategories, GetDonationCategories} from "../fakeAPI/FakeBackend";

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

    tabs: {
        marginTop:"40px",
        borderRadius:"100px",
        boxShadow: "0px 1px 5px #000000"
    },

    tab: {
        width:"300px",
        padding:"12px 0px",
        borderRadius:"100px",
        fontWeight:"bold",
        fontSize:"20px",
        fontFamily:"'Raleway','sans-serif'",
        "&:hover":{
            cursor:"pointer"
        }
    },

    tabLeft: {
        marginRight:"-20px"
    },

    tabRight: {
        marginLeft:"-20px"
    },

    tabSelected: {
        backgroundColor:"#007ea7",
        color: "white",
    },

    rootCat: {
        padding:"20px",
    },

    categoryContainer: {
        padding:"50px",
    },

    category: {
        boxShadow: "0px 1px 5px #000000",
        "&:hover":{
            cursor:"pointer"
        }
    },

    iconContainer: {
        aspectRatio: 1,
        backgroundColor:"#007ea7",
    },

    categoryTypo: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"16px",
        padding:"8px",
    },

    titleContainer: {
        justifyContent:"space-between",
        padding:"20px 20px 0 20px",
    },
    
    title: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"32px",
        fontWeight:"bold",
        color:"#005c7a",
    },
}));

function Category(props) {
    const classes = useStyles();
    const navigate = useNavigate();
    const [expanded, setExpanded] = React.useState(0);

    const services = GetServiceCategories();
    const donations = GetDonationCategories();

    const [categories, setCategories] = React.useState(services);

    const handleChange = (value) => {
        setExpanded(value);
        if(value == 1) setCategories(donations);
        else setCategories(services);
    }

    return(
        <Grid xs={12} container className={classes.column}>
            <Grid container className={classes.titleContainer}>
                <Typography className={classes.title}>Categories</Typography>
            </Grid>
            <Divider style={{width:"100%"}}/>
            <Grid className={classes.row + " " + classes.tabs}>
                <Grid
                    container
                    className={classes.column + " " + classes.tab + " " + classes.tabLeft + " " + `${expanded ? null : classes.tabSelected}`}
                    onClick={()=>handleChange(0)}
                >
                    Service
                </Grid>
                <Grid
                    container
                    className={classes.column + " " + classes.tab + " " + classes.tabRight + " " + `${expanded ? classes.tabSelected : null}`}
                    onClick={()=>handleChange(1)}
                >
                    Donation
                </Grid>
            </Grid>
            <Grid container className={classes.row + " " + classes.rootCat}>
                {
                    categories.map((category, index)=>{
                        return (
                            <Grid xs={4} container className={classes.column + " " + classes.categoryContainer}>
                                <Grid container className={classes.column + " " + classes.category} onClick={() => navigate(`../${expanded == 1 ? "donations" : "services"}/${category.category_id}`)}>
                                    <Grid container className={classes.iconContainer}>
                                    </Grid>
                                    <Typography className={classes.categoryTypo}>
                                        {category.category_name}
                                    </Typography>
                                </Grid>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Grid>
    )
}

export default Category;