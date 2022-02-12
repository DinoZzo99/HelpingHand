import React from "react";
import { Divider, Pagination, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Grid } from "@mui/material";
import JobContainer from "../components/JobContainer";
import JobFilter from "../components/JobFilter";

import { useParams, useLocation } from "react-router-dom";

import {GetServicesByCategory, GetUserById, GetDonationsByCategory} from "../fakeAPI/FakeBackend";
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
        position:"relative",
        top:"0"
    },

    jobsGrid: {
        padding:"0 80px"
    },

    filter: {
        position: "absolute",
        right:"-330px",
        top:"50px"
    },
    
    title: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"32px",
        fontWeight:"bold",
        color:"#005c7a",
        margin:"20px 0 0 20px",
    },

    subtitle: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"20px",
        fontWeight:"bold",
        color:"#007ea7",
        margin:"5px 0 20px 40px",
    },

    pagination: {
        margin:"20px"
    },

    container: {
        borderRadius: "4px",
        marginBottom:"40px",
        boxShadow: "0px 1px 5px #000000",
    }
}));

function Services(props) {
    const classes = useStyles();
    const {id} = useParams();
    const location = useLocation();
    const [radioValue, setRadioValue] = React.useState('date');
    const [order, setOrder] = React.useState('asc');
    const [isService, setIsService] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [page, setPage] = React.useState(1);
    React.useEffect(() => (
        location.pathname.includes("services") ? (
            setIsService(true),
            setData(GetServicesByCategory(id))
        ) : (
            setIsService(false),
            setData(GetDonationsByCategory(id))
        )
    ));

    const handleFilter = (value) => {
        setRadioValue(value);
    };

    const handleOrder = () => {
        order === 'asc' ? setOrder('des') : setOrder('asc');
    };

    const handlePage = (event, value) => {
      setPage(value);
    };

    const category = GetCategoryById(id);

    return (
        <Grid container className={classes.topLeft}>
            <Grid container className={classes.column}>
                <Grid container>
                    <Typography className={classes.title}>{isService ? "Services" : "Donations"}</Typography>
                </Grid>
                <Divider style={{width:"100%"}}/>
                <Grid container>
                    <Typography className={classes.subtitle}>Showing {isService ? "services" : "donations"} {1 + 10 * (page - 1)}-{(11 + 10 * (page - 1)) < data.length ? (11 + 10 * (page - 1)) : data.length} / {data.length} {id ? `in "${category.category_name}"` : null}</Typography>
                </Grid>
                <Grid container className={classes.column + " " + classes.jobsGrid}>
                    {
                        data.length > 10 ? <Grid container className={classes.column + " " + classes.container}>
                            <Pagination color="primary" className={classes.pagination} count={Math.round(data.length/10) >= data.length/10 ? Math.round(data.length/10) : (Math.round(data.length/10 + 1))} page={page} onChange={handlePage} />
                        </Grid> : null
                    }
                    {
                        data.sort((a,b) =>{
                            if(radioValue === 'date') {
                                let value = isService ? (a.date_from > b.date_from ? 1 : -1) : (a.date_due > b.date_due ? 1 : -1);
                                return order === 'asc' ? value : -value
                            }
                            if(radioValue === 'name') {
                                let value = a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase() ? 1 : -1;
                                return order === 'asc' ? value : -value
                            }
                            if(radioValue === 'popularity') {
                                let value = a.id > b.id ? 1 : -1;
                                return order === 'asc' ? value : -value
                            }
                        }).slice(1 + 10 * (page - 1), 11 + 10 * (page - 1)).map((post)=>{
                            let user = GetUserById(post.owner);
                            let profile = user.profile_picture;
                            return(
                                <JobContainer key={post.id} post={post} user={user} profile={profile} isService={isService}/>
                            )
                        })
                    }
                    {
                        data.length > 10 ? <Grid container className={classes.column + " " + classes.container}>
                            <Pagination color="primary" className={classes.pagination} count={Math.round(data.length/10) >= data.length/10 ? Math.round(data.length/10) : (Math.round(data.length/10 + 1))} page={page} onChange={handlePage} />
                        </Grid> : null
                    }
                </Grid>
            </Grid>
            <Grid xl={3} lg={2} container className={classes.column + " " + classes.filter}>
                <JobFilter handleFilter={handleFilter} radioValue={radioValue} handleOrder={handleOrder} order={order}/>
            </Grid>
        </Grid>
    );
}

export default Services;