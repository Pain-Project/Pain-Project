import { Pipe, PipeTransform } from '@angular/core';
import { Client } from "../../models/client.model";

@Pipe({ name: 'ConfigsClientSearch' })
export class ConfigsClientSearch implements PipeTransform {
  transform(clients: Client[], searchText: string) {
    return clients.filter( function (item: any) {
      return (item.name.toLowerCase().includes(searchText.toLowerCase()));
    });
  }
}
