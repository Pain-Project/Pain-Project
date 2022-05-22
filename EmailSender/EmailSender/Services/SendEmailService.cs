using EmailSender.Services;
using FluentEmail.Core;
using FluentEmail.Smtp;
using Quartz;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace EmailSender
{
    public class SendEmailService :IJob
    {
        public async Task EmailSender(SettingsInfo setInfo, GetSettingsInfo settingsGetter, List<TasksInfo> taskInfo)
        {
            //smtp client creation
            SmtpClient client = new SmtpClient()
            {
                Host = setInfo.SMTP,
                Port = setInfo.Port,
                EnableSsl = setInfo.SSL,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential()
                {
                    UserName = setInfo.Sender,
                    Password = setInfo.Password
                }
            } ;

            //template creating
            StringBuilder messageTemplate = new StringBuilder();
            messageTemplate.AppendLine($"Hi Admin! This is your {setInfo.Freq} report from LePain a.s.");
            messageTemplate.AppendLine("");
            messageTemplate.AppendLine("Here is your report: ");
            messageTemplate.AppendLine($"Number of tasks with state - SUCCESS: {settingsGetter.SUCCESS_count}");
            messageTemplate.AppendLine($"Number of tasks with state - NORUN: {settingsGetter.NORUN_count}");
            messageTemplate.AppendLine($"Number of tasks with state - ERROR: {settingsGetter.ERROR_count}");
            messageTemplate.AppendLine($"Number of all tasks: {taskInfo.Count}");
            if(settingsGetter.ERROR_count != 0)
            {
                messageTemplate.AppendLine("");
                messageTemplate.AppendLine("PROBLEMS: ");
                foreach (var item in taskInfo)
                {
                    if (item.State == State.ERROR)
                        messageTemplate.AppendLine($"ID: {item.TaskId} /// DATE: {item.Date} /// MESSAGE: {item.Message}");
                }
            }
            messageTemplate.AppendLine("");
            messageTemplate.AppendLine("Have a nice day! :)");
            messageTemplate.AppendLine("  -LePain a.s.");

            //message creating
            MailAddress FromEmail = new MailAddress(setInfo.Sender, "Your report sender");
            MailMessage Message = new MailMessage()
            {
                From = FromEmail,
                Subject = $"Your {setInfo.Freq} report!",
                Body = messageTemplate.ToString()
            };

            //email validation and sending
            Regex regex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
            foreach (var item in setInfo.SendTo)
            {
                if (regex.IsMatch(item))
                    Message.To.Add(item);
            }
                client.SendCompleted += Client_SendCompleted;
                await client.SendMailAsync(Message);
        }

        private static void Client_SendCompleted(object sender, System.ComponentModel.AsyncCompletedEventArgs e)
        {
            if(e.Error != null)
            {
                Console.WriteLine("Something went wrong!");
                return;
            }
            Console.WriteLine("Email send succesfully!");
        }

        public async Task Execute(IJobExecutionContext context)
        {
            GetSettingsInfo settingsGetter = new GetSettingsInfo();
            SettingsInfo setinf = await settingsGetter.GetInfo(); //get email settings
            List<TasksInfo> taskInfo = await settingsGetter.GetTasks(); //get list of tasks
            settingsGetter.CountStates(taskInfo); //count nubmer of tasks with specific state
            await this.EmailSender(setinf, settingsGetter, taskInfo); //send email
        }
    }
}
