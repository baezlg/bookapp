import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import PerfectScrollbar from 'react-perfect-scrollbar';
import FileCopy from '@mui/icons-material/FileCopy';
import More from '@mui/icons-material/More';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import bytesToSize from 'utils/bytes-to-size';

type Props = {
  className?: string;
};

const FilesDropzone = ({ className, ...rest }: Props) => {
  const classes = useStyles();
  const [files, setFiles] = useState<any[]>([]);
  //this will be triggered when we drop a file in our component
  const handleDrop = useCallback(acceptedFiles => {
    setFiles(prevFiles => [...prevFiles].concat(acceptedFiles));
  }, []);
  const handleRemoveAll = () => {
    setFiles([]);
  };
  //useDropzone - we're deconstructing it to get the properties of the object it returns
  //we're assigning handleDrop on onDrop
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <div
        className={clsx({
          [classes.dropZone]: true,
          [classes.dragActive]: isDragActive,
        })}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div>
          <img
            alt="Select file"
            className={classes.image}
            src="/images/products/add_file.svg"
          />
        </div>
        <div>
          <Typography gutterBottom variant="h5">
            Select files
          </Typography>
          <Box mt={2}>
            <Typography color="textPrimary" variant="body1">
              Drop files here or click <Link underline="always">browse</Link>{' '}
              thorough your machine
            </Typography>
          </Box>
        </div>
      </div>
      {files.length > 0 && (
        <>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <List className={classes.list}>
              {files.map((file, i) => (
                <ListItem divider={i < files.length - 1} key={i}>
                  <ListItemIcon>
                    <FileCopy />
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    primaryTypographyProps={{ variant: 'h5' }}
                    secondary={bytesToSize(file.size)}
                  />
                  <Tooltip title="More options">
                    <IconButton edge="end">
                      <More />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
          </PerfectScrollbar>
          <div className={classes.actions}>
            <Button onClick={handleRemoveAll} size="small">
              Remove all
            </Button>
            <Button color="secondary" size="small" variant="contained">
              Upload files
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

const useStyles = makeStyles(() => ({
  root: {},
  dropZone: {
    border: `1px dashed ${useTheme().palette.divider}`,
    padding: useTheme().spacing(6),
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: useTheme().palette.action.hover,
      opacity: 0.5,
      cursor: 'pointer',
    },
  },
  dragActive: {
    backgroundColor: useTheme().palette.action.active,
    opacity: 0.5,
  },
  image: {
    width: 130,
  },
  info: {
    marginTop: useTheme().spacing(1),
  },
  list: {
    maxHeight: 320,
  },
  actions: {
    marginTop: useTheme().spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
    '& > * + *': {
      marginLeft: useTheme().spacing(2),
    },
  },
}));
export default FilesDropzone;
