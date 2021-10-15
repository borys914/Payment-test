import React, { useContext, useState } from 'react';
import {
  Link,
  useHistory
} from 'react-router-dom';
import notificationImg from '../../assets/icons/notification.svg';
import {
  Container,
  Typography,
  Button,
  Badge
} from '@material-ui/core';
import { useWindowSize } from '../../hooks/useWindowSize'

import dollarImg from '../../assets/icons/dollar.svg';
import boxingImg from '../../assets/icons/boxing.svg';
import searchImg from '../../assets/imgs/search.png';
import logoImg from '../../assets/imgs/logo.png';
import './style.scss';
import { LoginUser } from '../../global/AppContext';

const Header = () => {
  const [loginUser, setLoginUser] = useContext(LoginUser)
  const history = useHistory();
  const windowSize = useWindowSize()
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const auth = loginUser || localStorage.getItem("demboxer", null);
  const user =  {
    photo: 'assets/imgs/user-photo.png',
    metaIndex: '7.00698',
    type: 'ETH'
  }

  /**
   * Go to url by a click
   * @param {String} url
   */
  const linkTo = (url) => {
    setIsMobileMenu(false);
    history.push(url);
  }

  return (
    <div className='header'>
      <Container className='container'>
        <Typography component='div' className='header-content'>
          <Typography
            component='div'
            className='mobile-menu-icon'
            onClick={() => setIsMobileMenu(true)}
          >
            <MenuIcon />
          </Typography>
          <Typography component='div' className='logo-section'>
            <Typography component='div' className='logo-icon-list' onClick={() => linkTo('/')}>
              <img src={dollarImg} aria-hidden alt='dollar image' />
              <img src={boxingImg} aria-hidden alt='boxing image' />
            </Typography>
            <Typography
              component='div'
              className='header-logo'
              onClick={() => linkTo('/')}
              style={{ backgroundImage: `url(${logoImg})` }}
            />
            <Typography component='div' className='divider' />
          </Typography>
          <Typography component='div' className='menu-list'>
            <Link to='/' className={window.location.pathname === '/' ? 'active' : 'item'}>Discover</Link>
            <Link to='/how-it-work' className={window.location.pathname === '/about' ? 'active' : 'item'}>How it work</Link>
          </Typography>
          <Typography component='div' className='action-section'>
            {
              windowSize.width > 576 && (
                <Typography component='div' className='search-block'>
                  <input type='text' placeholder='Search' className='custom-input' />
                  <img src={searchImg} aria-hidden alt='search image' />
                </Typography>
              )
            }
            <Badge badgeContent=' ' className='bage'>
              <img src={notificationImg} aria-hidden alt='notification-image' />
            </Badge>
            {
              auth ? (
                <Typography component='div' className='user-profile'>
                  <Typography component='div' className='photo' style={{ backgroundImage: `url(${user?.photo})` }} />
                  <Typography className='meta-index'>{user?.metaIndex} <Typography component='span' className='type'>{user?.type}</Typography></Typography>
                </Typography>
              ) : (
                <>
                  <Button variant='contained' className='fill-btn login' onClick={() => linkTo('login')}>Login</Button>
                  <Button variant='contained' className='white-btn register' onClick={() => linkTo('register')}>Register</Button>
                </>
              )
            }

          </Typography>
        </Typography>
        {
          windowSize.width < 576 && (
            <Typography component='div' className='search-block mobile-search-block'>
              <input type='text' placeholder='Search' className='custom-input' />
              <img src={searchImg} aria-hidden alt='search image' />
            </Typography>
          )
        }

        {/* MOBILE MENU */}
        <Typography
          component='div'
          className='mobile-menu'
          style={{ width: isMobileMenu && '75%' }}
        >
          <Typography component='div'>
            <Typography component='div' className='logo-icon-list' onClick={() => linkTo('/')}>
              <img src={dollarImg} aria-hidden alt='dollar image' />
              <img src={boxingImg} aria-hidden alt='boxing image' />
            </Typography>
            <Typography component='div' className='mobile-menu-list'>
              <Typography component='div' onClick={() => linkTo('/')}>Discover</Typography>
              <Typography component='div' onClick={() => linkTo('how-it-work')}>How it work</Typography>
            </Typography>
          </Typography>
        </Typography>
        {/* MOBILE MENU END */}

        {
          isMobileMenu &&
          <Typography
            component='div'
            className='overlay'
            onClick={() => setIsMobileMenu(false)}
          />
        }
      </Container >
    </div >
  )
}

const MenuIcon = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' fill='white' className='bi bi-list' viewBox='0 0 16 16'>
      <path fillRule='evenodd' d='M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z' />
    </svg>
  )
}

export default Header;