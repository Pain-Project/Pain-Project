import { Injectable } from '@angular/core';
import { Config } from "../models/config.model";


@Injectable({
  providedIn: 'root'
})

export class ConfigsService {
  private CONFIGS : Config[] = [
    { backup_format:'FULL', name:'config1', backup_type: 'ARCHIVE', create_date: '15.1.2021', creator: 'Pepa', PCs:['PC01','PC12'], retention:'1/,1', destinations: [{type: 'FTP', destination:'D:/Data'},{type: 'FTP', destination:'D:/Data'},{type: 'FTP', destination:'D:/Data'},], frequency:' * * * * * ', sources: ['C:/Users/Desktop','C:/ProgramFiles']},
    { backup_format:'FULL', name:'config2', backup_type: 'ARCHIVE', create_date: '25.1.2021', creator: 'Alfons', PCs:['PC23','PC12'], retention:'1/,1', destinations: [{type: 'FTP', destination:'D:/Data'},], frequency:' * * * * * ', sources: ['C:/Users/Desktop','C:/ProgramFiles','C:/ProgramFiles','C:/ProgramFiles','C:/ProgramFiles','C:/ProgramFiles']},
    { backup_format:'FULL', name:'config3', backup_type: 'ARCHIVE', create_date: '15.2.2021', creator: 'Jakub', PCs:['PC11','PC12', 'PC13', 'PC13', 'PC13', 'PC13', 'PC13'], retention:'1/,1', destinations: [{type: 'FTP', destination:'D:/Data'},], frequency:' * * * * * ', sources: ['C:/Users/Desktop','C:/ProgramFiles']},
    { backup_format:'FULL', name:'config4', backup_type: 'ARCHIVE', create_date: '15.1.2011', creator: 'Admin', PCs:['PC01'], retention:'1/,1', destinations: [{type: 'FTP', destination:'D:/Data'},{type: 'FTP', destination:'D:/Data'},], frequency:' * * * * * ', sources: ['C:/Users/Desktop','C:/ProgramFiles']},
    { backup_format:'FULL', name:'adasda', backup_type: 'ARCHIVE', create_date: '15.1.2011', creator: 'Admin', PCs:['PC01'], retention:'1/,1', destinations: [{type: 'FTP', destination:'D:/Data'},{type: 'FTP', destination:'D:/Data'},], frequency:' * * * * * ', sources: ['C:/Users/Desktop','C:/ProgramFiles']},
    { backup_format:'FULL', name:'poslední', backup_type: 'ARCHIVE', create_date: '15.1.2011', creator: 'Admin', PCs:['PC01'], retention:'1/,1', destinations: [{type: 'FTP', destination:'D:/Data'},{type: 'FTP', destination:'D:/Data'},{type: 'FTP', destination:'D:/Data'},{type: 'FTP', destination:'D:/Data'},{type: 'FTP', destination:'D:/Data'},{type: 'FTP', destination:'D:/Data'},{type: 'FTP', destination:'D:/Data'},], frequency:' * * * * * ', sources: ['C:/Users/Desktop','C:/ProgramFiles','C:/ProgramFiles']},
  ];
  constructor() { }
public findAllConfigs() : Config[] {
    return this.CONFIGS;
}

}
