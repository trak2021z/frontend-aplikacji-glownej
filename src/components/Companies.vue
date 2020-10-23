<template>
  <div class="main-container">
    <div class="main-table">
      <h2>Companies list</h2>
      <table class="table table-hover">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Company Name</th>
          <th scope="col">Show Company</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(company) in pageOfCompanies" :key="company.pk">
          <th scope="row"></th>
          <td>{{ company.name }}</td>
          <td>
            <router-link :to="'/company/' + company.pk">
              <font-awesome-icon icon="search-plus"/>
            </router-link>
          </td>
        </tr>
        </tbody>
      </table>
      <hr>
      <jw-pagination v-if="companies" :items="companies" @changePage="onChangePage" />
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      companies: null,
      pageOfCompanies: null
    }
  },
  methods: {
    ...mapActions(["getCompaniesAction"]),
    onChangePage(pageOfItems){
      this.pageOfCompanies = pageOfItems;
    }
  },
  async created() {
    this.companies = await this.getCompaniesAction();
  }
}
</script>