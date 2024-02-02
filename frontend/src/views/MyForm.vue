<script setup>
   import { ref } from 'vue'
   import { computed } from "vue"
   import router from '../router';
   import { createTicket } from "../use/useTickets.mjs"
   
   const props = defineProps({
      formData: {
         type: Object,
      }
   })

   const email = sessionStorage.getItem("email")
   
   const formData = ref ({
      email: email,
      category: "",
      description: "",
      priority: "",
   })


   const isDescriptionValid = computed ( () => !!formData.value?.description )

   const isCategoryValid = computed ( () => !!formData.value.category )

   const isPriorityValid = computed ( () => formData.value.priority )

   const isFormValid = computed ( () => {
      return !(isDescriptionValid.value && isCategoryValid.value && isPriorityValid.value)
   })

   
   const cancel = () => router.push("tickets")
</script>

<template>
   <div class="flex flex-col w-fit m-auto">
      <div class="flex justify-between">
         <label class="m-3 w-4/12" for="email">Email</label>
         <input class="border m-3 w-8/12" type="email" v-model="formData.email" placeholder="monemail@gmail.com" name="email" value="email" disabled>
         </div>
         <div class="flex justify-between">
         <label class="m-3 w-4/12" for="category">Category</label>
         <select class="m-3 w-8/12" v-model="formData.category" name="category">
            <option disabled value="">--Please choose an option--</option>
            <option value="furniture">Furniture</option>
            <option value="computer">Computer</option>
            <option value="other">Other</option>
         </select>
         </div>
         <div class="flex justify-between">
         <label class="m-3 w-4/12" for="description">Description</label>
         <input class="border m-3 w-8/12" type="text" v-model="formData.description" placeholder="description" name="description">
      </div>
      <div class="flex justify-between">
         <label class="m-3 w-4/12" for="priority">Priority</label>
         <select class="m-3 w-8/12" v-model="formData.priority" name="priority">
            <option disabled value="">--Please choose an option--</option>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
         </select>
      </div>
      <div class="flex justify-end">
         <button @click="cancel" class="flex w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-200 my-3" type="submit">Annuler</button>
         <button @click="createTicket(formData)" :disabled="isFormValid" class="flex w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-200 m-3" type="submit">Valider</button>
      </div>
   </div>
</template>