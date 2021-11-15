import { Component, Ref, Vue } from "vue-property-decorator";

export interface IFileGetter {
  getFile(
    accept?: string,
    maxSize?: number, 
    minSize?: number
  ): Promise<File | null>;

  getFiles(
    accept?: string, 
    maxSize?: number, 
    minSize?: number, 
    max?: number, 
    min?: number
  ): Promise<File[] | null>;
}

@Component
export default class FileGetter extends Vue implements IFileGetter {
  dialogVisible = false;
  files: File[] = [];
  resolve: Function | null = null;
  maxSize: number = Infinity;
  minSize: number = -Infinity;
  max: number = 1;
  min: number = 1;
  multiple = false;
  errors: [File, string][] = [];
  accept = "*"

  @Ref()
  fileField!: HTMLInputElement;

  toggleDialogVisible() {
    this.dialogVisible = !this.dialogVisible;
    if(!this.dialogVisible) {
      this.files = [];
      this.errors = [];
    }
  }

  async getFile(
    accept: string = "*", 
    maxSize: number = Infinity, 
    minSize: number = -Infinity
  ): Promise<File | null> {
    this.toggleDialogVisible();
    this.accept = accept;
    this.maxSize = maxSize;
    this.minSize = minSize;
    this.max = 1;
    this.min = 1;
    this.multiple = false;
    return new Promise((resolve, reject) => {
      this.resolve = () => {
        if(this.errors.length == 0 && this.files.length > 0)
          resolve(this.files![0]);
        else resolve(null);
      }
    }).then((value) => {
      this.toggleDialogVisible();
      return value as File | null;
    });
  }

  async getFiles(
    accept: string, 
    maxSize: number, 
    minSize: number, 
    max: number, 
    min: number
  ): Promise< File[] | null> {
    this.toggleDialogVisible();
    this.accept = accept;
    this.maxSize = maxSize;
    this.minSize = minSize;
    this.max = max;
    this.min = min;
    this.multiple = true;
    return new Promise((resolve, reject) => {
      this.resolve = () => {
        if(this.errors.length == 0)
          resolve(this.files);
      }
    });
  }

  openFromComputer() {
    this.fileField.click();
  }

  onFileFieldChange(files: FileList | null) {
    if(!this.multiple)
      this.files = [];
    if(files!.length + this.files.length < this.min) {
      alert({message: `Number of files should be at least ${this.min}`})
      return;
    }
    if(files!.length + this.files.length > this.max) {
      alert({message: `Number of files should be at most ${this.max}`})
      return;
    }
    for(var file of files!) {
      if(!new RegExp(this.accept).test(file.type)) {
        alert({ message: "file format is not accepted"});
        return;
      }
      this.files.push(file);
      if(file.size < this.minSize)
        this.errors.push([file, `Size should be at least ${this.fileSize(this.minSize)}`])
      else if(file.size > this.maxSize)
        this.errors.push([file, `Size should be at most ${this.fileSize(this.maxSize)}`])
    }
  }

  fileSize(bytes: number): string {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    let size = bytes;
    for (let i of sizes) {
      if (size / 1024 >= 1) {
        size /= 1024
      } else {
        return `${Math.round(size)} ${i}`;
      }
    }
    return "nil"
  }

  removeFile(indexToRemove: number) {
    this.files = this.files.filter((file, index) => index != indexToRemove)
  }

  errorForFile(file: File): string | undefined {
    const result = this.errors.find(element => file == element[0]);
    if(result !== undefined)
      return result[1];
    return undefined;
  }

  onDragOver(event: Event) {
    event.preventDefault();
  }
}
