using DaemonOfPain.Services;
using System;
using System.Collections.Generic;

namespace DaemonOfPain
{
    internal class Program
    {
        static void Main(string[] args)
        {
            MetadataService md = new MetadataService();
            //List<MetadataItem> items = new List<MetadataItem>();

            //for (int i = 0; i < 5; i++)
            //{
            //    MetadataItem item = new MetadataItem() { ItemChange = _itemChange.ADDED, ItemPath = "C:\\sdaad" };
            //    items.Add(item);
            //}
            //Metadata metadata = new Metadata() { IdConfig=1, Items = items };

            //md.WriteMetadata("C:\\BackupTesting", metadata);

            //Metadata metadata = md.GetMetadata("C:\\BackupTesting");

            //foreach (var item in metadata.Items)
            //{
            //    Console.WriteLine(item.ItemPath);
            //}

            //Console.ReadKey();

            //BackupService b = new BackupService();
            //List<SnapshotItem> items = b.GetSnapshot(@"C:\BackupTesting\SourceDir");
            //List<SnapshotItem> items2 = b.SnapshotItemFilter(items);
            //b.DoBackup(items2, @"C:\BackupTesting\DestDir\FB_testovani");
            //Console.ReadKey();
            BackupService b = new BackupService();
            //List<SnapshotItem> items = b.GetSnapshot(@"C:\BackupTesting\test");
            //b.DoBackup(items, @"C:\BackupDest\FB_testovani");

            b.BackupSetup(1);

        }
    }
}
