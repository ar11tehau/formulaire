import express from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import cookieParser from "cookie-parser"

import bearerToken from 'express-bearer-token'

const secret = "ihdeqhoigbpouztjg"

const PORT = 3800

const app = express()

app.use(cookieParser())
app.use(bearerToken({ signed: false,
cookie:true, }))

const prisma = new PrismaClient()

app.use(express.static('public'));

const authUSer = [
   { email: 'admin@mail.fr', admin: true, password: '$2a$04$RH4IBNljbLWkcOWRGJEhMeva.fKM5Mb8r22yDsjv5RD1LZy9rB9n.' },
   { email: 'test@test.fr', admin: false, password: '$2a$10$OYc21BucOwJXpQ4gGYtkk.j.BRhFOEZ.4aFobQUxUEqVyfo85tKoi' },
   { email: 'toto@toto.fr', admin: false, password: '$2a$10$2iZK13ORIJmrRszXiOCjXeoNkyR3DAxLynyzvwwl7AcE0IPfB5KVa' },
]
// Set EJS as templating engine
app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"))

app.post("/api/auth", async (req, res) => {
   const email = req.body.email
   const pwd = req.body.password
   const currentUser = authUSer.find(users => users.email === email)
   const pwdAuth = await bcrypt.compare(pwd, currentUser.password)

   if (currentUser && pwdAuth) {
      let token
      if (currentUser.admin) {
         token = jwt.sign({ readList:'all', readTicket:'all', writeTicket:'all' }, secret)
      } 
      else {
         token = jwt.sign({ readList:currentUser.email, readTicket:currentUser.email, writeTicket:'none' }, secret)
      }
      res.status(200)
      res.cookie("access_token", token)
      res.send()
   }
   else {
      res.status(403)
   }
})

app.get('/api/ticket', async (req, res) => {
   const token = req.cookies.access_token
   
   try {
      const payload = jwt.verify(token, secret)
      if (payload.readList === 'all') {
         const tickets = await prisma.ticket.findMany()
         res.send(tickets)
      }
      else {
         const email = payload.readList
         const tickets = await prisma.ticket.findMany({
            where: {
               email
            }
         })
         res.send(tickets)
      }
   } catch(err) {
      console.log("signature invalide", err)
   }
});

app.post("/api/ticket", async function(req, res) {
   const body = req.body
   const ticket = await prisma.ticket.create({
      data: {
         email: body.email,
         category: body.category,
         description: body.description,
         priority: body.priority,
      },
   })
   res.send(ticket)
})

app.get("/api/ticket/:id", async function(req, res) {
   const id = parseInt(req.params.id)
   const ticket = await prisma.ticket.findUnique({
      where: {
         id,
      },
   })
   res.send(ticket)
})

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))