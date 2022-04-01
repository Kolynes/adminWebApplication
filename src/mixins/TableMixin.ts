import { Vue, Component, Watch } from "vue-property-decorator";
import CustomTable from "@/components/CustomTable.vue";
import VEmptyState from "@/vuetify-extensions/VEmptyState.vue"

export interface ITableHeader {
  text: string;
  value: string;
}

export interface ISearchResults {
  items: any[];
  numberOfPages: number;
}

export interface ITableView {
  headers: ITableHeader[];
  items: any[];
  itemClicked(item: any): void;
  getSearchResults(searchString: string, page: number, pageSize: number): Promise<ISearchResults>;
}

@Component({
  components: {
    CustomTable,
    VEmptyState,
  }
})
export default class TableMixin extends Vue implements ITableView {
  headers: ITableHeader[] = [];
  items: any[] = [];

  searchString = "";
  page = 1;
  pageSize = 10;
  numberOfPages = 0;
  searchTimeout: number | null = null; 

  get pages(): number[] {
    const pages = [];
    for(var i = 0; i < this.numberOfPages; i++)
      pages.push(i + 1);
    return pages;
  }

  previousPage() {
    if(this.page != 1)
      this.page--;
  }

  nextPage() {
    if(this.page != this.numberOfPages)
      this.page++;
  }

  async search() {
    const response = await this.getSearchResults(this.searchString, this.page, this.pageSize);
    this.items = response.items || this.items;
    this.numberOfPages = response.numberOfPages || this.numberOfPages;
  }

  reset() {
    this.page = 1;
    this.search();
  }

  @Watch("searchString")
  onSearchStringChange() {
    if(this.searchTimeout != null)
      clearTimeout(this.searchTimeout)
    this.searchTimeout = setTimeout(this.search, 200)
  }

  @Watch("page")
  onPageChange() {
    this.search();
  }

  @Watch("pageSize")
  onPageSizeChange() {
    this.search();
  }

  mounted() {
    this.search()
  }

  itemClicked(item: any): void {
    throw new Error("Method not implemented.");
  }
  getSearchResults(searchString: string, page: number, pageSize: number): Promise<ISearchResults> {
    throw new Error("Method not implemented.");
  }
}