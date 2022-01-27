import React from "react";
import { Button, makeStyles, withStyles } from "@material-ui/core";
import { Grid, Typography } from "@material-ui/core";
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
    },

    row: {
        display:"flex",
        flexDirection:"row",
        justifyContent: "flex-start",
        alignItems: "center",
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
        padding:"8px",
        width:"250px",
        "&:hover":{
            backgroundColor:"rgb(240,240,255)"
        }
    },

    pp: {
        borderRadius:"50px",
        height:"30px",
        margin:"0 15px 0 5px"
    }
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

    const contactList = GetContactList(1);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

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
                                <Typography className={classes.row + " " + classes.contacts}>
                                    <img src={`../material/${contactInfo.profile_picture}`} className={classes.pp}/>
                                    {contactInfo.name} {contactInfo.lastname}
                                </Typography>
                            )
                        })
                    }
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}

export default Contacts;