import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { PlusCircle as PlusCircleIcon } from 'react-feather';
import NavigateNext from '@mui/icons-material/NavigateNext';
import {
  Button,
  Breadcrumbs,
  Grid,
  Link,
  SvgIcon,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

/*nullable className string and nullable onAddClick function   */
type Props = {
  className?: string;
  onAddClick?: () => void;
};

/* using the Props here and ...rest operator  */
const Header = ({ className, onAddClick, ...rest }: Props) => {
  const classes = useStyles();
  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      justifyContent="space-between"
      spacing={3}
      {...rest}
    >
      <Grid item>
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            variant="body1"
            color="inherit"
            to="/app"
            component={RouterLink}
          >
            Dashboard
          </Link>
          <Box>
            <Typography variant="body1" color="inherit">
              Calendar
            </Typography>
          </Box>
        </Breadcrumbs>
        <Typography variant="h4" color="textPrimary">
          Here's what you planned
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color="primary"
          variant="contained"
          onClick={onAddClick}
          className={classes.action}
          startIcon={
            <SvgIcon fontSize="small">
              <PlusCircleIcon />
            </SvgIcon>
          }
        >
          New Event
        </Button>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
  root: {},
  action: {
    marginBottom: useTheme().spacing(1),
    '& + &': {
      marginLeft: useTheme().spacing(1),
    },
  },
}));
export default Header;
