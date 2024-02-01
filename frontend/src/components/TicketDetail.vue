<script setup>
   import { computed, ref, onMounted, watch } from 'vue'
   import { CATEGORIES, PRIORITIES } from '../constants'
   import { ticketOfId } from "../use/useTickets.mjs" 

   const props = defineProps({
      ticketId: {
      type: String,
      required: true,
      },
   })

   const ticket = computed(() => ticketOfId.value(props.ticketId))

</script>

<template>
   <div class="max-w-md border border-gray-200 mx-2 rounded-md space-y-2">
      <p class="px-2 w-full text-lg">Votre demande :</p>
      <p class="px-2 text-sm font-medium text-gray-700 w-full">Identifiant : {{ ticket.id }}</p>
      <p class="px-2 text-sm font-medium text-gray-700 w-full">Email : {{ ticket.email}}</p>
      <p class="px-2 text-sm font-medium text-gray-700 w-full">Catégorie : {{ CATEGORIES[ticket.category] }}</p>
      <p class="px-2 text-sm font-medium text-gray-700 w-full">Description : 
         <p class="italic border border-gray-150 rounded-md">{{ ticket.description }}</p></p>
      <p class="px-2 text-sm font-medium text-gray-700 w-full">Priorité : {{ PRIORITIES[ticket.priority] }}</p>
   </div>
 </template>