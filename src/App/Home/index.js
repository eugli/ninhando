import React, { useState } from 'react';
import { Container, Button, Icon, Grid } from '@mui/material';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import './index.scss';

const colors = [
    "#66ABA5",
    "#E26B5A",
    "#F1B04E",
    "#6d9891",
    "#afac9b",
    "#e1c1a5",
    "#f69f82",
    "#dd826f",
    "#76575d"
];

const gameNames = {
    'Pacman': 'pacman',
    'Space Invaders': 'space-invaders',
    'Tetris': 'tetris'
}

const gridStyle = {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
}

const createCarouselItem = (name) => (
    <div key={name}>
        <img src={`/images/${gameNames[name]}.png`}
             alt={name}
        />
    </div>
);

const carouselItems = <div>{Object.keys(gameNames).map(createCarouselItem)}</div>;

const Home = () => {
    const [game, setGame] = useState(carouselItems.props.children[0].key);

    return (
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: '100%' }}
        >
            <Grid item xs={12} sx={gridStyle}>
                <Carousel
                    infiniteLoop
                    centerMode
                    centerSlidePercentage={25}
                    useKeyboardArrows
                    showStatus={false}
                    height="200px"

                    renderArrowPrev={(onClickHandler, hasPrev, label) =>
                        <Button className="Arrow"
                                onClick={onClickHandler}
                                size="medium"
                                startIcon={
                                    <Icon>
                                        <img alt="Left Arrow" src="/images/left-arrow.png" />
                                    </Icon>
                                }>
                        </Button>
                    }

                    renderArrowNext={(onClickHandler, hasNext, label) =>
                        <Button className="Arrow"
                                onClick={onClickHandler}
                                size="medium"
                                startIcon={
                                    <Icon>
                                        <img alt="Right Arrow" src="/images/right-arrow.png" />
                                    </Icon>
                                }>  
                        </Button>
                    }

                    renderIndicator={(onClickHandler, isSelected, index, label) => {
                        return (isSelected) ? (
                            <li className="Selected"/>
                        ) : (
                            <li className="NotSelected"
                                onClick={onClickHandler}
                                onKeyDown={onClickHandler}
                                value={index}
                                key={index}
                                role="button"
                                tabIndex={0}
                            />
                        );
                    }}

                    onChange={(index, item) => {
                        setGame(item.key.substring(2));
                    }}
                >
                    {carouselItems.props.children}
                </Carousel>
            </Grid>
            <Grid item xs={12} sx={gridStyle}>
                <h2 style={{
                    color: colors[Math.floor(Math.random()*colors.length)]
                }}>
                    {game.toUpperCase()}
                </h2>
            </Grid>
            <Grid item xs={12} sx={gridStyle}>
                <h1>
                    PRESS ENTER
                </h1>
            </Grid>
        </Grid>
    );
}

export default Home;