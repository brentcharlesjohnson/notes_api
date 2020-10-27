import express from 'express';
import path from 'path';
import Notes from './routes/api/notes';

const app = express();

// Init Body Parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set API routes
app.use('/api/notes', Notes);

export default app;