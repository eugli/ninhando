import React from 'react';
import { Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import CodeIcon from '@mui/icons-material/Code';
import './index.scss';

const Header = () => {
  return (
    <div>
      <div className="PhantomHeader"/>
      <header className="Header">
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: '100%' }}
        >
          <Grid container align="center" xs={6} sx={{
            padding: '0 1rem'
          }}>
            <Grid item>
              <h1>UNTITLED</h1>
            </Grid>
          </Grid>

          <Grid container xs={6} sx={{
            justifyContent: 'flex-end',
            padding: '0 1rem'
          }}>
            <Grid item>
              <IconButton>
                <InfoIcon sx={{ color: '#76575d' }}/>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <CodeIcon sx={{ color: '#76575d' }} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default Header;