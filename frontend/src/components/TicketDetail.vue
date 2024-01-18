<script setup>
   import { ref, onMounted, watch } from 'vue'
   import { CATEGORIES, PRIORITIES } from '../constants'
   import { OneTicket } from "../use/useTickets.mjs" 

   const props = defineProps({
      ticketId: {
      type: String,
      required: true,
      },
   })

   const ticket = ref({})

      watch(
         props, 
         () => { ticket.value =  OneTicket(props.ticketId) },
         { immediate: true }
      )

</script>

<template>
   <div class="max-w-md mx-auto mt-8">
      <p class="my-4 p-2 w-full text-lg">Votre demande :</p>

      <label class=" mt-4 text-sm font-medium text-gray-700">Identifiant : <span class="mt-1 p-2 w-full">{{ ticket.id }}</span></label>
      

      <label class="block mt-4 text-sm font-medium text-gray-700">Email : <span class="mt-1 p-2 w-full">{{ ticket.email }}</span></label>

      <label class="block mt-4 text-sm font-medium text-gray-700">Catégorie : <span class="mt-1 p-2 w-full">{{ CATEGORIES[ticket.category] }}</span></label>

      <label class="block mt-4 text-sm font-medium text-gray-700">Description</label>
      <p class="mt-1 p-2 border rounded-md w-full">{{ ticket.description }}</p>

      <label class="block mt-4 text-sm font-medium text-gray-700">Priorité : <span class="mt-1 p-2 w-full">{{ PRIORITIES[ticket.priority] }}</span></label>

   </div>
 </template>