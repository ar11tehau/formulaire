<script setup>
   import { ref, onMounted, computed } from 'vue'
   import { CATEGORIES, PRIORITIES } from '../constants'
   import { ticketOfId } from "../use/useTickets.mjs"  

   const props = defineProps({
      ticketId: {
         type: Number,
         required: true,
      },
      selected: {
         type: Boolean,
         default: false,
      }
   })
   const ticket = computed(() => ticketOfId.value(props.ticketId))


</script>

<template>
   <div class="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer" :class="{'bg-gray-200': selected}">
      <div class="p-2">
         <div class="font-bold text-xl mb-2">Ticket #{{ ticket.id }}</div>
         <p class="text-gray-700 text-sm">
               {{ ticket.description?.length > 3 ? ticket.description.slice(0, 10) + '...'  : ticket.description }}
         </p>
      </div>
      <div class="flex p-px space-x-1 m-1">
         <p class="bg-gray-200 rounded-full text-sm font-semibold text-gray-700 h-fit py-px px-2">{{ CATEGORIES[ticket.category] }}</p>
         <p class="rounded-full text-sm font-semibold text-gray-700 h-fit py-px px-2"
               :class="{'bg-red-200': ticket.priority === 'high', 'bg-orange-200': ticket.priority === 'normal', 'bg-yellow-200': ticket.priority === 'low',  }">
               {{ PRIORITIES[ticket.priority] }}
         </p>
      </div>
   </div>
</template>