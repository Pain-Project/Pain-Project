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

        public void BackupSetup(int idConfig)
        {
            Config config = daemonDataService.GetConfigByID(idConfig);
            //statistiky
            this.StatisticControl(config);


            //Backup(config);

        }
        public void Backup(Config config)
        {
            Snapshot lastSnapshot = daemonDataService.GetSnapshotByID(config.Id);
            List<SnapshotItem> newSnapshotList = new List<SnapshotItem>();
            foreach (var item in config.Sources)
            {
                newSnapshotList.AddRange(GetSnapshot(item));
            }

            List<SnapshotItem> changesList = GetChanges(lastSnapshot.Items, newSnapshotList);
            changesList = SnapshotItemFilter(changesList);

            string folderPath = "";
            switch (config.BackupType)
            {
                case _BackupType.FB:
                    folderPath = @"\FB_" + config.ConfigName + "_" + DateTime.Now.ToString("s") + "_" + config.RetentionStatistik[0];
                    break;
                case _BackupType.DI:
                    folderPath = @"\DI_" + config.ConfigName + "_" + DateTime.Now.ToString("s") + "_" + config.RetentionStatistik[0];
                    break;
                case _BackupType.IN:
                    folderPath = @"\IN_" + config.ConfigName + "_" + DateTime.Now.ToString("s") + "_" + config.RetentionStatistik[0];
                    break;
            }

            foreach (var item in config.Destinations)
            {
                DoBackup(changesList, item.DestinationPath + folderPath);
            }
            if (config.RetentionStatistik[1] % config.Retention[1] == 0 && config.BackupType == _BackupType.DI)
            {
                Snapshot newSnapshot = new Snapshot() { ConfigID = config.Id, Items = changesList };
                daemonDataService.WriteSnapshot(newSnapshot);
            }
            else if (config.BackupType == _BackupType.IN)
            {

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
        public List<SnapshotItem> GetChanges(List<SnapshotItem> source, List<SnapshotItem> snapshotToCompare)
        {
            Dictionary<string, SnapshotItem> sourceDic = new Dictionary<string, SnapshotItem>();
            Dictionary<string, SnapshotItem> compareDic = new Dictionary<string, SnapshotItem>();
            List<SnapshotItem> changedItems = new List<SnapshotItem>();
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
                        changedItems.Add(item);
                    }

                    compareDic.Remove(item.ItemPath);
                }
                catch
                {
                    //zde by bylo možné odchytávat soubory, které byly odstraněny
                }
            }
            foreach (var item in compareDic)
            {
                changedItems.Add(item.Value);
            }
            return changedItems;
        }

        public void StatisticControl(Config config)
        {
            if (config.BackupType == _BackupType.FB)
            {
                config.RetentionStatistik[0]++;
                Console.WriteLine("FB:");

                if (config.RetentionStatistik[0] > config.Retention[0])
                {
                    foreach (Destination item in config.Destinations)
                    {
                        if (item.DestinationType == DestType.DRIVE)
                        {

                            string path = @$"{item.DestinationPath}\FB_{config.ConfigName}_{DateTime.Now.ToString("d")}_{config.RetentionStatistik[0] - config.Retention[0]}\";
                            Console.WriteLine(path);

                            DirectoryInfo dirInfo = new DirectoryInfo(path);
                            if (dirInfo.Exists)
                            {
                                //dirInfo.Delete(true);
                                Console.WriteLine("Deleted");
                            }
                            else
                            {
                                Console.WriteLine("Not found");
                            }
                        }
                        else
                        {
                            //FTP
                        }
                    }
                }
                Console.WriteLine(config.Retention[0]);
                Console.WriteLine(config.RetentionStatistik[0]);
            }
            else
            {
                config.RetentionStatistik[1]++;
                Console.WriteLine("DI / IN:");
                if (config.RetentionStatistik[1] % (config.Retention[1]) == 1)
                {
                    config.RetentionStatistik[0]++;


                    Snapshot newSnap = new Snapshot() { ConfigID = config.Id};
                    this.daemonDataService.WriteSnapshot(newSnap);
                    Console.WriteLine("Snapshot created");

                    if (config.RetentionStatistik[0] > config.Retention[0])
                    {
                        foreach (Destination item in config.Destinations)
                        {
                            if (item.DestinationType == DestType.DRIVE)
                            {

                                string path;
                                if (config.BackupType == _BackupType.IN)
                                {
                                    path = @$"{item.DestinationPath}\IN_{config.ConfigName}_{DateTime.Now.ToString("d")}_{config.RetentionStatistik[0] - config.Retention[0]}\";
                                }
                                else
                                {
                                    path = @$"{item.DestinationPath}\DI_{config.ConfigName}_{DateTime.Now.ToString("d")}_{config.RetentionStatistik[0] - config.Retention[0]}\";
                                }
                                Console.WriteLine(path);

                                DirectoryInfo dirInfo = new DirectoryInfo(path);

                                if (dirInfo.Exists)
                                {
                                    //dirInfo.Delete(true);
                                    Console.WriteLine("Deleted");
                                }
                                else
                                {
                                    Console.WriteLine("Not found");
                                }
                            }
                            else
                            {
                                //FTP
                            }
                        }
                    }
                }
                Console.WriteLine(config.Retention[0] + " / " + config.Retention[1]);
                Console.WriteLine(config.RetentionStatistik[0] + " / " + config.RetentionStatistik[1]);
            }
            this.daemonDataService.WriteAllConfigs(new List<Config>() { config });
        }
    }
}
