using DaemonOfPain.Services;
using NCrontab;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace DaemonOfPain
{
    internal class Program
    {
        static async Task Main(string[] args)
        {
            DateTime n = DateTime.Now;
            string s = n.ToString(); ;


            Application app = new Application();
            await app.StartApplication();
        }
    }
}
