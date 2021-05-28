<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif, Helvetica;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


input {
  /* 모바일에서 input에 shadow생기는거 방지. */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none; 
}

:root {
  /* Color */
  --primary: #1E88E5;
  --primary-shade: #1a78ca;
  --primary-tint: #3594e8;

  --secondary: #5469D4;
  --secondary-shade: #4A5CBB;
  --secondary-tint: #6578D8;

  --success: #1EA675;
  --success-shade: #1A9267;
  --success-tint: #35AF83;

  --warning: #F5925E;
  --warning-shade: #D88053;
  --warning-tint: #F69D6E;

  --danger: #CD3D64;
  --danger-shade: #B43658;
  --danger-tint: #D25074;

  --gray-high: #212121;
  --gray-medium: #666666;
  --gray-low: #9E9E9E;

  --blue-gray-higher: #55647B;
  --blue-gray-high: #8792A2;
  --blue-gray-medium: #E3E8EE;
  --blue-gray-low: #F7FAFC;

  --border: #E6E6E6;
}
</style>
