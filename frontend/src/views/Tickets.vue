<script setup>
   import { computed, ref } from 'vue'
   import { useRoute } from 'vue-router'
   import TicketCard from "/src/components/TicketCard.vue"
   import router from "../router"
   import { sortTickets, logout } from "../use/useTickets.mjs"

   const route = useRoute()
   const selectedTicketId = ref(route.params.ticketId)

   const handleClick = (id) => {
      selectedTicketId.value = id
      router.push(`/tickets/${id}`);
   };

   const filteredPriorities = ref(new Set(['low', 'normal', 'high']))
   const togglePriority = (priority) => {
      if (filteredPriorities.value.has(priority)) {
         filteredPriorities.value.delete(priority)
      } else {
         filteredPriorities.value.add(priority)
      }
      router.push(`/tickets`)
   }

   const filteredCategories = ref(new Set(['furniture', 'computer', 'other']))
   const toggleCategory = (category) => {
      if (filteredCategories.value.has(category)) {
         filteredCategories.value.delete(category)
      } else {
         filteredCategories.value.add(category)
      }
      router.push(`/tickets`)
   }

   const sortedTickets = computed(() => sortTickets.value(filteredPriorities.value, filteredCategories.value))

   const newform = () => router.push("/form")

   
</script>

<template>
   <div class="flex justify-around">
      <button @click="newform" class="flex w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline disabled:bg-blue-200 m-1 p-1">New Form</button>
      <button @click="logout" class="flex w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline disabled:bg-blue-200 m-1 p-1">Log Out</button>
   </div>
   <div class="flex flex-col items-center lg:flex-row lg:items-center lg:justify-center">
      <p class="font-bold">Priorités :</p>
      <div class="flex items-center m-1 space-x-2">
         <a href="#" @click="togglePriority('high')" :class="{ 'opacity-20': !filteredPriorities.has('high') }" class="bg-red-200 rounded-full text-sm font-semibold text-gray-700 p-2">Haute</a>
         <a href="#" @click="togglePriority('normal')" :class="{ 'opacity-20': !filteredPriorities.has('normal') }" class="bg-orange-200 rounded-full text-sm font-semibold text-gray-700 p-2">Normale</a>

         <a href="#" @click="togglePriority('low')" :class="{ 'opacity-20': !filteredPriorities.has('low') }" class="bg-yellow-200 rounded-full text-sm font-semibold text-gray-700 p-2">Basse</a>
      </div>
      <p class="font-bold lg:ml-8">Catégories :</p>
      <div class="flex items-center m-1 space-x-2"> 
         <a href="#" @click="toggleCategory('furniture')" :class="{ 'opacity-20': !filteredCategories.has('furniture') }" class="bg-gray-200 rounded-full p-2 text-sm font-semibold text-gray-700">Mobilier</a>
      
         <a href="#" @click="toggleCategory('computer')" :class="{ 'opacity-20': !filteredCategories.has('computer') }" class="bg-gray-200 rounded-full p-2 text-sm font-semibold text-gray-700">Informatique</a>
      
         <a href="#" @click="toggleCategory('other')" :class="{ 'opacity-20': !filteredCategories.has('other') }" class="bg-gray-200 rounded-full p-2 text-sm font-semibold text-gray-700">Autre</a>               
      </div>
   </div>
    <div class="max-w-4xl mx-auto mt-2 flex justify-between">
      <div class="ml-2">
         <template v-for="ticket in sortedTickets.reverse()" class="p-4">
            <TicketCard @click="handleClick(ticket.id)" :ticketId=ticket.id :selected="ticket.id == selectedTicketId"></TicketCard>
         </template>
      </div>
      <router-view class="grow"></router-view>
    </div>
 </template>
 
