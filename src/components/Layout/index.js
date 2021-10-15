import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { PageTitle } from '../../global/AppContext';
import {
  Typography,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse
} from '@material-ui/core';

import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded';
import homeIcon from '../../assets/icons/house.svg';
import pinIcon from '../../assets/icons/pin.svg';
import myAssetsIcon from '../../assets/icons/shortcut-script-app.svg';
import transactionIcon from '../../assets/icons/bank.svg';
import settingsIcon from '../../assets/icons/settings.svg';
import developerIcon from '../../assets/icons/edition.svg';

import './style.scss';

export default function ErrorBoundary(props) {
  const [open, setOpen] = React.useState(false);
  const [pageTitle, setPageTItle] = useContext(PageTitle)
  const auth = localStorage.getItem("demboxer", null);
  const history = useHistory();
  const { children, title } = props;

  useEffect(() => {
    setPageTItle(title);
  }, [title])

  /**
   * Go to url by a click
   * @param {String} url
   */
  const linkTo = (url) => {
    history.push(url);
  }

  const handleClick = () => {
    setOpen(!open);
  };

  if (!auth) history.push("/");

  return (
    <Typography component='div' className='layout'>
      <Container>
        <Typography component='div' className='layout-header'>
          <Typography component='span'>CREATE, explore & collect digital art nfts.</Typography>
          <Typography variant='h1' component='h2' className='title'>{pageTitle}</Typography>
          <Typography component='p'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</Typography>
        </Typography>
        <Grid container spacing={3} className='router-content-section'>
          <Grid
            item
            xs={12}
            sm={3}
            md={3}
          >
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              className='router-list'
            >
              <ListItem
                button
                className={window.location.pathname === '/' ? 'active' : 'item'}
                onClick={() => linkTo('/')}
              >
                <ListItemIcon>
                  <img src={homeIcon} alt='home' />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem
                button
                className={window.location.pathname === '/explore-NFTs' ? 'active' : 'item'}
                onClick={() => linkTo('/explore-NFTs')}
              >
                <ListItemIcon>
                  <img src={pinIcon} alt='explore' />
                </ListItemIcon>
                <ListItemText primary="Explore NFT’s" />
              </ListItem>
              <ListItem
                button
                className={window.location.pathname === '/my-assets' ? 'active' : 'item'}
                onClick={() => linkTo('/my-assets')}
              >
                <ListItemIcon>
                  <img src={myAssetsIcon} alt='myAssets' />
                </ListItemIcon>
                <ListItemText primary="My Assets" />
              </ListItem>
              <ListItem
                button
                className={window.location.pathname === '/transaction' ? 'active' : 'item'}
                onClick={() => linkTo('/transaction')}
              >
                <ListItemIcon>
                  <img src={transactionIcon} alt='transaction' />
                </ListItemIcon>
                <ListItemText primary="Transactions" />
              </ListItem>
              <ListItem
                button
                onClick={handleClick}
                className={(window.location.pathname === '/settings-account' || window.location.pathname === '/payment-method') ? 'active' : 'item'}
              >
                <ListItemIcon>
                  <img src={settingsIcon} alt='settings' />
                </ListItemIcon>
                <ListItemText primary="Settings" />
                {open ? <ArrowDropUpRoundedIcon fontSize='large' /> : <ArrowDropDownRoundedIcon fontSize='large' />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button>
                    <ListItemIcon>
                    </ListItemIcon>
                    <ListItemText
                      primary="Account"
                      className={window.location.pathname === '/settings-account' ? 'active' : 'item'}
                      onClick={() => linkTo('/settings-account')}
                    />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                    </ListItemIcon>
                    <ListItemText
                      primary="Bank and Cards"
                      className={window.location.pathname === '/payment-method' ? 'active' : 'item'}
                      onClick={() => linkTo('/payment-method')}
                    />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                    </ListItemIcon>
                    <ListItemText primary="Support" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                    </ListItemIcon>
                    <ListItemText primary="More" />
                  </ListItem>
                </List>
              </Collapse>
              <ListItem button>
                <ListItemIcon>
                  <img src={developerIcon} alt='developer' />
                </ListItemIcon>
                <ListItemText primary="Developers" />
              </ListItem>
            </List>
          </Grid>
          <Grid
            item
            xs={12}
            sm={9}
            md={9}
          >
            {children}
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}