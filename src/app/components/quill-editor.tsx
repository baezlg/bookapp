import React from 'react';
import clsx from 'clsx';
import ReactQuill from 'react-quill';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material';

type Props = {
  className?: string;
  [key: string]: any;
};

const QuillEditor = ({ className, ...rest }: Props) => {
  const classes = useStyles();
  return <ReactQuill className={clsx(classes.root, className)} {...rest} />;
};

const useStyles = makeStyles(() => ({
  root: {
    '& .ql-toolbar': {
      borderLeft: 'none',
      borderTop: 'none',
      borderRight: 'none',
      borderBottom: `1px solid ${useTheme().palette.divider}`,
      '& .ql-picker-label:hover': {
        color: useTheme().palette.secondary.main,
      },
      '& .ql-picker-label.ql-active': {
        color: useTheme().palette.secondary.main,
      },
      '& .ql-picker-item:hover': {
        color: useTheme().palette.secondary.main,
      },
      '& .ql-picker-item.ql-selected': {
        color: useTheme().palette.secondary.main,
      },
      '& button:hover': {
        color: useTheme().palette.secondary.main,
        '& .ql-stroke': {
          stroke: useTheme().palette.secondary.main,
        },
      },
      '& button:focus': {
        color: useTheme().palette.secondary.main,
        '& .ql-stroke': {
          stroke: useTheme().palette.secondary.main,
        },
      },
      '& button.ql-active': {
        '& .ql-stroke': {
          stroke: useTheme().palette.secondary.main,
        },
      },
      '& .ql-stroke': {
        stroke: useTheme().palette.text.primary,
      },
      '& .ql-picker': {
        color: useTheme().palette.text.primary,
      },
      '& .ql-picker-options': {
        padding: useTheme().spacing(2),
        backgroundColor: useTheme().palette.background.default,
        border: 'none',
        boxShadow: useTheme().shadows[10],
        borderRadius: useTheme().shape.borderRadius,
      },
    },
    '& .ql-container': {
      border: 'none',
      '& .ql-editor': {
        fontFamily: useTheme().typography.fontFamily,
        fontSize: 16,
        color: useTheme().palette.text.primary,
        '&.ql-blank::before': {
          color: useTheme().palette.text.secondary,
        },
      },
    },
  },
}));

export default QuillEditor;
