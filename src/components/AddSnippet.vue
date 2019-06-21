<template>
  <v-btn
    v-if="$auth.isAuthenticated()"
    fixed
    dark
    fab
    bottom
    right
    color="#BD93F9"
    v-on:click.stop="goToNew"
  >
    <v-icon>add</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "add-snippet",
  methods: {
    goToNew: function() {
      this.$router.push({ path: "snippet/new" });
    }
  }
};
</script>

<style lang="scss" scoped></style>
