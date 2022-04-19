using DaemonOfPain.Controller.ClassesToSend;
using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.NetworkInformation;
using System.Net.Sockets;
using System.Threading.Tasks;

namespace ConsoleApp6
{
    public class ServerController
    {
        static HttpClient client = new HttpClient();

        static async Task RunAsync()
        {
            client.BaseAddress = new Uri(@"https://localhost:5001/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            //try
            //{
            //    Client pc = new Client()
            //    {
            //        IpAddress = GetLocalIPAddress(),
            //        MacAddress = GetMacAddress(),
            //        Name = "PC"
            //    };

            //    var url = await CreateClientPCAsync(pc);
            //    Console.WriteLine($"Created at {url}");
            //}
            //catch (Exception ex)
            //{
            //    Console.WriteLine(ex.Message);
            //}
        }
        static async Task<Uri> LoginToServer()
        {
            HttpResponseMessage response = await client.PostAsJsonAsync("/Daemon/AddDaemon", new Computer());
            Console.WriteLine(response.ToString());
            Console.ReadKey(true);
            response.EnsureSuccessStatusCode();

            return response.Headers.Location;
        }
        static void Main(string[] args)
        {
            RunAsync().GetAwaiter().GetResult();
        }

    }
}

