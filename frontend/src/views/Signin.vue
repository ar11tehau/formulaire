<script setup>
   import { computed, ref } from 'vue'
   import { login } from "../use/useTickets.mjs"

   const props = defineProps({
      formData: {
         type: Object,
      } 
   })

   const formData = ref ({
      email: "",
      category: "",
      description: "",
      priority: "",
   })

   const isEmailValid = computed ( () => {
      const re = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
      return re.test(formData.value.email)
   })

   const isPasswordValid = computed ( () => !!formData.value?.password )

   const isFormValid = computed ( () => {
      return !(isEmailValid.value && isPasswordValid.value)
   })  

</script>

<template>
   <div class="flex flex-col w-fit m-auto">
   <div class="flex justify-between">
      <label class="m-3 w-4/12" for="email">Email</label>
      <input class="border m-3 w-8/12" type="email" v-model="formData.email" placeholder="monemail@gmail.com" name="email">
   </div>
   <div class="flex justify-between">
      <label class="m-3 w-4/12" for="password">Password</label>
      <input class="border m-3 w-8/12" type="password" v-model="formData.password" placeholder="password" name="password">
   </div>
   <div class="flex justify-end">
   <button @click="login(formData)" :disabled="isFormValid" class="flex w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-200" type="submit">Valider</button>
   </div>
</div>
</template>