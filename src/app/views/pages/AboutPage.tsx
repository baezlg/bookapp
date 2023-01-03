import React from 'react';
import { Box, Container, Typography, useMediaQuery } from '@mui/material';
import Page from 'app/components/pages';

const AboutPage = () => {
  const mobileDevice = useMediaQuery('(max-width:650px)');
  return (
    <Page title="About">
      <Container>
        <Box
          height={mobileDevice ? '50vh' : '100vh'}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant={mobileDevice ? 'h4' : 'h1'}>
            About us 🧑🏿‍🤝‍🧑🏾
          </Typography>
        </Box>
      </Container>
    </Page>
  );
};
export default AboutPage;
