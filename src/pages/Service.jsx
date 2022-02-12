import React from "react";
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import Carousel from "../components/Carousel";

import {GetAppliedListByJobId, GetServicesById} from "../fakeAPI/FakeBackend";
import {GetUserById} from "../fakeAPI/FakeBackend";
import {GetOwnerServiceList} from "../fakeAPI/FakeBackend";
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
        alignItems:"flex-start",
    },

    root: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        position: "relative",
        top:"0"
    },

    userInfoContainer: {
        position:"absolute",
        right:"-18vw",
        top:"40px"
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

    subtitle: {
        fontFamily:"'Raleway','sans-serif'",
        fontWeight:"bold",
        color:"#007ea7",
    },

    subtitleExtra: {
        margin:"5px 0 20px 40px",
        fontSize:"20px",
    },

    bodyText: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"18px",
        textAlign:"left",
        padding:"10px 20px",
    },

    leftGrid: {
        justifyContent:"flex-end"
    },

    rightGrid: {
        justifyContent:"flex-start"
    },

    ccontainer: {
        padding:"0 40px 40px 40px",
    },
    
    profile_picture: {
        height:"60px",
        margin:"10px 20px",
        borderRadius:"100px",
    },

    userListContainer: {
        padding:"10px"
    },

    userContainer: {
        alignItems:"center",
        "&:hover":{
            cursor:"pointer",
        }
    },

    userinfo: {
        alignItems:"flex-start",
        paddingLeft:"25px"
    },

    name: {
        fontFamily: "'Raleway','sans-serif",
        fontSize:"16px",
    },
}));

function Service(props) {
    const classes = useStyles();
    const {id} = useParams();
    const [openDialog, setOpenDialog] = React.useState(false);

    const navigate = useNavigate();

    const service = GetServicesById(id);
    const user = GetUserById(service.owner);
    const serviceList = GetOwnerServiceList(service.owner);
    const category = GetCategoryById(service.category);
    const applied = GetAppliedListByJobId(id);

    const handleDialog = (value) => {
        setOpenDialog(value);
    }

    return(
        <Grid container className={classes.root}>
            <Grid container className={classes.column}>
                <Grid container className={classes.row + " " + classes.titleContainer}>
                    <Grid xs={6} container>
                        <Typography className={classes.title}>{service.title}</Typography>
                    </Grid>
                    <Grid xs={6} container className={classes.row + " " + classes.leftGrid}>
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <Button onClick={() => handleDialog(true)}>Apply</Button>
                            <Button>Contact</Button>
                            <Button onClick={() => navigate(`../services/${category.category_id}`)}>Category</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
                <Divider style={{width:"100%"}}/>
                <Grid container>
                    <Typography className={classes.subtitle + " " + classes.subtitleExtra}>Main information</Typography>
                </Grid>
                <Grid container className={classes.column}>
                    <Grid container className={classes.row}>
                        <Grid xs={3} container className={classes.row + " " + classes.leftGrid}>
                            <Typography className={classes.bodyText + " " + classes.subtitle}>Category:</Typography>
                        </Grid>
                        <Grid xs={9} container>
                            <Typography className={classes.bodyText}>{category.category_name}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.row}>
                        <Grid xs={3} container className={classes.row + " " + classes.leftGrid}>
                            <Typography className={classes.bodyText + " " + classes.subtitle}>Title:</Typography>
                        </Grid>
                        <Grid xs={9} container>
                            <Typography className={classes.bodyText}>{service.secondary}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider style={{width:"100%", marginTop:"20px"}}/>
                <Grid container>
                    <Typography className={classes.subtitle + " " + classes.subtitleExtra}>Content</Typography>
                </Grid>
                <Grid xs={10} container>
                    <Typography className={classes.bodyText}>
                        {service.body}
                    </Typography>
                </Grid>
                {
                    applied.length > 0 ?
                        <Grid container className={classes.column}>
                            <Divider style={{width:"100%"}}/>
                            <Grid container>
                                <Typography className={classes.subtitle + " " + classes.subtitleExtra}>Applicants</Typography>
                            </Grid>
                            <Grid xs={10} container className={classes.row}>
                                {
                                    applied.map((item)=>{
                                        const user = GetUserById(item.user_id);
                                        return(
                                            <Grid xs={6} container className={classes.userListContainer + " " + classes.column}>
                                                <Grid container className={classes.row + " " + classes.userContainer} onClick={() => navigate(`/users/${user.id}`)}>
                                                    <Grid xs={2} container>
                                                        <img src={`../material/${user.profile_picture}`} className={classes.profile_picture}/>
                                                    </Grid>
                                                    <Grid xs={10} container className={classes.column + " " + classes.userinfo}>
                                                        <Typography className={classes.name}>{user.name} {user.lastname}</Typography>
                                                        <Typography className={classes.name}>{user.email}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                        </Grid> : null
                }
                <Divider style={{width:"100%", marginTop:"20px"}}/>
                <Grid container>
                    <Typography className={classes.subtitle + " " + classes.subtitleExtra}>More posts from {user.name}</Typography>
                </Grid>
                <Grid container className={classes.ccontainer}>
                    <Carousel services={serviceList} username={user.username} service_id={service.id}/>
                </Grid>
            </Grid>
            <Grid xl={3} lg={2} container className={classes.userInfoContainer}>
                <UserInfo user={user} type='service'/>
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
                    <DialogContentText>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button>Apply</Button>
                    <Button autoFocus onClick={() => handleDialog(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}

export default Service;