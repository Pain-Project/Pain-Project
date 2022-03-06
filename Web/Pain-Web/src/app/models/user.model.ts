interface Log {
  date : string;
  ipAddress : string;
  country : string;
}

export class User {
  public name : string = '';
  public surname : string = '';
  public loginName : string = '';
  public createDate : string = '';
  public email : string = '';
  public password : string = '';
  public reports : number = 1;
  public logs : Log[] = [];
}
