using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatabaseTest.Controllers
{
    public class MyContextHolder
    {
        private static MyContext MyContext { get; set; }
        public static MyContext GetInstance()
        {
            if (MyContext == null)
                MyContext = new MyContext();
            return MyContext;
        }
    }
}
