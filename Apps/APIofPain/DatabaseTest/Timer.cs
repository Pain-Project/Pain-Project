using Quartz;
using Quartz.Impl;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DatabaseTest.DatabaseTables
{
    public class Timer
    {
        public IScheduler scheduler { get; set; }

        public async System.Threading.Tasks.Task SetUp()
        {
            scheduler = await new StdSchedulerFactory().GetScheduler();
            IJobDetail job = JobBuilder.Create<Tasker>().Build();
            ITrigger trigger = TriggerBuilder.Create().WithSimpleSchedule(x => x.WithIntervalInHours(1).RepeatForever()).Build();
            await scheduler.ScheduleJob(job, trigger);
            await scheduler.Start();
        }

    }
}
