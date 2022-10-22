import React from "react";

const config = {
    ROMS: {
        tetris: {
            name: "Tetris",
            description: (
                <span>The classic puzzler</span>
            ),
            url: "http://localhost:3000/roms/tetris/tetris.nes"
        },
    },
    GOOGLE_ANALYTICS_CODE: process.env.REACT_APP_GOOGLE_ANALYTICS_CODE,
    SENTRY_URI: process.env.REACT_APP_SENTRY_URI
};

export default config;
