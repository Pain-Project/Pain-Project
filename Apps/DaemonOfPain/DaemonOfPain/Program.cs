using DaemonOfPain.Services;
using System;
using System.Collections.Generic;

namespace DaemonOfPain
{
    internal class Program
    {
        static void Main(string[] args)
        {
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
