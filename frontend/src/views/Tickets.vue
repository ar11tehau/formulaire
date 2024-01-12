<script setup>
   import { ref, onMounted } from 'vue'
   import TicketCard from "/src/components/TicketCard.vue"
   import router from "../router"
   import { useRoute } from 'vue-router'

   const ticketList = ref([])

   const route = useRoute()
   const selectedTicketId = ref(route.params.ticketId)

   onMounted(async () => {
      const response = await fetch('/api/ticket', {
         method: 'GET',
         headers: {
            "Content-Type": "application/json",
         },
      })
      ticketList.value = await response.json()
   })

   const handleClick = (id) => {
      selectedTicketId.value = id
      router.push(`/tickets/${id}`);
   };
</script>

<template>
    <div class="max-w-4xl mx-auto mt-8 flex justify-between">
      <div>
         <template v-for="ticket in ticketList" class="p-4">
            <TicketCard @click="handleClick(ticket.id)" :ticketId=ticket.id :selected="ticket.id == selectedTicketId"></TicketCard>
         </template>
      </div>
      <router-view class="grow"></router-view>
    </div>
 </template>
 
