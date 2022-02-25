interface Destination {
  type: string;
  destination: string;
}
export class Config {
  public name : string = '';
  public create_date : string = '';
  public backup_type : string = '';
  public backup_format : string = '';
  public creator : string = '';
  public retention : string = '';
  public frequency : string = '';
  public PCs : string[] = [];
  public sources : string[] = [];
  public destinations : Destination[] = [];
}
