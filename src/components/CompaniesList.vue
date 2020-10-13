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
        <tr v-for="(item, index) in companiesList.items" :key="item.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.companyName }}</td>
          <td>
            <router-link to="/">
              <font-awesome-icon icon="search-plus"/>
            </router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      companiesList: {
        items: [
          {
            "id": "1",
            "companyName": "nazwa",
          },
          {
            "id": "2",
            "companyName": "nazwa",
          },
          {
            "id": "3",
            "companyName": "nazwa",
          },
          {
            "id": "4",
            "companyName": "nazwa",
          },
          {
            "id": "5",
            "companyName": "nazwa",
          },
          {
            "id": "6",
            "companyName": "nazwa",
          },
          {
            "id": "7",
            "companyName": "nazwa",
          },
          {
            "id": "8",
            "companyName": "nazwa",
          }
        ]
      }
    }
  }
}
</script>