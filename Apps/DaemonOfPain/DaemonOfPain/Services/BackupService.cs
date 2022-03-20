using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DaemonOfPain.Services
{
    public class BackupService
    {
        private DaemonDataService daemonDataService = new DaemonDataService();
        private MetadataService MdataService = new MetadataService();

        public void BackupSetup(int idConfig, Config config)//později config ostranit a odkomentovat řádek níže
        {
            //Config config = daemonDataService.GetConfigByID(idConfig);


            //statistiky
            //this.StatisticControl(config);

            foreach (var item in config.Destinations)
            {
                int[] retention = new int[2];
                string configDirPath = item.DestinationPath + "\\" + config.ConfigName;
                DirectoryInfo configDir = new DirectoryInfo(configDirPath);
                string backupPath = "";
                List<Metadata> Mlist = new List<Metadata>();

                if (Directory.Exists(configDirPath))//Existuje složka s configem?
                {



                    //U každého balíčku záloh najdi alespoň jeden soubor s metadaty a ulož do listu "Mlist"
                    foreach (var backupPackageDir in configDir.GetDirectories())
                    {
                        Mlist.AddRange(MdataService.MetaSearcher(backupPackageDir.FullName, true));//true znamená, že jakmile najde jeden jediný záznam, už nehledá dál
                    }




                    //Z vytvořeného listu "Mlist" vyber nejnovější záznam a získej z podsložek tohoto záznamu veškerá metadata
                    Metadata firstMdata = GetFirstOrLastMetadata(Mlist, true);
                    Metadata lastMdata = GetFirstOrLastMetadata(Mlist, false);
                    List<Metadata> SubCompleteMlist;

                    if (lastMdata.BackupType == _BackupType.FB)
                        SubCompleteMlist = MdataService.MetaSearcher(PathReturner(lastMdata.BackupPath, 1));
                    else
                        SubCompleteMlist = MdataService.MetaSearcher(PathReturner(lastMdata.BackupPath, 2));

                    retention = GetFirstOrLastMetadata(SubCompleteMlist, false).RetentionStats;//hodnota, která se předává funkci Backup() - aby věděla, jak má očíslovat nové složky


                    if (config.Retention[1] <= SubCompleteMlist.Count)//Je počet získaných metadat roven hodnotě v "Retention[1]" ?
                    {
                        if (config.Retention[0] <= Mlist.Count)//Je počet získaných metadat roven hodnotě v "Retention[0]" ?
                        {
                            if (lastMdata.BackupType == _BackupType.FB)//maže balíčky, pokud jich je už moc. Ta podmínka je tu proto, protože FB má vždy kratší cestu, než IN a DI
                                Directory.Delete(PathReturner(firstMdata.BackupPath, 1));
                            else
                                Directory.Delete(PathReturner(firstMdata.BackupPath, 2));
                        }
                    }
                    else//místo je, není nutné nic odstraňovat, v diagramu => "Toto je nyní "Aktuální složka" pro zálohu"
                    {
                        if (firstMdata.BackupType == _BackupType.FB)
                            throw new Exception();
                        backupPath = PathReturner(firstMdata.BackupPath, 1);
                    }
                }
                else
                {//první spuštění - vytvoří složku pro config
                    Directory.CreateDirectory(item.DestinationPath + "\\" + config.ConfigName);
                }





                if (backupPath == "")
                {// vytváření složky pro balíčky záloh
                    int packageRetention = 1;
                    if (Mlist.Count != 0)
                    {
                        Metadata last = GetFirstOrLastMetadata(Mlist, false);
                        packageRetention = last.RetentionStats[0];
                    }
                    
                    backupPath = configDir + "\\FB_" + DateTime.Now.ToString("d") + "_" + packageRetention;
                    if (config.BackupType == _BackupType.FB)
                        backupPath = configDir + "\\FB_" + DateTime.Now.ToString("d") + "_" + packageRetention;
                    else if (config.BackupType == _BackupType.IN)
                        backupPath = configDir + "\\IN_" + DateTime.Now.ToString("d") + "_" + packageRetention;
                    else if (config.BackupType == _BackupType.DI)
                        backupPath = configDir + "\\DI_" + DateTime.Now.ToString("d") + "_" + packageRetention;

                    Directory.CreateDirectory(backupPath);
                }

                Backup(config, backupPath, retention);
            }
            //if (config.RetentionStatistik[1] % config.Retention[1] == 1 && config.BackupType == _BackupType.DI)
            //{
            //    Snapshot newSnapshot = new Snapshot() { ConfigID = config.Id, Items = changesList };
            //    daemonDataService.WriteSnapshot(newSnapshot);
            //}
            //else if (config.BackupType == _BackupType.IN)
            //{

            //}


        }
        public void Backup(Config config, string path, int[] lastRetention)
        {
            Metadata meta;//vytvoření metadat
            if (lastRetention[1] == 0)
                meta = new Metadata(config.Id, config.ConfigName, path, DateTime.Now, config.BackupType, new int[2] { 1, 1 }); 
            else if (config.Retention[1] == lastRetention[1])
                meta = new Metadata(config.Id, config.ConfigName, path, DateTime.Now, config.BackupType, new int[2] { lastRetention[0]++, 1 }); 
            else
                meta = new Metadata(config.Id, config.ConfigName, path, DateTime.Now, config.BackupType, new int[2] { lastRetention[0], lastRetention[1]++ }); 



            if (config.BackupType != _BackupType.FB)//přidání cesty - vytváření složek pro konkrétní zálohy. FB nepotřebuje, jelikož jeho záloha je prána jako balíček záloh.
                path = path + "\\" + DateTime.Now.ToString("d") + "_" + DateTime.Now.ToString("h") + "." + DateTime.Now.ToString("m");

            
            
            foreach (var item in config.Sources)
            {
                //vytváří chngesList a sbírá medadata
                Snapshot lastSnapshot = daemonDataService.GetSnapshotByID(config.Id);
                List<SnapshotItem> newSnapshotList = new List<SnapshotItem>();
                newSnapshotList = SnapshotItemFilter(newSnapshotList);
                ChangeReport report = GetChanges(lastSnapshot.Sources[item].Items, newSnapshotList);
                List<SnapshotItem> changesList = report.SnapshotItem;
                changesList = SnapshotItemFilter(changesList);
                meta.Items.AddRange(report.MetadataItem);

                //nutno k cestě přidat název zdoje//asi už ne

                string[] parts = item.Split("\\");
                string newPath = parts[parts.Length - 1];
                while (Directory.Exists(newPath))
                    newPath += "_1";
                DoBackup(changesList, path+"\\"+ newPath);

            }

        }
        public void DoBackup(List<SnapshotItem> changesList, string path)
        {
            CreateDir(path);
            foreach (var item in changesList)
            {
                if (item.ItemType == _ItemType.FILE)
                {
                    File.Copy(item.ItemPath, path + item.ItemPath.Replace(item.Root, ""));

                }
                else
                {
                    CopyDir(item.ItemPath, path + item.ItemPath.Replace(item.Root, ""));
                }
            }
        }
        private void CreateDir(string path)
        {
            DirectoryInfo info = new DirectoryInfo(path);
            if (!info.Exists)
            {
                Directory.CreateDirectory(info.FullName);
            }
        }
        private void CopyDir(string source, string destination)
        {
            DirectoryInfo sourceDir = new DirectoryInfo(source);
            CreateDir(destination);
            foreach (var item in sourceDir.GetFiles())
            {
                item.CopyTo(destination +"\\"+ item.Name);
            }
            foreach (var item in sourceDir.GetDirectories())
            {
                CopyDir(item.FullName, destination + "\\" + item.Name);
            }
        }
        private List<SnapshotItem> SnapshotItemFilter(List<SnapshotItem> items)
        {
            Dictionary<string, SnapshotItem> itemsDic = new Dictionary<string, SnapshotItem>();
            foreach (var item in items)
            {
                itemsDic.Add(item.ItemPath, item);
            }
            for (int i = 0; i < itemsDic.Count; i++)
            {
                var key = itemsDic.ElementAt(i);
                string[] parts = key.Value.ItemPath.Split('\\');
                string path = key.Value.ItemPath.Replace("\\"+parts[parts.Length - 1], "");
                if(itemsDic.ContainsKey(path))
                {
                    i--;
                    itemsDic.Remove(path);
                }
            }
            List<SnapshotItem> newItems = new List<SnapshotItem>();
            foreach (var item in itemsDic)
            {
                newItems.Add(item.Value);
            }
            return newItems;
        }

        public List<SnapshotItem> GetSnapshot(string path)
        {
            return GetSnapshotCycle(path, path);
        }
        private List<SnapshotItem> GetSnapshotCycle(string path, string root, List<SnapshotItem> dirEntry = null)
        {
            if (dirEntry == null)
            {
                dirEntry = new List<SnapshotItem>();
            }
            DirectoryInfo dir = new DirectoryInfo(path);
            DirectoryInfo[] subDirs = dir.GetDirectories();
            FileInfo[] files = dir.GetFiles();
            foreach (var item in subDirs)
            {
                dirEntry.Add(new SnapshotItem(item.FullName, _ItemType.FOLDER, Convert.ToString(File.GetLastWriteTime(item.FullName)), root));
                GetSnapshotCycle(item.FullName, root, dirEntry);
            }
            foreach (var item in files)
            {
                dirEntry.Add(new SnapshotItem(item.FullName, _ItemType.FILE, Convert.ToString(File.GetLastWriteTime(item.FullName)), root));
            }
            return dirEntry;
        }
        public ChangeReport GetChanges(List<SnapshotItem> source, List<SnapshotItem> snapshotToCompare)
        {
            Dictionary<string, SnapshotItem> sourceDic = new Dictionary<string, SnapshotItem>();
            Dictionary<string, SnapshotItem> compareDic = new Dictionary<string, SnapshotItem>();
            ChangeReport report = new ChangeReport();
            foreach (var item in source)
            {
                sourceDic.Add(item.ItemPath, item);
            }
            foreach (var item in snapshotToCompare)
            {
                compareDic.Add(item.ItemPath, item);
            }
            foreach (var item in snapshotToCompare)
            {
                try
                {
                    SnapshotItem s = sourceDic[item.ItemPath];
                    if (item.ItemType != _ItemType.FOLDER && item.Date != s.Date)
                    {
                        report.SnapshotItem.Add(item);
                        report.MetadataItem.Add(new MetadataItem(item.ItemPath, _itemChange.EDITED));
                    }

                    compareDic.Remove(item.ItemPath);
                }
                catch
                {
                    //zde by bylo možné odchytávat soubory, které byly odstraněny
                    report.MetadataItem.Add(new MetadataItem(item.ItemPath, _itemChange.REMOVED));
                }
            }
            foreach (var item in compareDic)
            {
                report.SnapshotItem.Add(item.Value);
                report.MetadataItem.Add(new MetadataItem(item.Value.ItemPath, _itemChange.ADDED));
            }
            return report;
        }

        //public void StatisticControl(Config config)
        //{

        //    if (config.BackupType == _BackupType.FB)
        //    {
        //        config.RetentionStatistik[0]++;
        //        Console.WriteLine("FB:");

        //        if (config.RetentionStatistik[0] > config.Retention[0])
        //        {
        //            foreach (Destination item in config.Destinations)
        //            {
        //                if (item.DestinationType == DestType.DRIVE)
        //                {

        //                    DirectoryInfo dir = new DirectoryInfo(item.DestinationPath);
        //                    DirectoryInfo[] dirs = dir.GetDirectories();

        //                    string path = "";
        //                    foreach (DirectoryInfo directory in dirs)
        //                    {
        //                        string[] subPaths = directory.FullName.Split('_');
        //                        if (subPaths[0].Contains("FB") && 
        //                            subPaths[1] == config.ConfigName && 
        //                            subPaths[subPaths.Length - 1] == (config.RetentionStatistik[0] - config.Retention[0]).ToString())
        //                            path = String.Join("_", subPaths);

        //                        continue;
        //                    }

        //                    Console.WriteLine(path);

        //                    DirectoryInfo dirInfo = new DirectoryInfo(path);
        //                    if (dirInfo.Exists)
        //                    {
        //                        dirInfo.Delete(true);
        //                        Console.WriteLine("Deleted");
        //                    }
        //                    else
        //                    {
        //                        Console.WriteLine("Not found");
        //                    }
        //                }
        //                else
        //                {
        //                    //FTP
        //                }
        //            }
        //        }
        //        Console.WriteLine(config.Retention[0]);
        //        Console.WriteLine(config.RetentionStatistik[0]);
        //    }
        //    else
        //    {
        //        config.RetentionStatistik[1]++;
        //        Console.WriteLine("DI / IN:");
        //        if (config.RetentionStatistik[1] % (config.Retention[1]) == 1)
        //        {
        //            config.RetentionStatistik[0]++;


        //            Snapshot newSnap = new Snapshot() { ConfigID = config.Id};
        //            this.daemonDataService.WriteSnapshot(newSnap);
        //            Console.WriteLine("Snapshot created");

        //            if (config.RetentionStatistik[0] > config.Retention[0])
        //            {
        //                foreach (Destination item in config.Destinations)
        //                {
        //                    if (item.DestinationType == DestType.DRIVE)
        //                    {
        //                        DirectoryInfo dir = new DirectoryInfo(item.DestinationPath);
        //                        DirectoryInfo[] dirs = dir.GetDirectories();

        //                        string path = "";
        //                        foreach (DirectoryInfo directory in dirs)
        //                        {
        //                            string[] subPaths = directory.FullName.Split('_');
        //                            if ((subPaths[0].Contains("DI") || subPaths[0].Contains("IN")) &&
        //                                subPaths[1] == config.ConfigName &&
        //                                subPaths[subPaths.Length - 1] == (config.RetentionStatistik[0] - config.Retention[0]).ToString())
        //                                path = String.Join("_", subPaths);

        //                            continue;
        //                        }

        //                        Console.WriteLine(path);

        //                        DirectoryInfo dirInfo = new DirectoryInfo(path);

        //                        if (dirInfo.Exists)
        //                        {
        //                            dirInfo.Delete(true);
        //                            Console.WriteLine("Deleted");
        //                        }
        //                        else
        //                        {
        //                            Console.WriteLine("Not found");
        //                        }
        //                    }
        //                    else
        //                    {
        //                        //FTP
        //                    }
        //                }
        //            }
        //        }
        //        Console.WriteLine(config.Retention[0] + " / " + config.Retention[1]);
        //        Console.WriteLine(config.RetentionStatistik[0] + " / " + config.RetentionStatistik[1]);
        //    }
        //    this.daemonDataService.WriteAllConfigs(new List<Config>() { config });
        //}
        private string PathReturner(string path, int steps)//již funkční//vrátí se o určitý počet složek zpět. př. PathReturner(@"C:\Users\František\Desktop\",2) se vrátí o dvě složky zpět - vrátí => C:\Users
        {
            string[] parts = path.Split("\\");
            for (int i = 0; i < steps; i++)
            {
                parts[parts.Length - i - 1] = "";
            }
            string st = string.Join("\\", parts);
            return st.Trim('\\');
        }
        private Metadata GetFirstOrLastMetadata(List<Metadata> Mlist, bool first) //z listu metadat vrátí první nebo poslední Metadata podle Datumů v nich uloženýćh
        {
            if (Mlist.Count != 0)
            {
                Metadata result = null;
                foreach (var meta in Mlist)
                {
                    if (first)
                    {
                        int resultNumber = DateTime.Compare(result.CreateDate, meta.CreateDate);
                        if (resultNumber < 0)
                            result = meta;
                    }
                    else
                    {
                        int resultNumber = DateTime.Compare(result.CreateDate, meta.CreateDate);
                        if (resultNumber > 0)
                            result = meta;
                    }
                }
                return result;
            }
            return null;
        }
    }
}
