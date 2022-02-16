import React from "react";
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import Carousel from "../components/Carousel";

import {CheckServiceInList, DeleteApplied, GetAppliedListByJobId, GetServicesById, PostApplied} from "../fakeAPI/FakeBackend";
import {GetUserById} from "../fakeAPI/FakeBackend";
import {GetOwnerServiceList} from "../fakeAPI/FakeBackend";
import {GetCategoryById} from "../fakeAPI/FakeBackend";
import SearchTabsUser from "../components/SearchTabsUser";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme)=>({
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent:"flex-start",
        alignItems:"flex-start",
    },

    titleContainer: {
        justifyContent:"space-between",
        padding:"20px 20px 0 20px",
        [theme.breakpoints.down('md')]:{
            padding:"10px 20px 10px 20px",
        }
    },
    
    title: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"32px",
        fontWeight:"bold",
        color:"#005c7a",
        [theme.breakpoints.down('md')]:{
            fontSize:"24px",
        },
    },

    subtitle: {
        fontFamily:"'Raleway','sans-serif'",
        fontWeight:"bold",
        color:"#007ea7",
    },

    subtitleExtra: {
        margin:"5px 0 20px 40px",
        fontSize:"20px",
        [theme.breakpoints.down('md')]:{
            fontSize:"18px",
            margin:"5px 0 5px 30px"
        }
    },

    subtitleblack: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"18px",
    },

    bodyText: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"18px",
        textAlign:"left",
        padding:"10px 20px",
        [theme.breakpoints.down('sm')]:{
            fontSize:"14px",
            padding:"5px"
        }
    },

    leftGrid: {
        justifyContent:"flex-end"
    },

    rightGrid: {
        justifyContent:"flex-start"
    },

    container: {
        padding:"0 40px 40px 40px",
        [theme.breakpoints.down('xs')]:{
            width:"220px",
            padding:"0 20px 20px 20px"
        }
    },
    
    profile_picture: {
        height:"50px",
        margin:"10px 20px",
        borderRadius:"100px",
    },

    userinfo: {
        alignItems:"flex-start",
        paddingLeft:"50px"
    },

    name: {
        fontFamily: "'Raleway','sans-serif",
        fontSize:"16px",
    },

    actionbtn: {
        padding:"20px 0",
        textAlign:"center",
        "&:hover": {
            cursor:"pointer",
            backgroundColor:"rgb(228,228,250)",
        }
    },

    btngroup: {
        boxShadow: "0px 1px 5px #000000",
        borderRadius:"4px"
    }
}));

