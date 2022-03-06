import { Injectable } from '@angular/core';
import { Client } from "../models/client.model";

@Injectable({
  providedIn: 'root'
})

export class ClientsService {
  private CLIENTS : Client[] = [
    {
      name: 'PC25', active: true, ipAddress: '192.168.2.1', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL', name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations: [{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL', name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL', name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL', name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
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
      name: 'PC4', active: true, ipAddress: '192.168.2.1', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC5', active: false, ipAddress: '192.168.2.1', macAddress: '00:11:22:33:44:55:66:77',
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
      name: 'PC6', active: true, ipAddress: '192.168.2.1', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC7', active: true, ipAddress: '192.168.2.1', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC8', active: false, ipAddress: '192.168.200.123', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC9', active: true, ipAddress: '192.168.2.1', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC10', active: true, ipAddress: '192.168.2.1', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC11', active: false, ipAddress: '192.168.2.1', macAddress: '00:11:22:33:44:55:66:77',
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
      name: 'PC12', active: true, ipAddress: '192.168.2.1', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
        {backup_format: 'FULL',name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC13', active: false, ipAddress: '192.168.200.123', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC14', active: false, ipAddress: '192.168.200.123', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC15', active: false, ipAddress: '192.168.200.123', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC16', active: false, ipAddress: '192.168.200.123', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC17', active: false, ipAddress: '192.168.200.123', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC18', active: false, ipAddress: '192.168.200.123', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC19', active: false, ipAddress: '192.168.200.123', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC20', active: false, ipAddress: '192.168.200.123', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC21', active: false, ipAddress: '192.168.200.123', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC22', active: false, ipAddress: '192.168.200.123', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC23', active: false, ipAddress: '192.168.200.123', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC24', active: false, ipAddress: '192.168.200.123', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC25', active: false, ipAddress: '192.168.200.123', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC26', active: false, ipAddress: '192.168.200.123', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC27', active: false, ipAddress: '192.168.200.123', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC28', active: false, ipAddress: '192.168.200.123', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC29', active: false, ipAddress: '192.168.200.123', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC30', active: false, ipAddress: '192.168.200.123', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC31', active: false, ipAddress: '192.168.200.123', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC32', active: false, ipAddress: '192.168.200.123', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC33', active: false, ipAddress: '192.168.200.123', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC34', active: false, ipAddress: '192.168.200.123', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC35', active: false, ipAddress: '192.168.200.123', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
    {
      name: 'PC99', active: false, ipAddress: '192.168.200.123', macAddress: '00:11:22:33:44:55:66:77',
      configs:[
        {backup_format: 'FULL',name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[{type:' ', destination:' '}], sources:[''], frequency:''},
      ]
    },
  ];
  constructor() { }
public findAllClients() : Client[] {
    return this.CLIENTS.sort(function(a,b) {
      var nameA = a.name.toLowerCase();
      var nameB = b.name.toLowerCase();
      if (nameA < nameB)
        return -1;
      else if (nameA > nameB)
        return 1;
      else
        return 0;
    });
}

}
