<template>
  <div class="container my-5">
    <b-alert variant="danger" :show="showMsg">{{message}}</b-alert>
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input v-model="form.email" type="email" class="form-control" id="email" aria-describedby="emailHelp">
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input v-model="form.password" type="password" class="form-control" id="password">
      </div>
      <button type="submit" class="btn btn-primary d-block">Submit</button>
    </form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      message: '',
      showMsg: false
    };
  },
   methods: {
    ...mapActions(["LogIn"]),
    async submit() {
      let found = this.$store.state.auth.users.find(x => x.password === this.form.password && x.email === this.form.email)
      if (!found){
        this.showMsg = true
        this.message ='Invalid User Credentials!'
      } else {
        try {
          const User = new FormData();
          User.append("email", this.form.email);
          User.append("password", this.form.password);
          let response = await this.LogIn(User);
          if (response.status) {
            this.$router.push("/");
            this.showMsg = false
          } else {
            this.showMsg = true
            this.message = response.msg
          }
        } catch (error) {
          this.showMsg = true
          this.message = 'Something Went Wrong!'
        }
      }
    },
  },
};
</script>
