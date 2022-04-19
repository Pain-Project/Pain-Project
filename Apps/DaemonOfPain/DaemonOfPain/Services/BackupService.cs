﻿using DaemonOfPain.Components;
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
        private List<Metadata> SubCompleteMlist = new List<Metadata>();
        private LocalMetadataService LocalMetadataService = new LocalMetadataService();
        private MetadataPackage MPackage;

        public void BackupSetup(Config config)//později config ostranit a odkomentovat řádek níže
        {
            //Config config = daemonDataService.GetConfigByID(idConfig);
            MPackage = LocalMetadataService.GetMetadataPackageByID(config.Id);

            foreach (var item in config.Destinations)
            {
                int[] retention = new int[2];
                string configDirPath = item.DestinationPath + "\\" + config.ConfigName;
                DirectoryInfo configDir = new DirectoryInfo(configDirPath);
                string backupPath = "";

                if (Directory.Exists(configDirPath))//Existuje složka s configem?
                {
                    Metadata firstMdata = LocalMetadataService.GetFirstOrLastMetadata(LocalMetadataService.GetFirstOrLastPackage(MPackage.Packages, true), true);
                    Metadata lastMdata = LocalMetadataService.GetFirstOrLastMetadata(LocalMetadataService.GetFirstOrLastPackage(MPackage.Packages, true), false);

                    if (config.Retention[1] <= SubCompleteMlist.Count)//Je počet získaných metadat roven hodnotě v "Retention[1]" ?
                    {
                        if (config.Retention[0] <= MPackage.Packages.Count)//Je počet získaných metadat roven hodnotě v "Retention[0]" ?
                        {
                            try
                            {
                                Directory.Delete(PathReturner(lastMdata.BackupPath, 1), true);//maže balíčky, pokud jich je už moc. Ta podmínka je tu proto, protože FB má vždy kratší cestu, než IN a DI
                                MPackage.Packages.Remove(LocalMetadataService.GetFirstOrLastPackage(MPackage.Packages, false));//odstraní balíček z lokálního úložiště metadat
                            }
                            catch { }
                        }
                    }
                    else//místo je, není nutné nic odstraňovat, v diagramu => "Toto je nyní "Aktuální složka" pro zálohu"
                    {
                        if (firstMdata.BackupType == _BackupType.FB)
                            throw new Exception();
                        backupPath = PathReturner(lastMdata.BackupPath, 1);
                    }
                }
                else
                {//první spuštění - vytvoří složku pro config
                    Directory.CreateDirectory(item.DestinationPath + "\\" + config.ConfigName);
                    MPackage = new MetadataPackage() { ConfigID = config.Id };
                }


                if (backupPath == "")
                {// vytváření složky pro balíčky záloh
                    Snapshot snapshot = new Snapshot() { ConfigID = config.Id };
                    this.daemonDataService.WriteSnapshot(snapshot);

                    int packageRetention = 1;
                    if (MPackage.Packages.Count != 0)
                    {
                        Metadata last = LocalMetadataService.GetFirstOrLastMetadata(LocalMetadataService.GetFirstOrLastPackage(MPackage.Packages, false), false);
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
                    MPackage.Packages.Add(new Package());
                }

                Backup(config, backupPath, retention);
            }


        }
        public void Backup(Config config, string path, int[] lastRetention)
        {
            Metadata meta;//vytvoření metadat
            if (lastRetention[1] == 0)
                meta = new Metadata(config.Id, config.ConfigName, path, DateTime.Now, config.BackupType, new int[2] { 1, 1 });
            else if (config.Retention[1] == lastRetention[1])
                meta = new Metadata(config.Id, config.ConfigName, path, DateTime.Now, config.BackupType, new int[2] { lastRetention[0]+1, 1 });
            else
                meta = new Metadata(config.Id, config.ConfigName, path, DateTime.Now, config.BackupType, new int[2] { lastRetention[0], lastRetention[1]+1 });


            
            if (config.BackupType != _BackupType.FB)
            {//přidání cesty - vytváření složek pro konkrétní zálohy. FB nepotřebuje, jelikož jeho záloha je prána jako balíček záloh.

                path = path + "\\" + DateTime.Now.ToString("d")+DateTime.Now.ToString("_H.mm.ss");
            }


            Dictionary<string, Source> changesDictionary = new Dictionary<string, Source>();

            Snapshot lastSnapshot = daemonDataService.GetSnapshotByID(config.Id);

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

            }
            MdataService.WriteMetadata(path, meta);

            if (SubCompleteMlist.Count == 0 && (config.BackupType == _BackupType.DI || config.BackupType == _BackupType.IN))
            {
                Snapshot snapshot = new Snapshot() { ConfigID = config.Id, Sources = changesDictionary };
                this.daemonDataService.WriteSnapshot(snapshot);
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
                this.daemonDataService.WriteSnapshot(snapshot);
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
                        Directory.CreateDirectory(path + PathReturner(item.ItemPath,1).Replace(item.Root, ""));
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
    }
}
