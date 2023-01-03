import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import NavigateNext from '@mui/icons-material/NavigateNext';
import {
  Box,
  Container,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  SvgIcon,
  Typography,
  CircularProgress,
  Backdrop,
} from '@mui/material';

import {
  PlusCircle as PlusCircleIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
} from 'react-feather';

import Header from './Header';
import Results from './Results';
import Page from 'app/components/pages';
import { ProductType } from 'models/product-type';
import { getProductAxios } from 'services/productService';

const ProductListView = () => {
  const classes = useStyles();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    handleToggle();
    try {
      const { data } = await getProductAxios();
      setProducts(data);
    } catch (e) {
      alert('Something happened');
    }
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Page className={classes.root} title="Product List">
      <Container maxWidth={false}>
        <Header />
        {products && (
          <Box mt={3}>
            <Results products={products} />
          </Box>
        )}
        <Backdrop
          className={classes.backdrop}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </Page>
  );
};

const useStyles = makeStyles(() => ({
  backdrop: {
    zIndex: useTheme().zIndex.drawer + 1,
    color: '#fff',
  },
  root: {
    minHeight: '100%',
    paddingTop: useTheme().spacing(3),
    paddingBottom: 100,
  },
}));

export default ProductListView;
