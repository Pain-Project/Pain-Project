import { Injectable } from '@angular/core';
import { User } from "../models/user.model";


@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private USERS : User[] = [
    {email: '', password:'', reports:0, name: 'admin', surname: 'admin', loginName:'admin', createDate:'1.1.2001', logs: [
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '16.5.2021', ipAddress: '192.168.0.1', country: 'GR'},
        {date: '2.8.2022', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '20.10.2022', ipAddress: '192.168.0.1', country: 'CZ'},
      ]
    },
    {email: '', password:'', reports:0, name: 'Pavel', surname: 'Novak', loginName:'pavel123', createDate:'12.4.2012', logs: [
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '20.10.2022', ipAddress: '192.168.0.1', country: 'CZ'},
      ]
    },
    {email: '', password:'', reports:0, name: 'Foo', surname: 'Bar', loginName:'stringint', createDate:'0.0.0000', logs: [
        {date: 'DATE', ipAddress: 'ipLMAO', country: 'NULL'},
        {date: '20.10.2022', ipAddress: '192.168.0.1', country: 'CZ'},
      ]
    },
    {email: '', password:'', reports:0, name: 'pavel', surname: 'novak', loginName:'pavel123', createDate:'12.4.2012', logs: [
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '20.10.2022', ipAddress: '192.168.0.1', country: 'CZ'},
      ]
    },
    {email: '', password:'', reports:0, name: 'pavel', surname: 'novak', loginName:'pavel123', createDate:'12.4.2012', logs: [
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '20.10.2022', ipAddress: '192.168.0.1', country: 'CZ'},
      ]
    },
    {email: '', password:'', reports:0, name: 'admin', surname: 'admin', loginName:'admin', createDate:'1.1.2001', logs: [
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '16.5.2021', ipAddress: '192.168.0.1', country: 'GR'},
        {date: '2.8.2022', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '20.10.2022', ipAddress: '192.168.0.1', country: 'CZ'},
      ]
    },
    {email: '', password:'', reports:0, name: 'Pavel', surname: 'Novak', loginName:'pavel123', createDate:'12.4.2012', logs: [
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '20.10.2022', ipAddress: '192.168.0.1', country: 'CZ'},
      ]
    },
    {email: '', password:'', reports:0, name: 'Foo', surname: 'Bar', loginName:'stringint', createDate:'0.0.0000', logs: [
        {date: 'DATE', ipAddress: 'ipLMAO', country: 'NULL'},
        {date: '20.10.2022', ipAddress: '192.168.0.1', country: 'CZ'},
      ]
    },
    {email: '', password:'', reports:0, name: 'pavel', surname: 'novak', loginName:'pavel123', createDate:'12.4.2012', logs: [
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '20.10.2022', ipAddress: '192.168.0.1', country: 'CZ'},
      ]
    },
    {email: '', password:'', reports:0, name: 'pavel', surname: 'novak', loginName:'pavel123', createDate:'12.4.2012', logs: [
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '20.10.2022', ipAddress: '192.168.0.1', country: 'CZ'},
      ]
    },
    {email: '', password:'', reports:0, name: 'admin', surname: 'admin', loginName:'admin', createDate:'1.1.2001', logs: [
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '16.5.2021', ipAddress: '192.168.0.1', country: 'GR'},
        {date: '2.8.2022', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '20.10.2022', ipAddress: '192.168.0.1', country: 'CZ'},
      ]
    },
    {email: '', password:'', reports:0, name: 'Pavel', surname: 'Novak', loginName:'pavel123', createDate:'12.4.2012', logs: [
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '20.10.2022', ipAddress: '192.168.0.1', country: 'CZ'},
      ]
    },
    {email: '', password:'', reports:0, name: 'Foo', surname: 'Bar', loginName:'stringint', createDate:'0.0.0000', logs: [
        {date: 'DATE', ipAddress: 'ipLMAO', country: 'NULL'},
        {date: '20.10.2022', ipAddress: '192.168.0.1', country: 'CZ'},
      ]
    },
    {email: '', password:'', reports:0, name: 'pavel', surname: 'novak', loginName:'pavel123', createDate:'12.4.2012', logs: [
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '20.10.2022', ipAddress: '192.168.0.1', country: 'CZ'},
      ]
    },
    {email: '', password:'', reports:0, name: 'pavel', surname: 'novak', loginName:'pavel123', createDate:'12.4.2012', logs: [
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '20.10.2022', ipAddress: '192.168.0.1', country: 'CZ'},
      ]
    },
    {email: '', password:'', reports:0, name: 'admin', surname: 'admin', loginName:'admin', createDate:'1.1.2001', logs: [
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '16.5.2021', ipAddress: '192.168.0.1', country: 'GR'},
        {date: '2.8.2022', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '20.10.2022', ipAddress: '192.168.0.1', country: 'CZ'},
      ]
    },
    {email: '', password:'', reports:0, name: 'Pavel', surname: 'Novak', loginName:'pavel123', createDate:'12.4.2012', logs: [
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '20.10.2022', ipAddress: '192.168.0.1', country: 'CZ'},
      ]
    },
    {email: '', password:'', reports:0, name: 'Foo', surname: 'Bar', loginName:'stringint', createDate:'0.0.0000', logs: [
        {date: 'DATE', ipAddress: 'ipLMAO', country: 'NULL'},
        {date: '20.10.2022', ipAddress: '192.168.0.1', country: 'CZ'},
      ]
    },
    {email: '', password:'', reports:0, name: 'pavel', surname: 'novak', loginName:'pavel123', createDate:'12.4.2012', logs: [
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '20.10.2022', ipAddress: '192.168.0.1', country: 'CZ'},
      ]
    },
    {email: '', password:'', reports:0, name: 'pavel', surname: 'novak', loginName:'pavel123', createDate:'12.4.2012', logs: [
        {date: '12.4.2021', ipAddress: '192.168.0.1', country: 'CZ'},
        {date: '20.10.2022', ipAddress: '192.168.0.1', country: 'CZ'},
      ]
    },];
  constructor() { }
public findAllUsers() : User[] {
    return this.USERS;
}

}
