import { ref, computed } from 'vue'

const id2ticket = ref({})

const ticketsloaded = ref(false)

export const allTickets = computed(() => {
   if (ticketsloaded.value) { return Object.values(id2ticket.value)}
   const url = `/api/ticket`
   fetch(url)
      .then((response) => response.json())
      .then((data) => {
         data.forEach(ticket => {
            id2ticket.value[ticket.id] = ticket
            console.log(id2ticket.value[ticket.id])
         });
         ticketsloaded.value = true
      })
   return [] 
})

export async function getAllTicket() {
   const ticketList = ref([])
   const url = `/api/ticket`
   const response = await fetch(url)
   ticketList.value = await response.json()
   
   ticketList.value.forEach(ticket => {
      id2ticket[ticket.id] = ticket
   });
   return ticketList.value
}

export async function asyncTickets(ticketId)
{
   const ticket = ref({})
   if (ticketId in id2ticket.value) {
      console.log("no updates")
      return id2ticket.value[ticketId]
   }
   else {
      const url = `/api/ticket/${ticketId}`
      const response = await fetch(url)
      ticket.value = await response.json()
      id2ticket.value[ticketId] = ticket.value
      return ticket.value
   }
}