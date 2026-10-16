import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import webRoutes from './routes/web.routes.js';
import apiRoutes from './routes/api.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', webRoutes);
app.use('/api', apiRoutes);

// 404
app.use((req, res) => res.status(404).render('404'));

app.listen(PORT, () => {
  console.log(`🚀 Hotel Booking EJS server running at http://localhost:${PORT}`);
});
