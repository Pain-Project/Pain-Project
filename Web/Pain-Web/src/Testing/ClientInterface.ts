import {Config} from "./ConfigInterface";

export interface Client {
  name: string;
  active: boolean;
  ip_Address: string;
  mac_Address: string;
  configs: Config[];
}
