import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Grid, Tabs, Tab } from "@mui/material";
import SearchResultTabs from "../components/SearchResultTabs";

import { GetUsersByValue , GetCategoryByName , GetJobByValue, GetDonationByValue} from "../fakeAPI/FakeBackend";
import { useParams } from "react-router-dom";

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
        margin: "30px",
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
    const [data, setData] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(0);

    React.useEffect(() => {
        if(isLoaded == 0) {
            setIsLoaded(1);
            handleData(0);
        }
    })
    
    const users = GetUsersByValue(keywords);
    const services = GetJobByValue(keywords);
    const donations = GetDonationByValue(keywords);
    const categories = GetCategoryByName(keywords);
  
    const handleIndex = (value) => {
        setData([]);
        setIndex(value);
        handleData(value);
    };
    
    const handleData = (value) => {
        let newItem = {profile_picture: false, text1: "", text2: ""};
        if(value == 0) {
            users.forEach((item)=>{
                newItem.profile_picture = item.profile_picture;
                newItem.text1 = item.name;
                newItem.text2 = item.lastname;
                setData(prevState => [...prevState, newItem]);
            })
        }
        if(value == 1) {
            services.forEach((item)=>{
                newItem.text1 = item.title;
                newItem.text2 = item.secondary;
                setData(prevState => [...prevState, newItem]);
            })
        }
        if(value == 2) {
            donations.forEach((item)=>{
                newItem.text1 = item.title;
                newItem.text2 = item.secondary;
                setData(prevState => [...prevState, newItem]);
            })
        }
        if(value == 3) {
            categories.forEach((item)=>{
                newItem.text1 = item.category_name;
                setData(prevState => [...prevState, newItem]);
            })
        }
    }

    return(
        <Grid container className={classes.topLeft}>
            <Grid xs={9} container className={classes.column}>
                <Grid xs={9} container className={classes.root}>
                    <Grid xs={12} container>
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
                    <SearchResultTabs index={index} data={data}/>
                </Grid>
            </Grid>
            
        </Grid>
    )
}

export default SearchResults;