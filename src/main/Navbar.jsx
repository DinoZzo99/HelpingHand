import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { Toolbar, Grid, AppBar, Button, MenuList, MenuItem, ListItemText, Divider, Typography } from "@mui/material";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import { useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";

const useStyles = makeStyles((theme)=>({
    navbar: {
        padding: "0",
        backgroundColor: "#005c7a",
        boxShadow: "0px 1px 5px #000000"
    },

    navbarElement: {
        color: "#ffffff",
        fontFamily:"'Raleway','sans-serif'",
        marginRight:"30px"
    },

    navbarDrop: {
        marginRight:"15px"
    },

    rowEnd: {
        display: "flex",
        flexDirection: "row",
        justifyContent:"flex-end",
        alignItems:"center"
    },

    profileButton: {
        color: "#ffffff",
        fontFamily:"'Raleway','sans-serif'",
        marginRight:"30px"
    },

    profile_icon: {
        color: "#ffffff",
        marginRight:"10px",
        fontSize:"30px"
    },

    menuItem: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"16px",
    },
}));

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip
        {...props}
        classes={{ popper: className }}
    />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'black',
        borderRadius: 4,
        width:"200px",
        boxShadow: theme.shadows[1],
    },
}));

function Navbar(props) {
    const classes = useStyles();

    const navigate = useNavigate();

    return(
        <AppBar position="sticky">
            <Toolbar className={classes.navbar}>
                <Grid xs={2}/>
                <Grid xs={8} container>
                    <Button className={classes.navbarElement} onClick={() => navigate("/home")}>Home</Button>
                    <Button className={classes.navbarElement} onClick={() => navigate("/about")}>About</Button>
                    <LightTooltip
                        placement="bottom-start"
                        title={
                            <MenuList dense>
                                <MenuItem>
                                    <Typography className={classes.menuItem} onClick={() => navigate(`/services`)}>Services</Typography>
                                </MenuItem>
                                <MenuItem>
                                    <Typography className={classes.menuItem} onClick={() => navigate(`/services`)}>Donations</Typography>
                                </MenuItem>
                                <Divider />
                                <MenuItem>
                                    <Typography className={classes.menuItem} onClick={() => navigate(`/categories`)}>Categories</Typography>
                                </MenuItem>
                            </MenuList>
                        }
                    >
                        <Button className={classes.navbarElement + " " + classes.navbarDrop}>Volunteer <ArrowDropDownIcon/></Button>
                    </LightTooltip>
                    <LightTooltip
                        placement="bottom-start"
                        title={
                            <MenuList dense>
                                <MenuItem>
                                    <Typography className={classes.menuItem} onClick={() => navigate(`/search`)}>Search</Typography>
                                </MenuItem>
                                <Divider />
                                <MenuItem>
                                    <Typography className={classes.menuItem}>Create Job</Typography>
                                </MenuItem>
                                <MenuItem>
                                    <Typography className={classes.menuItem}>Edit Job</Typography>
                                </MenuItem>
                                <MenuItem>
                                    <Typography className={classes.menuItem}>Delete Job</Typography>
                                </MenuItem>
                            </MenuList>
                        }
                    >
                        <Button className={classes.navbarElement + " " + classes.navbarDrop}>Tools <ArrowDropDownIcon/></Button>
                    </LightTooltip>
                </Grid>
                <Grid xs={2} container className={classes.rowEnd}>
                    <Button className={classes.profileButton} onClick={() => navigate("/users/1")}>
                        <AccountCircleIcon className={classes.profile_icon}/>
                        Profile
                        <ArrowDropDownIcon/>
                    </Button>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;