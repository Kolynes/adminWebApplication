import {Vue, Component, Watch} from "vue-property-decorator";

@Component
export default class Timespans extends Vue {
  timespanValue = "7d";

  timespans = [
    {
      value: "7d",
      text: "Last 7 days"
    },
    {
      value: "1m",
      text: "Last month"
    },
    {
      value: "3m",
      text: "Last quarter"
    },
    {
      value: "1y",
      text: "Last year"
    }
  ];

  get timespan(): string {
    return this.timespans.find(
      value => value.value == this.timespanValue
    )!.text
  }

  @Watch("timespanValue")
  onOOTChange(newValue: string) {}
}