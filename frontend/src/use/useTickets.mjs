import { useSessionStorage } from '@vueuse/core'
import { computed, ref } from 'vue'
import VueCookies from 'vue-cookies'
import router from "../router"

useSessionStorage("email", "")


const id2ticket = ref({})
const ticketsloaded = ref(false)

export async function login(formData) {
   const url = "/api/auth"
   const response = await fetch(url, {
       method: "POST", // *GET, POST, PUT, DELETE, etc.
       mode: "cors", // no-cors, *cors, same-origin
       cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
       credentials: "same-origin", // include, *same-origin, omit
       headers: {
       "Content-Type": "application/json",
       // 'Content-Type': 'application/x-www-form-urlencoded',
       },
       redirect: "follow", // manual, *follow, error
       referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
       body: JSON.stringify(formData), // le type utilisé pour le corps doit correspondre à l'en-tête "Content-Type"
   });

   if (response.ok) {

      sessionStorage.setItem("email", formData.email)
      router.push("/tickets")
      id2ticket.value = {}
      ticketsloaded.value = false
   } else {
      console.log("not ok")
   }
}  

export const allTickets = computed(() => {
   if (ticketsloaded.value) { return Object.values(id2ticket.value) }
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

export const visibleTickets = computed(() => (filteredPriorities, filteredCategories) => {
   return allTickets.value
   .filter(ticket => filteredPriorities.has(ticket.priority))
   .filter(ticket => filteredCategories.has(ticket.category))
})



export const logout = () => {
   router.push(`/signin`)
   sessionStorage.clear()
   VueCookies.keys().forEach(cookie => VueCookies.remove(cookie)) 
}