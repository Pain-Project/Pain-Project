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

        private static void Setup()
        {
            if(client.BaseAddress == null)
            {
                client.BaseAddress = new Uri(@"https://localhost:5001/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));
            }
        }
        public static async Task<string> LoginToServer()
        {
            Setup();
            try
            {
                string hash = await LoginToServer(new Computer());
                Console.WriteLine("API1 - LoginToServer");
                return hash;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return "";
            }
        }
        static async Task<string> LoginToServer(Computer pc)
        {
            HttpResponseMessage response = await client.PostAsJsonAsync("/Daemon/AddDaemon", pc);
            response.EnsureSuccessStatusCode();
            return response.Content.ReadAsStringAsync().Result.Trim('"');
        }


        //****************************************************************************************************************

        public static async Task GetConfigs()
        {
            Setup();
            try
            {
                List<APIconfig> respose = await GetConfigs(Application.HashOfThisClient);
                Application.DataService.WriteAllConfigs(APIconfig.ConvertListToConfig(respose));
                Console.WriteLine("API2 - GetConfigs");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        static async Task<List<APIconfig>> GetConfigs(string hash)
        {
            string response = await client.GetStringAsync($"/Daemon/GetConfigs/{hash}");
            IEnumerable<APIconfig> config = null;
            config = JsonConvert.DeserializeObject<List<APIconfig>>(response);
            return (List<APIconfig>)config;
        }
        //****************************************************************************************************************
        public static async Task SendReport(Report report)
        {
            Setup();
            var url = await SendReport2(report);
        }
        static async Task<Uri> SendReport2(Report report)
        {

            HttpResponseMessage response = await client.PostAsJsonAsync("/Daemon/sendReport", report);
            response.EnsureSuccessStatusCode();
            Console.WriteLine("API3 - SendReport");
            return response.Headers.Location;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            await GetConfigs();
        }
    }
}

