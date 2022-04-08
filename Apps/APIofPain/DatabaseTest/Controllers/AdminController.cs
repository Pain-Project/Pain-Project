using DatabaseTest.DatabaseTables;
using DatabaseTest.DataClasses;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace DatabaseTest.Controllers
{
    [ApiController]
    [Route("AdminPage")]
    public class AdminController : ControllerBase
    {
        private MyContext context = new MyContext();
        //Login
        //public void Login()
        //{

        //}

        //Dashboard
        [HttpGet("todayTasks")]
        public JsonResult GetTodayTasks()
        {
            try
            {
            DateTime today = DateTime.Today;
            var tasks = from t in context.Tasks
                        join a in context.Assignments on t.IdAssignment equals a.Id
                        join cl in context.Clients on a.IdClient equals cl.Id
                        join co in context.Configs on a.IdConfig equals co.Id
                        where t.Date >= today && t.Date < today.AddDays(1)
                        select new
                        {
                            TaskId = t.Id,
                            ConfigName = co.Name,
                            ClientName = cl.Name,
                            State = t.State,
                            Date = t.Date
                        };
                return new JsonResult(tasks) { StatusCode = (int)HttpStatusCode.OK };
            }
            catch (Exception)
            {
                return new JsonResult("Cannot resolve request!") { StatusCode = (int)HttpStatusCode.BadRequest };
            }
        }
        [HttpGet("getSize")]
        public JsonResult GetSize()
        {
            try
            {
                DateTime now = DateTime.Now;
                var size = from t in context.Tasks
                           where t.Date <= now && t.Date > now.AddDays(-7)
                           select t.Size;
                return new JsonResult(size.Sum()) { StatusCode = (int)HttpStatusCode.OK };
            }
            catch (Exception)
            {
                return new JsonResult("Cannot resolve request!") { StatusCode = (int)HttpStatusCode.BadRequest };
            }
        }
        [HttpGet("sevenDays")]
        public JsonResult GetSevenDays()
        {
            try
            {
                DateTime now = DateTime.Now;
                var tasks = from t in context.Tasks
                            join a in context.Assignments on t.IdAssignment equals a.Id
                            join cl in context.Clients on a.IdClient equals cl.Id
                            join co in context.Configs on a.IdConfig equals co.Id
                            where t.Date <= now && t.Date > now.AddDays(-7)
                            select new
                            {
                                TaskId = t.Id,
                                ConfigName = co.Name,
                                ClientName = cl.Name,
                                State = t.State,
                                Date = t.Date
                            };
                return new JsonResult(tasks) { StatusCode = (int)HttpStatusCode.OK };
            }
            catch (Exception)
            {
                return new JsonResult("Cannot resolve request!") { StatusCode = (int)HttpStatusCode.BadRequest };
            }
        }


        //AddConfig
        [HttpPost("addConfig")]
        public JsonResult AddConfig(DataConfig config)
        {
            try
            {
                Administrator creator = context.Administrators.Where(x => x.Id == config.IdAdministrator).FirstOrDefault();
                Config newConfig = new Config()
                {
                    Name = config.Name,
                    CreateDate = config.CreateDate,
                    Cron = config.Cron,
                    BackUpFormat = config.BackUpFormat,
                    BackUpType = config.BackUpType,
                    RetentionPackages = config.RetentionPackages,
                    RetentionPackageSize = config.RetentionPackageSize,
                    Sources = new List<Source>(),
                    Destinations = new List<Destination>(),

                    Administrator = creator
                };

                foreach (var source in config.Sources)
                {
                    newConfig.Sources.Add(new Source() { Config = newConfig, Path = source });
                }

                foreach (var dest in config.Destinations)
                {
                    newConfig.Destinations.Add(new Destination() { Config = newConfig, Path = dest.Path, DestType = dest.DestType });
                }

                foreach (var client in config.ClientNames)
                {
                    Assignment assignment = new Assignment() { Config = newConfig, Downloaded = false, IdClient = client.Key };
                    context.Assignments.Add(assignment);
                }
                context.Configs.Add(newConfig);

                context.SaveChanges();
                return new JsonResult("Success") { StatusCode = (int)HttpStatusCode.OK };
            }
            catch (Exception)
            {
                return new JsonResult("Cannot resolve request!") { StatusCode = (int)HttpStatusCode.BadRequest };
            }
        }

        //Configs
        [HttpGet("allConfigs")]
        public JsonResult GetAllConfigs()
        {
            try
            {
                List<DataConfig> configs = new List<DataConfig>();
                var q =
                    from pathsArray in (
                        from srcArray in (
                            from innerConfigs in context.Configs.ToList()
                            join innerSources in context.Sources on innerConfigs.Id equals innerSources.IdConfig
                            group innerSources.Path by innerSources.IdConfig into grp
                            select new { id = grp.Key, sources = grp }
                        )
                        join destArray in (
                            from innerConfigs in context.Configs.ToList()
                            join innerDestinations in context.Destinations on innerConfigs.Id equals innerDestinations.IdConfig
                            group innerDestinations by innerDestinations.IdConfig into grp
                            select new { id = grp.Key, destinations = grp }
                        )
                        on srcArray.id equals destArray.id
                        select new { id = srcArray.id, srcArray, destArray = destArray.destinations }
                    )
                    join outerConfigs in context.Configs.ToList() on pathsArray.srcArray.id equals outerConfigs.Id
                    from admins in context.Administrators.ToList().Where(x => x.Id == outerConfigs.IdAdministrator)

                    join assignments in (
                        from a in context.Assignments.ToList().DefaultIfEmpty()
                        from innerClients in context.Clients.ToList().Where(x => x.Id == a.IdClient).DefaultIfEmpty()
                        group (a?.Client) by a.IdConfig into grp
                        select new { id = grp.Key, ids = grp == null ? null : grp }
                    )
                    on outerConfigs.Id equals assignments.id

                    select new
                    {
                        ID = outerConfigs.Id,
                        Name = outerConfigs.Name,
                        CreateDate = outerConfigs.CreateDate,
                        Cron = outerConfigs.Cron,
                        BackupFormat = outerConfigs.BackUpFormat,
                        BackupType = outerConfigs.BackUpType,
                        RetentionPackages = outerConfigs.RetentionPackages,
                        RetentionPackageSize = outerConfigs.RetentionPackageSize,
                        AdminName = admins.Name,
                        Sources = pathsArray.srcArray.sources,
                        Destinations = pathsArray.destArray,
                        Clients = assignments.ids.Select(x => new { x.Id, x.Name })
                    };
                foreach (var item in q)
                {
                    List<DataDestination> dests = new List<DataDestination>();
                    foreach (var dest in item.Destinations)
                    {
                        dests.Add(new DataDestination() { DestType = dest.DestType, Path = dest.Path });
                    }
                    DataConfig data = new DataConfig()
                    {
                        Id = item.ID,
                        Sources = item.Sources.ToList(),
                        Destinations = dests,
                        CreateDate = item.CreateDate,
                        BackUpFormat = item.BackupFormat,
                        BackUpType = item.BackupType,
                        Cron = item.Cron,
                        Name = item.Name,
                        RetentionPackages = item.RetentionPackages,
                        RetentionPackageSize = item.RetentionPackageSize,
                        AdminName = item.AdminName,
                        ClientNames = item.Clients.ToDictionary(x => x.Id, x => x.Name),
                    };
                    configs.Add(data);
                }
                return new JsonResult(configs) { StatusCode = (int)HttpStatusCode.OK };
            }
            catch (Exception)
            {
                return new JsonResult("Cannot resolve request!") { StatusCode = (int)HttpStatusCode.NotFound };
            }
        }

        [HttpPut("updateConfig")]
        public JsonResult UpdateConfig(int id, DataConfig editedConfig)
        {
            RemoveConfig(id);
            try
            {
                Administrator creator = context.Administrators.Where(x => x.Id == editedConfig.IdAdministrator).FirstOrDefault();
                Config newConfig = new Config()
                {
                    Id = id,
                    Name = editedConfig.Name,
                    CreateDate = editedConfig.CreateDate,
                    Cron = editedConfig.Cron,
                    BackUpFormat = editedConfig.BackUpFormat,
                    BackUpType = editedConfig.BackUpType,
                    RetentionPackages = editedConfig.RetentionPackages,
                    RetentionPackageSize = editedConfig.RetentionPackageSize,
                    Sources = new List<Source>(),
                    Destinations = new List<Destination>(),

                    Administrator = creator
                };
                foreach (var source in editedConfig.Sources)
                {
                    newConfig.Sources.Add(new Source() { Config = newConfig, Path = source });
                }

                foreach (var dest in editedConfig.Destinations)
                {
                    newConfig.Destinations.Add(new Destination() { Config = newConfig, Path = dest.Path, DestType = dest.DestType });
                }

                foreach (var client in editedConfig.ClientNames)
                {
                    Assignment assignment = new Assignment() { Config = newConfig, Downloaded = false, IdClient = client.Key };
                    context.Assignments.Add(assignment);
                }

                context.SaveChanges();
                return new JsonResult("Success") { StatusCode = (int)HttpStatusCode.OK };
            }
            catch (Exception)
            {
                return new JsonResult("Cannot resolve request!") { StatusCode = (int)HttpStatusCode.NotFound };
            }
        }
        [HttpDelete("removeConfig")]
        public JsonResult RemoveConfig(int idConfig)
        {
            try
            {
                Config editConfig = context.Configs.Find(idConfig);
                context.Configs.Remove(editConfig);
                context.SaveChanges();
                return new JsonResult("Success") { StatusCode = (int)HttpStatusCode.OK };
            }
            catch (Exception)
            {
                return new JsonResult("Cannot resolve request!") { StatusCode = (int)HttpStatusCode.NotFound };
            }
        }
        [HttpDelete("removeClientFromConfig")]
        public JsonResult RemoveClientFromConfig(int idConfig, int idClient) //RemoveConfigFromClient
        {
            Assignment assignment = context.Assignments.Where(x => x.IdConfig == idConfig && x.IdClient == idClient).FirstOrDefault();

            if (assignment != null)
            {
                context.Assignments.Remove(assignment);
                context.SaveChanges();
                return new JsonResult("Success") { StatusCode = (int)HttpStatusCode.OK };
            }
            return new JsonResult("Cannot resolve request!") { StatusCode = (int)HttpStatusCode.NotFound };
        }

        //Logs
        [HttpGet("allLogs")]
        public JsonResult GetAllLogs()
        {
            try
            {
                DateTime today = DateTime.Today;
                var q =
                from assignments in context.Assignments.ToList()
                join tasks in context.Tasks.ToList() on assignments.Id equals tasks.IdAssignment
                orderby tasks.Date
                where tasks.Date < today
                select new
                {
                    Id = tasks.Id,
                    State = tasks.State,
                    Message = tasks.Message,
                    Date = tasks.Date,
                    Size = tasks.Size, //Neukazujeme, možná změna?
                    IdConfig = assignments.IdConfig,
                    IdClient = assignments.IdClient
                };
                return new JsonResult(q) { StatusCode = (int)HttpStatusCode.OK };
            }
            catch (Exception)
            {
                return new JsonResult("Cannot resolve request!") { StatusCode = (int)HttpStatusCode.NotFound };
            }
        }

        //Clients
        [HttpGet("allClients")]
        public JsonResult GetAllClients()
        {
            try
            {
                var q =
                    from clients in context.Clients.ToList()
                    from assignments in context.Assignments.ToList().Where(x => x.IdClient == clients.Id).DefaultIfEmpty()
                    group (assignments?.IdConfig) by clients.Id into grp
                    from clients in context.Clients.ToList().Where(x => x.Id == grp.Key).DefaultIfEmpty()
                    select new
                    {
                        Id = grp.Key,
                        Name = clients.Name,
                        Ip = clients.IpAddress,
                        Mac = clients.MacAddress,
                        Active = clients.Active,
                        Configs = grp
                    };
                return new JsonResult(q) { StatusCode = (int)HttpStatusCode.OK };
            }
            catch (Exception)
            {
                return new JsonResult("Cannot resolve request!") { StatusCode = (int)HttpStatusCode.NotFound };
            }


        }
        [HttpDelete("removeClient")]
        public JsonResult RemoveClient(int idClient)
        {
            Client client = context.Clients.Find(idClient);

            if (client != null)
            {
                context.Clients.Remove(client);
                context.SaveChanges();
                return new JsonResult("Client was successfuly removed") { StatusCode = (int)HttpStatusCode.OK };
            }
            return new JsonResult("User not found!") { StatusCode = (int)HttpStatusCode.NotFound };
        }
        [HttpPut("activeChange")]
        public JsonResult ActiveClientChange(Dictionary<int, bool> changes)
        {
            foreach (var item in changes)
            {
                Client client = context.Clients.Find(item.Key);
                if (client == null)
                {
                    return new JsonResult("Cannot resolve request!") { StatusCode = (int)HttpStatusCode.NotFound };
                }
                client.Active = item.Value;
            }
            try
            {
                context.SaveChanges();
                return new JsonResult("Success") { StatusCode = (int)HttpStatusCode.OK };
            }
            catch (Exception)
            {
                return new JsonResult("Cannot resolve request!") { StatusCode = (int)HttpStatusCode.BadRequest };
            }
        }

        //Users
        [HttpGet("allUsers")]
        public JsonResult GetAllUsers()
        {
            try
            {
                var q =
                from admins in context.Administrators.ToList()
                from logins in context.LoginLog.ToList().Where(x => x.IdAdministrator == admins.Id).DefaultIfEmpty()
                group (logins) by admins.Id into grp
                from admins in context.Administrators.ToList().Where(x => x.Id == grp.Key).DefaultIfEmpty()
                select new
                {
                    Id = grp.Key,
                    Login = admins.Login,
                    Name = admins.Name,
                    Surname = admins.Surname,
                    CreateDate = admins.AccountCreation,
                    Logs = grp.ToList().Select(x => x == null ? null : new { x.LoginTime, x.IpAddress })
                };
                return new JsonResult(q) { StatusCode = (int)HttpStatusCode.OK };
            }
            catch (Exception)
            {

                return new JsonResult("Cannot resolve request!") { StatusCode = (int)HttpStatusCode.NotFound };
            }
        }
        [HttpDelete("removeUser")]
        public JsonResult RemoveUser(int idUser)
        {
            Administrator admin = context.Administrators.Find(idUser);
            if (admin != null)
            {
                context.Administrators.Remove(admin);
                context.SaveChanges();
                return new JsonResult("User removed successfuly.") { StatusCode = (int)HttpStatusCode.OK };
            }
            return new JsonResult("Failed to remove user!") { StatusCode = (int)HttpStatusCode.BadRequest };
        }
        [HttpPost("addUser")]
        public JsonResult AddUser(Administrator user)
        {
            if (context.Administrators.Where(x => x.Login == user.Login).FirstOrDefault() == null)
            {
                context.Administrators.Add(user);
                context.SaveChanges();
                return new JsonResult("User added successfuly.") { StatusCode = (int)HttpStatusCode.OK };
            }
            return new JsonResult("Failed to add user!") { StatusCode = (int)HttpStatusCode.BadRequest };
        }
    }
}
