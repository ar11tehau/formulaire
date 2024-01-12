<script setup>
   import { ref, onMounted } from 'vue'
   import TicketCard from "/src/components/TicketCard.vue"
   import router from "../router"
   import { useRoute } from 'vue-router'
   import { allTickets } from "../use/useTickets.mjs"

   const route = useRoute()
   const selectedTicketId = ref(route.params.ticketId)

   const handleClick = (id) => {
      selectedTicketId.value = id
      router.push(`/tickets/${id}`);
   };
</script>

<template>
    <div class="max-w-4xl mx-auto mt-8 flex justify-between">
      <div>
         <template v-for="ticket in allTickets" class="p-4">
            <TicketCard @click="handleClick(ticket.id)" :ticketId=ticket.id :selected="ticket.id == selectedTicketId"></TicketCard>
         </template>
      </div>
      <router-view class="grow"></router-view>
    </div>
 </template>
 
