<template lang="">
  <div>
    <div class="form-group mb-3">
      <label for="password">Password</label>
      <input type="password" required class="form-control" placeholder="Password" v-model="password">
      <small id="passwordHelp" class="form-text text-muted">Password should contain
        <ul class="list-group list-unstyled">
          <li class="list-item" :class="has_minimum_lenth ? 'has_required' : 'text-danger'">atleast 6 chacters</li>
          <li class="list-item" :class="has_lowercase ? 'has_required' : 'text-danger'">one lowercase letter</li>
          <li class="list-item" :class="has_uppercase ? 'has_required' : 'text-danger'">one uppercase letter</li>
          <li class="list-item" :class="has_number ? 'has_required' : 'text-danger'">One number</li>
          <li class="list-item" :class="has_special ? 'has_required' : 'text-danger'">one special character</li>
        </ul>
      </small>
    </div>
    <div class="form-group mb-3">
      <label for="confirm_password" class="form-label">Confirm Password</label>
      <input v-model="confirmPassword" required type="confirm_password" class="form-control" id="confirm_password">
    </div>
  </div>
</template>
<script>
export default {
    props: ['form'],
    data() {
        return {
          confirmPassword: '',
          password: '',
          has_minimum_lenth: false,
          has_number: false,
          has_lowercase: false,
          has_uppercase: false,
          has_special: false
        }
    },
    watch:{
      password(){
          this.has_minimum_lenth = (this.password.length > 6);
          this.has_number    = /\d/.test(this.password);
          this.has_lowercase = /[a-z]/.test(this.password);
          this.has_uppercase = /[A-Z]/.test(this.password);
          this.has_special   = /[!@#\$%\^\&*\)\(+=._-]/.test(this.password);
          this.form.password = this.password;
          if (this.password == this.confirmPassword && this.has_minimum_lenth && this.has_number && this.has_lowercase && this.has_uppercase && this.has_special) {
            this.$emit('validated', true)
        } else {
          this.$emit('validated', false)
        }
      },
      confirmPassword(){
        this.form.confirm_password = this.confirmPassword;
        if (this.password == this.confirmPassword && this.has_minimum_lenth && this.has_number && this.has_lowercase && this.has_uppercase && this.has_special) {
            this.$emit('validated', true)
        } else {
          this.$emit('validated', false)
        }
      }
    }
};
</script>
<style scoped>
.has_required{
    text-decoration: line-through;
    color:#689868;
}
</style>
