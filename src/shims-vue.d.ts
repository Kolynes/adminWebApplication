
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

interface IToastObject {
  icon?: string;
  iconColor?: string;
  message?: string;
  loading?: boolean;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}

interface IConfirmObject {
  message?: string;
  yes?: string;
  no?: string;
  icon?: string;
  title?: string;
}

interface IAlertObject {
  message?: string;
  ok?: string;
}

declare var vueApp: Vue;
declare function toast(toatObject: IToastObject): void
declare function toast(toatObject: boolean): void
declare function confirm(confirmObject: IConfirmObject): Promise<boolean>;
declare function alert(alertObject: IAlertObject): void;
