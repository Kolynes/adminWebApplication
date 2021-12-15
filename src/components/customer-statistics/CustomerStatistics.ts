import { Vue, Component, Ref, Watch } from "vue-property-decorator";
import Chart from "chart.js/auto";

@Component
export default class CustomerStatistics extends Vue {
  numberOfCustomers = 0;
  registrationGraphData = {
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
        label: 'Customers',
        data: [0, 3, 4, 5, 3, 4, 9],
        borderColor: "#4CAF50",
        backgroundColor: "#4CAF50",
      }
    ]
  };

  demographicsGraphData = {
    labels: [
      "Lagos",
      "Abuja",
    ],
    datasets: [
      {
        label: 'Customers',
        data: [100, 250],
        backgroundColor: [
          "#4CAF50",
        ]
      }
    ]
  };

  registrationGraph: Chart | null = null;
  demographicsGraph: Chart | null = null;

  @Ref()
  registrationGraphCanvas!: HTMLCanvasElement;

  @Ref()
  demographicsGraphCanvas!: HTMLCanvasElement;

  @Watch("registrationGraphData")
  createRegistrationGraph() {
    this.registrationGraph = new Chart(
      this.registrationGraphCanvas,
      {
        type: "line",
        data: this.registrationGraphData
      }
    );
  }

  @Watch("demographicsGraphData")
  createDemographicsGraph() {
    this.demographicsGraph = new Chart(
      this.demographicsGraphCanvas,
      {
        type: "bar",
        data: this.demographicsGraphData
      }
    );
  }

  mounted() {
    this.createDemographicsGraph();
    this.createRegistrationGraph();
  }
}