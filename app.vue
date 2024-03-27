<script setup>
const runtime = useRuntimeConfig();
const state = reactive({
  has404: false,
  hasResponse: false,
  city: "",
  response: {},
})
async function searchCity() {
  state.has404 = false
  state.hasResponse = false

  state.response = {}
  await $fetch(`https://api.openweathermap.org/data/2.5/weather?q=${state.city}&units=metric&appid=${runtime.public.API_KEY}`).then(response => {
    state.hasResponse = true
    state.response = {
      temperature: response.main.temp,
      description: response.weather[0].description,
      wind: response.wind.speed,
      humidity: response.main.humidity,
      image: ""
    }
    switch (response.weather[0].main){
      case 'Clear':
        state.response.image = '/images/clear.png';
        break;
      case 'Clouds':
        state.response.image = '/images/cloud.png';
        break;
      case 'Mist':
        state.response.image = '/images/mist.png';
        break;
      case 'Rain':
        state.response.image = '/images/rain.png';
        break;
      case 'Snow':
        state.response.image = '/images/snow.png';
        break;
    }
  }).catch(error => {
    if (!error.status) {
      alert('Request Error');
    } else {
      if (error.status === 404) {
        state.has404 = true
      } else if(error.status === 401){
        alert('API Authorization Error');
      }
    }
  })
}
</script>
<template>
  <main class="h-screen grid place-items-center bg-gray-900">
    <div class="bg-white p-4 w-96 rounded-2xl lg:w-1/4">
      <!-- SEARCH BOX -->
      <div class="flex items-center justify-between w-full">
        <font-awesome-icon icon="fa-solid fa-location-dot" class="text-2xl" />
        <input type="text" v-model="state.city" placeholder="Insert your location..."
          class="text-black w-full uppercase font-medium text-2xl text-gray-900 pl-2 outline-none"
        >
        <font-awesome-icon
            icon="fa-solid fa-magnifying-glass"
            class="text-gray-900 bg-blue-100 rounded-full text-2xl p-2 cursor-pointer hover:text-white"
            @click="searchCity()"
        />
      </div>
      <!-- LOCATION 404 -->
      <div class="mt-5 text-center" v-if="state.has404">
        <NuxtImg src="/images/404.png" class="w-full" />
        <p class="text-gray-900 font-medium text-xl pt-8 pb-1">Oops! Location not found!</p>
      </div>
      <!-- MAIN INFOS -->
      <div class="text-center mt-5" v-if="state.hasResponse">
        <NuxtImg :src="state.response.image" class="w-3/5 mx-auto"/>
        <p class="relative text-gray-900 text-6xl font-extrabold mt-8">{{state.response.temperature}} ºC</p>
        <p class="text-2xl capitalize">{{state.response.description}}</p>
      </div>
      <!-- DETAILS -->
      <div class="w-full flex justify-between mt-8" v-if="state.hasResponse">
        <div class="flex items-center w-1/2 h-24 pl-5 justify-start">
          <font-awesome-icon icon="fa-solid fa-water" class="text-gray-900 text-2xl mr-2" />
          <div>
            <span class="text-gray-900 text-xl font-medium">{{state.response.humidity}}%</span>
            <p class="text-gray-900 font-medium text-sm">Humidity</p>
          </div>
        </div>
        <div class="flex items-center w-1/2 h-24 pr-5 justify-end">
          <font-awesome-icon icon="fa-solid fa-wind" class="text-gray-900 text-2xl mr-2" />
          <i class="fa-solid fa-wind text-gray-900 text-2xl mr-2"></i>
          <div>
            <span class="text-gray-900 text-xl font-medium">{{state.response.wind}} km/h</span>
            <p class="text-gray-900 font-medium text-sm">Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style lang="postcss" scoped>
</style>
