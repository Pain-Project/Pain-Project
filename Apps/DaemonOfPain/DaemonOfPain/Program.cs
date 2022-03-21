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

            Config config = new Config(667, "Testing2", _BackupType.DI);
            config.Retention[0] = 3;
            config.Retention[1] = 5;
            config.Sources.Add(@"C:\Users\František\Desktop\BackupTesting\SourceDir");
            config.Destinations.Add(new Destination(@"C:\Users\František\Desktop\BackupTesting\DestDir", DestType.DRIVE));

            b.BackupSetup(666, config);
            
            Console.ReadKey();

        }
    }
}
