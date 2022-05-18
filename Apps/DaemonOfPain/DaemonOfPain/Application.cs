using DaemonOfPain.Components;
using DaemonOfPain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace DaemonOfPain
{
    public class Application
    {
        public Timer Timer { get; set; }
        public static DaemonDataService DataService { get; set; }
        public TaskManager TaskManager { get; set; }
        public static string HashOfThisClient { get; set; }
        public Application()
        {
            DataService = new DaemonDataService();
            Timer = new Timer();
            TaskManager = new TaskManager();
        }
        public async Task StartApplication()
        {
            Settings set = DataService.GetSettings();
            if (set == null)
            {
                string hash = await APIService.LoginToServer();
                DataService.WriteSettings(new Settings() { Hash = hash });
                HashOfThisClient = hash;
                if (hash == "")
                    throw new Exception();//nelze se spojit s databází
            }
            else
            {
                HashOfThisClient = set.Hash;
            }

            await APIService.GetConfigs();

            TaskManager.UpdateTaskList(DataService.GetAllConfigs());
            await Timer.SetUp(DataService.GetAllConfigs());

            while (true)
            {
                if (DataService.ConfigsWasChanged)
                {
                    DataService.ConfigsWasChanged = false;
                    await Timer.SetUp(DataService.GetAllConfigs());
                }
                    
                Thread.Sleep(5000);
            }
                

        }
    }
}
