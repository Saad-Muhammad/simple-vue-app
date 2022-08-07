<template>
  <div class="Home">
    <b-alert show>Welcome to vue simple app</b-alert>
    <div class="d-flex">
      <b-btn @click="logout()">Logout</b-btn>
      <b-link class="btn btn-primary" to="/products">Products</b-link>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["LogOut"]),
    async logout(){
      await this.LogOut();
      this.$router.push("/login");
    }
  },
}
</script>
