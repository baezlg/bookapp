import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import ListSubheader from '@mui/material/ListSubheader';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/reducers';
import clsx from 'clsx';
import {
  PieChart as PieChartIcon,
  ShoppingCart as ShoppingCartIcon,
  ChevronUp as ChevronUpIcon,
  ChevronDown as ChevronDownIcon,
  Calendar as CalendarIcon,
  List as ListIcon,
  FilePlus as FilePlusIcon,
  LogOut as LogOutIcon,
  User as UserIcon,
  DollarSign as DollarSignIcon,
} from 'react-feather';
import { getProfileAction } from 'features/profile/profileAsyncActions';

const DashboardSidebarNavigation = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { profile } = useSelector((state: RootState) => state.profile);
  const { claims } = useSelector((state: RootState) => state.auth);
  const mobileDevice = useMediaQuery('(max-width:650px)');
  useEffect(() => {
    dispatch<any>(getProfileAction(claims.sub));
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={clsx(classes.drawer, mobileDevice && classes.drawerClose)}
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, mobileDevice && classes.drawerClose),
        }}
        anchor="left"
      >
        {profile.name && !mobileDevice && (
          <Box p={2}>
            <Box display="flex" justifyContent="center">
              <Avatar
                alt="User"
                className={classes.avatar}
                src={profile.avatar}
              />
            </Box>
            <Box mt={2} textAlign="center">
              <Typography>{profile.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                Your tier: {profile.tier}
              </Typography>
            </Box>
          </Box>
        )}
        <Divider />
        {mobileDevice ? (
          <div className={classes.drawerContainer}>
            <List>
              <Link className={classes.link} to="/dashboard">
                <ListItem button>
                  <ListItemIcon>
                    <PieChartIcon />
                  </ListItemIcon>
                </ListItem>
              </Link>
              <Divider />
              <ListItem button onClick={handleClick}>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </ListItem>
              <Divider />
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link
                    className={classes.link}
                    to={`/dashboard/list-products`}
                  >
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <ListIcon />
                      </ListItemIcon>
                    </ListItem>
                  </Link>
                  <Link
                    className={classes.link}
                    to={`/dashboard/create-product`}
                  >
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <FilePlusIcon />
                      </ListItemIcon>
                    </ListItem>
                  </Link>
                </List>
              </Collapse>
              <Divider />
              <Link className={classes.link} to={`/dashboard/calendar`}>
                <ListItem button>
                  <ListItemIcon>
                    <CalendarIcon />
                  </ListItemIcon>
                </ListItem>
              </Link>
              <Divider />
              <Link className={classes.link} to={`/dashboard/account`}>
                <ListItem button>
                  <ListItemIcon>
                    <UserIcon />
                  </ListItemIcon>
                </ListItem>
              </Link>
              <Divider />
              <Link className={classes.link} to={`/pricing`}>
                <ListItem button>
                  <ListItemIcon>
                    <DollarSignIcon />
                  </ListItemIcon>
                </ListItem>
              </Link>
              <Divider />
              <a className={classes.link} href={'/'}>
                <ListItem button onClick={handleLogout}>
                  <ListItemIcon>
                    <LogOutIcon />
                  </ListItemIcon>
                </ListItem>
              </a>
            </List>
            <Divider />
          </div>
        ) : (
          <div className={classes.drawerContainer}>
            <List>
              <ListSubheader>Reports</ListSubheader>
              <Link className={classes.link} to={`/dashboard`}>
                <ListItem button>
                  <ListItemIcon>
                    <PieChartIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Dashboard'} />
                </ListItem>
              </Link>

              <ListSubheader>Management</ListSubheader>
              <ListItem button onClick={handleClick}>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
                {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link
                    className={classes.link}
                    to={`/dashboard/list-products`}
                  >
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <ListIcon />
                      </ListItemIcon>
                      <ListItemText primary="List Products" />
                    </ListItem>
                  </Link>
                  <Link
                    className={classes.link}
                    to={`/dashboard/create-product`}
                  >
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <FilePlusIcon />
                      </ListItemIcon>
                      <ListItemText primary="Create Product" />
                    </ListItem>
                  </Link>
                </List>
              </Collapse>

              <ListSubheader>Applications</ListSubheader>
              <Link className={classes.link} to={`/dashboard//calendar`}>
                <ListItem button>
                  <ListItemIcon>
                    <CalendarIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Calendar'} />
                </ListItem>
              </Link>

              <ListSubheader>Pages</ListSubheader>
              <Link className={classes.link} to={`/dashboard/account`}>
                <ListItem button>
                  <ListItemIcon>
                    <UserIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Account'} />
                </ListItem>
              </Link>
              <Link className={classes.link} to={`/pricing`}>
                <ListItem button>
                  <ListItemIcon>
                    <DollarSignIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Pricing'} />
                </ListItem>
              </Link>

              <a className={classes.link} href={'/'}>
                <ListItem button onClick={handleLogout}>
                  <ListItemIcon>
                    <LogOutIcon />
                  </ListItemIcon>
                  <ListItemText primary={'logout'} />
                </ListItem>
              </a>
            </List>
          </div>
        )}
      </Drawer>
    </div>
  );
};
export default DashboardSidebarNavigation;

const drawerWidth = 240;
const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  toolbar: useTheme().mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: useTheme().spacing(3),
  },
  link: { textDecoration: 'none', color: 'inherit' },
  logoWithLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'inherit',
  },
  nested: {
    paddingLeft: useTheme().spacing(4),
  },
  drawerClose: {
    transition: useTheme().transitions.create('width', {
      easing: useTheme().transitions.easing.sharp,
      duration: useTheme().transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: useTheme().spacing(7) + 1,
    [useTheme().breakpoints.up('sm')]: {
      width: useTheme().spacing(9) + 1,
    },
  },
}));
