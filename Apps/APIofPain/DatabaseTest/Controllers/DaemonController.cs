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
        public JsonResult AddDaemon(Computer pc)
        {
            try
            {
                Client client = new Client() { Name = pc.Name, IpAddress = pc.IPaddress, MacAddress = pc.MACaddress, Active = false, LastSeen = DateTimeOffset.Now, Hash = "hesh"};
                context.Clients.Add(client);
                context.SaveChanges();
                return new JsonResult(client.Id) { StatusCode = (int)HttpStatusCode.OK };
            }
            catch (Exception ex)
            {
                return new JsonResult("Cannot resolve request!" + ex) { StatusCode = (int)HttpStatusCode.BadRequest };
            }
        }

        [HttpGet("GetConfigs/{id}")]
        public JsonResult GetConfigs(int id)
        {
            try
            {
                Client cl = this.context.Clients.Find(id);
                if (cl == null)
                    return new JsonResult("Client not found!") { StatusCode = (int)HttpStatusCode.NotFound };


                if (cl.Active == false)
                    return new JsonResult(new List<ConfigForDaemon>()) { StatusCode = (int)HttpStatusCode.OK };


                cl.LastSeen = DateTimeOffset.Now;
                this.context.SaveChanges();

                var configs = from a in context.Assignments.ToList()
                              join c in context.Configs.ToList()
                               on a.IdConfig equals c.Id
                              where a.IdClient == id //&& !a.Downloaded
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

        [HttpPost("sendReport")]
        public JsonResult SendReport(Report report)
        {
            var task = from t in context.Tasks.ToList()
                       join a in context.Assignments on t.IdAssignment equals a.Id
                       where a.IdClient == report.idClient && a.IdConfig == report.idConfig && t.Date == report.date //můžu hledat pomocí datumu a času za předpokladu, že tento údaj bude na obou stranách vygenerován přes cron 
                       select t;

            string state;
            if (report.success) { state = "Success"; }
            else { state = "Error"; }

            List<DatabaseTest.DatabaseTables.Task> taskList = task.ToList();

            if (task.Count() != 0)
            {
                foreach (var ContextTask in context.Tasks.Where(x => x.Id == taskList[0].Id))
                {
                    ContextTask.Message = report.message;
                    ContextTask.State = state;
                    ContextTask.Size = report.size;
                }
            }
            else
            {
                int indexNumber = context.Assignments.Where(x => x.IdConfig == report.idConfig && x.IdClient == report.idClient).First().Id;
                try
                {
                    context.Tasks.Add(new DatabaseTest.DatabaseTables.Task { IdAssignment = indexNumber, Date = report.date, Message = report.message, Size = report.size, State = state });

                }
                catch
                {
                    return new JsonResult("Cannot resolve request!") { StatusCode = (int)HttpStatusCode.BadRequest };
                }
            }
            context.SaveChanges();
            return new JsonResult("Success") { StatusCode = (int)HttpStatusCode.OK };
        }
    }
}
