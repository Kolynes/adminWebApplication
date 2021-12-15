import Timespans from "@/mixins/Timespans";
import Chart from "chart.js/auto";
import { Component, Mixins, Ref, Watch } from "vue-property-decorator";

@Component
export default class Sales extends Mixins(Timespans) {
  numbers = [
    {
      icon: "mdi-cart",
      name: "Drugs",
      link: "/dashboard/orders",
      value: 0
    },
    {
      icon: "mdi-package",
      name: "Equipment",
      link: "/dashboard/customers",
      value: 0
    }
  ];
  
  data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    datasets: [
      {
        label: 'Drugs',
        data: [0, 3, 4, 5, 3, 4, 9],
        borderColor: "#4CAF50",
        backgroundColor: "#4CAF50",
      },
      {
        label: 'Equipment',
        data: [3, 2, 2, 1, 4, 10, 0],
        borderColor: "#00adef",
        backgroundColor: "#00adef",
      }
    ]
  };

  lineGraph: Chart | null = null;

  @Ref()
  lineGraphCanvas!: HTMLCanvasElement;

  @Watch("data")
  createGraph() {
    this.lineGraph = new Chart(
       this.lineGraphCanvas,
       {
        type: "line",
        data: this.data
       }
    );
  }

  mounted() {
    this.createGraph();
  }
}