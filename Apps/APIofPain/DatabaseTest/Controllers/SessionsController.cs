using DatabaseTest.Logins;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Http;

namespace DatabaseTest.Controllers
{
    [ApiController]
    [Route("AdminPage")]
    public class SessionsController : ControllerBase
    {
        private AuthService auth = new AuthService();

        [HttpPost("login")]
        public JsonResult Login(Credentials cd)
        {
            try
            {
                var ip = HttpContext.Connection.RemoteIpAddress.ToString();

                return new JsonResult(this.auth.Authenticate(cd, ip != null ? ip : ""));
            }
            catch
            {
                return new JsonResult("Invalid username or password!") { StatusCode = (int)HttpStatusCode.Unauthorized };
            }
        }
    }
}
