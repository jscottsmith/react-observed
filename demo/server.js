import path from 'path';
import fs from 'fs';
import express from 'express';

import React from 'react';
import ReactServer from 'react-dom/server';
import { App } from 'components';

import 'babel-polyfill';

const server = express();

const dist = path.resolve(__dirname, '../dist');

server.use('/static', express.static(dist));

server.get('/', (req, res) => {
    const html = fs
        .readFileSync(path.resolve(__dirname, './index.html'))
        .toString();

    const markup = ReactServer.renderToString(<App />);

    const htmlDoc = html.replace('%%_REACT_%%', markup);

    res.send(htmlDoc);
});

server.listen(3000, () => {
    console.log('Listening on: http://localhost:3000');
});
