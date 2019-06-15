<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/"
          ><span>Snippy</span>
          <span class="font-weight-light">Code snippets</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        solo-inverted
        flat
        label="Search"
        append-icon="search"
        v-model="searchQuery"
        v-on:keyup.enter="search"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/joranquinten/snippy/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      searchQuery: null
    };
  },
  methods: {
    search: function() {
      if (this.searchQuery) {
        this.$router.push(`/snippets/search/${encodeURI(this.searchQuery)}`);
        this.searchQuery = "";
      }
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

*::-moz-selection {
  color: #44475a;
  background-color: #f1fa8c;
}
*::selection {
  color: #44475a;
  background-color: #f1fa8c;
}

.clickable {
  cursor: pointer;
}

.headline {
  a {
    color: #bd93f9;
    text-decoration: none;

    &:hover,
    &:active {
      color: #ff92df;
    }

    &:focus {
      text-decoration: underline;
    }
  }
}
</style>
