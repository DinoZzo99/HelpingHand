import React from "react";
import { Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Grid } from "@mui/material";
import JobContainer from "../components/JobContainer";
import JobFilter from "../components/JobFilter";

import { useParams } from "react-router-dom";

import {GetServicesByCategory, GetUserById} from "../fakeAPI/FakeBackend";
import {GetCategoryById} from "../fakeAPI/FakeBackend";

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

    jobsGrid: {
        padding:"0 80px"
    },

    filter: {
        position: "absolute",
        right:"0px",
    },

    root: {
        borderLeft: '1px solid rgba(0, 0, 0, .25)',
        borderRight: '1px solid rgba(0, 0, 0, .25)',
    }
}));

function Services(props) {
    const classes = useStyles();
    const {id} = useParams();
    const [radioValue, setRadioValue] = React.useState('date');
    const [order, setOrder] = React.useState('asc');

    const handleFilter = (value) => {
        setRadioValue(value);
    }

    const handleOrder = () => {
        order === 'asc' ? setOrder('des') : setOrder('asc');
    }

    const category = GetCategoryById(id);
    const posts = GetServicesByCategory(id);

    return (
        <Grid container className={classes.topLeft}>
            <Grid container className={classes.column + " " + classes.root}>
            <Grid container justifyContent="space-between">
                <Typography style={{padding:"20px 50px", fontSize:"20px", color: "gray"}}>{posts.length} jobs found {id ? `in "${category.category_name}"` : null}</Typography>
            </Grid>
                <Grid container className={classes.column + " " + classes.jobsGrid}>
                    {
                        posts.sort((a,b) =>{
                            if(radioValue === 'date') return order === 'asc' ? (a.date_from > b.date_from ? 1 : -1) : (a.date_from > b.date_from ? -1 : 1);
                            if(radioValue === 'name') return order === 'asc' ? (a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase() ? 1 : -1) : (a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase() ? -1 : 1);
                            if(radioValue === 'popularity') return order === 'asc' ? (a.id > b.id ? 1 : -1) : (a.id > b.id ? 1 : -1);
                        }).map((post)=>{
                            let user = GetUserById(post.owner);
                            let profile = user.profile_picture;
                            return(
                                <JobContainer key={post.post_id} post={post} user={user} profile={profile}/>
                            )
                        })
                    }
                </Grid>
            </Grid>
            <Grid xl={2.5} lg={2} container className={classes.column + " " + classes.filter}>
                <JobFilter handleFilter={handleFilter} radioValue={radioValue} handleOrder={handleOrder} order={order}/>
            </Grid>
        </Grid>
    );
}

export default Services;