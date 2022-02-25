import { Vue, Component, Watch } from "vue-property-decorator";
import CustomTable from "@/components/CustomTable.vue";
import VEmptyState from "@/vuetify-extensions/VEmptyState.vue"

export interface ITableHeader {
  text: string;
  value: string;
}

export interface ISearchResults<T> {
  items: T[];
  numberOfPages: number;
}

export interface ITableView<T> {
  headers: ITableHeader[];
  items: T[];
  itemClicked(item: T): void;
  getSearchResults(searchString: string, page: number, pageSize: number): Promise<ISearchResults<T>>;
}

@Component({
  components: {
    CustomTable,
    VEmptyState,
  }
})
export default class TableMixin<T> extends Vue implements ITableView<T> {
  headers: ITableHeader[] = [];
  items: T[] = [];

  searchString = "";
  loading = false;
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
    this.loading = true;
    const response = await this.getSearchResults(this.searchString, this.page, this.pageSize);
    this.loading = false;
    this.items = response.items;
    this.numberOfPages = response.numberOfPages;
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

  @Watch("orderType")
  onOrderTypeChanged() {
    this.search();
  }

  mounted() {
    this.search()
  }

  itemClicked(item: T): void {
    throw new Error("Method not implemented.");
  }
  getSearchResults(searchString: string, page: number, pageSize: number): Promise<ISearchResults<T>> {
    throw new Error("Method not implemented.");
  }
}