import logo from './logo.svg';
import './App.css';
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import { Grid, makeStyles } from '@material-ui/core';
import SideGrid from './main/SideGrid';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import MainHeader from './main/MainHeader';
import Navbar from './main/Navbar';
import Service from './pages/Service';
import Contacts from './main/Contacts';
import Category from './pages/Category';
import Services from './pages/Services';
import User from './pages/User';


const theme = createTheme({
  palette: {
    primary: {main: "#007ea7"},
    secondary: {main: "#005c7a"}
  },
});

const useStyles = makeStyles((theme)=>({
  footer: {
    position:"static",
    left: "0",
    bottom:"0",
    height:"200px",
    backgroundColor:"lightblue",
}
}));

function App() {
  return (
      <ThemeProvider theme={theme}>
        <MainHeader/>
        <Navbar/>
        <SideGrid/>
        <Contacts/>
        <Grid container>
          <Grid md = {2}></Grid>
          <Grid md = {10}>
              <Routes>
                <Route path="home" element={<Home/>}/>
                <Route path="about" element={<About/>}/>
                <Route path="service/:id" element={<Service/>}/>
                <Route path="categories" element={<Category/>}/>
                <Route path="services" element={<Services/>}/>
                <Route path="services/:id" element={<Services/>}/>
                <Route path="my-profile" element={<User/>}/>
                <Route path="users/:id" element={<User/>}/>
              </Routes>
          </Grid>
        </Grid>
      </ThemeProvider>
  );
}

export default App;
