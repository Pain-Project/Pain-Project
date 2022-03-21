using DaemonOfPain.Services;
using System;
using System.Collections.Generic;
using System.Threading;

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
            //    MetadataItem item = new MetadataItem("C:\\sdaad", _itemChange.ADDED);
            //    items.Add(item);
            //}
            //Metadata metadata = new Metadata(1, "gg", "", DateTime.Now, _BackupType.FB, new int[2] { 1, 1 }) { Items = items };

            //md.WriteMetadata(@"C:\Users\František\Desktop", metadata);
            //Console.ReadKey();

            //List<Metadata> m = md.MetaSearcher(@"C:\Users\František\Desktop\BackupTesting\SourceDir");
            //Console.ReadKey();


            //Metadata metadata2 = md.GetMetadata("C:\\BackupTesting");

            //foreach (var item in metadata2.Items)
            //{
            //    Console.WriteLine(item.ItemPath);
            //}

            //Console.ReadKey(); 


            BackupService b = new BackupService();

            Config config = new Config(666, "Testing2", _BackupType.IN);
            config.Retention[0] = 3;
            config.Retention[1] = 4;
            config.Sources.Add(@"C:\Users\František\Desktop\BackupTesting\SourceDir");
            config.Destinations.Add(new Destination(@"C:\Users\František\Desktop\BackupTesting\DestDir", DestType.DRIVE));


            //Config config = new Config(663, "Testing3", _BackupType.DI);
            //config.Retention[0] = 3;
            //config.Retention[1] = 4;
            //config.Sources.Add(@"C:\Users\František\Desktop\BackupTesting\SourceDir");
            //config.Destinations.Add(new Destination(@"C:\Users\František\Desktop\BackupTesting\DestDir", DestType.DRIVE));

            //int count = 15;
            //for (int i = 0; i < count; i++)
            //{
            //    b.BackupSetup(config);
            //    Thread.Sleep(2000);
            //    Console.WriteLine(i);
            //}


            b.BackupSetup(config);


        }
    }
}
