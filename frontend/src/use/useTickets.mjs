import { useSessionStorage } from '@vueuse/core'
import { computed } from 'vue'


const id2ticket = useSessionStorage('id2ticket', {})
const ticketsloaded = useSessionStorage('ticket-list-complete', false)


export const allTickets = computed(() => {
   if (ticketsloaded.value) { return Object.values(id2ticket.value)}
   const url = `/api/ticket`
   fetch(url)
      .then((response) => response.json())
      .then((data) => {
         data.forEach(ticket => {
            id2ticket.value[ticket.id] = ticket
         });
         ticketsloaded.value = true
      })
   return [] 
})


export const OneTicket = (ticketId) => {
   if (ticketId in id2ticket.value) {
      return id2ticket.value[ticketId]
   }
}

export const ticketOfId = computed(() => (id) => {
   const ticket = id2ticket.value[id]
   if (ticket) return ticket
   fetch(`/api/ticket/${id}`).then(response => response.json()).then(ticket => {
      id2ticket.value[ticket.id] = ticket
   })
})

export const visibleTickets = computed(() => (filteredPriorities, filteredCategories) => 
   allTickets.value
   .filter(ticket => filteredPriorities.has(ticket.priority))
   .filter(ticket => filteredCategories.has(ticket.category))
)