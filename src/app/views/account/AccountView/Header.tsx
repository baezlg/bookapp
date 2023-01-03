import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Typography, Breadcrumbs, Link, Box } from '@mui/material';
import NavigateNext from '@mui/icons-material/NavigateNext';

type Props = {
  className?: string;
};

const Header = ({ className, ...rest }: Props) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link color="inherit" to="/app" component={RouterLink}>
          Dashboard
        </Link>
        <Box>
          <Typography variant="body1" color="inherit">
            Account
          </Typography>
        </Box>
      </Breadcrumbs>
      <Typography variant="h4" color="textPrimary">
        Settings
      </Typography>
    </div>
  );
};
const useStyles = makeStyles(() => ({
  root: {},
}));
export default Header;
