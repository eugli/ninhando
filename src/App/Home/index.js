import React, { useState } from 'react';
import { Button, Icon, Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
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
    'Donkey Kong': 'donkey-kong'
}

const gridStyle = {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
}

const Home = () => {
    const [game, setGame] = useState();
    const [index, setIndex] = useState(1);

    const navigate = useNavigate();
    const routeGame = (game) => navigate(`/game?rom=${game.toString()}`);
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            routeGame(game);
        }
    }

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

    return (
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          onKeyPress={handleKeyPress}
          sx={{ minHeight: '100%' }}
        >
            <Grid item xs={12} sx={gridStyle}>
                <Carousel
                    infiniteLoop
                    centerMode
                    centerSlidePercentage={30}
                    useKeyboardArrows
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
            <Stack mt={-8} spacing={2}>
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
                </div>
            </Stack>
        </Grid>
    );
}

export default Home;