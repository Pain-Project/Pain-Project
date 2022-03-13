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


        public List<SnapshotItem> GetSnapshot(string path, List<SnapshotItem> dirEntry = null)
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
                dirEntry.Add(new SnapshotItem(item.FullName, _ItemType.FOLDER, Convert.ToString(File.GetLastWriteTime(item.FullName))));
                GetSnapshot(item.FullName, dirEntry);
            }
            foreach (var item in files)
            {
                dirEntry.Add(new SnapshotItem(item.FullName, _ItemType.FILE, Convert.ToString(File.GetLastWriteTime(item.FullName))));
            }
            return dirEntry;
        }
        public List<SnapshotItem> GetChanges (List<SnapshotItem> source, List<SnapshotItem> snapshotToCompare)
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
    }
}
