// Importing necessary modules
import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cookieParser from "cookie-parser";
import bearerToken from 'express-bearer-token';

// Secret key for JWT token
const secret = "ihdeqhoigbpouztjg";

// Port for the server
const PORT = 3800;

// Initializing express app
const app = express();

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware for parsing bearer token from headers
app.use(bearerToken({ signed: false, cookie: true }));

// Initializing Prisma client
const prisma = new PrismaClient();

// Array containing dummy user data for authentication
const authUser = [
   { email: 'admin@mail.fr', admin: true, password: '$2a$04$RH4IBNljbLWkcOWRGJEhMeva.fKM5Mb8r22yDsjv5RD1LZy9rB9n.' },
   { email: 'test@test.fr', admin: false, password: '$2a$10$OYc21BucOwJXpQ4gGYtkk.j.BRhFOEZ.4aFobQUxUEqVyfo85tKoi' },
   { email: 'toto@toto.fr', admin: false, password: '$2a$10$2iZK13ORIJmrRszXiOCjXeoNkyR3DAxLynyzvwwl7AcE0IPfB5KVa' },
];

// Setting EJS as templating engine
app.set('view engine', 'ejs');

// Middleware for parsing JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serving static files from the 'public' directory
app.use(express.static("public"));

// Endpoint for user authentication
app.post("/api/auth", async (req, res) => {
   const email = req.body.email;
   const pwd = req.body.password;
   const currentUser = authUser.find(users => users.email === email);
   const pwdAuth = await bcrypt.compare(pwd, currentUser.password);

   if (currentUser && pwdAuth) {
      let token;
      if (currentUser.admin) {
         // Creating JWT token for admin user
         token = jwt.sign({ readList:'all', readTicket:'all', writeTicket:'all' }, secret);
      } else {
         // Creating JWT token for non-admin user
         token = jwt.sign({ readList:currentUser.email, readTicket:currentUser.email, writeTicket:'none' }, secret);
      }
      // Setting JWT token as a cookie in the response
      res.status(200);
      res.cookie("access_token", token);
      res.send();
   } else {
      // Invalid credentials
      res.status(403);
   }
});

// Endpoint for retrieving tickets
app.get('/api/ticket', async (req, res) => {
   const token = req.cookies.access_token;
   try {
      const payload = jwt.verify(token, secret);
      if (payload.readList === 'all') {
         // Retrieving all tickets for admin user
         const tickets = await prisma.ticket.findMany();
         res.send(tickets);
      } else {
         // Retrieving tickets for non-admin user based on email
         const email = payload.readList;
         const tickets = await prisma.ticket.findMany({
            where: {
               email
            }
         });
         res.send(tickets);
      }
   } catch(err) {
      console.log("Invalid signature", err);
   }
});

// Endpoint for creating a new ticket
app.post("/api/ticket", async function(req, res) {
   const body = req.body;
   // Creating a new ticket in the database
   const ticket = await prisma.ticket.create({
      data: {
         email: body.email,
         category: body.category,
         description: body.description,
         priority: body.priority,
      },
   });
   res.send(ticket);
});

// Endpoint for retrieving a specific ticket by ID
app.get("/api/ticket/:id", async function(req, res) {
   const id = parseInt(req.params.id);
   // Retrieving a specific ticket by ID
   const ticket = await prisma.ticket.findUnique({
      where: {
         id,
      },
   });
   res.send(ticket);
});

// Starting the server
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));
