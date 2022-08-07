<template>
  <div class="container">
    <h2 class="my-2">Products</h2>
    <form  class="my-2 border-bottom" @submit.prevent="submit">
      <div class="my-2">
        <label for="title">Title:</label>
        <input class="form-control" type="text" name="title" v-model="form.title" />
      </div>
      <div class="my-2">
        <label for="title">Quantity:</label>
        <input class="form-control" type="number" name="quantity" v-model="form.quantity" />
      </div>
      <div class="my-2">
        <label for="category">Category:</label>
        <input class="form-control" type="text" name="category" v-model="form.category" />
      </div>
      <div class="my-2">
        <label for="price">Price:</label>
        <input class="form-control" type="number" name="price" v-model="form.price" />
      </div>
      <div class="my-2">
        <textarea
          name="description"
          v-model="form.description"
          placeholder="Description..."
          class="form-control"
        ></textarea>
      </div>
      <button class="btn btn-primary" type="submit">Submit</button>
    </form>
    <ProductsList v-if="Products" :products="Products" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProductsList from '@/components/ProductsList.vue'

export default {
  name: "Products",
  components: {ProductsList},
  data() {
    return {
      form: {
        title: "",
        category: "",
        description: "",
        price: "",
        userId: "",
        quantity: "",
      },
    };
  },
  computed: {
    ...mapGetters({ Products: "StateProducts", User: "StateUser" }),
  },
  created: function() {
    this.GetProducts()
  },
  methods: {
    ...mapActions(["CreateProduct", "GetProducts"]),
    async submit() {
      try {
        await this.CreateProduct(this.form);
      } catch (error) {
        console.log(error)
      }
    },
  },
};
</script>
