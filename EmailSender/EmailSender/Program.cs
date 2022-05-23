using EmailSender.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmailSender
{
    public class Program
    {
        static async Task Main(string[] args)
        {

            Application app = new Application();
            await app.Start();

            //try
            //{
            //    GetSettingsInfo settingsGetter = new GetSettingsInfo();
            //    SettingsInfo setinf = await settingsGetter.GetInfo(); //get email settings

            //    List<TasksInfo> taskInfo = await settingsGetter.GetTasks(); //get list of tasks
            //    settingsGetter.CountStates(taskInfo); //count nubmer of tasks with specific state
            //    //await SendEmailService.EmailSender(setinf, settingsGetter, taskInfo); //send email
            //}
            //catch(Exception e)
            //{
            //    throw new Exception();
            //}
            //Console.ReadKey(true);
        }
    }
}
