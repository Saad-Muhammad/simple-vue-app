<template>
  <div class="container my-5">
    <b-alert variant="danger" :show="showError">{{message}}</b-alert>
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input required v-model="form.name" type="name" class="form-control" id="name">
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input required v-model="form.email" type="email" class="form-control" id="email" aria-describedby="emailHelp">
      </div>
      <Password :form="form" @validated="validatePassword"/>
      <button type="submit" class="btn btn-primary d-block">Submit</button>
    </form>
  </div>
</template>
<script>
import Password from '@/components/auth/Password.vue'
import { mapActions } from "vuex";
export default {
  name: 'SignUp',
  components: {Password},
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        confirm_password: ''
      },
      passwordValidated: false,
      showError: false,
      message: ''
    };
  },
   methods: {
    ...mapActions(["Register"]),
    async submit() {
      if (!this.passwordValidated) {
        this.showError = true
        this.message ='Please Fill up the form Correctly!'
      } else {
        try {
          await this.Register(this.form);
          this.$router.push("/");
          this.showError = false
        } catch (error) {
          this.showError = true
          this.message = 'Something Went Wrong!'
        }
      }
    },
    validatePassword(event){
      this.passwordValidated = event
    }
  },
};
</script>
<style scoped>
</style>
