using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatabaseTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DatabaseController : ControllerBase
    {
        MyContext myContext = new MyContext();

        [HttpGet("Get1")]
        public IEnumerable<Client> Get()
        {
            return myContext.Clients;
        }
        [HttpGet("Get2")]
        public IEnumerable<Client> GetTest()
        {
            return myContext.Clients;
        }

        [HttpPost]
        public void Post(string name, string ip, string mac)
        {
            Client client = new Client() { Name = name, IpAddress = ip, MacAddress = mac };
            myContext.Clients.Add(client);

            myContext.SaveChanges();
        }

        [HttpDelete]
        public void Delete(int id)
        {
            Client client = myContext.Clients.Find(id);
            myContext.Clients.Remove(client);

            myContext.SaveChanges();
        }
    }
}
