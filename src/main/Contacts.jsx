import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import { Grid, Typography } from "@mui/material";
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useNavigate} from 'react-router-dom';

import { Slide } from "@mui/material";

import { GetUserById, GetContactList } from "../fakeAPI/FakeBackend";

const useStyle = makeStyles((theme)=>({
    root: {
        margin: "0",
        width:"250px",
        position: "fixed",
        bottom: "0px",
        right:"0px",
        boxShadow: "0px 1px 4px #000000",
        borderRadius:"5px 0px 0px 0px",
        zIndex:"100"
    },

    row: {
        display:"flex",
        flexDirection:"row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding:"8px",
    },

    column: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    
    heading: {
        fontFamily: "'Raleway','sans-serif'",
    },

    contacts: {
        fontFamily: "'Raleway','sans-serif'",
        position:"relative",
        "&:hover":{
            backgroundColor:"rgb(240,240,255)",
            cursor:"pointer",
        }
    },

    icon: {
        borderRadius:"50px",
        height:"30px",
        margin:"0 15px 0 5px"
    },

    iconContainer: {
        display: "flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        "&:hover":{
            backgroundColor:"rgb(240,240,255)",
            cursor:"pointer",
        }
    },

    floaterMenu: {
        backgroundColor:"white",
        position:"absolute",
        top:0,
        left: 0,
        height:"100%",
        border: '1px solid rgba(0, 0, 0, .125)',
    },
}));

const Accordion = withStyles({
    root: {
      '&$expanded': {
        margin: 'auto',
      },
    },
    expanded: {},
  })(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    borderRadius:"5px 0 0 0",
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
      backgroundColor:"#007ea7",
      color: "white"
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: "0"
  },
}))(MuiAccordionDetails);

function Contacts(props){
    const classes = useStyle();
    const [expanded, setExpanded] = React.useState(false);
    const [checked, setChecked] = React.useState(null);
    
    const contactList = GetContactList(1);
    const navigate = useNavigate();
  
    const handleSlide = (value) => {
        setChecked(value);
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setChecked(null);
        setExpanded(isExpanded ? panel : false);
    };

    const handleNavigation = (value) => {
        navigate(`./users/${value}`);
        setExpanded(false);
    }


    return(
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className={classes.root}>
            <AccordionSummary
                expandIcon={<ArrowDropUpIcon style={expanded ? {color: "white"} : {color:"#005c7a"}}/>}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Typography className={classes.heading}>Contacts</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid className={classes.column}>
                    {
                        contactList.map((contact, index) => {
                            let contactInfo = GetUserById(contact.contact_id);
                            return(
                                <Grid container className={classes.contacts}>
                                    <Grid container className={classes.row} onClick={() => handleSlide(contact.contact_id)}>
                                        <img src={`../material/${contactInfo.profile_picture}`} className={classes.icon}/>
                                        <Typography>
                                            {contactInfo.name} {contactInfo.lastname}
                                        </Typography>
                                    </Grid>
                                    <Slide direction="left" in={checked === contact.contact_id} mountOnEnter unmountOnExit>
                                        <Grid xs={12} container className={classes.floaterMenu}>
                                            <Grid xs={2} container className={classes.iconContainer} onClick={() => handleSlide(null)}>
                                                <ArrowBackIosIcon/>
                                            </Grid>
                                            <Grid xs={4} container className={classes.iconContainer}>
                                                Message
                                            </Grid>
                                            <Grid xs={5} container className={classes.iconContainer} onClick={() => handleNavigation(contact.contact_id)}>
                                                View Profile
                                            </Grid>
                                        </Grid>
                                    </Slide>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}

export default Contacts;