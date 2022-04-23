using DaemonOfPain;
using DaemonOfPain.Controller.ClassesToSend;
using DaemonOfPain.Services;
using DaemonOfPain.Services.APIClasses;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.NetworkInformation;
using System.Net.Sockets;
using System.Threading.Tasks;

namespace ConsoleApp6
{
    public class APIService
    {
        static HttpClient client = new HttpClient();

        public static async Task LoginToServer()
        {
            client.BaseAddress = new Uri(@"https://localhost:5001/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            try
            {
                var url = await LoginToServer(new Computer());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        static async Task<Uri> LoginToServer(Computer pc)
        {
            HttpResponseMessage response = await client.PostAsJsonAsync("/Daemon/AddDaemon", pc);
            response.EnsureSuccessStatusCode();
            return response.Headers.Location;
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
                List<APIconfig> respose = await GetConfigs(7);//přepsat!!!!!!!!!!!!!!!!!!získávat z nějaké třídy s daty
                new DaemonDataService().WriteAllConfigs(APIconfig.ConvertListToConfig(respose));
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

    }
}

