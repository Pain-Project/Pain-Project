import { Injectable } from '@angular/core';
import { Config } from "../models/config.model";


@Injectable({
  providedIn: 'root'
})

export class ConfigsService {
  private CONFIGS : Config[] = [
    { name:'config1', backup_type: 'ARCHIVE', create_date: '15.1.2021', creator: 'Pepa', PCs:['PC01','PC12'], retention:'1/,1', destinations: ['D:/Data', 'FTP://'], frequency:' * * * * * ', sources: ['C:/Users/Desktop','C:/ProgramFiles']},
    { name:'config2', backup_type: 'ARCHIVE', create_date: '25.1.2021', creator: 'Alfons', PCs:['PC23','PC12'], retention:'1/,1', destinations: ['D:/Data', 'FTP://'], frequency:' * * * * * ', sources: ['C:/Users/Desktop','C:/ProgramFiles','C:/ProgramFiles','C:/ProgramFiles','C:/ProgramFiles','C:/ProgramFiles']},
    { name:'config3', backup_type: 'ARCHIVE', create_date: '15.2.2021', creator: 'Jakub', PCs:['PC11','PC12', 'PC13', 'PC13', 'PC13', 'PC13', 'PC13'], retention:'1/,1', destinations: ['D:/Data', 'FTP://'], frequency:' * * * * * ', sources: ['C:/Users/Desktop','C:/ProgramFiles']},
    { name:'config4', backup_type: 'ARCHIVE', create_date: '15.1.2011', creator: 'Admin', PCs:['PC01'], retention:'1/,1', destinations: ['D:/Data', 'FTP://'], frequency:' * * * * * ', sources: ['C:/Users/Desktop','C:/ProgramFiles']},
    { name:'adasda', backup_type: 'ARCHIVE', create_date: '15.1.2011', creator: 'Admin', PCs:['PC01'], retention:'1/,1', destinations: ['D:/Data', 'FTP://'], frequency:' * * * * * ', sources: ['C:/Users/Desktop','C:/ProgramFiles']},
    { name:'poslední', backup_type: 'ARCHIVE', create_date: '15.1.2011', creator: 'Admin', PCs:['PC01'], retention:'1/,1', destinations: ['D:/Data', 'FTP://','C:/ProgramFiles','C:/ProgramFiles','C:/ProgramFiles','C:/ProgramFiles','C:/ProgramFiles'], frequency:' * * * * * ', sources: ['C:/Users/Desktop','C:/ProgramFiles','C:/ProgramFiles']},
  ];
  constructor() { }
public findAllConfigs() : Config[] {
    return this.CONFIGS;
}

}
