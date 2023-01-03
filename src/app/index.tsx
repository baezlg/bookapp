/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { GlobalStyle } from 'styles/global-styles';
import { useTranslation } from 'react-i18next';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Router from './routes';
import MainLayout from './layouts/main-layout';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <SnackbarProvider dense maxSnack={3}>
          <Helmet
            titleTemplate="%s - React Boilerplate"
            defaultTitle="React Boilerplate"
            htmlAttributes={{ lang: i18n.language }}
          >
            <meta
              name="description"
              content="A React Boilerplate application"
            />
          </Helmet>
          <MainLayout>
            <Router />
          </MainLayout>
          <GlobalStyle />
        </SnackbarProvider>
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  );
}
