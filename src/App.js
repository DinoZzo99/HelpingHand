// import logo from './logo.svg';
import './App.css';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
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
import Search from './pages/Search';
import SearchResults from './pages/SearchResults';


const theme = createTheme({
  palette: {
    primary: {main: "#007ea7"},
    secondary: {main: "#005c7a"}
  },
});

function App() {
  return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <MainHeader/>
          <Navbar/>
          <Contacts/>
          <Grid xs={12}container>
            <Grid xl={2.5} lg={2}/>
            <Grid xl={7} lg={8} container>
                <Routes>
                  <Route path="home" element={<Home/>}/>
                  <Route path="about" element={<About/>}/>
                  <Route path="service/:id" element={<Service/>}/>
                  <Route path="categories" element={<Category/>}/>
                  <Route path="services" element={<Services/>}/>
                  <Route path="services/:id" element={<Services/>}/>
                  <Route path="my-profile" element={<User/>}/>
                  <Route path="users/:id" element={<User/>}/>
                  <Route path="search" element={<Search/>}/>
                  <Route path="search/:keywords" element={<SearchResults/>}/>
                </Routes>
            </Grid>
          </Grid>
        </ThemeProvider>
      </StyledEngineProvider>
  );
}

export default App;
