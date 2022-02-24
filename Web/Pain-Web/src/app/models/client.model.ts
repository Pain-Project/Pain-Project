import { Config } from "./config.model";

export class Client {
  public name : string = '';
  public active : boolean = false;
  public ipAddress : string = '';
  public macAddress : string = '';
  public configs : Config[] = [];
}
