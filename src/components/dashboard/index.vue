<template>
  <div class="wrap relative">
    <div
      class="flex sticky navv z-10 top-0 left-0 justify-between w-full px-3 py-2"
    >
      <div class="flex flex-col justify-center items-start">
        <img
          @click="Home"
          width="45"
          src="@/assets/img/logo-small.png"
          alt=""
        />
      </div>
      <v-btn @click="drawer = !drawer" text fab
        ><img width="50" src="@/assets/img/menusvg.svg" alt=""
      /></v-btn>
    </div>
    <p class="mt-3 pa-0 text-center text-red-500 text-lg font-bold">
      Add Appliances
    </p>
    <p
      class="text-center ma-0 pa-0 w-full font-bold text-black"
      v-if="HouseLoad > 0"
    >
      Total Load: {{ HouseLoad }}Watts
    </p>

    <div class="grid px-2 grid-cols-2 my-3 gap-3 place-items-center">
      <div
        @click="adddialog = !adddialog"
        class="border-dashed border-2 flex flex-col gap-2 justify-center items-center border-blue-500 pa-3 bg-blue-200 w-full h-48"
      >
        <v-icon x-large color="black" class="text-3xl">mdi-plus</v-icon>
        <p class="ma-0 pa-0 text-sm text-center font-bold">
          Add Custom Appliances
        </p>
      </div>
      <div
        v-for="(item, i) in allApliances"
        :key="i"
        @click.self="item.qty += 1"
        :class="{ 'border-solid border-blue-500 border-2': item.qty > 0 }"
        class="pa-4 shadow-md rounded overflow-hidden flex flex-col relative gap-2 justify-center items-center bg-blue-200 w-full h-48"
      >
        <img width="100" :src="item.img" alt="" />
        <p class="ma-0 pa-0 text-xs text-center font-bold">{{ item.name }}</p>
        <p class="ma-0 pa-0 text-sm text-center font-bold">{{ item.watts }}W</p>
        <span class="qutt">x{{ item.qty }}</span>
        <div
          v-if="item.qty > 0"
          class="w-full incre px-2 flex justify-between items-center"
        >
          <v-btn
            :disabled="item.qty == 0"
            x-small
            text
            @click="item.qty = item.qty - 1"
            fab
            ><v-icon large>mdi-minus</v-icon></v-btn
          >
          <v-btn @click="item.qty += 1" x-small text fab
            ><v-icon large>mdi-plus</v-icon></v-btn
          >
        </div>
      </div>
    </div>

    <div class="pa-3 fixed bottom-0 right-0">
      <!-- <v-btn color="green" fab><img src="@/assets/img/subway_menu.svg" alt=""></v-btn> -->
      <v-speed-dial
        v-model="fab"
        :top="top"
        :bottom="bottom"
        :right="right"
        :left="left"
        :direction="direction"
        :open-on-hover="hover"
        :transition="transition"
      >
        <template v-slot:activator>
          <v-btn v-model="fab" color="green" dark fab>
            <v-icon v-if="fab"> mdi-close </v-icon>
            <img v-else src="@/assets/img/subway_menu.svg" alt="" />
          </v-btn>
        </template>
        <v-btn dark @click="Calculate" color="indigo"> Calculate </v-btn>
        <v-btn @click="Reset" fab dark color="red"> reset </v-btn>
      </v-speed-dial>
    </div>

    <v-dialog v-model="adddialog" max-width="350" persistent>
      <v-form
        ref="forms"
        class="bg-white relative pa-4 flex flex-col justify-center items-center gap-2"
      >
        <div @click="adddialog = !adddialog" class="absolute top-1 right-2">
          <v-icon color="red">mdi-close</v-icon>
        </div>
        <p class="ma-0 pa-0 text-red-400 font-bold text-lg">
          Add Custom Apliances
        </p>
        <v-text-field
          :rules="inputRules"
          dense
          solo
          v-model="custom.name"
          label="Apliance Name"
        >
        </v-text-field>
        <v-text-field
          :rules="numberRules"
          dense
          solo
          type="number"
          v-model.number="custom.watts"
          label="Apliance Watts"
        ></v-text-field>
        <v-text-field
          :rules="numberRules"
          dense
          solo
          type="number"
          v-model.number="custom.qty"
          label="Apliance Quantity"
        ></v-text-field>

        <v-btn
          @click="AddCustom"
          tile
          depressed
          color="blue"
          class="white--text"
          >Submit</v-btn
        >
      </v-form>
    </v-dialog>
    <v-navigation-drawer v-model="drawer" class="drawerz" absolute temporary>
      <div class="bg-priblue h-full">
        <v-list-item class="py-5">
          <v-list-item-avatar size="3rem">
            <v-img src="@/assets/img/logo-small.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-divider class="mx-5 bg-white"></v-divider>

        <v-list dense class="listss">
          <v-list-item
            link
            :to="{ path: '/' }"
            class="bg-white mx-4 mb-3 rounded-md flex items-center gap-2"
          >
            <v-icon color="black">mdi-home</v-icon>
            <v-list-item-title class="text-black text-lg pa-0 ma-0"
              >Home</v-list-item-title
            >
          </v-list-item>

          <v-list-item class="mx-4 mb-2 flex items-center gap-3" link>
            <v-icon color="white">mdi-logout</v-icon>
            <v-list-item-title class="text-white">Exit App</v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
    <v-dialog v-model="loader" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Please stand by as we calculate
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="resultdialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="black">
          <v-toolbar-title>Results</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="resultdialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="results">
          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="basil"
            grow
          >
            <v-tab class="solar">
              Solar/Inverter
            </v-tab>
            <v-tab class="generator">
              Generator
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item >
              <div class="grid px-2 py-2 grid-cols-1 gap-3 place-items-center">
                <div class="rounded-md shadow-md bg-white flex flex-col items-center justify-center gap-3 py-4 border-2 border-solid w-full ">
                  <p class="ma-0 pa-0 text-xl font-bold">INVERTER SELECTION</p>
                  <img width="" src="@/assets/img/inverter.png" alt="">
                 
                  <p class="ma-0 pa-0 text-lg font-bold">{{ InverterSelection.minwatt }} - {{ InverterSelection.recomendedwatt }}W ({{ this.Voltage }}V)</p>
                  <p class="ma-0 pa-0 text-lg font-bold">{{ InverterSelection.minva }} - {{ InverterSelection.recomendedva }}VA</p>
                  <p class="ma-0 pa-0 text-lg font-bold">{{ InverterSelection.minkva }} - {{ InverterSelection.recomendedkva }}kVA</p>
                </div>
                <div class="rounded-md shadow-md bg-white flex flex-col items-center justify-center gap-3 py-4 border-2 border-solid w-full ">
                  <p class="ma-0 pa-0 text-xl font-bold">BATTERY SELECTION</p>
                  <img width="" src="@/assets/img/battery.png" alt="">
                  <p class="ma-0 pa-0 text-lg font-bold">{{FormatNo(BatterySeclectionAh) }}aH (8hrs) - {{ noBattery(BatterySeclectionAh) }} <span class="font-extrabold text-lg">X</span> 220aH </p>
                  <p class="ma-0 pa-0 text-lg font-bold">{{ FormatNo(BatterySeclectionAh * 2 )}}AH (16hrs) - {{ noBattery(BatterySeclectionAh *2) }} <span class="font-extrabold text-lg">X</span> 220aH </p>
                </div>
                <div class="rounded-md shadow-md bg-white flex flex-col items-center justify-center gap-3 py-4 border-2 border-solid w-full ">
                  <p class="ma-0 pa-0 text-xl font-bold">SOLAR PANEL SELECTION</p>
                  <img width="" src="@/assets/img/solar.png" alt="">
                  <div v-for="(no ,i) in NoSolarPlate" :key="i">
                    <p v-if="no.no > 0" class="ma-0 pa-0 text-lg font-bold">{{ no.no }} <span class="font-extrabold text-lg">X</span> {{ no.type }}</p>
                  </div>
                </div>
                <div class="rounded-md shadow-md bg-white flex flex-col items-center justify-center gap-3 py-4 border-2 border-solid text-left pa-3 w-full ">
                  <p class="ma-0 pa-0 text-xl font-bold">Detailed Information</p>
                  <p class="ma-0 pa-0 text-lg font-bold">Total Load: {{ HouseLoad }}W</p>
                  <p class="ma-0 pa-0 text-sm font-bold">Inverter Selection (watts): {{ InverterSelection.minwatt }} - {{ InverterSelection.recomendedwatt }}W ({{ this.Voltage }}V)</p>
                  <p class="ma-0 pa-0 text-sm font-bold">Inverter Selection (VA):{{ InverterSelection.minva }} - {{ InverterSelection.recomendedva }}VA</p>
                  <p class="ma-0 pa-0 text-sm font-bold">Inverter Selection (kVA):{{ InverterSelection.minkva }} - {{ InverterSelection.recomendedkva }}kVA</p>
                  <p class="ma-0 pa-0 text-sm font-bold">Voltage:{{Voltage }}V</p>
                  <p class="ma-0 pa-0 text-sm font-bold">DC Current Required(I) :{{Math.round(dcRequired)}}A</p>
                  <p class="ma-0 pa-0 text-sm font-bold">Battery Selection:{{ FormatNo( BatterySeclectionAh) }}AH (8hrs)</p>
                  <p class="ma-0 pa-0 text-sm font-bold">Battery Selection:{{ FormatNo(BatterySeclectionAh * 2 )}}AH (16hrs)</p>
                  <p class="ma-0 pa-0 text-sm font-bold">Battery Charging Current:{{ Math.round(BatteryChargingCurrent) }}A</p>
                  <p class="ma-0 pa-0 text-sm font-bold">Solar Plate Current:{{Math.round( SolarPlateCurrent) }}A</p>
                  <p class="ma-0 pa-0 text-sm font-bold">Solar Plate Power:{{FormatNo( SolarPlatePower) }}W</p>
                  <p class="ma-0 pa-0 text-md mt-4 text-bold text-red-600 ">Number of panels</p>
                  <div v-for="(no ,i) in NoSolarPlate" :key="i">
                    
                    <p v-if="no.no > 0" class="ma-0 pa-0 text-lg font-bold">{{ no.no }} <span class="font-extrabold text-sm">X</span> {{ no.type }}</p>
                  </div>

                </div>

              </div>
            </v-tab-item>
            <v-tab-item >
              
              <div class="grid px-2 py-2 grid-cols-1 gap-3 place-items-center">
                <div class="rounded-md shadow-md bg-white flex flex-col items-center justify-center gap-3 py-4 border-2 border-solid w-full ">
                  <p class="ma-0 pa-0 text-xl font-bold">GENERATOR SELECTION</p>
                  <img width="" :src="generator.img" alt="">
                  <p class="ma-0 pa-0 text-lg font-bold">Name: {{ generator.name }}</p>
                  <p class="ma-0 pa-0 text-lg font-bold">kVA: {{ generator.kva }}</p>
                  <p class="ma-0 pa-0 text-lg font-bold">Price: {{ generator.price }}</p>
                  <p class="ma-0 pa-0 text-lg font-bold">Fuel Type: {{ generator.fueltype }}</p>
                  
                </div>
                </div>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Index",
  data: () => ({
    direction: "top",
    loader: false,
    resultdialog: false,
    fab: false,
    fling: false,
    tab: null,
    hover: false,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false,
    transition: "slide-y-reverse-transition",
    drawer: false,
    allApliances: [],
    inputRules: [(v) => (v && v.length >= 1) || "Field is required"],
    numberRules: [(v) => (v && v > 1) || "Field is required"],
    adddialog: false,
    custom: {
      name: "",
      qty: "",
      img: "https://i.imgur.com/peWvG05.png",
      watts: undefined,
    },
  
  }),
  created() {
    if (this.apliances) {
      this.allApliances = this.apliances;
    }
  },
  methods: {
    AddCustom() {
      if (this.$refs.forms.validate()) {
        this.allApliances.unshift(this.custom);
        this.custom = {
          name: "",
          qty: "",
          img: "https://i.imgur.com/peWvG05.png",
          watts: undefined,
        };
        this.adddialog = false;
      }
    },
    Home() {
      this.$router.push({ path: "/" });
    },
    Reset() {
      location.reload();
    },
    Calculate(){
      this.loader = true
      setTimeout(() => {
        this.loader = false
        this.resultdialog = true
      }, 5000);
    },
    FormatNo(no){
      return Math.ceil(no/100)* 100
    },
    noBattery(bat){
     let batter = Math.ceil(bat/100)* 100
     let nobatt = batter / 220

     return  Math.ceil(nobatt/1)*1 


    }
  },
  computed: {
    ...mapState(["apliances"]),
    HouseLoad() {
      let initialLoad = this.allApliances.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.watts * currentValue.qty,
        0
      );

      return initialLoad;
    },

    InverterSelection() {
      if (this.HouseLoad < 200) {
        let minwatt = Math.ceil((this.HouseLoad + 350) / 100) * 100;
        let minva = Math.ceil((this.HouseLoad + 350) / 0.8 / 100) * 100;
        let minkva =
          Math.round(((this.HouseLoad + 350) / (0.8 * 1000)) * 10) / 10;
        let recomendedwatt = Math.ceil((this.HouseLoad + 450) / 100) * 100;
        let recomendedva = Math.ceil((this.HouseLoad + 450) / 0.8 / 100) * 100;
        let recomendedkva =
          Math.round(((this.HouseLoad + 450) / (0.8 * 1000)) * 10) / 10;
        return {
          minwatt,
          minva,
          minkva,
          recomendedwatt,
          recomendedva,
          recomendedkva,
        };
      }
      let minwatt = Math.ceil((this.HouseLoad + 450) / 100) * 100;
      let minva = Math.ceil((this.HouseLoad + 450) / 0.8 / 100) * 100;
      let minkva =
        Math.round(((this.HouseLoad + 450) / (0.8 * 1000)) * 10) / 10;
      let recomendedwatt = Math.ceil((this.HouseLoad + 650) / 100) * 100;
      let recomendedva = Math.ceil((this.HouseLoad + 650) / 0.8 / 100) * 100;
      let recomendedkva =
        Math.round(((this.HouseLoad + 650) / (0.8 * 1000)) * 10) / 10;
      return {
        minwatt,
        minva,
        minkva,
        recomendedwatt,
        recomendedva,
        recomendedkva,
      };
    },
    generator(){
      let KVA = Math.ceil(this.InverterSelection.recomendedkva/1)*1 
      if(KVA <= 1 || this.InverterSelection.recomendedkva <=1){
        return {name: 'Fireman Mini', kva: '1kVA', price: '₦100,000', img: 'https://i.imgur.com/N6ztED5.png', fueltype: 'petrol'}
      }
      if(KVA >= 1 && this.InverterSelection.recomendedkva <= 1.5){
        return {name: 'Sunmec Fireman', kva: '1.5kVA', price: '₦118,000', img: 'https://i.imgur.com/NzdVImV.png', fueltype: 'petrol'}
      }
      if(this.InverterSelection.recomendedkva >= 1.5 && this.InverterSelection.recomendedkva <= 2){
        return {name: 'SkyRun', kva: '2kVA', price: '₦135,000', img: 'https://i.imgur.com/tlyMngt.png', fueltype: 'petrol'}
      }
      if(this.InverterSelection.recomendedkva >= 2 && this.InverterSelection.recomendedkva <= 2.5){
        return {name: 'ELEPAQ', kva: '2.5kVA', price: '₦155,000', img: 'https://i.imgur.com/X7GmnoQ.png', fueltype: 'petrol'}
      }
      if(this.InverterSelection.recomendedkva >= 2.5 && this.InverterSelection.recomendedkva <= 3.5){
        return {name: 'Lutian', kva: '3.5kVA', price: '₦210,000', img: 'https://i.imgur.com/ves3cBF.png', fueltype: 'petrol'}
      }
      if(this.InverterSelection.recomendedkva >= 4.0 && this.InverterSelection.recomendedkva <= 5){
        return {name: 'Fireman', kva: '5kVa', price: '₦500,000', img: 'https://i.imgur.com/JyfTESl.png', fueltype: 'desiel'}
      }

      if(this.InverterSelection.recomendedkva >= 5.5 && this.InverterSelection.recomendedkva <= 6){
        return {name: 'Fireman sumec', kva: '6kVa', price: '₦650,000', img: 'https://i.imgur.com/JyfTESl.png', fueltype: 'desiel'}
      }
     

      return {name: 'Mikano Generator', kva: '9kVa - 20kVA', price: '₦250,000,000', img: 'https://i.imgur.com/jUfdRh2.png', fueltype: 'desiel'}
    },
    Voltage(){
      if(this.InverterSelection.minwatt <= 1000 || this.InverterSelection.recomendedwatt <=1000){
        return 12
      }
      if(this.InverterSelection.minwatt >= 1000 && this.InverterSelection.recomendedwatt <= 3000){
        return 24
      }
      if(this.InverterSelection.minwatt >= 3000 && this.InverterSelection.recomendedwatt <= 5000){
        return 48
      }

      return 48
    },
    dcRequired() {
      return this.HouseLoad / this.Voltage;
    },
    BatterySeclectionAh() {
      
      return (this.HouseLoad * 8) / this.Voltage;
    },
    BatteryChargingCurrent() {
      return this.BatterySeclectionAh * 0.1;
    },
    SolarPlateCurrent() {
      return this.BatteryChargingCurrent + this.dcRequired;
    },
    SolarPlatePower() {
      return this.Voltage * this.SolarPlateCurrent;
    },
    NoSolarPlate() {
      return [
        { no: Math.round(this.SolarPlatePower / 120), type: "120w" },
        { no: Math.round(this.SolarPlatePower / 180), type: "180w" },
        { no: Math.round(this.SolarPlatePower / 380), type: "380w" },
        { no: Math.round(this.SolarPlatePower / 440), type: "440w" },
      ];
    },
  },
  watch: {
    top(val) {
      this.bottom = !val;
    },
    right(val) {
      this.left = !val;
    },
    bottom(val) {
      this.top = !val;
    },
    left(val) {
      this.right = !val;
    },
  },
};
</script>

<style scoped>
.wrap {
  background: #e5e5e5;
  min-height: 100vh;
}
.listss {
  overflow-y: scroll;
  overflow: hidden;
  height: 100% !important;
}
.qutt {
  position: absolute;
  top: 5px;
  font-weight: bolder;
  background: white;
  padding: 0.3em;
  border-radius: 50%;
  right: 10px;
}

.drawerz {
  z-index: 100;
}
.wallet {
  width: 50% !important;
  flex: 50% !important;
}
.bonus {
  width: 50% !important;
  flex: 50% !important;
}

.incre {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}

.navv {
  background: rgba(255, 255, 255, 0.042);
  backdrop-filter: blur(8px);
}
</style>
