import { Box } from '@mui/material';
import './index.scss';
import React from 'react';

const Footer = () => {
  return (
    <div>
      <div className="PhantomFooter"/>
      <div className="Footer">
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
            Made with <span className="Heart">❤</span> at HackGT 9
        </Box>
      </div>
    </div>
  );
}

export default Footer;