// import React from "react";
// import makeStyles from '@mui/styles/makeStyles';
// import { Grid, Typography, Divider } from "@mui/material";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { useNavigate } from "react-router-dom";
// import { GetUserById } from "../fakeAPI/FakeBackend";

// const useStyles = makeStyles((theme)=>({
//     column: {
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "flex-start",
//         alignItems: "center"
//     },

//     row: {
//         display: "flex",
//         flexDirection: "row",
//         justifyContent:"flex-start",
//         alignItems:"center",
//         "&:hover":{
//             backgroundColor:"rgb(240,240,255)",
//         }
//     },

//     root: {
//         padding:"15px 20px",
//         alignItems:"flex-start",
//         "&:hover":{
//             backgroundColor:"rgb(240,240,255)",
//         }
//     },
    
//     profile_picture: {
//         height:"60px",
//         borderRadius:"100px",
//         margin:"10px 20px",
//     },

//     name: {
//         fontFamily: "'Raleway','sans-serif",
//         fontSize:"16px",
//     },





//     notfound: {
//         fontFamily: "'Raleway','sans-serif",
//         fontSize:"20px",
//         color:"gray",
//         margin:"15px"
//     },

//     userinfo: {
//         alignItems:"flex-start"
//     },


// }));

// function SearchResultTabs(props) {
//     const classes = useStyles();
//     const navigate = useNavigate();

//     const handleGo = (itemId) => {
//         if(props.index == 0) {
//             navigate(`/users/${itemId}`);
//         }
//         if(props.index == 1 || props.index == 2) {
//             navigate(`/service/${itemId}`);
//         }
//         if(props.index == 3 ) {
//             navigate(`/categories/${itemId}`);
//         }
//     }

//     return(
//         <Grid>
//         {
//             index == 0 ? props.users.map((item) => {
//                 return(
//                     <Grid container className={classes.column} onClick={() => handleGo(item.id)}>
//                         {
//                             props.index == 0 ?
//                             <Grid container className={classes.row}>
//                                 <Grid xs={2} container>
//                                     <img src={`../material/${item.profile_picture}`} className={classes.profile_picture}/>
//                                 </Grid>
//                                 <Grid xs={10} container className={classes.column + " " + classes.userinfo}>
//                                     <Typography className={classes.name}>{item.text1} {item.text2}</Typography>
//                                     <Typography className={classes.name}>{item.text3}</Typography>
//                                 </Grid>
//                             </Grid> :
//                             <Grid container className={classes.column + " " + classes.root}>
//                                     <Typography className={classes.title}>{item.text1}</Typography>
//                                     <Grid container className={classes.row}>
//                                         <AccountCircleIcon className={classes.usericon}/><Typography className={classes.user}>dino zoricic</Typography>
//                                     </Grid>
//                                     <Typography className={classes.subtitle}>{item.text2}</Typography>
//                             </Grid>
//                         }
//                     </Grid>
//                 )
//             })
//         } : (
            
//         )
//         {
//             props.data.length > 0 ? null :
            
//             <Typography className={classes.notfound}>No {props.index == 0 ? "users" : (props.index == 1 ? "services" : (props.index == 2 ? "donations" : "categories"))} found
//             </Typography>
//         }

//         </Grid>
//     )
// }

// export default SearchResultTabs;