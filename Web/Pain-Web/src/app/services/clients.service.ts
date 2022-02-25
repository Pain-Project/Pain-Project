import { Injectable } from '@angular/core';
import { Client } from "../models/client.model";

@Injectable({
  providedIn: 'root'
})

export class ClientsService {
  private CLIENTS : Client[] = [
    {
      name: 'PC1', active: true, ipAddress: '192.168.2.1', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL', name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations: [{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL', name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL', name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL', name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC2', active: false, ipAddress: '192.168.200.123', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC3', active: true, ipAddress: '192.168.2.1', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC3', active: true, ipAddress: '192.168.2.1', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC3', active: false, ipAddress: '192.168.2.1', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC3', active: true, ipAddress: '192.168.2.1', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC1', active: true, ipAddress: '192.168.2.1', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC2', active: false, ipAddress: '192.168.200.123', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC3', active: true, ipAddress: '192.168.2.1', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC3', active: true, ipAddress: '192.168.2.1', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC3', active: false, ipAddress: '192.168.2.1', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC3', active: true, ipAddress: '192.168.2.1', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },  ];
  constructor() { }
public findAllClients() : Client[] {
    return this.CLIENTS;
}

}
