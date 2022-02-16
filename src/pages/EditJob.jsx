import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Button, Divider, FormHelperText, Grid, InputAdornment, OutlinedInput, TextField, Typography } from "@mui/material";
import { FormControlLabel, FormGroup, FormControl, Switch, MenuItem, Select, InputLabel } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import DateAdapter from '@mui/lab/AdapterMoment';
import { GetAllCategories, GetDonationsById, GetServicesById, UpdateService } from "../fakeAPI/FakeBackend";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme)=>({
    column: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
    },

    row: {
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"flex-start"
    },
    
    title: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"32px",
        fontWeight:"bold",
        color:"#005c7a",
        margin:"20px 0 0 20px",
        [theme.breakpoints.down('md')]:{
            fontSize:"24px",
        }
    },

    subtitle: {
        fontFamily:"'Raleway','sans-serif'",
        fontSize:"20px",
        fontWeight:"bold",
        color:"#007ea7",
        margin:"5px 0 20px 40px",
        [theme.breakpoints.down('md')]:{
            fontSize:"18px",
            margin:"5px 0 5px 30px"
        }
    },

    picker: {
        marginBottom:"20px",
        width:"100%",
    },

    columnsContainerLeft: {
        paddingRight:"10px",
        marginBottom:"10px",
        [theme.breakpoints.down('xs')]:{
            paddingRight:"0"
        }
    },

    columnsContainerRight: {
        paddingLeft:"10px",
        marginBottom:"10px",
        [theme.breakpoints.down('xs')]:{
            paddingLeft:"0"
        }
    },

    menuText:{
        marginLeft:"10px",
        color:"gray",
    },

    btn: {
        margin:"0 30px 60px 30px"
    },
}));

