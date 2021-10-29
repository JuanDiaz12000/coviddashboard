<template>
<v-container>
<v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      v-if= "data"
    ></v-data-table>
  </v-card>
  <v-data-table
  item-key="name"
    class="elevation-1"
    loading
    loading-text="Loading... Please wait"
    v-if="!data"
    >
  </v-data-table>
</v-container>
</template>


<script>


export default {

  name: 'Covid',
  components: {

  },

  mounted(){
      this.axios.get('https://api.covidtracking.com/v1/states/daily.json').then((response)=>{
        console.log(response);
      })
    },

  data() {
    headers: ["Estado", "Positivo", "Muertes"],
    estados: [],
    positivos: [],
    muertes: [],
    data: true,
  }
}
</script>

<style>
#myAwesomeMap{
  height: 500px;
  width: 100%;
}
</style>