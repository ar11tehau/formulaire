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
   <button @click="logout" class="flex w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-200 absolute right-0 m-4">Log Out</button>
   <button @click="newform" class="flex w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-200 absolute top-14 right-0 m-4">New Form</button>
   <div class="flex mb-3">
         <span class="mr-2 font-bold">Priorités :</span>
         <ul class="flex space-x-1">
            <li><a href="#" @click="togglePriority('low')" :class="{ 'opacity-20': !filteredPriorities.has('low') }" class="bg-yellow-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700">Faible</a></li>
            <li><a href="#" @click="togglePriority('normal')" :class="{ 'opacity-20': !filteredPriorities.has('normal') }" class="bg-orange-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700">Normale</a></li>
            <li><a href="#" @click="togglePriority('high')" :class="{ 'opacity-20': !filteredPriorities.has('high') }" class="bg-red-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700">Élevée</a></li>
         </ul>
         <span class="ml-8 mr-2 font-bold">Catégories :</span>
         <ul class="flex space-x-1">
            <li><a href="#" @click="toggleCategory('furniture')" :class="{ 'opacity-20': !filteredCategories.has('furniture') }" class="bg-gray-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700">Mobilier</a></li>
            <li><a href="#" @click="toggleCategory('computer')" :class="{ 'opacity-20': !filteredCategories.has('computer') }" class="bg-gray-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700">Informatique</a></li>
            <li><a href="#" @click="toggleCategory('other')" :class="{ 'opacity-20': !filteredCategories.has('other') }" class="bg-gray-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700">Autre</a></li>
         </ul>
   </div>
    <div class="max-w-4xl mx-auto mt-8 flex justify-between">
      <div>
         <template v-for="ticket in sortedTickets.reverse()" class="p-4">
            <TicketCard @click="handleClick(ticket.id)" :ticketId=ticket.id :selected="ticket.id == selectedTicketId"></TicketCard>
         </template>
      </div>
      <router-view class="grow"></router-view>
    </div>
 </template>
 
