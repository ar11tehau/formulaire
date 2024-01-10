

<template>
  <form class="flex flex-col w-fit m-auto" @submit.prevent="submitForm" @submit="print">
    <div class="flex justify-between">
      <label class="m-3 w-4/12" for="email">Email</label>
      <input class="border m-3 w-8/12" type="email" v-model="formData.email" placeholder="monemail@gmail.com" name="email">
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
      <button :disabled="isFormValid" class="flex w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-200" type="submit">Valider</button>
    </div>
  </form>
</template>

<script setup>
  import { ref } from 'vue'
  import { computed } from "vue"

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

  const isDescriptionValid = computed ( () => {
    return formData.value.description !== ""
  })

  const isCategoryValid = computed ( () => {
    return formData.value.category !== ""
  })

  const isPriorityValid = computed ( () => {
    return formData.value.priority !== ""
  })

  const isFormValid = computed ( () => {
    return !(isEmailValid.value && isDescriptionValid.value && isCategoryValid.value && isPriorityValid.value)
  })

  const submitForm = (evt) => {
    //console.log(formData)
    
  }
</script>