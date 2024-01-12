import express from 'express'
import { PrismaClient } from '@prisma/client'

const PORT = 3800

const app = express()

const prisma = new PrismaClient()

app.use(express.static('public'));

//app.use(cors())

// Set EJS as templating engine
app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"))

app.get('/api/ticket', async (req, res) => {
    const tickets = await prisma.ticket.findMany()
    res.send(tickets)
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