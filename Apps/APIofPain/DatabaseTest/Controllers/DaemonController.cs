using DatabaseTest.Controllers;
using DatabaseTest.DatabaseTables;
using DatabaseTest.DataClasses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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
        public JsonResult GetConfigs(int id)
        {
            try
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
                        c.Destinations.Add(new DataDestination { DestType = dest.DestType, Path = dest.Path });
                    }
                    foreach (var source in context.Sources.Where(x => x.IdConfig == c.Id))
                    {
                        c.Sources.Add(source.Path);
                    }
                    daemonConfigs.Add(c);
                }
                return new JsonResult(daemonConfigs) { StatusCode = (int)HttpStatusCode.OK };
            }
            catch (Exception)
            {
                return new JsonResult("Cannot resolve request!") { StatusCode = (int)HttpStatusCode.BadRequest };
            }
        }

        [HttpPost]
        public void SendReport(int idClient, int idConfig, bool success, string message, DateTime date, int size)
        {
            var task = from t in context.Tasks.ToList()
                       join a in context.Assignments on t.IdAssignment equals a.Id
                       where a.IdClient == idClient && a.IdConfig == idConfig && t.Date == date //můžu hledat pomocí datumu a času za předpokladu, že tento údaj bude na obou stranách vygenerován přes cron 
                       select t;

            string state;
            if (success) { state = "Success"; }
            else { state = "Error"; }

            List<DatabaseTest.DatabaseTables.Task> taskList = task.ToList();

            if (task.Count() != 0)
            {
                foreach (var ContextTask in context.Tasks.Where(x => x.Id == taskList[0].Id))
                {
                    ContextTask.Message = message;
                    ContextTask.State = state;
                    ContextTask.Size = size;
                }
            }
            else
            {
                var result = from t in context.Tasks.ToList()
                             join a in context.Assignments on t.IdAssignment equals a.Id
                             where a.IdClient == idClient && a.IdConfig == idConfig
                             select a.Id;
                List<int> index = result.ToList();
                try
                {
                    context.Tasks.Add(new DatabaseTest.DatabaseTables.Task { IdAssignment = index[0], Date = date, Message = message, Size = size, State = state });
                }
                catch
                {
                    throw new Exception("Na server dorazilo potvrzení o záloze od neexistujícího klienta nebo s neexistujícím configem!");
                }

            }
            context.SaveChanges();
        }
    }
}
