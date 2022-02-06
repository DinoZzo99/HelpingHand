import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Grid, Tabs, Tab } from "@mui/material";
import SearchResultTabs from "../components/SearchResultTabs";

import { GetUsersByValue , GetCategoryByName , GetJobByValue, GetDonationByValue} from "../fakeAPI/FakeBackend";
import { useParams } from "react-router-dom";
import SearchTabsUser from "../components/SearchTabsUser";
import SearchTabsServDona from "../components/SearchTabsServDona";
import SearchTabsCategory from "../components/SearchTabsCategory";

const useStyles = makeStyles((theme)=>({
    column: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    },

    topLeft: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },

    root: {
        padding:"30px 10px",
    },

    container: {
        boxShadow: "0px 1px 4px #000000",
        borderRadius:"5px",
    },

    tab: {
        padding:"20px",
        backgroundColor:"#007ea7",
        color: "white",
        fontFamily: "'Raleway','sans-serif'",
        "&:hover":{
            cursor:"pointer",
        }
    },

    active_tab: {
        backgroundColor: "#005c7a",
    }
}));

function SearchResults(props) {
    const classes = useStyles();
    const {keywords} = useParams();
    const [index, setIndex] = React.useState(0);
    
    const users = GetUsersByValue(keywords);
    const services = GetJobByValue(keywords);
    const donations = GetDonationByValue(keywords);
    const categories = GetCategoryByName(keywords);
  
    const handleIndex = (value) => {
        setIndex(value);
    };

    return(
        <Grid container className={classes.topLeft}>
            <Grid xs={7} container className={classes.root}>
                <Grid container className={classes.container}>
                    <Grid container>
                        <Grid xs={3} container
                            className={classes.column + " " + classes.tab + " " + `${index == 0 ? classes.active_tab : null}`}
                            onClick={() => handleIndex(0)}
                            style={{borderRadius:"5px 0 0 0"}}
                        >
                            Users
                        </Grid>
                        <Grid xs={3} container
                            className={classes.column + " " + classes.tab + " " + `${index == 1 ? classes.active_tab : null}`}
                            onClick={() => handleIndex(1)}
                        >
                            Services
                        </Grid>
                        <Grid xs={3} container
                            className={classes.column + " " + classes.tab + " " + `${index == 2 ? classes.active_tab : null}`}
                            onClick={() => handleIndex(2)}
                        >
                            Donations
                        </Grid>
                        <Grid xs={3} container
                            className={classes.column + " " + classes.tab + " " + `${index == 3 ? classes.active_tab : null}`}
                            onClick={() => handleIndex(3)}
                            style={{borderRadius:"0 5px 0 0"}}
                        >
                            Categories
                        </Grid>
                    </Grid>
                    <Grid container className={classes.column}>
                        {
                            index == 0 ? <SearchTabsUser users={users}/> : (
                                index == 1 ? <SearchTabsServDona jobs={services} index={index}/> :
                                    index == 2 ? <SearchTabsServDona jobs={donations} index={index}/> :
                                        <SearchTabsCategory categories={categories}/>

                            )
                                //     index == 2 ? <SearchResultTabs services={services}/> :
                                //     <SearchResultTabs/>
                        }
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={5} container className={classes.root}>
                <Grid container style={{height:"400px", backgroundColor:"lightblue"}}>

                </Grid>
            </Grid>
        </Grid>
    )
}

export default SearchResults;