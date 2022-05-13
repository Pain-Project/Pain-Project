using DaemonOfPain.Services;
using NCrontab;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Threading;
using System.Threading.Tasks;

namespace DaemonOfPain
{
    internal class Program
    {
        static async Task Main(string[] args)
        {
            Application app = new Application();
            await app.StartApplication();
            //string path = PathReturner(Directory.GetCurrentDirectory(), 3) + @"\DaemonData\TempFiles\Backups";
            //ZipFile.CreateFromDirectory(path,PathReturner(path,1)+"\\test.zip");
            //Console.WriteLine(path);
            //string PathReturner(string path, int steps)//již funkční//vrátí se o určitý počet složek zpět. př. PathReturner(@"C:\Users\František\Desktop\",2) se vrátí o dvě složky zpět - vrátí => C:\Users
            //{
            //    string[] parts = path.Split("\\");
            //    for (int i = 0; i < steps; i++)
            //    {
            //        parts[parts.Length - i - 1] = "";
            //    }
            //    string st = string.Join("\\", parts);
            //    return st.Trim('\\');
            //}
        }

    }
}
