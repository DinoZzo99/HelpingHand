import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Grid, FormControl, OutlinedInput, InputAdornment } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Carousel from "../components/Carousel";

import {GetDonationsById, GetOwnerDonationList, UpdateDonation} from "../fakeAPI/FakeBackend";
import {GetUserById} from "../fakeAPI/FakeBackend";
import {GetCategoryById} from "../fakeAPI/FakeBackend";
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

    donationButton: {
        marginLeft:"15px",
        fontSize:"12px"
    },

    btngroup: {
        boxShadow: "0px 1px 5px #000000",
        borderRadius:"4px"
    }
}));

function Donation(props) {
    const classes = useStyles();
    const {id} = useParams();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [amount, setAmount] = React.useState(null);

    const donation = GetDonationsById(id);
    const user = GetUserById(donation.owner);
    const donationList = GetOwnerDonationList(donation.owner);
    const category = GetCategoryById(donation.category);

    const handleDialog = (value) => {
        setOpenDialog(value);
    };
    const handleAmount = (event) => {
        setAmount(event.target.value);
    };
    const handleDonation = () => {
        let flt = parseFloat(amount);
        UpdateDonation(flt, id);
        setAmount(null);
        setOpenDialog(false);
    };

    return(
        <Grid container direction="row" justifyContent="center">
            <Grid xl={7} lg={8} md={11} container item direction="row" justifyContent="center" alignItems="center">
                <Grid container item direction="row" alignItems="center" className={classes.titleContainer}>
                    <Grid sm={6} container item>
                        <Typography className={classes.title}>{donation.title}</Typography>
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
                            <Typography className={classes.bodyText}>{donation.secondary}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.row}>
                        <Grid min={3} container item className={classes.row + " " + classes.leftGrid}>
                            <Typography className={classes.bodyText + " " + classes.subtitle}>Donated:</Typography>
                        </Grid>
                        <Grid min={9} container item>
                            <Typography className={classes.bodyText}>
                                $ {donation.current_payment}/{donation.payment}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.donationButton}
                                    onClick={() => handleDialog(true)}
                                >
                                    Donate
                                </Button>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider style={{width:"100%", marginTop:"20px"}}/>
                <Grid container>
                    <Typography className={classes.subtitle + " " + classes.subtitleExtra}>Content</Typography>
                </Grid>
                <Grid sm={10} min={11} container>
                    <Typography className={classes.bodyText}>
                        {donation.body}
                    </Typography>
                </Grid>
                <Divider style={{width:"100%", marginTop:"20px"}}/>
                <Grid container>
                    <Typography className={classes.subtitle + " " + classes.subtitleExtra}>More donations from {user.name}</Typography>
                </Grid>
                <Grid container className={classes.container}>
                    <Carousel services={donationList} username={user.username} service_id={donation.id}/>
                </Grid>
            </Grid>
            <Dialog
                open={openDialog}
                onClose={() => handleDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Donate - {donation.title}</DialogTitle>
                <DialogContent style={{minWidth:"250px"}}>
                    <DialogContentText>
                        <FormControl fullWidth variant="outlined">
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                value={amount}
                                onChange={handleAmount}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                        </FormControl>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDonation()}>Donate</Button>
                    <Button autoFocus onClick={() => handleDialog(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}

export default Donation;