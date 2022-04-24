using DaemonOfPain.Services;
using Quartz;
using Quartz.Impl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DaemonOfPain
{
    public class Timer
    {
        public IScheduler scheduler { get; set; }

        public async Task SetUp(List<Config> configs)
        {
            scheduler = await new StdSchedulerFactory().GetScheduler();
            await ClientPrepare();
            await StartTimer(configs);
        }

        private async Task ClientPrepare()
        {
            IJobDetail updateTaskJob = JobBuilder.Create<TaskManager>().Build();
            ITrigger trigger = TriggerBuilder.Create().WithSimpleSchedule(x => x.WithIntervalInHours(1).RepeatForever()).Build();
            await scheduler.ScheduleJob(updateTaskJob, trigger);


            //dotazování na server
        }

        private async Task StartTimer(List<Config> configs)
        {
            foreach (var item in configs)
            {
                IJobDetail job = JobBuilder.Create<BackupService>().Build();
                ITrigger trigger = TriggerBuilder.Create().WithCronSchedule(CronCorrector(item.Cron)).Build();
                await scheduler.ScheduleJob(job, trigger);
            }
            await scheduler.Start();
        }

        private string CronCorrector(string cron)
        {
            string[] parts = cron.Split(' ');
            if (parts[2] == "*" || parts[4] == "*") { parts[2] = "?"; }
            else if (parts[2] != "*" || parts[4] == "*") { parts[4] = "?"; }
            else if (parts[2] == "*" || parts[4] != "*") { parts[2] = "?"; }
            else if (parts[2] != "*" || parts[4] != "*") { parts[4] = "?"; }
            return "0 " + String.Join(' ', parts).Trim();
        }

    }
}
