﻿using DaemonOfPain;
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
using DaemonOfPain.Encryption;

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
                string id = await LoginToServer(new Computer());
                Console.WriteLine("API1 - LoginToServer");
                return id;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
        static async Task<string> LoginToServer(Computer pc)
        {
            APIRequest request = new APIRequest() { Data = JsonConvert.SerializeObject(pc), PublicKey = EncryptionKeysManager.GetPublicKey() };
            EncryptedAPIRequest enRequest = RsaProcessor.CombinedEncrypt(AesProcessor.GenerateKey(), EncryptionKeysManager.ServerKey, request);

            HttpResponseMessage response = await client.PostAsJsonAsync("/Daemon/AddDaemon", enRequest);
            response.EnsureSuccessStatusCode();
            EncryptedAPIRequest data = JsonConvert.DeserializeObject<EncryptedAPIRequest>(response.Content.ReadAsStringAsync().Result);
            return RsaProcessor.CombinedDecryptString(EncryptionKeysManager.GetPrivateKey(), data);
        }
        //****************************************************************************************************************


        public static async void GetServerPublicKey()
        {
            Setup();
            string response = await client.GetStringAsync("/Daemon/GetPublicKey");
            response = response.Substring(1, response.Length - 2);
            EncryptionKeysManager.ServerKey = response;
        }


        //****************************************************************************************************************

        public static async Task GetConfigs()
        {
            Setup();
            try
            {
                List<APIconfig> respose = await GetConfigs(Application.IdOfThisClient);
                Application.DataService.WriteAllConfigs(APIconfig.ConvertListToConfig(respose));
                Console.WriteLine("API2 - GetConfigs");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        static async Task<List<APIconfig>> GetConfigs(string id)
        {
            string response = await client.GetStringAsync($"/Daemon/GetConfigs/{id}");
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

