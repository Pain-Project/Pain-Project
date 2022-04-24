using ConsoleApp6;
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
        public APIService API { get; set; }
        public TaskManager TaskManager { get; set; }
        public async Task StartApplication()
        {
            DataService = new DaemonDataService();
            Timer = new Timer();
            API = new APIService();
            TaskManager = new TaskManager();


            TaskManager.UpdateTaskList(DataService.GetAllConfigs());
            await Timer.SetUp(DataService.GetAllConfigs());

            while (true)
                Thread.Sleep(10000);

        }
    }
}
