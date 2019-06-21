<template>
  <v-card class="profile mx-auto" v-if="profile" max-width="400">
    <v-card-title class="headline text-uppercase">
      <v-layout align-space-around justify-center column fill-height>
        <v-avatar size="150" class="mx-auto"
          ><img :src="profile.picture"
        /></v-avatar>
        {{ profile.nickname }}
      </v-layout>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      {{ profile.name }}
    </v-card-text>

    <v-card-actions>
      <v-layout align-center justify-end>
        <v-btn v-if="$auth.isAuthenticated" flat @click.prevent="logout">
          <span class="mr-2">Log out</span>
        </v-btn>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      profile: this.$auth.profile,
      isAuthenticated: false
    };
  },
  methods: {
    handleLoginEvent(data) {
      this.profile = data.profile;
    },
    logout() {
      this.$auth.logOut();
    }
  }
};
</script>
