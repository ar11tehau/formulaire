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