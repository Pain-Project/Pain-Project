using DatabaseTest.DataClasses;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;

namespace DatabaseTest.Controllers
{
    [ApiController]
    [Route("Email")]
    public class EmailController : ControllerBase
    {
        private MyContext context = new MyContext();
        private string dataPath = @"Data\emailSettings.json";


        [HttpGet("getEmails")]
        public JsonResult GetEmails()
        {
            try
            {
                List<string> emails = this.context.Administrators.Select(x => x.Email).ToList();

                if (emails == null)
                    return new JsonResult("Emails not found!") { StatusCode = (int)HttpStatusCode.NotFound };
                return new JsonResult(emails) { StatusCode = (int)HttpStatusCode.OK };
            }
            catch (Exception)
            {
                return new JsonResult("Cannot resolve request!") { StatusCode = (int)HttpStatusCode.BadRequest };

            }
        }

        [HttpGet("getSettings")]
        public JsonResult GetSettings()
        {
            try
            {
                StreamReader sr = new StreamReader(dataPath);
                EmailSettings em = JsonConvert.DeserializeObject<EmailSettings>(sr.ReadToEnd());
                if (em == null)
                    return new JsonResult("Settings not found!") { StatusCode = (int)HttpStatusCode.NotFound };
                return new JsonResult(em) { StatusCode = (int)HttpStatusCode.OK };
            }
            catch (Exception)
            {
                return new JsonResult("Cannot resolve request!") { StatusCode = (int)HttpStatusCode.BadRequest };

            }
        }
    }
}
