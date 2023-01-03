import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@mui/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { UserType } from 'models/user-type';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { putProfileAction } from 'features/profile/profileAsyncActions';
import { profileYupObject } from 'features/profile/yup/profile.validation';
import { countryList } from 'utils/country-list';

type Props = {
  className?: string;
  user: UserType;
  text?: string;
};

const GeneralSettings = ({ className, user, ...rest }: Props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [error, setError] = useState('');
  const [countries, setCountries] = useState(countryList);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      enableReinitialize
      initialValues={user}
      validationSchema={profileYupObject}
      onSubmit={async (values, formikHelpers) => {
        try {
          dispatch<any>(putProfileAction(values));

          formikHelpers.setStatus({ success: true });
          formikHelpers.setSubmitting(false);
          enqueueSnackbar('Profile updated', {
            variant: 'success',
          });
        } catch (err) {
          setError(err);

          formikHelpers.setStatus({ success: false });
          formikHelpers.setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Card className={clsx(classes.root, className)} {...rest}>
            <CardHeader title="Profile" />
            <Divider />
            <CardContent>
              <Grid container spacing={4}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Name"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={
                      touched.email && errors.email
                        ? errors.email
                        : 'We will use this email to contact you'
                    }
                    label="Email Address"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="email"
                    value={values?.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.phone && errors.phone)}
                    fullWidth
                    helperText={touched.phone && errors.phone}
                    label="Phone Number"
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.phone}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Autocomplete
                    id="country"
                    options={countries}
                    value={(values?.country).toString()}
                    getOptionLabel={option => option.toString()}
                    renderOption={option => (
                      <React.Fragment>{option.text}</React.Fragment>
                    )}
                    onChange={(e: any) => {
                      setFieldValue('country', e.target.innerText);
                    }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        value={values?.country}
                        fullWidth
                        label="Country"
                        name="country"
                        onChange={handleChange}
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'country',
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.state && errors.state)}
                    fullWidth
                    helperText={touched.state && errors.state}
                    label="State/Region"
                    name="state"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.state}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.city && errors.city)}
                    fullWidth
                    helperText={touched.city && errors.city}
                    label="City"
                    name="city"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.city}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Typography variant="h6" color="textPrimary">
                    Make Contact Info Public
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Means that anyone viewing your profile will be able to see
                    your contacts details
                  </Typography>
                  <Switch
                    checked={values?.isPublic}
                    edge="start"
                    name="isPublic"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Typography variant="h6" color="textPrimary">
                    Available to hire
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Toggling this will let your teammates know that you are
                    available for acquiring new projects
                  </Typography>
                  <Switch
                    checked={values?.canHire}
                    edge="start"
                    name="canHire"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              {error && (
                <Box mt={3}>
                  <FormHelperText error>{error}</FormHelperText>
                </Box>
              )}
            </CardContent>
            <Divider />
            <Box p={2} display="flex" justifyContent="flex-end">
              <Button
                color="secondary"
                disabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                Save Changes
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

const useStyles = makeStyles(() => ({
  root: {},
}));

export default GeneralSettings;
