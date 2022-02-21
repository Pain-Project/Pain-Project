interface Log {
  date : string;
  ipAddress: string;
  country: string;
}


export interface User {
  name : string;
  surname : string;
  loginName : string;
  createDate : string;
  logs : Log[];
}
