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
        private string TableTitleStyle = "border: 2px solid;";
        private string RowStyle = "border: 2px solid; padding: 7px";
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
            messageTemplate.AppendLine($"<p>Hi Admin!</p>");
            messageTemplate.AppendLine($"<p>This is your {setInfo.Freq} report from LePain a.s.</p>");
            messageTemplate.AppendLine("<br>");
            messageTemplate.AppendLine("<p>Here is your report: </p>");
            messageTemplate.AppendLine($"<p>Number of tasks with state - SUCCESS: {settingsGetter.SUCCESS_count}</p>");
            messageTemplate.AppendLine($"<p>Number of tasks with state - NORUN: {settingsGetter.NORUN_count}</p>");
            messageTemplate.AppendLine($"<p>Number of tasks with state - ERROR: {settingsGetter.ERROR_count}</p>");
            messageTemplate.AppendLine($"<p>Number of all tasks: {taskInfo.Count}</p>");
            if(settingsGetter.ERROR_count != 0)
            {
                messageTemplate.AppendLine("<br>");
                messageTemplate.AppendLine("<p>PROBLEMS: </p>");
                messageTemplate.AppendLine("<br>");
                messageTemplate.AppendLine($"<table style='{this.TableTitleStyle}'><tr><th style='{this.TableTitleStyle}'>ID</th><th style='{this.TableTitleStyle}'>ID ASSIGNMENT</th><th style='{this.TableTitleStyle}'>DATE</th><th style='{this.TableTitleStyle}'>MESSAGE</th></tr>");
                foreach (var item in taskInfo)
                {
                    if (item.State == State.ERROR)
                        messageTemplate.AppendLine($"<tr><td style='{this.RowStyle}'>{item.TaskId}</td><td style='{this.RowStyle}'>{item.IdAssignment}</td><td style='{this.RowStyle}'>{item.Date}</td><td style='{this.RowStyle}'>{item.Message}<td></tr>");
                }
                messageTemplate.AppendLine("</table>");
            }
            messageTemplate.AppendLine("<br>");
            messageTemplate.AppendLine("<p>Have a nice day! :)</p>");
            messageTemplate.AppendLine("<p>  -LePain a.s.</p>");

            //message creating
            MailAddress FromEmail = new MailAddress(setInfo.Sender, "Your report sender");
            MailMessage Message = new MailMessage()
            {
                IsBodyHtml = true,
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
