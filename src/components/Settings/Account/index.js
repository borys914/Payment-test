import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Button
} from '@material-ui/core';
import { useForm } from "react-hook-form";
import placeholder from '../../../assets/imgs/placeholder.png';
import './style.scss';

const Account = () => {
  const [formState, setFormState] = useState({ loading: false, changes: {}, result: { error: false } });
  const [emailState, setEmailState] = useState({ loading: false, email: '', error: false });
  const [passwordState, setPasswordState] = useState({ changes: {}, error: false, alert: '' });
  const formMethods = useForm();
  const emailForm = useForm();

  const profileSubmit = () => {
    console.log(formState);
  }; // your form submit function which will invoke after successful validation

  const emailSubmit = () => {
    console.log(emailState);
  }

  const passwordUpdate = () => {
    if (passwordState.changes?.new &&
      passwordState.changes?.confirm &&
      passwordState.changes?.new === passwordState.changes.confirm
      ) {
        console.log('success');
        setPasswordState({...passwordState, error: false})
      } else {
        setPasswordState({...passwordState, error: true, alert: 'Password must be match'})
      }
  }

  const handlePasswordChange = (e) => {
    setPasswordState({...passwordState, changes: {...passwordState.changes, [e.target.name]: e.target.value}})
  }

  /**
   * Edit rofile values
   * @param {Event} e 
   * @param {Boolean} isImg 
  */
  const handleProfileChange = (e, isImg) => {
    let currentChanges = {};
    if (!isImg) {
      currentChanges = {
        ...currentChanges,
        [e.target.name]: e.target.value
      }
    } else if (isImg && e.target.files[0]) {
      currentChanges = {
        ...currentChanges,
        photo: URL.createObjectURL(e.target.files[0])
      }
    }
    setFormState({
      ...formState,
      changes: { ...formState.changes, ...currentChanges }
    })
  }

  const handleEmailChange = (evt) => {
    setEmailState({ ...emailState, email: evt.target.value });
  }
  return (
    <Typography component='div' className='settings-account'>
      <Typography component='h2' className='title'>Account Settings</Typography>
      <Typography className='description'>Here you can change the email adress you use on DemBoxer and your password</Typography>

      {/* EMAIL CHANGE */}
      <form onSubmit={emailForm.handleSubmit(emailSubmit)}>
        <Grid container spacing={3} className='email-setting'>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
          >
            <Typography component='div' className='form-control'>
              <label>your email</label>
              <input
                type='email'
                name='email'
                defaultValue={
                  emailState?.email
                }
                {...emailForm.register("email", { required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                autoComplete='off'
                onChange={handleEmailChange}
              />
              {emailForm.formState.errors?.email?.type === "required" && <p>This field is required</p>}
              {emailForm.formState.errors?.email?.type === "pattern" && <p>Enter correct email format</p>}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
          >
            <Button variant='contained' type='submit' className='fill-btn'>Change</Button>
          </Grid>
        </Grid>
      </form>

      {/* EMAIL CHNANGE END */}

      {/* PASSWORD UPDATE */}
      <Grid container spacing={3} className='password-setting'>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
        >
          <Typography component='div' className='form-control'>
            <label>Old Password</label>
            <input
              type='password'
              name='old'
              onChange={handlePasswordChange}
            />
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
        >
          <Typography component='div' className='form-control'>
            <label>New password</label>
            <input
              type='password'
              name='new'
              onChange={handlePasswordChange}
            />
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
        >
          <Typography component='div' className='form-control'>
            <label>Confirm New Password</label>
            <input
              type='password'
              name='confirm'
              onChange={handlePasswordChange}
            />
            {passwordState.error && <p>{passwordState.alert}</p>}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          md={3}
        >
          <Button variant='contained' className='fill-btn' onClick={passwordUpdate}>Update</Button>
        </Grid>
      </Grid>
      {/* PASSWORD UPDATE END */}

      <Typography component='h2' className='title'>Profile Settings</Typography>
      <Typography className='description'>Here you can change your profile information</Typography>

      {/* PROFILE SETTING */}
      <form onSubmit={formMethods.handleSubmit(profileSubmit)} className='profile-setting'>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
          >
            <Typography component='div' className='form-control'>
              <label>your name (First / Middle / Last)</label>
              <input
                type='text'
                name='name'
                defaultValue={
                  formState?.changes?.name || ''
                }
                {...formMethods.register("name", { required: true })}
                onChange={handleProfileChange}
                autoComplete='off'
              />
              {formMethods.formState.errors?.name?.type === "required" && <p>This field is required</p>}
            </Typography>
            <Typography component='div' className='form-control'>
              <label>Date of Birth</label>
              <input
                type='text'
                name='birth'
                defaultValue={
                  formState?.changes?.birth || ''
                }
                {...formMethods.register("birth", { required: true })}
                onChange={handleProfileChange}
                autoComplete='off'
              />
              {formMethods.formState.errors?.birth?.type === "required" && <p>This field is required</p>}
            </Typography>
            <Typography component='div' className='form-control'>
              <label>Mobile Number</label>
              <input
                type='text'
                name='mobile'
                defaultValue={
                  formState?.changes?.mobile || ''
                }
                {...formMethods.register("mobile", { required: true, minLength: 6 })}
                onChange={handleProfileChange}
                autoComplete='off'
              />
              {formMethods.formState.errors?.mobile?.type === "required" && <p>This field is required</p>}
              {formMethods.formState.errors?.mobile?.type === "minLength" && (
                <p>Mobile number has to be at least 6 characters</p>
              )}
            </Typography>
            <Typography component='div' className='form-control'>
              <label>Confirm Email ID</label>
              <input
                type='text'
                name='emailId'
                defaultValue={
                  formState?.changes?.emailId || ''
                }
                {...formMethods.register("emailId", { required: true })}
                onChange={handleProfileChange}
                autoComplete='off'
              />
              {formMethods.formState.errors?.emailId?.type === "required" && <p>This field is required</p>}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
          >
            <label className='photo'>
              <input
                type='file'
                accept="image/*"
                defaultValue={
                  formState?.changes?.photo || ''
                }
                {...formMethods.register("photo", { required: true })}
                onChange={(evt) => handleProfileChange(evt, true)}
              />
              {
                formState?.changes.photo
                  ? <Typography component='div' className='profile-img' style={{ backgroundImage: `url(${formState?.changes?.photo})` }} />
                  : <Typography component='div' className='default-img'>
                    <img src={placeholder} alt='placeholder' loading='lazy' />
                    {formMethods.formState.errors?.photo?.type === "required" && <p>This field is required</p>}
                  </Typography>
              }
            </label>
          </Grid>
        </Grid>
        <Button variant='contained' type='submit' className='fill-btn'>Update</Button>
      </form>

      {/* PROFILE SETTING END */}
    </Typography>
  )
}

export default Account;