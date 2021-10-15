import React from 'react';
import { useHistory } from 'react-router';
import { useForm, Controller } from "react-hook-form";
import {
  Typography,
  Container,
  Button,
  Grid,
  Checkbox
} from '@material-ui/core';

import './style.scss';

const Register = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    history.push('/login');
  }; // your form submit function which will invoke after successful validation

  return (
    <Typography component='div' className='register'>
      <Container>
        <Typography component='div' className='component-header-section'>
          <Typography component='span'>Seamlessly Explore & Collect Exlusive nfts.</Typography>
          <Typography variant='h1' component='h2' className='title'>The new creative economy.</Typography>
          <Button variant='contained' className='white-btn'>Start Your Search</Button>
        </Typography>
        <Grid container spacing={3} className='content'>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            className='player-section'
          >
            <Typography component='div'>
              <iframe width="100%" title="register" height="100%" src="https://www.youtube.com/embed/TKfS5zVfGBc"></iframe>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            className='login-content'
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Typography variant='h1' component='h2' className='title'>Welcome to<br />DemBoxer Web System.</Typography>
              <Typography component='div' className='form-control'>
                <label>your email</label>
                <input
                  type='email'
                  {...register("email", { required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                  autoComplete='off'
                />
                {errors?.email?.type === "required" && <p>This field is required</p>}
                {errors?.email?.type === "pattern" && (
                  <p>Enter correct email format</p>
                )}
              </Typography>
              <Typography component='div' className='form-control'>
                <label>Password</label>
                <input type='password' {...register("password", { required: true, minLength: 6 })} />
                {errors?.password?.type === "required" && <p>This field is required</p>}
                {errors?.password?.type === "minLength" && (
                  <p>Password has to be at least 6 characters</p>
                )}
              </Typography>
              <Typography component='div' className='form-control'>
                <label>Repeat Password</label>
                <input type='password' {...register("repeatPassword", { required: true, minLength: 6 })} />
                {errors?.repeatPassword?.type === "required" && <p>This field is required</p>}
                {errors?.repeatPassword?.type === "minLength" && (
                  <p>Password has to be at least 6 characters</p>
                )}
              </Typography>
              <label className='custom-check-box'>
                <Controller
                  name="termsAgree"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => <Checkbox {...field} className='check-box' color='default' />}
                />
                <Typography component='p'>I Accepted with Terms & Agreements</Typography>
              </label>

              <Typography component='div'>
                <Button variant='contained' type='submit' className='fill-btn'>Register</Button>
              </Typography>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  )
}

export default Register;