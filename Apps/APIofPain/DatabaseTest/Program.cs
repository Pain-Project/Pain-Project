using DatabaseTest.Controllers;
using DatabaseTest.DatabaseTables;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatabaseTest
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //CreateHostBuilder(args).Build().Run();

            MyContext context = new MyContext();

///////INSERT/////////
            //Client cl = new Client()
            //{
            //    Name = "xxx",
            //    IpAddress = "192.0.0.0",
            //    MacAddress = "nejaka mac)",
            //    Active = false
            //};
            //context.Clients.Add(cl);
            //context.SaveChanges();


            //Administrator admin = new Administrator()
            //{
            //    Login = "aaaaa",
            //    Password = "bbbbb",
            //    AccountCreation = "2019-01-11 09:22:08",
            //    Name = "cccc",
            //    Surname = "dddd",
            //    Email = "eee@sssvt.cz",
            //    CronEmail = "eee@sssvt.cz",
            //    DarkMode = false
            //};
            //context.Administrators.Add(admin);
            //context.SaveChanges();


            //Config config = new Config()
            //{
            //    IdAdministrator = 1,
            //    Name = "myConfig",
            //    CreateDate = "2019-01-11 09:22:08",
            //    Cron = "gdfsgs",
            //    BackUpFormat = "PT",
            //    BackUpType = "FB",
            //    RetentionPackages = 3,
            //    RetentionPackageSize = 5
            //};
            //context.Configs.Add(config);
            //context.SaveChanges();


            //Source src = new Source()
            //{
            //    IdConfig = 1,
            //    Path = "xxx" ////v db Varchar(0)? (úmysl jako max -> nefunguje -> navýšeno na 260 zatím)
            //};
            //context.Sources.Add(src);
            //context.SaveChanges();

            //Destination dest = new Destination()
            //{
            //    IdConfig = 1,
            //    Path = "xxx",
            //    DestType = "Drive"
            //};
            //context.Destinations.Add(dest);
            //context.SaveChanges();

            //Assignment assignment = new Assignment()
            //{ 
            //    IdClient = 1,
            //    IdConfig = 1,
            //    Downloaded = false
            //};
            //context.Assignments.Add(assignment);
            //context.SaveChanges();

            //DatabaseTables.Task task = new DatabaseTables.Task()
            //{
            //    IdAssignment = 1,
            //    State = "Error",
            //    Message = "ssss", ////v db Varchar(0)? (úmysl jako max -> nefunguje -> navýšeno na 255 zatím)
            //    Date = "2019-01-11 09:22:08",
            //    Size = 1234 ////v tabulce název Size[MB]
            //};
            //context.Tasks.Add(task);
            //context.SaveChanges();

            //LoginLog login = new LoginLog()
            //{
            //    IdAdministrator = 1,
            //    IpAddress = "192.25.25.2",
            //    LoginTime = "2019-01-11 09:22:08"
            //};
            //context.LoginLog.Add(login);
            //context.SaveChanges();

///////REMOVE/////////
            //context.LoginLog.Remove(context.LoginLog.Find(login.Id = 1)); ////nemaze - prim. klic = dobre i guess
            //context.SaveChanges();

///////UPDATE/////////
            //LoginLog loginToUpdate = context.LoginLog.Where(x => x.Id == 1 ).First(); ////update funguje :)
            //loginToUpdate.IpAddress = "192.25.25.3";
            //context.SaveChanges();
///////DOTAZ/////////
            //DatabaseController db = new DatabaseController();
            //foreach (var item in db.GetAdmins())
            //{
            //    Console.WriteLine(item.Name);
            //}
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
