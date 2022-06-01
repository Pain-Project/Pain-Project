using EmailSender.Services;
using Quartz;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace EmailSender
{
    public class Application : IJob
    {
        GetSettingsInfo settingsGetter { get; set; }
        public static SettingsInfo setinf { get; set; }
        public static Timer Timer  { get; set; }
        public Application()
        {
            settingsGetter = new GetSettingsInfo();
            Timer = new Timer();
        }
        public async Task Start()
        {
            setinf = await settingsGetter.GetInfo();
            await Timer.SetUp(setinf);
            while (true)
            {
                Thread.Sleep(5000);
            }
        }
        public async Task Execute(IJobExecutionContext context)
        {
            settingsGetter = new GetSettingsInfo();
            setinf = await settingsGetter.GetInfo();
        }
    }
}
