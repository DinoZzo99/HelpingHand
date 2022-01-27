import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
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

    topLeft:{
        display: "flex",
        flexDirection: "row",
        justifyContent:"flex-start",
        alignItems:"flex-start",
    },

    root: {
        color: "black",
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
        height:"500px",
        padding:"20px 50px",
        justifyContent:"space-eve"
    },

    categoryContainer: {
        padding:"40px",
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
        fontSize:"18px",
        padding:"8px",
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
        <Grid container className={classes.topLeft}>
            <Grid xs={10} container className={classes.column}>
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
                <Grid xs={12} spacing={1} container className={classes.row + " " + classes.rootCat}>
                    {
                        categories.map((category, index)=>{
                            return (
                                <Grid xs={3} container className={classes.column + " " + classes.categoryContainer}>
                                    <Grid container className={classes.column + " " + classes.category} onClick={() => navigate(`../services/${category.category_id}`)}>
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
        </Grid>
    )
}

export default Category;