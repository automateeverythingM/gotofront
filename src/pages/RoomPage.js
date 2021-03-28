import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {  Grid, Container } from '@material-ui/core';
import  AppBar  from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
// for tabs between chat and users list
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 500,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    borderTest:{
        border: `1px solid black`,
    },
    left: {
      padding:16,
      border: `1px solid #7896D0`,
      borderRadius:20,
    }
}));

const useTabs = makeStyles((theme)=>({
  tabs:{
    backgroundColor:"#fff",
  },
 test:{
   backgroundColor:"#B4CDFF",
   transition: `all 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`
 },
 moving:{
   display:'none',
 },
  tab:{
    color:"#253BFF",
  }
}))

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box p={3}>
              <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

function SimpleTabs() {
    const [value, setValue] = React.useState(0);
    const classes = useTabs();
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div >
        <AppBar position="static">
          <Tabs classes={{indicator:`${classes.moving}`}} value={value} onChange={handleChange} className ={classes.tabs} aria-label="simple tabs example">
                <Tab classes = {{selected:`${classes.test}`}} className={classes.tab} label="Chat" {...a11yProps(0)} />
                <Tab classes = {{selected:`${classes.test}`}} className={classes.tab} label="Users" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          Chat
        </TabPanel>
        <TabPanel value={value} index={1}>
          Users
        </TabPanel>
      </div>
    );
  }



function RoomPage() {
    const classes = useStyles();

    return (
        <Container >
            <AppBar>
                <Toolbar>
                    <IconButton>
                        <MenuIcon>Icon</MenuIcon>
                    </IconButton>

                </Toolbar>
            </AppBar>
            <Box mt={15}>
              <Grid container spacing ={5}>
                  <Grid item xs={4} >
                    <Grid container justify ="center" spacing={2}>
                      <Box className={classes.left}>
                        <SimpleTabs></SimpleTabs>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid xs={8} item>
                    <Grid container spacing={2}>
                        <Grid container item xs = {12} spacing={2}>
                            <Box className={classes.borderTest}>
                              hey
                            </Box>
                        </Grid>
                    </Grid>
                  </Grid>
              </Grid>

            </Box>
        </Container>
    )
}
export default RoomPage;