function Service(props) {
    const classes = useStyles();
    const {id} = useParams();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openCancleDialog, setOpenCancleDialog] = React.useState(false);
    const userId = useSelector(state => state.userId);

    const navigate = useNavigate();

    const service = GetServicesById(id);
    const user = GetUserById(service.owner);
    const serviceList = GetOwnerServiceList(service.owner);
    const category = GetCategoryById(service.category);
    const applied = GetAppliedListByJobId(id);
    const appliedUsers = applied.map(user => {
        return GetUserById(user.user_id);
    })
    const [checkApplied, setCheckApplied] = React.useState(CheckServiceInList(id, userId));

    const handleDialog = (value) => {
        setOpenDialog(value);
    };

    const handleCancleDialog = (value) => {
        setOpenCancleDialog(value);
    };

    const handleApply = () => {
        PostApplied(id, userId);
        setCheckApplied(true);
        setOpenDialog(false);
    };

    const handleCancleApply = () => {
        DeleteApplied(id, userId);
        setCheckApplied(false);
        setOpenCancleDialog(false);
    };

    const handleAppliedButton = () => {
        checkApplied ? handleCancleDialog(true) : handleDialog(true);
    }

    return(
        <Grid container direction="row" justifyContent="center">
            <Grid xl={7} lg={8} md={11} container item direction="row" justifyContent="center" alignItems="center">
                <Grid container item direction="row" alignItems="center" className={classes.titleContainer}>
                    <Grid sm={6} container item>
                        <Typography className={classes.title}>{service.title}</Typography>
                    </Grid>
                    <Grid sm={6} container item direction="row" justifyContent="flex-end" alignItems="center">
                        <img className={classes.profile_picture} src={`../material/${user.profile_picture}`} alt="profile"/>
                        <Typography className={classes.subtitleblack}>{user.name} {user.lastname}</Typography>
                    </Grid>
                </Grid>
                <Divider style={{width:"100%", marginTop:"10px"}}/>
                <Grid container>
                    <Typography className={classes.subtitle + " " + classes.subtitleExtra}>Main information</Typography>
                </Grid>
                <Grid container item>
                    <Grid container className={classes.row}>
                        <Grid min={3} container item className={classes.row + " " + classes.leftGrid}>
                            <Typography className={classes.bodyText + " " + classes.subtitle}>Category:</Typography>
                        </Grid>
                        <Grid min={9} container item>
                            <Typography className={classes.bodyText}>{category.category_name}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.row}>
                        <Grid min={3} container item className={classes.row + " " + classes.leftGrid}>
                            <Typography className={classes.bodyText + " " + classes.subtitle}>Subtitle:</Typography>
                        </Grid>
                        <Grid min={9} container item>
                            <Typography className={classes.bodyText}>{service.secondary}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider style={{width:"100%", marginTop:"20px"}}/>
                <Grid container>
                    <Typography className={classes.subtitle + " " + classes.subtitleExtra}>Content</Typography>
                </Grid>
                <Grid sm={10} min={11} container>
                    <Typography className={classes.bodyText}>
                        {service.body}
                    </Typography>
                </Grid>
                <Divider style={{width:"100%", marginTop:"20px"}}/>
                <Grid container>
                    <Typography className={classes.subtitle + " " + classes.subtitleExtra}>Action</Typography>
                </Grid>
                <Grid sm={10} min={11} container item direction="row" justifyContent="center" className={classes.btngroup}>
                    <Grid xs={4} className={classes.actionbtn + " " + classes.subtitleblack} item onClick={() => handleAppliedButton()}>{checkApplied ? "Applied" : "Apply"}</Grid>
                    <Grid xs={4} className={classes.actionbtn + " " + classes.subtitleblack} item onClick={() => navigate(`/users/${user.id}`)}>View {user.name}</Grid>
                    <Grid xs={4} className={classes.actionbtn + " " + classes.subtitleblack} item onClick={() => navigate(`/services/${category.category_id}`)}>View category</Grid>
                </Grid>
                {
                    applied.length > 0 ?
                        <Grid container item>
                            <Divider style={{width:"100%"}}/>
                            <Grid container item>
                                <Typography className={classes.subtitle + " " + classes.subtitleExtra}>Applicants</Typography>
                            </Grid>
                            <Grid lg={10} sm={11} min={6} container item direction="row" justifyContent="column">
                                <SearchTabsUser users={appliedUsers}/>
                            </Grid>
                        </Grid> : null
                }
                <Divider style={{width:"100%", marginTop:"20px"}}/>
                <Grid container>
                    <Typography className={classes.subtitle + " " + classes.subtitleExtra}>More posts from {user.name}</Typography>
                </Grid>
                <Grid container className={classes.container}>
                    <Carousel services={serviceList} username={user.username} service_id={service.id}/>
                </Grid>
            </Grid>
            <Dialog
                open={openDialog}
                onClose={() => handleDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Apply for service</DialogTitle>
                <DialogContent style={{minWidth:"250px"}}>
                    <DialogContentText>
                        {service.title}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleApply()}>Apply</Button>
                    <Button autoFocus onClick={() => handleDialog(false)}>Close</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openCancleDialog}
                onClose={() => handleCancleDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Are you sure you want to cancle your application?</DialogTitle>
                <DialogContent style={{width:"250px"}}>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCancleApply()}>Yes</Button>
                    <Button autoFocus onClick={() => handleCancleDialog(false)}>No</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}

export default Service;