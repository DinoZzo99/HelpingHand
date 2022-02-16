import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Grid, Typography, Dialog, DialogContentText, DialogContent } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { GetUsersByValue , GetCategoryByName , GetJobByValue, GetDonationByValue} from "../fakeAPI/FakeBackend";
import { useParams } from "react-router-dom";
import SearchTabsUser from "../components/SearchTabsUser";
import SearchTabsServDona from "../components/SearchTabsServDona";
import SearchTabsCategory from "../components/SearchTabsCategory";
import SearchInput from "../components/SearchInput";

const useStyles = makeStyles((theme)=>({
    column: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    },

    topLeft: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },

    root: {
        marginTop:"30px"
    },

    container: {
        boxShadow: "0px 1px 4px #000000",
        borderRadius:"5px",
        [theme.breakpoints.down('sm')]:{
            borderRadius:"0",
        }
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
    },

    tip: {
        fontFamily:"'Raleway','sans-serif'",
        color:"gray",
        fontSize:"20px",
        marginTop:"20px", 
        [theme.breakpoints.down('xs')]: {
            fontSize:"15px",
        }
    },

    tabLeft: {
        borderRadius:"0 5px 0 0",
        [theme.breakpoints.down('sm')]:{
            borderRadius:"0",
        }
    },

    tabRight: {
        borderRadius:"5px 0 0 0",
        [theme.breakpoints.down('sm')]:{
            borderRadius:"0",
        }
    },

    hideBig: {
        [theme.breakpoints.up('xs')]:{
            display:"none"
        }
    },

    hideSmall: {
        [theme.breakpoints.down('xs')]:{
            display:"none"
        }
    },

    closebtn: {
        backgroundColor:"white",
        color:"#005c7a",
    },
}));

function SearchResults(props) {
    const classes = useStyles();
    const {keywords} = useParams();
    const [index, setIndex] = React.useState(0);
    const [openDial, setOpenDial] = React.useState(false);
    
    const users = GetUsersByValue(keywords);
    const services = GetJobByValue(keywords);
    const donations = GetDonationByValue(keywords);
    const categories = GetCategoryByName(keywords);
  
    const handleIndex = (value) => {
        setIndex(value);
    };

    const handleOpenDial = () => {
        setOpenDial(true);
    };

    const handleCloseDial = () => {
        setOpenDial(false);
    };

    return(
        <Grid container spacing={4} direction="row" justifyContent="center">
            <Grid xl={5} md={6} sm={9} container item className={classes.root}>
                <Grid container item className={classes.container}>
                    <Grid container item className={classes.hideSmall}>
                        <Grid xs={3} container item
                            className={classes.column + " " + classes.tab + " " + classes.tabRight + " " + `${index == 0 ? classes.active_tab : null}`}
                            onClick={() => handleIndex(0)}
                        >
                            Users
                        </Grid>
                        <Grid xs={3} container item
                            className={classes.column + " " + classes.tab + " " + `${index == 1 ? classes.active_tab : null}`}
                            onClick={() => handleIndex(1)}
                        >
                            Services
                        </Grid>
                        <Grid xs={3} container item
                            className={classes.column + " " + classes.tab + " " + `${index == 2 ? classes.active_tab : null}`}
                            onClick={() => handleIndex(2)}
                        >
                            Donations
                        </Grid>
                        <Grid xs={3} container item
                            className={classes.column + " " + classes.tab + " " + classes.tabLeft + " " + `${index == 3 ? classes.active_tab : null}`}
                            onClick={() => {handleIndex(3)}}
                        >
                            Categories
                        </Grid>
                    </Grid>
                        <Grid container item
                            direction="row"
                            justifyContent="center"
                            className={classes.tab + " " + classes.hideBig}
                            onClick={() => handleOpenDial()}
                        >
                            {
                                index == 0 ? "Users" : (
                                    index == 1 ? "Services" : (
                                        index == 2 ? "Donations" : "Categories"
                                    )
                                )
                            }
                            <ArrowDropDownIcon/>
                        </Grid>
                    <Grid container item>

                    </Grid>
                    <Grid container item className={classes.column}>
                        {
                            index == 0 ? <SearchTabsUser users={users}/> : (
                                index == 1 ? <SearchTabsServDona jobs={services} index={index}/> :
                                    index == 2 ? <SearchTabsServDona jobs={donations} index={index}/> :
                                        <SearchTabsCategory categories={categories}/>
                            )
                        }
                    </Grid>
                </Grid>
            </Grid>
            <Grid xl={3} md={4} sm={9} min={11} container item className={classes.topLeft + " " + classes.root}>
                <SearchInput searchAgain={true}/>
                <Typography className={classes.tip}>Search results for: '{keywords}'</Typography>
            </Grid>
            <Dialog
                open={openDial}
                onClose={() => handleCloseDial()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent style={{minWidth:"250px", padding:"0"}}>
                    <Grid container item
                        className={classes.column + " " + classes.tab + " " + `${index == 0 ? classes.active_tab : null}`}
                        onClick={() => {handleIndex(0); handleCloseDial()}}
                    >
                        Users
                    </Grid>
                    <Grid container item
                        className={classes.column + " " + classes.tab + " " + `${index == 1 ? classes.active_tab : null}`}
                        onClick={() => {handleIndex(1); handleCloseDial()}}
                    >
                        Services
                    </Grid>
                    <Grid container item
                        className={classes.column + " " + classes.tab + " " + `${index == 2 ? classes.active_tab : null}`}
                        onClick={() => {handleIndex(2); handleCloseDial()}}
                    >
                        Donations
                    </Grid>
                    <Grid container item
                        className={classes.column + " " + classes.tab + " " + `${index == 3 ? classes.active_tab : null}`}
                        onClick={() => {handleIndex(3); handleCloseDial()}}
                    >
                        Categories
                    </Grid>
                    <Grid container item
                        className={classes.column + " " + classes.tab + " " + classes.closebtn}
                        onClick={() => handleCloseDial()}
                    >
                        Close
                    </Grid>
                </DialogContent>
            </Dialog>
        </Grid>
    )
}

export default SearchResults;