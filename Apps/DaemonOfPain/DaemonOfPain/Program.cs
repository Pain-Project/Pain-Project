using ConsoleApp6;
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
            BackupService b = new BackupService();
            var url = await ServerController.);
            Config config = new Config(668, "Testing10", _BackupType.DI);
            config.Retention[0] = 3;
            config.Retention[1] = 4;
            config.Sources.Add(@"C:\BackupTesting");
            config.Sources.Add(@"C:\BackupTesting2");
            config.Destinations.Add(new Destination(@"C:\BackupDest", DestType.DRIVE));
            config.Destinations.Add(new Destination(@"C:\BackupDest2\Backups", DestType.DRIVE));

            b.BackupSetup(config);
        }
    }
}
