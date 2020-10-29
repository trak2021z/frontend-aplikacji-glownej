<template>
  <div class="main-container">
    <div class="vld-parent main-table">

      <h2>Companies list</h2>
      <loading :active.sync="isComputing" :is-full-page="false"/>

      <template v-if="!allCompanies">
        <h3 v-if="!isComputing">Oops... something went wrong!</h3>
      </template>

      <template v-else>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
            <tr>
              <th scope="col">Company Name</th>
              <th scope="col">Show Company</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(company) in pageOfCompanies" :key="company.pk">
              <td>{{ company.name }}</td>
              <td>
                <router-link :to="'/company/' + company.pk">
                  <font-awesome-icon icon="search-plus"/>
                </router-link>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <hr>
        <paginator :items="allCompanies"
                   :maxPages="4"
                   :initialPage="currentPage"
                   :labels="customLabels"
                   :key="paginatorKey"
                   @changePage="onChangePage"
        />
      </template>

    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Paginator from "@/components/Paginator";

export default {
  name: "Companies",
  components: {Paginator},
  computed: mapGetters(['allCompanies', 'customLabels']),
  data() {
    return {
      isComputing: false,
      pageOfCompanies: null,
      currentPage: 1,
      paginatorKey: 0
    }
  },
  methods: {
    ...mapActions(["getCompaniesAction"]),
    onChangePage(pageOfItems, page){
      this.currentPage = page;
      this.pageOfCompanies = pageOfItems;
    }
  },
  async created() {
    this.isComputing = true;
    try {
      let response = await this.getCompaniesAction();
      if(response.status !== 200){
        alert(`${response.status}: ${response.data.error}`);
      }
    }catch(e){
      console.log(e);
    }
    this.isComputing = false;
  }
}
</script>