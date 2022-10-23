import React from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import CodeIcon from '@mui/icons-material/Code';
import './index.scss';

const Header = () => {
  const navigate = useNavigate(); 
  const returnHome = () =>{ 
    navigate("/");
  }

  return (
    <div>
      <div className="PhantomHeader"/>
      <div className="Header">
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: '100%' }}
        >
          <Grid item xs={6} sx={{
            padding: '0 1rem'
          }}>
            <Grid item>
              <h1 onClick={returnHome}>UNTITLED</h1>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container sx={{
              justifyContent: 'flex-end',
              padding: '0 1rem',
            }}>
              <Grid item>
                <IconButton>
                  <InfoIcon sx={{ color: "#76575d" }}/>
                </IconButton>
              </Grid>
              <Grid item>
                <a href="https://github.com/HackGT9/untitled"
                        target="_blank"
                        rel="noreferrer">
                  <IconButton>
                      <CodeIcon sx={{ color: "#76575d" }} />
                  </IconButton>
                </a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Header;