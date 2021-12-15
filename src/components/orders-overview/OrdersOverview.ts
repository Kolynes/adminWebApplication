import Timespans from "@/mixins/Timespans";
import Chart from "chart.js/auto";
import { Component, Ref, Mixins} from "vue-property-decorator";

@Component
export default class OrdersOverview extends Mixins(Timespans) {
  @Ref()
  doughnut!: HTMLCanvasElement;

  ordersOverviewGraph: Chart | null = null;
  completedOrders = 10;
  processingOrders = 20;
  cancelledOrders = 5;

  loadGraph() {
    this.ordersOverviewGraph = new Chart(
      this.doughnut,
      {
        type: "doughnut",
        data: {
          labels: [
            'Completed',
            'Processing',
            'Cancelled'
          ],
          datasets: [{
            label: 'Orders Overview',
            data: [
              this.completedOrders,
              this.processingOrders,
              this.cancelledOrders
            ],
            backgroundColor: [
              '#4CAF50',
              '#00adef',
              '#F44336'
            ],
            hoverOffset: 4,
          }]
        },
      }
    );
  }

  mounted() {
    this.loadGraph();
  }
}