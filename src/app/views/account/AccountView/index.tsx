import React, { useState, ChangeEvent } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Container, Divider, Tab, Tabs, useTheme } from '@mui/material';
import Page from 'app/components/pages';
import Header from './Header';
import General from './General';
import Subscription from './Subscription';
import Notifications from './Notifications';
import Security from './Security';

const AccountView = () => {
  const classes = useStyles();
  /*initialize the useState to 'general' - we will use that */
  const [currentTab, setCurrentTab] = useState('general');
  /*handleTabsChange -for setting or updating the value of the current tab */
  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };
  return (
    <Page className={classes.root} title="Settings">
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            variant="scrollable"
            textColor="secondary"
          >
            {tabs.map(tab => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box mt={3}>
          {/*current tab by default is the General component.
           The rest is not displayed until clicked or selected */}
          {currentTab === 'general' && <General />}
          {currentTab === 'subscription' && <Subscription />}
          {currentTab === 'notifications' && <Notifications />}
          {currentTab === 'security' && <Security />}
        </Box>
      </Container>
    </Page>
  );
};
export default AccountView;

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100%',
    paddingTop: useTheme().spacing(3),
    paddingBottom: useTheme().spacing(3),
  },
}));

const tabs = [
  { value: 'general', label: 'General' },
  { value: 'subscription', label: 'Subscription' },
  { value: 'notifications', label: 'Notifications' },
  { value: 'security', label: 'Security' },
];
