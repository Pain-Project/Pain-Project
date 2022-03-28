using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatabaseTest.DatabaseTables
{
    public class LoginLog
    {
        public int Id { get; set; }
        public int IdAdministrator { get; set; }
        public string LoginTime { get; set; }
        public string IpAddress { get; set; }
    }
}
