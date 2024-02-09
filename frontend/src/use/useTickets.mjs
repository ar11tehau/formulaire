// Importing necessary modules
import { useSessionStorage } from '@vueuse/core';
import { computed, ref } from 'vue';
import VueCookies from 'vue-cookies';
import router from "../router";

export const isAuthenticated = ref(false)

// Reference variables for storing ticket data
const id2ticket = ref({});
const ticketsloaded = ref(false);

// Initializing session storage for email and all tickets
useSessionStorage("email", "");
useSessionStorage("alltickets", id2ticket);

// User Authentication Functions
//--------------------------------

// Function to handle user login
export async function login(formData) {
   const url = "/api/auth";
   const response = await fetch(url, {
       method: "POST",
       headers: {
       "Content-Type": "application/json",
       },
       body: JSON.stringify(formData),
   });

   if (response.ok) {
      // If login successful, retrieve tickets and store email in session storage
      getTickets();
      sessionStorage.setItem("email", formData.email);
      isAuthenticated.value = true
   } else {
      console.log("Login unsuccessful", response);
   }
}

// Function to handle user logout
export const logout = () => {
   // Redirect to sign-in page and clear session storage and cookies
   router.push(`/signin`);
   isAuthenticated.value = false
   sessionStorage.setItem("email", "");
   sessionStorage.setItem("alltickets", "[]");
   ticketsloaded.value = false;
   VueCookies.keys().forEach(cookie => VueCookies.remove(cookie));
}

// Ticket Management Functions
//----------------------------

// Function to retrieve tickets
export async function getTickets() {
   const url = '/api/ticket';
   const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
   });
   if (response.ok) {
      // If successful, parse ticket data and update loaded status
      const data = await response.json();
      id2ticket.value = {};
      data.forEach(ticket => {
         id2ticket.value[ticket.id] = ticket;
      });
      ticketsloaded.value = true;
      router.push("/tickets");
   } else {
      console.log("Failed to fetch tickets");
   }
}

// Function to create a new ticket
export async function createTicket(formData) {
   const url = "/api/ticket";
   const response = await fetch(url, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
   });

   if (response.ok) {
      // If successful, add created ticket to the list and redirect to ticket recap
      const createdTicket = await response.json();
      id2ticket.value[createdTicket.id] = createdTicket;
      router.push({ path:"recap/" + createdTicket.id });
   } else {
      console.log("Failed to create ticket");
   } 
}

// Ticket Retrieval Functions
//---------------------------

// Function to retrieve a single ticket by ID
export const OneTicket = (ticketId) => {
   if (ticketId in id2ticket.value) {
      return id2ticket.value[ticketId];
   }
}

// Computed property to retrieve a ticket based on its ID
export const ticketOfId = computed(() => (id) => {
   const ticket = id2ticket.value[id];
   if (ticket) return ticket;
   // If ticket not found locally, fetch it from the server
   fetch(`/api/ticket/${id}`).then(response => response.json()).then(ticket => {
      id2ticket.value[ticket.id] = ticket;
   });
});

// Computed property to retrieve the list of all tickets
const ticketsList = computed(() => Object.values(id2ticket.value));

// Computed property to filter and sort tickets based on priorities and categories
export const sortTickets = computed(() => (filteredPriorities, filteredCategories) => ticketsList.value
         .filter(ticket => filteredPriorities.has(ticket.priority))
         .filter(ticket => filteredCategories.has(ticket.category)));
