using DaemonOfPain;
using DaemonOfPain.Controller.ClassesToSend;
using DaemonOfPain.Services;
using DaemonOfPain.Services.APIClasses;
using Newtonsoft.Json;
using Quartz;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.NetworkInformation;
using System.Net.Sockets;
using System.Threading.Tasks;

namespace DaemonOfPain
{
    public class APIService : IJob
    {
        static HttpClient client = new HttpClient();

        public static async Task<int> LoginToServer()
        {
            client.BaseAddress = new Uri(@"https://localhost:5001/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            try
            {
                int id = await LoginToServer(new Computer());
                return id;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return 0;
            }
        }
        static async Task<int> LoginToServer(Computer pc)
        {
            HttpResponseMessage response = await client.PostAsJsonAsync("/Daemon/AddDaemon", pc);
            response.EnsureSuccessStatusCode();
            return Convert.ToInt32(response.Content.ReadAsStringAsync().Result);
        }


        //****************************************************************************************************************

        public static async Task GetConfigs()
        {
            client.BaseAddress = new Uri(@"https://localhost:5001/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            try
            {
                List<APIconfig> respose = await GetConfigs(Application.IdOfThisClient);
                Application.DataService.WriteAllConfigs(APIconfig.ConvertListToConfig(respose));
                Console.WriteLine("API2");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        static async Task<List<APIconfig>> GetConfigs(int id)
        {

            string response = await client.GetStringAsync($"/Daemon/GetConfigs/{id}");
            IEnumerable<APIconfig> config = null;
            config = JsonConvert.DeserializeObject<List<APIconfig>>(response);
            return (List<APIconfig>)config;
        }
        //****************************************************************************************************************
        public static async Task SendReport()
        {
            client.BaseAddress = new Uri(@"https://localhost:5001/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            try
            {
                Report report = new Report() { };
                var url = await SendReport(report);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        static async Task<Uri> SendReport(Report report)
        {

            HttpResponseMessage response = await client.PostAsJsonAsync("/Daemon/AddDaemon", report);
            response.EnsureSuccessStatusCode();
            return response.Headers.Location;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            Console.WriteLine("API1");
            await GetConfigs();
        }
    }
}

