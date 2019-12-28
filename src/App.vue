<template>
  <div id="app">
    <div id="nav" class="absolute top py-2 px-5 bg-gray-700 w-full uppercase font-bold text-sm">
      <router-link :to="{ name: 'game' }">Game</router-link>
    </div>
    <router-view class="pt-16"/>
  </div>
</template>
