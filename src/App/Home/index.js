
import React from 'react';
import { Box } from '@mui/material';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import './index.scss';

const Home = () => {
    return (
        <div>
            <Box className="Carousel" sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Carousel>
                    <div>
                        <img src="/images/pacman.png"
                             alt="pacman"
                        />
                        <p className="legend">Pacman</p>
                    </div>
                    <div>
                        <img src="/images/space-invaders.png"
                             alt="space-invaders"/>
                        <p className="legend">Space Invaders</p>
                    </div>
                    <div>
                        <img src="/images/tetris.png"
                             alt="tetris"/>
                        <p className="legend">Tetris</p>
                    </div>
                </Carousel>
            </Box>
        </div>
    );
}

export default Home;