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
            //APIService.Login().GetAwaiter().GetResult();
            //APIService.GetConfigs().GetAwaiter().GetResult();



            BackupService b = new BackupService();
            b.BackupSetup(38);
        }
    }
}
