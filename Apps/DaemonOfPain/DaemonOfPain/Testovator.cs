using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DaemonOfPain
{
    public class Testovator : IJob
    {
        public Task Execute(IJobExecutionContext context)
        {
            Console.WriteLine("Done" + DateTime.Now);
            return Task.CompletedTask;
        }
    }
}
