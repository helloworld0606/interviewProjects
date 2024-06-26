<template>
  <div>
    <h1>Welcome to Home Page!</h1>
    <p>You are already logged in! Your ID is: {{ id }}</p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
    id: {
      type: String,
      default: 'No ID provided'
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 2em;
  margin-bottom: 1em;
}
p {
  font-size: 1.2em;
}
</style>
