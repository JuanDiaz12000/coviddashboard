<template>
<v-container>
  <h1 style="margin: 10px"> Covid Tracker </h1>
  <p> To search the information of a country please write the name and press enter </p>
  <p> To see more information of a country, click on the country </p>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        single-line
        hide-details
        v-on:keyup.enter="cargarDatosPais(search)"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="estados"
      item-key="country"
      v-if= "data"
      style="margin-bottom:20px"
      v-model="selectedRow"
    >
      <template v-slot:item="{ item }">
          <tr :class="selectedRow.indexOf(item.country)" @click="rowClicked(item)">
            <td>{{item.name}}</td>
            <td>{{item.latest_data.confirmed}}</td>
            <td>{{item.latest_data.deaths}}</td>
          </tr>
      </template>
    </v-data-table>
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
  mounted() {
    this.cargarDatos()
  },
  methods:{
    async cargarDatos(){
      let states = []
      this.data = false
        await this.axios.get('https://corona-api.com/countries').then((response) => {
          console.log(response.data.data)
          const countries = response.data.data
          for (let i = 0; i < countries.length; i++){
            let state = {}
            state = countries[i]
            states.push(state)
          }
        })
      console.log(states)
      this.estados = states
      this.data = true
    },
    async cargarDatosPais(search){
      console.log(search)
      let states = []
      this.data = false
        await this.axios.get('https://corona-api.com/countries').then((response) => {
          console.log(response.data.data)
          const countries = response.data.data
          for (let i = 0; i < countries.length; i++){
            let state = {}
            state = countries[i]
            states.push(state)
          }
        })
      let country = states.find(el => el.name === search);
      console.log(country)
      if (country != null) {
        this.estados = [country]
        let cntry = {
          name: country.name,
          pos: country.latest_data.confirmed,
          death: country.latest_data.deaths
        }
        this.data = true
         await this.axios
        .post("http://localhost:8080/https://git.heroku.com/backsemanatec.git/covidlogs/add_log/", cntry)
        console.log("Log saved")
      } else {
        this.estados = states
        this.data = true
      }
    },
    rowClicked(row) {
      console.log(row);
      this.$router.push({name: 'Country', params: {code: row.code, country: row }});
    }
  },

  data: () => ({
    search: "",
    selectedRow: [],
    headers: [{
            text: 'Country',
            align: 'start',
            filterable: true,
            value: 'country',
          },
          { text: 'Confirmed', value: 'pos' },
          { text: 'Deaths', value: 'death' }],
    estados: [
      {
        country: "Mexico",
        code: "MX",
        pos: 1999,
        death: 2000
      }
    ],
    data: true,
  })
}
</script>