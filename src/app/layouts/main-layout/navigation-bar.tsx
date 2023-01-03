import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { colors } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { RootState } from 'store/reducers';
import HeaderProfile from 'app/components/header-profile';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: useTheme().spacing(2),
  },
  link: {
    color: colors.lightBlue[50],
    textDecoration: 'none',
  },
  title: {
    flexGrow: 1,
  },
}));

const NavigationBar = () => {
  const { claims } = useSelector((state: RootState) => state.auth);
  const classes = useStyles();

  const mobileDevice = useMediaQuery('(max-width:650px)');

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link className={`${classes.link} ${classes.title}`} to={'/'}>
            {!mobileDevice && 'LOGO'}
          </Link>
          <Button color="inherit">
            <Link to={'/'}>Home</Link>
          </Button>
          <Button color="inherit">
            <Link className={classes.link} to={'/about'}>
              About
            </Link>
          </Button>
          {claims ? (
            <>
              <Button color="inherit">
                <Link className={classes.link} to={'/dashboard'}>
                  Dashboard
                </Link>
              </Button>
              <HeaderProfile />
            </>
          ) : (
            <Button color="inherit">
              <Link className={classes.link} to={'/login'}>
                Login
              </Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavigationBar;
