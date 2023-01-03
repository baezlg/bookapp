import React from 'react';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Header from './Header';
import ProductCreateForm from './ProductCreateForm';
import { useTheme } from '@mui/material/styles';
import Page from 'app/components/pages';

const ProductCreateView = () => {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="Product Create">
      <Container>
        <Header />
        <ProductCreateForm />
      </Container>
    </Page>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100%',
    paddingTop: useTheme().spacing(3),
    paddingBottom: 100,
  },
}));

export default ProductCreateView;
