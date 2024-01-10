

<template>
  <form class="flex flex-col w-fit m-auto" @submit.prevent="submitForm" @submit="print">
    <div class="flex justify-between">
      <label class="m-3 w-4/12" for="email">Email</label>
      <input class="border m-3 w-8/12" type="text" v-model="formData.email" placeholder="monemail@gmail.com" name="email">
    </div>
    <div class="flex justify-between">
      <label class="m-3 w-4/12" for="category">Category</label>
      <select class="m-3 w-8/12" v-model="formData.category" name="category">
        <option disabled value="">--Please choose an option--</option>
        <option value="chauffage">Chauffage</option>
        <option value="climatisation">Climatisation</option>
        <option value="projecteur">Projecteur</option>
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
        <option>Faible</option>
        <option>Normal</option>
        <option>Haute</option>
      </select>
    </div>
    <div class="flex justify-end">
      <button class="flex w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Valider</button>
    </div>
  </form>
</template>

<script setup>
  import { ref } from 'vue'

  const formData = ref ({
    email: "",
    category: "",
    description: "",
    priority: "",
  })

  const selected = ref('')

  function submitForm() {
    console.log(formData)
  }
</script>