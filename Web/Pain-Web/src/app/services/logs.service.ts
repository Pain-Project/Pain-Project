import { Injectable } from '@angular/core';
import {Log} from "../models/log.model";

@Injectable({
  providedIn: 'root'
})

export class LogsService {
  private LOGS : Log[] = [
    {client_name: 'PC01', config_name:'CONFIG1', create_date:'19.2.2022 12:45', status: 'OK', message: ''},
    {client_name: 'PC11', config_name:'CONFIG5', create_date:'10.2.2022 00:00', status: 'NO RUN', message: 'Config no run'},
    {client_name: 'PC10', config_name:'CONFIG13', create_date:'26.12.2022 2:23', status: 'NO RUN', message: 'Config no run'},
    {client_name: 'PC99', config_name:'CONFIG1', create_date:'1.2.2022 0:45', status: 'ERROR', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus \n' +
        'maiores alias consequatur aut perferendis doloribus asperiores repellat. Mauris dictum facilisis augue. Praesent vitae arcu tempor neque \n' +
        'lacinia pretium. Pellentesque arcu. Aenean placerat. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui.'},
    {client_name: 'PC560', config_name:'CONFIG195', create_date:'1.1.2022 16:45', status: 'OK', message: ''},
  ];
  constructor() { }

  public findAllLogs() : Log[] {
    return this.LOGS;
  }
}
