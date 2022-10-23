import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import Detection from '../Game/Detection';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
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
    'Tetris': 'tetris',
    'Donkey Kong': 'donkey-kong',
    'Asteroids': 'asteroids'
}

const numGames = Object.keys(gameNames).length;

const gridStyle = {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
}

const Home = () => {
    const [game, setGame] = useState();
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    const handleKeyPress = useCallback((e) => {
        const routeGame = (game) => navigate(`/game?rom=${game.toString()}`);

        if (e.key === "Enter") {
            routeGame(game);
        } else if (e.keyCode === 37) { // Left Arrow
            if (index - 1 < 0) setIndex(numGames - 1);
            setIndex(index - 1);
        } else if (e.keyCode === 39) { // Right Arrow
            if (index + 1 >= numGames) setIndex(0);
            setIndex(index + 1);
        }
    }, [game, index, navigate]);

    const createCarouselItems = () => {
        let items = Object.keys(gameNames).map((name) => {
            return <div className="CarouselItem NoSelect" key={name}>
                <img src={`/images/${gameNames[name]}.png`}
                    alt={name}
                />
            </div>
        });
        if (!game) setGame(items[index].key);

        return items;
    };

    const handleKeyEvent = ((gesture) => {
        console.log(gesture);
    });

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress); 

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [index, handleKeyPress]);

    return (
        <>
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
                        centerSlidePercentage={27}
                        showStatus={false}
                        showThumbs={false}
                        showArrows={false}
                        selectedItem={index}

                        // renderArrowPrev={(onClickHandler, hasPrev, label) =>
                        //     <Button 
                        //             disableRipple
                        //             variant="text"
                        //             onClick={onClickHandler}
                        //             startIcon={
                        //                 <Icon className="Icon">
                        //                     <img alt="Left Arrow" src="/images/left-arrow.png" />
                        //                 </Icon>
                        //             }
                        //             style={{ backgroundColor: 'transparent' }}
                        //             className="Arrow Left"
                        //     >
                        //     </Button>
                        // }

                        // renderArrowNext={(onClickHandler, hasNext, label) =>
                        //     <Button 
                        //             disableRipple
                        //             variant="text"
                        //             onClick={onClickHandler}
                        //             startIcon={
                        //                 <Icon className="Icon">
                        //                     <img alt="Right Arrow" src="/images/right-arrow.png" />
                        //                 </Icon>
                        //             }
                        //             style={{ backgroundColor: 'transparent' }}
                        //             className="Arrow Right"
                        //     >
                        //     </Button>
                        // }

                        renderIndicator={(onClickHandler, isSelected, index, label) => {
                            return (isSelected) ? (
                                <li className="SelectedDot"/>
                            ) : (
                                <li className="UnselectedDot"
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
                            setIndex(index);
                        }}

                        onClickItem={(index, item) => {
                            setGame(item.key);
                            setIndex(index);
                        }}
                    >
                        {createCarouselItems()}
                    </Carousel>
                </Grid>
                <Stack spacing={2}>
                    <div className="Item">
                        <h1 className="GameText" style={{
                            color: colors[Math.floor(Math.random()*colors.length)],
                            fontSize: "1.5em"
                        }}>
                            {game && game.toUpperCase()}
                        </h1>
                    </div>
                    <div className="Item">
                        <h1 className="Enter">
                            PRESS ENTER
                        </h1>
                        <h1>
                            THUMBS UP
                        </h1>
                    </div>
                </Stack>
            </Grid>
            <Detection
                className="Detection"
                hidden={true}
                keyEvent={handleKeyEvent}/>    
        </>
    );
}

export default Home;