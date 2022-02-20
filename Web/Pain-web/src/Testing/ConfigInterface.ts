export interface Config {
  name: string;
  create_date: string;
  backup_type: string;
  creator: string;
  retention: string;
  frequency: string;
  PCs: string[];
  sources: string[];
  destinations: string[];
}
