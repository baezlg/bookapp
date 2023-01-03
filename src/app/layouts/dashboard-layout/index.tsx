import React from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import DashboardSidebarNavigation from './dashboard-sidebar-navigation';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { useTheme } from '@mui/material/styles';

const Dashboard = () => {
  const classes = useStyles();
  const mobileDevice = useMediaQuery('(max-width:650px)');
  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}
    >
      <DashboardSidebarNavigation />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div
            className={clsx(classes.content, mobileDevice && classes.leftSpace)}
          >
            <Outlet />
          </div>
        </div>
      </div>
          
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  leftSpace: {
    paddingLeft: '3rem',
  },
  root: {
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [useTheme().breakpoints.up('lg')]: {
      paddingLeft: 256,
    },
  },
}));
export default Dashboard;
