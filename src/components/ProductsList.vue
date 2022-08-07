<template>
  <div class="card">
    <!-- Header -->
    <div class="card-header bg-light">
      All Products
    </div>
    <!-- Main Table -->
    <div class="card-body">
      <b-table
        id="g-table"
        ref="table"
        :busy.sync="loading"
        :items="products"
        :fields="fields"
        head-variant="light"
        show-empty
        sort-icon-left
        responsive
        :per-page="100"
      >
        <!-- Spinner -->
        <template #table-busy>
          <div class="text-center text-primary my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProductsList',
  props: ['products'],
  data () {
    return {
      loading: false,
      query: '',
      fields: [
        { key: 'title', sortable: false },
        { key: 'category', sortable: false },
        { key: 'quantity', sortable: true },
      ],
    }
  },
   watch: {
     products: {
       handler(){
         this.$root.$emit('bv::refresh::table', 'g-table')
       },
       deep: true
     }
   },

}
</script>
