import { Client } from "./ClientInterface";
export const CLIENTS: Client[] = [
  {
    name: 'PC1', active: true, ip_Address: '192.168.2.1', mac_Address: '00:11:22:33:44:55:66:77',
    configs:[
      {name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
    ]
  },
  {
    name: 'PC2', active: false, ip_Address: '192.168.200.123', mac_Address: '00:11:22:33:44:55:66:77',
    configs:[
      {name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
    ]
  },
  {
    name: 'PC3', active: true, ip_Address: '192.168.2.1', mac_Address: '00:11:22:33:44:55:66:77',
    configs:[
      {name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
    ]
  },
  {
    name: 'PC3', active: true, ip_Address: '192.168.2.1', mac_Address: '00:11:22:33:44:55:66:77',
    configs:[
      {name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
    ]
  },
  {
    name: 'PC3', active: false, ip_Address: '192.168.2.1', mac_Address: '00:11:22:33:44:55:66:77',
    configs:[
      {name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
    ]
  },
  {
    name: 'PC3', active: true, ip_Address: '192.168.2.1', mac_Address: '00:11:22:33:44:55:66:77',
    configs:[
      {name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
    ]
  },
  {
    name: 'PC1', active: true, ip_Address: '192.168.2.1', mac_Address: '00:11:22:33:44:55:66:77',
    configs:[
      {name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
    ]
  },
  {
    name: 'PC2', active: false, ip_Address: '192.168.200.123', mac_Address: '00:11:22:33:44:55:66:77',
    configs:[
      {name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
    ]
  },
  {
    name: 'PC3', active: true, ip_Address: '192.168.2.1', mac_Address: '00:11:22:33:44:55:66:77',
    configs:[
      {name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
    ]
  },
  {
    name: 'PC3', active: true, ip_Address: '192.168.2.1', mac_Address: '00:11:22:33:44:55:66:77',
    configs:[
      {name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
    ]
  },
  {
    name: 'PC3', active: false, ip_Address: '192.168.2.1', mac_Address: '00:11:22:33:44:55:66:77',
    configs:[
      {name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
    ]
  },
  {
    name: 'PC3', active: true, ip_Address: '192.168.2.1', mac_Address: '00:11:22:33:44:55:66:77',
    configs:[
      {name: 'config1', PCs:['pc1'], create_date:'15.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config2', PCs:['pc1', 'pc2'], create_date:'15.1.2022', creator:'Admin', backup_type:'ARCHIVE', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config5', PCs:['pc1', 'pc2'], create_date:'1.1.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
      {name: 'config1', PCs:['pc1', 'pc2', 'pc2', 'pc2', 'pc2'], create_date:'15.12.2022', creator:'Admin123', backup_type:'Plain text', retention:'', destinations:[''], sources:[''], frequency:''},
    ]
  },
]