function EditJob(props) {
    const classes = useStyles();
    const location = useLocation();
    const navigate = useNavigate();
    const {id} = useParams();
    const [isService, setIsService] = React.useState(location.pathname.includes('service') ? 1 : 0);
    const [post, setPost] = React.useState(isService == 1 ? GetServicesById(id) : GetDonationsById(id));
    const userId = useSelector(state => state.userId);

    React.useEffect(() => (
        post.owner != userId ? (
            navigate("/edit-post"),
            alert("You are not allowed to edit this post")
        ) : null

    ))

    const [title, setTitle] = React.useState(post.title);
    const [subtitle, setSubtitle] = React.useState(post.secondary);
    const [contentValue, setContentValue] = React.useState(post.body);
    const [dateStart, setDateStart] = React.useState(new Date(isService ? post.date_from : post.date_due));
    const [dateEnd, setDateEnd] = React.useState(new Date(isService ? post.date_to : undefined));
    const [checked, setChecked] = React.useState(dateEnd ? true : false);
    const [selectedCategory, setSelectedCategory] = React.useState(post.category);
    const [amount, setAmount] = React.useState(isService ? undefined : post.payment);
    const categories = GetAllCategories();

    const [checkTitle, setCheckTitle] = React.useState(false);
    const [checkSubtitle, setCheckSubtitle] = React.useState(false);
    const [checkCategory, setCheckCategory] = React.useState(false);
  
    const handleDateStart = (newValue) => {
        setDateStart(newValue);
    };
    const handleDateEnd = (newValue) => {
        if(newValue < dateStart) alert("Services cannot end before they start!");
        else setDateEnd(newValue);
    };
    const handleTitle = (event) => {
        setTitle(event.target.value);
    };
    const handleSubtitle = (event) => {
        setSubtitle(event.target.value);
    };
    const handleChecked = () => {
        setChecked(prev => !prev);
    };
    const handleCategoryPick = (event) => {
        setSelectedCategory(event.target.value);
    };
    const handleServicePick = (event) => {
        setIsService(event.target.value);
    };
    const handleAmount = (event) => {
        setAmount(event.target.value);
    };
    const handleContent = (event) => {
        setContentValue(event.target.value);
    };
    const handleSave = () => {
        if(title === "") setCheckTitle(true);
        if(subtitle === "") setCheckSubtitle(true);
        if(selectedCategory === "") setCheckCategory(true);

        if(title === "" || subtitle === "" || selectedCategory === ""){
            alert("Check your main information");
        }
        else PutData();
    };
    
    const PutData = () => {
        let newPost = {id: 0, title:"", secondary:"", body:"",date_from:"", date_to:"", owner: 0, category: 0};
        newPost.id = post.id;
        newPost.title = title;
        newPost.secondary = subtitle;
        newPost.body = contentValue;
        newPost.date_from = dateStart;
        newPost.date_to = dateEnd;
        newPost.owner = post.owner;
        newPost.category = selectedCategory;
        console.log("before");
        UpdateService(newPost);
        console.log("before");
        navigate("/edit-post");
    }

    return(
        <Grid container direction="row" justifyContent="column">
            <Grid xl={7} lg={8} md={11} container>
                <Grid container>
                    <Typography className={classes.title}>Edit post</Typography>
                </Grid>
                <Divider style={{width:"100%"}}/>
                <Grid container>
                    <Typography className={classes.subtitle}>Main information</Typography>
                </Grid>
                <Grid container className={classes.column}>
                    <Grid xl={7} lg={8} md={9} sm={10} min={11} container className={classes.column}>
                        <TextField
                            error={checkTitle}
                            helperText={checkTitle ? "Title cannot be empty" : null}
                            id="standard-basic"
                            label="Title"
                            variant="outlined"
                            value={title}
                            onChange={handleTitle}
                            className={classes.picker}
                        />
                        <TextField
                            error={checkSubtitle}
                            helperText={checkSubtitle ? "Subtitle cannot be empty" : null}
                            id="standard-password-input"
                            label="Subtitle"
                            autoComplete="current-password"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={subtitle}
                            onChange={handleSubtitle}
                            className={classes.picker}
                            inputProps={{ maxLength: 128 }}
                        />
                        <Grid container className={classes.picker}>
                            <Grid xs={6} container className={classes.columnsContainerLeft}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        error={checkCategory}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedCategory}
                                        label="Category"
                                        onChange={handleCategoryPick}
                                    >
                                        <Typography className={classes.menuText}>Services</Typography>
                                        {
                                            categories.filter(category => category.service == 1).map((category) => {
                                                return <MenuItem value={category.category_id}>{category.category_name}</MenuItem>
                                            })
                                        }
                                        <Typography className={classes.menuText}>Donations</Typography>
                                        {
                                            categories.filter(category => category.service == 0).map((category) => {
                                                return <MenuItem value={category.category_id}>{category.category_name}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid xs={6} container className={classes.columnsContainerRight}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="demo-simple-select-label">Post type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={isService}
                                        label="Post type"
                                        onChange={handleServicePick}
                                    >
                                        <MenuItem value={1}>Service</MenuItem>
                                        <MenuItem value={0}>Donation</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider style={{width:"100%"}}/>
                <Grid container className={classes.column}>
                    <Grid container>
                        <Typography className={classes.subtitle + " " + classes.picker}>Aditional Information</Typography>
                    </Grid>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <Grid container className={classes.column}>
                        <Grid xl={7} lg={8} md={9} sm={10} container  className={classes.columnsContainerLeft + " " + classes.columnsContainerRight}>
                            <Grid xs={6} container className={classes.columnsContainerLeft + " " + classes.column}>
                                <DesktopDatePicker
                                    label="Start date"
                                    inputFormat="DD/MM/yyyy"
                                    value={dateStart}
                                    onChange={handleDateStart}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Grid>
                            <Grid xs={6} container className={classes.columnsContainerRight + " " + classes.column}>
                                {
                                    isService == 1 ? 
                                    <Grid container className={classes.column}>
                                        <DesktopDatePicker
                                            disabled={!checked}
                                            label="End date"
                                            inputFormat="DD/MM/yyyy"
                                            value={dateEnd}
                                            onChange={handleDateEnd}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Grid>
                                    : <Grid container>
                                        <FormControl fullWidth variant="outlined">
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                value={amount}
                                                onChange={handleAmount}
                                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            />
                                        </FormControl>
                                    </Grid>
                                }
                            </Grid>
                            <Grid container item className={classes.row}>
                                <Grid container item xs={6} className={classes.row + " " + classes.picker}></Grid>
                                {
                                    isService ? 
                                        <Grid container item xs={6} display="row" justifyContent="center">
                                            <FormGroup>
                                                <FormControlLabel control={<Switch checked={checked} onChange={handleChecked}/>} label="Include End Date"/>
                                            </FormGroup>
                                        </Grid>
                                        : null
                                }
                            </Grid>
                        </Grid>    
                        </Grid>
                    </LocalizationProvider>
                </Grid>
                <Divider style={{width:"100%"}}/>
                <Grid container>
                    <Typography className={classes.subtitle}>Post content</Typography>
                </Grid>
                <Grid container className={classes.column}>
                    <Grid xl={7} lg={8} md={9} sm={10} min={11} container>
                        <TextField
                            id="standard-multiline-static"
                            label="Content"
                            multiline
                            value={contentValue}
                            rows={8}
                            className={classes.picker}
                            onChange={handleContent}
                        />
                    </Grid>
                </Grid>
                <Divider style={{width:"100%"}}/>
                <Grid container>
                    <Typography className={classes.subtitle}>Last step</Typography>
                </Grid>
                <Grid container className={classes.column}>
                    <Grid>
                        <Button variant="contained" color="primary" className={classes.btn} onClick={() => handleSave()}>Save</Button>
                        <Button variant="contained" className={classes.btn} onClick={() => navigate("/edit-post")}>Back</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default EditJob;