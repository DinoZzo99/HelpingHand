import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DeleteDonation, DeleteService, GetDonationsById, GetOwnerDonationList, GetOwnerServiceList, GetServicesById } from "../fakeAPI/FakeBackend";
import { Typography, Grid, Divider, Button, styled } from "@mui/material";
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@mui/material"
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const useStyles = makeStyles((theme)=>({
    column: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
    },

    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    columnTitle:{
        fontFamily: "'Raleway','sans-serif'",
        fontSize:"24px",
        margin:"15px"
    },
    
    title: {
        fontFamily: "'Raleway','sans-serif'",
        fontSize:"24px",
        fontWeight: 600,
        margin: "5px 0 5px 20px",
        color: "#005c7a",
    },

    subtitle: {
        fontFamily: "'Raleway','sans-serif",
        fontSize:"18px",
    },

    container: {
        padding:"15px 20px",
        alignItems:"flex-start",
        boxShadow: "0px 1px 3px #000000",
        borderRadius:"4px",
        backgroundColor:"rgb(245,245,255)",
        "&:hover":{
            backgroundColor:"rgb(238,238,255)",
            cursor:"pointer"
        }
    },
    
    root: {
        padding:"5px 40px 20px 40px",
    },
    
    mainTitle: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"32px",
        fontWeight:"bold",
        color:"#005c7a",
        padding:"15px 20px"
    },

    mainSubtitle: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"20px",
        fontWeight:"bold",
        color:"#007ea7",
    },

    iconStyle: {
        fontSize:"28px",
        marginRight:"10px"
    },

    addbtn: {
        margin:"15px 20px"
    }
}));

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));
  
const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));
  
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

function EditJobs(props) {
    const classes = useStyles();
    const navigate = useNavigate();
    const [expanded, setExpanded] = React.useState(undefined);
    const [expanded2, setExpanded2] = React.useState(undefined);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [isService, setIsService] = React.useState(undefined);
    
    const userId = useSelector(state => state.userId);
    const createdPosts = GetOwnerServiceList(userId);
    const createdDonations = GetOwnerDonationList(userId);
  
    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
    const handleChange2 = (panel) => (event, newExpanded) => {
      setExpanded2(newExpanded ? panel : false);
    };
    const handleDialog = (value) => {
        setOpenDialog(value);
    };
    const handleDelete = () => {
        if(isService){
            DeleteService(expanded);
            setExpanded(undefined);
            setIsService(undefined);
            handleDialog(false);
        }
        else {
            DeleteDonation(expanded2);
            setExpanded2(undefined);
            setIsService(undefined);
            handleDialog(false);
        }
    };
    const handleSetPost = (serv) => {
        setIsService(serv);
        handleDialog(true);
    };

    return(
        <Grid container className={classes.column}>
            <Grid container className={classes.row}>
                <Typography className={classes.mainTitle}>Select post</Typography>
                <Button variant="contained" color="primary" className={classes.addbtn}>
                    <AddCircleIcon className={classes.iconStyle} onClick={() => navigate("/create-post")}/>
                    Add Post
                </Button>
            </Grid>
            <Divider style={{width:"100%"}}/>
            <Grid container className={classes.column + " " + classes.root}>
                <Grid container>
                    <Typography className={classes.mainSubtitle}>Services</Typography>
                </Grid>
                <Grid xs={8} container className={classes.column}>
                    {
                        createdPosts.map((postInfo) => {
                            let post = GetServicesById(postInfo.job_id);
                            return(
                                <Accordion style={{width:"100%"}} expanded={expanded == post.id} onChange={handleChange(post.id)}>
                                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                        <Grid container className={classes.row}>
                                            <Typography>{post.title}</Typography>
                                            <Grid>
                                                <EditIcon className={classes.iconStyle} color="primary" onClick={() => navigate(`/edit-post/service/${post.id}`)}/>
                                                <DeleteForeverIcon className={classes.iconStyle} style={{color:"red"}} onClick={() => handleSetPost(true)}/>
                                            </Grid>
                                        </Grid>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>{post.secondary}</Typography>
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })
                    }
                </Grid> 
            </Grid>
            
            <Divider style={{width:"100%"}}/>
            <Grid container className={classes.column + " " + classes.root}>
                <Grid container>
                    <Typography className={classes.mainSubtitle}>Donations</Typography>
                </Grid>
                <Grid xs={8} container className={classes.column}>
                    {
                        createdDonations.map((postInfo) => {
                            let post = GetDonationsById(postInfo.post_id);
                            return(
                                <Accordion style={{width:"100%"}} key={postInfo.post_id} expanded={expanded2 == post.id} onChange={handleChange2(post.id)}>
                                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                        <Grid container className={classes.row}>
                                            <Typography>{post.title}</Typography>
                                            <Grid>
                                                <EditIcon className={classes.iconStyle} color="primary" onClick={() => navigate(`/edit-post/donation/${post.id}`)}/>
                                                <DeleteForeverIcon className={classes.iconStyle} style={{color:"red"}} onClick={() => handleSetPost(false)}/>
                                            </Grid>
                                        </Grid>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>{post.secondary}</Typography>
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })
                    }
                </Grid> 
            </Grid>
            <Dialog
                open={openDialog}
                onClose={() => handleDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the post?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDelete()}>Yes</Button>
                    <Button onClick={() => handleDialog(false)} autoFocus>No</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}

export default EditJobs;