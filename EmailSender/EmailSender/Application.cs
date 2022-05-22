using EmailSender.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace EmailSender
{
    public class Application
    {
        GetSettingsInfo settingsGetter { get; set; }
        SettingsInfo setinf { get; set; }
        Timer Timer  { get; set; }
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
    }
}
