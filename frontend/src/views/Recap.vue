<script setup>
  import { ref, onMounted } from 'vue'
  import { CATEGORIES, PRIORITIES } from '../constants'
  import router from '../router';

  
  const props = defineProps({
      ticketId: {
        type: Number,
        required: true,
      },
  })

  const ticket = ref({})

  const all = () => router.push("/tickets")
  const form = () => router.push("/form")

  onMounted(async () => {
      const response = await fetch(`/api/ticket/${props.ticketId}`)
      ticket.value = await response.json()
  })
</script>

<template>
  <div class="max-w-md mx-auto px-3">
    <p class="mb-4 p-2 w-full text-lg text-center">Votre demande a bien été enregistrée</p>

    <label class=" mt-4 text-sm font-medium text-gray-700">Identifiant : <span class="mt-1 p-2 w-full">{{ ticket.id }}</span></label>
    

    <label class="block mt-4 text-sm font-medium text-gray-700">Email : <span class="mt-1 p-2 w-full">{{ ticket.email }}</span></label>

    <label class="block mt-4 text-sm font-medium text-gray-700">Catégorie : <span class="mt-1 p-2 w-full">{{ CATEGORIES[ticket.category] }}</span></label>

    <label class="block mt-4 text-sm font-medium text-gray-700">Description</label>
    <p class="mt-1 p-2 border rounded-md w-full">{{ ticket.description }}</p>

    <label class="block mt-4 text-sm font-medium text-gray-700">Priorité : <span class="mt-1 p-2 w-full">{{ PRIORITIES[ticket.priority] }}</span></label>

    <button @click="form" class="flex w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-px px-2 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-200 mt-4 mb-1" type="submit">Saisir une autre demande</button>
    <button @click="all" class="flex w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-px px-2 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-200 my-2" type="submit">Tous les tickets</button>
  </div>
</template>
