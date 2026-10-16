import express from 'express';
import { rooms } from '../data/rooms.js';
import { localAttractions } from '../data/attractions.js';
import { createReadStream } from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Helper to filter rooms by search params
const filterRooms = (checkIn, checkOut, guests, roomList = rooms) => {
  let filtered = [...roomList];
  if (guests) {
    filtered = filtered.filter(r => r.capacity >= parseInt(guests));
  }
  return filtered;
};

// HOME
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
    rooms: rooms,
    dealOfTheDay: rooms[0],
  });
});

// POST /search - Filter and show rooms (form submit)
router.post('/search', (req, res) => {
  const { checkIn, checkOut, guests } = req.body;
  const filtered = filterRooms(checkIn, checkOut, guests);
  const categories = ['suites', 'deluxe', 'penthouse'];
  res.render('rooms', {
    title: 'Search Results',
    rooms: filtered,
    activeCategory: 'all',
    categories,
    searchParams: { checkIn, checkOut, guests },
  });
});

// ROOMS with category tabs
router.get('/rooms', (req, res) => {
  const { category } = req.query;
  const categories = ['suites', 'deluxe', 'penthouse'];
  const activeCategory = category && categories.includes(category) ? category : 'all';
  
  const filteredRooms = activeCategory === 'all' 
    ? rooms 
    : rooms.filter(r => r.category === activeCategory);

  res.render('rooms', {
    title: 'Rooms',
    rooms: filteredRooms,
    activeCategory,
    categories,
  });
});

// ROOM DETAILS
router.get('/room-details/:id', (req, res) => {
  const room = rooms.find(r => r.id === parseInt(req.params.id));
  if (!room) return res.redirect('/rooms');
  
  res.render('room-details', {
    title: room.title,
    room,
    attractions: localAttractions,
  });
});

// ABOUT
router.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});

// CONTACT
router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact', sent: req.query.sent === '1' });
});

// BOOKING SUMMARY
router.get('/booking-summary', (req, res) => {
  const { roomId, checkIn, checkOut, guests } = req.query;
  const room = rooms.find(r => r.id === parseInt(roomId)) || rooms[0];
  const nights = checkIn && checkOut ? Math.max(1, Math.ceil((new Date(checkOut) - new Date(checkIn)) / 86400000)) : 1;
  const total = room.price * nights;
  res.render('booking-summary', {
    title: 'Booking Summary',
    room,
    checkIn: checkIn || '',
    checkOut: checkOut || '',
    guests: guests || 1,
    nights,
    total,
  });
});

// PROFILE
router.get('/profile', (req, res) => {
  res.render('profile', { title: 'My Profile' });
});

// POST CONTACT
router.post('/contact', (req, res) => {
  // In production: save to DB, send email
  res.redirect('/contact?sent=1');
});

export default router;
