// import logo from './logo.svg';
import './App.css';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import MainHeader from './main/MainHeader';
import Navbar from './main/Navbar';
import Service from './pages/Service';
import Contacts from './main/Contacts';
import Category from './pages/Category';
import Services from './pages/Services';
import UsersContainer from './pages/UsersContainer';
import Search from './pages/Search';
import SearchResults from './pages/SearchResults';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import CreateJob from './pages/CreateJob';
import EditJob from './pages/EditJob';


import { useSelector } from 'react-redux';
import React from 'react';
import EditJobs from './pages/EditJobs';
import ActiveJobs from './pages/ActiveJobs';
import Donation from './pages/Donation';


const theme = createTheme({
  palette: {
    primary: {main: "#007ea7"},
    secondary: {main: "#005c7a"}
  },breakpoints: {
    values: {
      min: 0,
      xs: 450,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

function App() {
  const loginState = useSelector(state => state.login);
  const location = useLocation();
  const navigate = useNavigate();
  const userId = useSelector(state => state.userId);

  React.useEffect(() => {
    if(loginState === 'guest' && !location.pathname.includes("welcome") && !location.pathname.includes("register")) navigate("welcome");
    if(loginState !== 'guest' && (location.pathname.includes("welcome") || location.pathname.includes("register"))) navigate("home");
    if(location.pathname === "/"){
      loginState === 'guest' ? navigate("welcome") : navigate("home")
    }
  })

  return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Grid style={{overflowY:"scroll", overflowX:"hidden", height:"100vh"}}>
            <MainHeader/>
            <Navbar userId={userId}/>
            {
              loginState === 'guest' ? null : <Contacts/>
            }
            <Grid container>
              <Routes>
                <Route path="welcome" element={<Welcome/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="home" element={<Home/>}/>
                <Route path="about" element={<About/>}/>
                <Route path="service/:id" element={<Service/>}/>
                <Route path="donation/:id" element={<Donation/>}/>
                <Route path="categories" element={<Category/>}/>
                <Route path="services" element={<Services/>}/>
                <Route path="services/:id" element={<Services/>}/>
                <Route path="donations/:id" element={<Services/>}/>
                <Route path="donations" element={<Services/>}/>
                <Route path="my-profile" element={<UsersContainer/>}/>
                <Route path="users/:id" element={<UsersContainer/>}/>
                <Route path="search" element={<Search/>}/>
                <Route path="search/:keywords" element={<SearchResults/>}/>
                <Route path="create-post" element={<CreateJob/>}/>
                <Route path="my-posts" element={<EditJobs/>}/>
                <Route path="edit-post/donation/:id" element={<EditJob/>}/>
                <Route path="edit-post/service/:id" element={<EditJob/>}/>
                <Route path="active-jobs" element={<ActiveJobs/>}/>
              </Routes>
            </Grid>
          </Grid>
        </ThemeProvider>
      </StyledEngineProvider>
  );
}

export default App;
