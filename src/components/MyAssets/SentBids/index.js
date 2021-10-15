import React, { useEffect, useState } from 'react';
import {
  Typography,
  Link,
  Button,
  Dialog
} from '@material-ui/core';
import tableOrderIcon from '../../../assets/icons/tableOrder.svg';
import filterImage from '../../../assets/icons/filter.svg';
import { sentBidsData } from '../../../dumy/data';
import FilterPopUp from '../../ExploreNFTs/FilterPopUp';
import './style.scss';

const SentBids = () => {
  const [data, setData] = useState([]);
  const [titleSortUp, setTitleSortUp] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setData(sentBidsData);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  /** status data **/
  const statusData = [
    { text: 'Successful Transaction', color: '#2FD400' },
    { text: 'Failed Transaction', color: '#7A0707' },
    { text: 'Failed bids', color: '#E02020' }
  ]

  const titleSort = () => {
    let sortData = [];
    if (titleSortUp) sortData = data.slice().sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1);
    else sortData = data.slice().sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1);
    setData(sortData);
    setTitleSortUp(!titleSortUp);
  }

  return (
    <Typography component='div' className='sent-bids'>
      <Button className='filter-btn-section' onClick={handleOpen}>
        <img src={filterImage} alt='filter' />
        <Typography component='span'>Filter</Typography>
      </Button>
      <Typography component='div'>
        <Typography component='div'>

          {/* TABLE HEADER */}
          <Typography component='div' className='table-header-section table-row'>
            <Typography component='div' className='identity'>
              <Typography component='span'>#</Typography>
            </Typography>
            <Typography component='div' className='transaction' onClick={titleSort}>
              <Typography component='span'>Transactions Title</Typography>
              <img src={tableOrderIcon} alt='tableOrder' />
            </Typography>
            <Typography component='div' className='last-bid-price'>
              <Typography component='span'>Last Bid Price (USD):</Typography>
            </Typography>
            <Typography component='div' className='etherscan-hyperlink'>
              <Typography component='span'>Etherscan Hyperlink</Typography>
            </Typography>
            <Typography component='div' className='status'>
              <Typography component='span'>Status</Typography>
            </Typography>
          </Typography>
          {/* TABLE HEADER END */}

          {/* TABLE BODY */}
          {
            data && data.length > 0 && data.map((item, i) => (
              <Typography component='div' className='table-body-section table-row' key={i}>
                <Typography component='div' className='identity'>
                  <Typography component='span'>{item.identity}</Typography>
                </Typography>
                <Typography component='div' className='transaction'>
                  <Typography component='span'>{item.title}</Typography>
                </Typography>
                <Typography component='div' className='last-bid-price'>
                  <Typography component='span'>${item.price}</Typography>
                </Typography>
                <Typography component='div' className='etherscan-hyperlink'>
                  <Link href={item.link} target='_blank'>{item.link}</Link>
                </Typography>
                <Typography component='div' className='status'>
                  <Typography component='div' className='status-color-block' style={{ background: statusData[item.status].color }} />
                  <Typography component='span'>{statusData[item.status].text}</Typography>
                </Typography>
              </Typography>
            ))
          }
          {/* TABLE BODY END */}
        </Typography>
      </Typography>

      {/* FILTER POPUP */}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className='customize-popup'
      >
        <FilterPopUp
          handleClose={handleClose}
        />
      </Dialog>
      {/* FILTER POPUP END */}

    </Typography>
  )
}

export default SentBids;