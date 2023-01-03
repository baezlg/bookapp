import React, { useState, MouseEvent } from 'react';
import clsx from 'clsx';
import { withStyles, makeStyles } from '@mui/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import { LogOut as LogOutIcon, Hexagon as HexagonIcon } from 'react-feather';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  useTheme,
} from '@mui/material';

const HeaderProfile = () => {
  const classes = useStyles();
  /*using the profile to render an avatar */
  const { profile } = useSelector((state: RootState) => state.profile);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.clear();
  };
  return (
    <div>
      <Box display="flex" justifyContent="center" onClick={handleClick}>
        <Avatar
          variant={'circular'}
          alt="User"
          className={clsx(classes.avatar, classes.small)}
          src={profile.avatar}
        />
      </Box>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <ListItemText primary={profile.email} />
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <HexagonIcon />
          </ListItemIcon>
          <ListItemText primary="Partners" />
        </MenuItem>
        <a className={classes.link} href={'/'}>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogOutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </a>
      </StyledMenu>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
  },
  link: { textDecoration: 'none', color: 'inherit' },
  small: {
    width: useTheme().spacing(3),
    height: useTheme().spacing(3),
  },
}));
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

export default HeaderProfile;
