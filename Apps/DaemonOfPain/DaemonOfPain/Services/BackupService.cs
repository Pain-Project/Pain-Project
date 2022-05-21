using DaemonOfPain.Components;
using Quartz;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace DaemonOfPain.Services
{
    public class BackupService : IJob
    {
        private MetadataService MdataService = new MetadataService();
        private List<Metadata> SubCompleteMlist = new List<Metadata>();
        private HeapManager HeapManager = new HeapManager();

        private int GetConfigId(List<Tasks> tasks)
        {
            int id = tasks[0].IdConfig;
            return id;
        }
        private void ConfigCheck(Config config)
        {
            string[] parts = config.Cron.Split(' ');
            if (parts.Length != 5)
                throw new Exception("Invalid cron!");

            if (!Regex.IsMatch(parts[0], @"(^\*$)|(^[0-5]?[0-9](-[0-5]?[0-9])?$)|(^[0-5]?[0-9]/[0-9]*$)|(^[0-5]?[0-9](,[0-5]?[0-9])+$)"))
                throw new Exception("Invalid cron!");
            if (!Regex.IsMatch(parts[0], @"(^\*$)|(^(([0-1]?[0-9])|(2[0-3]))(-(([0-1]?[0-9])|(2[0-3])))?$)|(^(([0-1]?[0-9])|(2[0-3]))/[0-9]*$)|(^(([0-1]?[0-9])|(2[0-3]))(,(([0-1]?[0-9])|(2[0-3])))+$)"))
                throw new Exception("Invalid cron!");
            if (!Regex.IsMatch(parts[0], @"(^\*$)|(^(([0-2]?[0-9])|(3[0-1]))(-(([0-2]?[0-9])|(3[0-1])))?$)|(^(([0-2]?[0-9])|(3[0-1]))/[0-9]*$)|(^(([0-2]?[0-9])|(3[0-1]))(,(([0-2]?[0-9])|(3[0-1])))+$)"))
                throw new Exception("Invalid cron!");
            if (!Regex.IsMatch(parts[0], @"(^\*$)|(^(([0-9])|(1[0-2]))(-(([0-9])|(1[0-2])))?$)|(^(([0-9])|(1[0-2]))/[0-9]*$)|(^(([0-9])|(1[0-2]))(,(([0-9])|(1[0-2])))+$)"))
                throw new Exception("Invalid cron!");
            if (!Regex.IsMatch(parts[0], @"(^\*$)|(^[0-6](-[0-6])?$)|(^[0-6]/[0-9]*$)|(^[0-6](,[0-6])+$)"))
                throw new Exception("Invalid cron!");

            if (config.Retention[0] <= 0 || config.Retention[1] <= 0)
                throw new Exception("Invalid retention!");

            foreach (var item in config.Sources)
            {
                if (!Directory.Exists(item))
                    throw new Exception("Source: " + item + " does not exist!");
            }

            List<string> checkList = new List<string>();
            foreach (var item in config.Sources)
            {
                string[] dirs = item.Split('\\');
                if (checkList.Contains(dirs[dirs.Length - 1]))
                    throw new Exception("A duplicate source folder name: " + item);
                checkList.Add(item);
            }
        }
        public void BackupSetup(List<Tasks> tasks)
        {
            Config config = Application.DataService.GetConfigByID(GetConfigId(tasks));
            //ConfigCheck(config);


            foreach (var item in config.Destinations)
            {
                if (item.DestinationType == DestType.FTP)
                    this.FtpPrepare(config, item.DestinationPath);
                else
                    FilePrepare(config, item.DestinationPath);
            }

            HeapManager.SaveChanges();

        }
        private void FtpPrepare(Config config, string path)
        {
            FtpConfig ftpConfig = new FtpConfig(path);
            FtpService service = new FtpService(ftpConfig);
            string configPath = ftpConfig.BackupFolder + '/' + config.Name;
            string backupPath = "";

            if (HeapManager.ExistConfig(config.Id))
            {
                Metadata firstMdata = HeapManager.GetFirstBackup(ftpConfig.BackupFolder, config.Id);
                Metadata lastMdata = HeapManager.GetLastBackup(ftpConfig.BackupFolder, config.Id);

                if (config.Retention[1] <= HeapManager.GetListOfBackups(ftpConfig.BackupFolder, config.Id).Count)//Je počet získaných metadat roven hodnotě v "Retention[1]" ?
                {
                    if (config.Retention[0] <= HeapManager.GetPackageCount(ftpConfig.BackupFolder, config.Id))//Je počet získaných metadat roven hodnotě v "Retention[0]" ?
                    {
                        service.DeleteDir(firstMdata.BackupPath);
                        //Directory.Delete(firstMdata.BackupPath, true);//maže balíčky, pokud jich je už moc.
                        HeapManager.DeleteOldestPackage(ftpConfig.BackupFolder, config.Id);
                    }
                }
                else//místo je, není nutné nic odstraňovat, v diagramu => "Toto je nyní "Aktuální složka" pro zálohu"
                {
                    if (firstMdata.BackupType == _BackupType.FB)
                        throw new Exception();
                    backupPath = lastMdata.BackupPath;
                }
            }
            else
            {
                if (!service.DirExists(configPath))
                    service.CreateDir(configPath);
            }

            if (backupPath == "")
            {
                Snapshot snapshot = new Snapshot() { ConfigID = config.Id };
                Application.DataService.WriteSnapshot(snapshot);

                int packageRetention = 1;
                if (HeapManager.ExistConfig(config.Id))
                {
                    Metadata last = HeapManager.GetLastBackup(ftpConfig.BackupFolder, config.Id);
                    packageRetention = last.RetentionStats[0];
                    packageRetention++;
                }

                backupPath = configPath + "/FB_" + DateTime.Now.ToString("d") + "_" + packageRetention;
                if (config.BackupType == _BackupType.IN)
                    backupPath = configPath + "/IN_" + DateTime.Now.ToString("d") + "_" + packageRetention;
                else if (config.BackupType == _BackupType.DI)
                    backupPath = configPath + "/DI_" + DateTime.Now.ToString("d") + "_" + packageRetention;

                this.SubCompleteMlist.Clear();

                service.CreateDir(backupPath);
            }
            int[] retention = new int[2];
            {
                Metadata last = HeapManager.GetLastBackup(ftpConfig.BackupFolder, config.Id);
                if (last != null)
                    retention = last.RetentionStats;
            }
            FtpBackup(service, config, backupPath, retention, ftpConfig.BackupFolder);
        }

        private void FtpBackup(FtpService service, Config config, string path, int[] lastRetention, string actualDestination)
        {
            Metadata meta;//vytvoření metadat
            if (lastRetention[1] == 0)
                meta = new Metadata(config.Id, config.Name, path, DateTime.Now, config.BackupType, new int[2] { 1, 1 });
            else if (config.Retention[1] == lastRetention[1])
                meta = new Metadata(config.Id, config.Name, path, DateTime.Now, config.BackupType, new int[2] { lastRetention[0] + 1, 1 });
            else
                meta = new Metadata(config.Id, config.Name, path, DateTime.Now, config.BackupType, new int[2] { lastRetention[0], lastRetention[1] + 1 });

            if (config.BackupType != _BackupType.FB)
            {//přidání cesty - vytváření složek pro konkrétní zálohy. FB nepotřebuje, jelikož jeho záloha je brána jako balíček záloh.

                path = path + "/" + DateTime.Now.ToString("d") + DateTime.Now.ToString("_H.mm.ss");
            }
            Console.WriteLine(path);


            Dictionary<string, Source> changesDictionary = new Dictionary<string, Source>();

            Snapshot lastSnapshot = Application.DataService.GetSnapshotByID(config.Id);


            foreach (var item in config.Sources)
            {
                //vytváří chngesList a sbírá medadata
                List<SnapshotItem> newSnapshotList = new List<SnapshotItem>();
                newSnapshotList = GetSnapshot(item);
                newSnapshotList = SnapshotItemFilter(newSnapshotList);
                ChangeReport report;
                try
                {
                    report = GetChanges(lastSnapshot.Sources[item].Items, newSnapshotList);
                }
                catch
                {
                    report = GetChanges(new List<SnapshotItem>(), newSnapshotList);
                }
                List<SnapshotItem> changesList = report.SnapshotItem;
                changesList = SnapshotItemFilter(changesList);
                meta.Items.AddRange(report.MetadataItem);

                if (!changesDictionary.ContainsKey(item))
                {
                    Source src = new Source() { Path = item, Items = changesList };
                    changesDictionary[item] = src;
                }

                //nutno k cestě přidat název zdoje//asi už ne

                string[] parts = item.Split("\\");
                string newPath = parts[parts.Length - 1];
                while (service.DirExists(newPath))
                    newPath += "_1";


                if (config.BackupFormat == _BackupFormat.PT)
                    FtpDoBackup(service, changesList, path + "/" + newPath);
                else
                {
                    if (Directory.Exists(@"..\..\..\temp"))
                        Directory.Delete(@"..\..\..\temp", true);
                    FtpDoBackupArchiv(service, changesList, @"..\..\..\temp\backup");
                    ZipFile.CreateFromDirectory(@"..\..\..\temp\backup", @"..\..\..\temp\" + newPath + ".zip");
                    service.UploadFile(@"..\..\..\temp\" + newPath + ".zip", path + "/" + newPath + ".zip");
                    Directory.Delete(@"..\..\..\temp", true);

                }
            }

            MdataService.FtpWriteMetadata(service, path, meta);
            HeapManager.meta.Add(new HeapItem(config.Id, actualDestination, meta));

            if (SubCompleteMlist.Count == 0 && (config.BackupType == _BackupType.DI || config.BackupType == _BackupType.IN))
            {
                Snapshot snapshot = new Snapshot() { ConfigID = config.Id, Sources = changesDictionary };
                Application.DataService.WriteSnapshot(snapshot);
            }
            else if (config.BackupType == _BackupType.IN && SubCompleteMlist.Count > 0)
            {
                Dictionary<string, Source> lastChangesDictionary = lastSnapshot.Sources;
                foreach (KeyValuePair<string, Source> item in changesDictionary)
                {
                    for (int i = 0; i < item.Value.Items.Count; i++)
                    {
                        if (lastChangesDictionary[item.Key].Items.Contains(item.Value.Items[i]))
                        {
                            int index = lastChangesDictionary[item.Key].Items.IndexOf(item.Value.Items[i]);
                            lastChangesDictionary[item.Key].Items[index] = item.Value.Items[i];
                        }
                        else
                        {
                            lastChangesDictionary[item.Key].Items.Add(item.Value.Items[i]);
                        }
                    }

                    //lastChangesDictionary[item.Key].Items = item.Value.Items;
                }

                Snapshot snapshot = new Snapshot() { ConfigID = config.Id, Sources = lastChangesDictionary };
                Application.DataService.WriteSnapshot(snapshot);
            }
        }
        private void FtpDoBackup(FtpService service, List<SnapshotItem> changesList, string path)
        {
            if (!service.DirExists(path))
                service.CreateDir(path);
            foreach (var item in changesList)
            {
                if (item.ItemType == _ItemType.FILE)
                {
                    if (!Directory.Exists(path + PathReturner(item.ItemPath, 1).Replace(item.Root, "")))
                        service.CreateDir(path + PathReturner(item.ItemPath, 1).Replace(item.Root, ""));
                    service.UploadFile(item.ItemPath, path + item.ItemPath.Replace(item.Root, ""));
                }
                else
                {
                    if (!service.DirExists(path + item.ItemPath.Replace(item.Root, "")))
                        service.CreateDir(path + item.ItemPath.Replace(item.Root, ""));
                }
            }
        }
        private void FtpDoBackupArchiv(FtpService service, List<SnapshotItem> changesList, string path)
        {
            foreach (var item in changesList)
            {
                if (item.ItemType == _ItemType.FILE)
                {
                    if (!Directory.Exists(path + PathReturner(item.ItemPath, 1).Replace(item.Root, "")))
                        Directory.CreateDirectory(path + PathReturner(item.ItemPath, 1).Replace(item.Root, ""));
                    File.Copy(item.ItemPath, path + item.ItemPath.Replace(item.Root, ""));
                }
                else
                {
                    if (!Directory.Exists(path + item.ItemPath.Replace(item.Root, "")))
                        Directory.CreateDirectory(path + item.ItemPath.Replace(item.Root, ""));
                }
            }
        }
        private void FilePrepare(Config config, string path)
        {
            string configDirPath = path + "\\" + config.Name;
            DirectoryInfo configDir = new DirectoryInfo(configDirPath);
            string backupPath = "";

            if (HeapManager.ExistConfig(config.Id))//Existuje složka s configem?
            {

                Metadata firstMdata = HeapManager.GetFirstBackup(path, config.Id);
                Metadata lastMdata = HeapManager.GetLastBackup(path, config.Id);

                if (config.Retention[1] <= HeapManager.GetListOfBackups(path, config.Id).Count)//Je počet získaných metadat roven hodnotě v "Retention[1]" ?
                {
                    if (config.Retention[0] <= HeapManager.GetPackageCount(path, config.Id))//Je počet získaných metadat roven hodnotě v "Retention[0]" ?
                    {
                        Directory.Delete(firstMdata.BackupPath, true);//maže balíčky, pokud jich je už moc.
                        HeapManager.DeleteOldestPackage(path, config.Id);
                    }
                }
                else//místo je, není nutné nic odstraňovat, v diagramu => "Toto je nyní "Aktuální složka" pro zálohu"
                {
                    if (firstMdata.BackupType == _BackupType.FB)
                        throw new Exception();
                    backupPath = lastMdata.BackupPath;
                }
            }
            else
            {//první spuštění - vytvoří složku pro config
                if (!Directory.Exists(configDirPath))
                    Directory.CreateDirectory(path + "\\" + config.Name);
            }


            if (backupPath == "")
            {// vytváření složky pro balíčky záloh
                Snapshot snapshot = new Snapshot() { ConfigID = config.Id };
                Application.DataService.WriteSnapshot(snapshot);

                int packageRetention = 1;
                if (HeapManager.ExistConfig(config.Id))
                {
                    Metadata last = HeapManager.GetLastBackup(path, config.Id);
                    packageRetention = last.RetentionStats[0];
                    packageRetention++;
                }

                backupPath = configDir + "\\FB_" + DateTime.Now.ToString("d") + "_" + packageRetention;
                if (config.BackupType == _BackupType.FB)
                    backupPath = configDir + "\\FB_" + DateTime.Now.ToString("d") + "_" + packageRetention;
                else if (config.BackupType == _BackupType.IN)
                    backupPath = configDir + "\\IN_" + DateTime.Now.ToString("d") + "_" + packageRetention;
                else if (config.BackupType == _BackupType.DI)
                    backupPath = configDir + "\\DI_" + DateTime.Now.ToString("d") + "_" + packageRetention;

                this.SubCompleteMlist.Clear();
                Directory.CreateDirectory(backupPath);
            }


            int[] retention = new int[2];
            {
                Metadata last = HeapManager.GetLastBackup(path, config.Id);
                if (last != null)
                    retention = last.RetentionStats;
            }
            Backup(config, backupPath, retention, path);
        }
        private void Backup(Config config, string path, int[] lastRetention, string actualDestination)
        {
            Metadata meta;//vytvoření metadat
            if (lastRetention[1] == 0)
                meta = new Metadata(config.Id, config.Name, path, DateTime.Now, config.BackupType, new int[2] { 1, 1 });
            else if (config.Retention[1] == lastRetention[1])
                meta = new Metadata(config.Id, config.Name, path, DateTime.Now, config.BackupType, new int[2] { lastRetention[0] + 1, 1 });
            else
                meta = new Metadata(config.Id, config.Name, path, DateTime.Now, config.BackupType, new int[2] { lastRetention[0], lastRetention[1] + 1 });



            if (config.BackupType != _BackupType.FB)
            {//přidání cesty - vytváření složek pro konkrétní zálohy. FB nepotřebuje, jelikož jeho záloha je brána jako balíček záloh.

                path = path + "\\" + DateTime.Now.ToString("d") + DateTime.Now.ToString("_H.mm.ss");
            }
            Console.WriteLine(path);


            Dictionary<string, Source> changesDictionary = new Dictionary<string, Source>();

            Snapshot lastSnapshot = Application.DataService.GetSnapshotByID(config.Id);

            foreach (var item in config.Sources)
            {
                //vytváří chngesList a sbírá medadata
                List<SnapshotItem> newSnapshotList = new List<SnapshotItem>();
                newSnapshotList = GetSnapshot(item);
                newSnapshotList = SnapshotItemFilter(newSnapshotList);
                ChangeReport report;
                try
                {
                    report = GetChanges(lastSnapshot.Sources[item].Items, newSnapshotList);
                }
                catch
                {
                    report = GetChanges(new List<SnapshotItem>(), newSnapshotList);
                }
                List<SnapshotItem> changesList = report.SnapshotItem;
                changesList = SnapshotItemFilter(changesList);
                meta.Items.AddRange(report.MetadataItem);

                if (!changesDictionary.ContainsKey(item))
                {
                    Source src = new Source() { Path = item, Items = changesList };
                    changesDictionary[item] = src;
                }

                //nutno k cestě přidat název zdoje//asi už ne

                string[] parts = item.Split("\\");
                string newPath = parts[parts.Length - 1];
                while (Directory.Exists(newPath))
                    newPath += "_1";


                DoBackup(changesList, path + "\\" + newPath);
                if (config.BackupFormat == _BackupFormat.AR)
                {
                    ZipFile.CreateFromDirectory(path + "\\" + newPath, path + "\\" + newPath + ".zip");
                    Directory.Delete(path + "\\" + newPath, true);
                }
            }

            MdataService.WriteMetadata(path, meta);
            HeapManager.meta.Add(new HeapItem(config.Id, actualDestination, meta));

            if (SubCompleteMlist.Count == 0 && (config.BackupType == _BackupType.DI || config.BackupType == _BackupType.IN))
            {
                Snapshot snapshot = new Snapshot() { ConfigID = config.Id, Sources = changesDictionary };
                Application.DataService.WriteSnapshot(snapshot);
            }
            else if (config.BackupType == _BackupType.IN && SubCompleteMlist.Count > 0)
            {
                Dictionary<string, Source> lastChangesDictionary = lastSnapshot.Sources;
                foreach (KeyValuePair<string, Source> item in changesDictionary)
                {
                    for (int i = 0; i < item.Value.Items.Count; i++)
                    {
                        if (lastChangesDictionary[item.Key].Items.Contains(item.Value.Items[i]))
                        {
                            int index = lastChangesDictionary[item.Key].Items.IndexOf(item.Value.Items[i]);
                            lastChangesDictionary[item.Key].Items[index] = item.Value.Items[i];
                        }
                        else
                        {
                            lastChangesDictionary[item.Key].Items.Add(item.Value.Items[i]);
                        }
                    }

                    //lastChangesDictionary[item.Key].Items = item.Value.Items;
                }

                Snapshot snapshot = new Snapshot() { ConfigID = config.Id, Sources = lastChangesDictionary };
                Application.DataService.WriteSnapshot(snapshot);
            }
        }
        public void DoBackup(List<SnapshotItem> changesList, string path)
        {
            CreateDir(path);
            foreach (var item in changesList)
            {
                if (item.ItemType == _ItemType.FILE)
                {
                    if (!Directory.Exists(path + item.ItemPath.Replace(item.Root, "")))
                        Directory.CreateDirectory(path + PathReturner(item.ItemPath, 1).Replace(item.Root, ""));
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
                item.CopyTo(destination + "\\" + item.Name);
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
                string path = key.Value.ItemPath.Replace("\\" + parts[parts.Length - 1], "");
                if (itemsDic.ContainsKey(path))
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
            foreach (var item in source)
            {
                try
                {
                    SnapshotItem s = compareDic[item.ItemPath];
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
        public async Task Execute(IJobExecutionContext context)
        {
            Console.WriteLine("backup!" + DateTime.Now);
            try
            {
                this.BackupSetup(TaskManager.TaskList);
                try
                {
                    await APIService.SendReport(new Report() { date = TaskManager.TaskList[0].Date, idConfig = TaskManager.TaskList[0].IdConfig, hashClient = Application.HashOfThisClient, message = "OK", success = true, size = 0 });
                }
                catch
                {
                    ReportHolder.AddReport(new Report() { date = TaskManager.TaskList[0].Date, idConfig = TaskManager.TaskList[0].IdConfig, hashClient = Application.HashOfThisClient, message = "OK", success = true, size = 0 });
                    Console.WriteLine("Send report fail");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Backup Error");
                Console.WriteLine(ex);
                try
                {
                    await APIService.SendReport(new Report() { date = TaskManager.TaskList[0].Date, idConfig = TaskManager.TaskList[0].IdConfig, hashClient = Application.HashOfThisClient, message = "Backup Error: " + ex.Message, success = false, size = 0 });
                }
                catch
                {
                    ReportHolder.AddReport(new Report() { date = TaskManager.TaskList[0].Date, idConfig = TaskManager.TaskList[0].IdConfig, hashClient = Application.HashOfThisClient, message = "Backup Error: " + ex.Message, success = false, size = 0 });
                    Console.WriteLine("Send report fail");
                }
            }

            TaskManager.TaskList.RemoveAt(0);
        }
    }
}