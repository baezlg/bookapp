import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles } from '@mui/styles';
import { useTheme } from '@mui/material';

//defining the shape or type of our label model
type Props = {
  className?: string;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success';
  children?: ReactNode;
  style?: {};
};
const Label = ({
  className = '',
  color = 'secondary',
  children,
  style,
  ...rest
}: Props) => {
  const classes = useStyles();
  return (
    <span
      className={clsx(
        classes.root,
        {
          [classes[color]]: color,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
};
const useStyles = makeStyles(() => ({
  root: {
    fontFamily: useTheme().typography.fontFamily,
    alignItems: 'center',
    borderRadius: 2,
    display: 'inline-flex',
    flexGrow: 0,
    whiteSpace: 'nowrap',
    cursor: 'default',
    flexShrink: 0,
    fontSize: useTheme().typography.pxToRem(12),
    fontWeight: useTheme().typography.fontWeightMedium,
    height: 20,
    justifyContent: 'center',
    letterSpacing: 0.5,
    minWidth: 20,
    padding: useTheme().spacing(0.5, 1),
    textTransform: 'uppercase',
  },
  primary: {
    color: useTheme().palette.primary.main,
    backgroundColor: useTheme().palette.primary.main,
  },
  secondary: {
    color: useTheme().palette.secondary.main,
    backgroundColor: useTheme().palette.secondary.main,
  },
  error: {
    color: useTheme().palette.error.main,
    backgroundColor: useTheme().palette.error.main,
  },
  success: {
    color: useTheme().palette.success.main,
    backgroundColor: useTheme().palette.success.main,
  },
  warning: {
    color: useTheme().palette.warning.main,
    backgroundColor: useTheme().palette.warning.main,
  },
}));
export default Label;
