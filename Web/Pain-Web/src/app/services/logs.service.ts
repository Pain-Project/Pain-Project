import { Injectable } from '@angular/core';
import { Log } from "../models/log.model";

@Injectable({
  providedIn: 'root'
})

export class LogsService {
  private LOGS : Log[] = [
    { id: 0, client_name: 'PC01', config_name:'CONFIG1', create_date:'2010-10-10 06:12:31', status: 'OK', message: ''},
    { id: 15, client_name: 'PC11', config_name:'CONFIG5', create_date:'2010-10-10 12:48:35', status: 'NO RUN', message: 'Config no run'},
    { id: 36, client_name: 'PC10', config_name:'CONFIG13', create_date:'2010-10-10 23:56:52', status: 'NO RUN', message: 'Config no run'},
    { id: 256, client_name: 'PC56', config_name:'CONFIG9', create_date:'2010-10-10 05:23:59', status: 'ERROR', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus \n' +
        'maiores alias consequatur aut perferendis doloribus asperiores repellat. Mauris dictum facilisis augue. Praesent vitae arcu tempor neque \n' +
        'lacinia pretium. Pellentesque arcu. Aenean placerat. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui.'},
    { id: 112, client_name: 'PC560', config_name:'CONFIG195', create_date:'2010-10-10 8:15:49', status: 'OK', message: ''},
    { id: 0, client_name: 'PC01', config_name:'CONFIG1', create_date:'2010-10-10 06:12:31', status: 'OK', message: ''},
    { id: 15, client_name: 'PC11', config_name:'CONFIG5', create_date:'2010-10-10 12:48:35', status: 'NO RUN', message: 'Config no run'},
    { id: 36, client_name: 'PC10', config_name:'CONFIG13', create_date:'2010-10-10 23:56:52', status: 'NO RUN', message: 'Config no run'},
    { id: 19, client_name: 'PC102', config_name:'CONFIG3', create_date:'2010-10-10 20:56:59', status: 'ERROR', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus \n' +
        'maiores alias consequatur aut perferendis doloribus asperiores repellat. Mauris dictum facilisis augue. Praesent vitae arcu tempor neque \n' +
        'lacinia pretium. Pellentesque arcu. Aenean placerat. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui.'},
    { id: 112, client_name: 'PC560', config_name:'CONFIG195', create_date:'2010-10-10 8:15:49', status: 'OK', message: ''},
    { id: 0, client_name: 'PC01', config_name:'CONFIG1', create_date:'2010-10-10 06:12:31', status: 'OK', message: ''},
    { id: 15, client_name: 'PC11', config_name:'CONFIG5', create_date:'2010-10-10 12:48:35', status: 'NO RUN', message: 'Config no run'},
    { id: 36, client_name: 'PC10', config_name:'CONFIG13', create_date:'2010-10-10 23:56:52', status: 'NO RUN', message: 'Config no run'},
    { id: 88, client_name: 'PC666', config_name:'CONFIG2', create_date:'2010-10-10 8:12:59', status: 'ERROR', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus \n' +
        'maiores alias consequatur aut perferendis doloribus asperiores repellat. Mauris dictum facilisis augue. Praesent vitae arcu tempor neque \n' +
        'lacinia pretium. Pellentesque arcu. Aenean placerat. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui.'},
    { id: 112, client_name: 'PC560', config_name:'CONFIG195', create_date:'2010-10-10 8:15:49', status: 'OK', message: ''},
    { id: 0, client_name: 'PC01', config_name:'CONFIG1', create_date:'2010-10-10 06:12:31', status: 'OK', message: ''},
    { id: 15, client_name: 'PC11', config_name:'CONFIG5', create_date:'2010-10-10 12:48:35', status: 'NO RUN', message: 'Config no run'},
    { id: 36, client_name: 'PC10', config_name:'CONFIG13', create_date:'2010-10-10 23:56:52', status: 'NO RUN', message: 'Config no run'},
    { id: 999, client_name: 'PC456', config_name:'THIS', create_date:'2010-10-10 23:00:59', status: 'ERROR', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus \n' +
        'maiores alias consequatur aut perferendis doloribus asperiores repellat. Mauris dictum facilisis augue. Praesent vitae arcu tempor neque \n' +
        'lacinia pretium. Pellentesque arcu. Aenean placerat. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui.'},
    { id: 555, client_name: 'PC560', config_name:'CONFIG195', create_date:'2010-10-10 8:15:49', status: 'OK', message: ''},
  ];
  constructor() { }

  public findAllLogs() : Log[] {
    return this.LOGS;
  }
  public findAllErrors() : Log[] {
    return this.LOGS.filter(x => x.status=='ERROR');
  }
}
