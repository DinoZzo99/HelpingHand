import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import MenuIcon from '@mui/icons-material/Menu';

import { Toolbar, Grid, AppBar, Button, MenuList, MenuItem, Divider, Typography, Drawer, Box, List } from "@mui/material";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/actions/loginStatus";
import { userLoggedIn } from "../redux/actions/user";
import { GetUserById } from "../fakeAPI/FakeBackend";

const useStyles = makeStyles((theme)=>({
    navbar: {
        padding: "0",
        backgroundColor: "#005c7a",
        boxShadow: "0px 1px 5px #000000"
    },

    navbarElement: {
        color: "#ffffff",
        fontFamily:"'Raleway','sans-serif'",
        marginRight:"30px",
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

    menuTypo: {
        marginLeft:"20px",
        color: "gray"
    },

    drawerElement: {
        color: "#005c7a",
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"18",
        width:"220px",
        padding:"10px 0 10px 20px",
        borderRadius:"0",
        "&:hover": {
            backgroundColor:"rgb(245,245,255)",
        }
    },

    drawerSubElement: {
        color: "#005c7a",
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"16px",
        width:"220px",
        padding:"10px 0 10px 40px",
        borderRadius:"0",
        "&:hover": {
            backgroundColor:"rgb(245,245,255)",
            cursor:"pointer"
        }
    },

    drawer: {
        backgroundColor:"white",
        height:"100%",
    },

    drawerHeader: {
        height:"55px",
        backgroundColor:"#005c7a",
        "&:hover": {
            cursor:"pointer"
        }
    },

    hideBig: {
        [theme.breakpoints.up('sm')]: {
            display:"none"
        }
    },

    hideSmall: {
        [theme.breakpoints.down('sm')]: {
            display:"none"
        }
    },

    dividerColor: {
        backgroundColor:"white",
    }
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
    const dispatch = useDispatch();
    const user = props.userId ? GetUserById(props.userId) : null;

    const handleLogOut = () => {
        dispatch(logOut());
        dispatch(userLoggedIn(null));
        navigate("/");
    }
    const [openDrawer, setOpenDrawer] = React.useState(false);
    
    const toggleDrawer = (open) => {
        setOpenDrawer(open);
    };

    return(
        <AppBar position="sticky">
            <Toolbar className={classes.navbar}>
                <Grid lg={2} md={1} sm={0.5} min={0}/>
                <Grid lg={8} md={9} sm={9.5} min={10} container className={classes.hideBig}>
                    <Button className={classes.navbarElement} onClick={() => toggleDrawer(true)}><MenuIcon/></Button>
                </Grid>
                <Grid lg={8} md={9} sm={9.5} min={10} container className={classes.hideSmall}>
                    <Button className={classes.navbarElement} onClick={() => navigate("/home")}>Home</Button>
                    <Button className={classes.navbarElement} onClick={() => navigate("/about")}>About</Button>
                    {
                        props.userId ? <Grid>
                            <LightTooltip
                                placement="bottom-start"
                                title={
                                    <MenuList>
                                        <MenuItem onClick={() => navigate(`/services`)}>
                                            <Typography className={classes.menuItem}>Services</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={() => navigate(`/donations`)}>
                                            <Typography className={classes.menuItem}>Donations</Typography>
                                        </MenuItem>
                                        <Divider />
                                        <MenuItem onClick={() => navigate(`/categories`)}>
                                            <Typography className={classes.menuItem}>Categories</Typography>
                                        </MenuItem>
                                    </MenuList>
                                }
                            >
                                <Button className={classes.navbarElement + " " + classes.navbarDrop}>Volunteer <ArrowDropDownIcon/></Button>
                            </LightTooltip>
                            <LightTooltip
                                placement="bottom-start"
                                title={
                                    <MenuList>
                                        <MenuItem onClick={() => navigate(`/search`)}>
                                            <Typography className={classes.menuItem}>Search</Typography>
                                        </MenuItem>
                                        <Divider />
                                            <Typography className={classes.menuItem + " " + classes.menuTypo}>Services/Donations</Typography>
                                        <MenuItem onClick={() => navigate(`/create-post`)}>
                                            <Typography className={classes.menuItem}>Create</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={() => navigate(`/my-posts`)}>
                                            <Typography className={classes.menuItem}>Edit</Typography>
                                        </MenuItem>
                                    </MenuList>
                                }
                            >
                                <Button className={classes.navbarElement + " " + classes.navbarDrop}>Tools <ArrowDropDownIcon/></Button>
                            </LightTooltip>
                        </Grid> : null
                    }
                </Grid>
                <Grid xs={2} container item className={classes.rowEnd + " " + classes.hideSmall}>
                    {
                        props.userId ? <LightTooltip
                            placement="bottom-end"
                            title={
                                <MenuList dense>
                                    <MenuItem onClick={() => navigate("/my-profile")}>
                                        <Typography className={classes.menuItem}>View profile</Typography>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={() => navigate("/active-jobs")}>
                                        <Typography className={classes.menuItem}>Active Jobs</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => navigate("/my-posts")}>
                                        <Typography className={classes.menuItem}>My Jobs</Typography>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={() => handleLogOut()}>
                                        <Typography className={classes.menuItem}>Log out</Typography>
                                    </MenuItem>
                                </MenuList>
                            }
                        >
                            <Button className={classes.profileButton}>
                                <AccountCircleIcon className={classes.profile_icon}/>
                                {user.name}
                                <ArrowDropDownIcon/>
                            </Button>
                        </LightTooltip> : null
                    }
                </Grid>
                <Drawer
                    anchor="left"
                    open={openDrawer}
                    onClose={() => toggleDrawer(false)}
                >
                    <Grid container className={classes.drawer} direction="column">
                        <Grid container item direction="row" justifyContent="space-between" alignItems="center" className={classes.drawerHeader} onClick={() => toggleDrawer(false)}>
                            <Grid item>
                                <Button className={classes.profileButton}>
                                    <AccountCircleIcon className={classes.profile_icon}/>
                                    {user.name}
                                </Button>
                            </Grid>
                            <ArrowLeftIcon style={{color:"white", fontSize:"40px"}}/>
                        </Grid>
                        <Divider style={{width: "100%"}}/>
                        <Grid container item className={classes.drawerElement}>Profile</Grid>
                        <Grid container item className={classes.drawerSubElement} onClick={() => navigate(`/my-profile`)}>View Profile</Grid>
                        <Grid container item className={classes.drawerSubElement} onClick={() => navigate(`/active-jobs`)}>Active Jobs</Grid>
                        <Grid container item className={classes.drawerSubElement} onClick={() => navigate(`/my-posts`)}>My Jobs</Grid>
                        <Grid container item className={classes.drawerSubElement} onClick={() => handleLogOut()}>Log Out</Grid>
                        <Divider style={{width: "100%"}}/>
                        <Grid container item className={classes.drawerElement} onClick={() => navigate("/home")}>Home</Grid>
                        <Grid container item className={classes.drawerElement} onClick={() => navigate("/about")}>About</Grid>
                        <Divider style={{width: "100%"}}/>
                        <Grid container item className={classes.drawerElement}>Volunteer</Grid>
                        <Grid container item className={classes.drawerSubElement} onClick={() => navigate(`/services`)}>Services</Grid>
                        <Grid container item className={classes.drawerSubElement} onClick={() => navigate(`/donations`)}>Donations</Grid>
                        <Grid container item className={classes.drawerSubElement} onClick={() => navigate(`/categories`)}>Categories</Grid>
                        <Divider style={{width: "100%"}}/>
                        <Grid container item className={classes.drawerElement}>Tools</Grid>
                        <Grid container item className={classes.drawerSubElement} onClick={() => navigate(`/search`)}>Search</Grid>
                        <Grid container item className={classes.drawerSubElement} onClick={() => navigate(`/create-post`)}>Create</Grid>
                        <Grid container item className={classes.drawerSubElement} onClick={() => navigate(`/my-posts`)}>Edit</Grid>
                        <Divider style={{width: "100%"}}/>
                    </Grid>
                </Drawer>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;