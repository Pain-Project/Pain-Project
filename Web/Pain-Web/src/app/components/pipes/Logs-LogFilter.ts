import { Pipe, PipeTransform } from '@angular/core';
import { Log } from "../../models/log.model";

@Pipe({ name: 'LogsLogFilter' })
export class LogsLogFilter implements PipeTransform {
  transform(log: Log[], searchText: string, filterText: string) {
    return log.filter( function (item: any) {
      if ((item.config_name.toLowerCase().includes(searchText.toLowerCase()) || item.client_name.toLowerCase().includes(searchText.toLowerCase()))
        && (filterText=='none' || filterText.toLowerCase()==item.status.toLowerCase()))
          return true;
      return false;
    });
  }
}
