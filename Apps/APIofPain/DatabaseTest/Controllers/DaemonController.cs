using DatabaseTest.Controllers;
using DatabaseTest.DatabaseTables;
using DatabaseTest.DataClasses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace test_api2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DaemonController : ControllerBase
    {
        private MyContext context = new MyContext();
        [HttpPost("AddDaemon")]
        public void AddDaemon(string ip, string mac, string name)
        {
            context.Clients.Add(new Client() { Name = name, IpAddress = ip, MacAddress = mac, Active = false });
            context.SaveChanges();
        }

        [HttpGet("GetConfigs")]
        public IActionResult GetConfigs(int id)
        {
            var configs = from a in context.Assignments.ToList()
                          join c in context.Configs.ToList()
                           on a.IdConfig equals c.Id
                          where a.IdClient == id && !a.Downloaded
                          select c;
            List<ConfigForDaemon> daemonConfigs = new List<ConfigForDaemon>();
            foreach (var item in configs)
            {
                ConfigForDaemon c = new ConfigForDaemon
                {
                    Id = item.Id,
                    Name = item.Name,
                    Cron = item.Cron,
                    BackUpFormat = item.BackUpFormat,
                    BackUpType = item.BackUpType,
                    Destinations = new List<DataDestination>(),
                    Sources = new List<string>()
                };
                c.Retention[0] = item.RetentionPackages;
                c.Retention[1] = item.RetentionPackageSize;
                foreach (var dest in context.Destinations.Where(x => x.IdConfig == c.Id))
                {
                    c.Destinations.Add(new DataDestination { DestType = dest.DestType, Path = dest.Path});
                }
                foreach (var source in context.Sources.Where(x => x.IdConfig == c.Id))
                {
                    c.Sources.Add(source.Path);
                }
                daemonConfigs.Add(c);
            }




            return Ok(daemonConfigs);
        }

        [HttpPost]
        public IActionResult SendReport(int idClient, int idConfig, bool success, string message, DateTime date)
        {
            var result = from t in context.Tasks.ToList()
                         join a in context.Assignments on t.IdAssignment equals a.Id
                         where a.IdClient == idClient && a.IdConfig == idConfig && t.Date == date //můžu hledat pomocí datumu a času za předpokladu, že tento údaj bude na obou stranách vygenerován přes cron 
                         select t;

            if (result.Count() != 0)
            {
                foreach (var item in result)
                {
                    context.Tasks.Where(x => x.Id == item.Id);
                        //...ve výstavbě...
                }
            }
            else
            {

            }

            return Ok(result);
        }
    }
}
