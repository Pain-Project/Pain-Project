using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DaemonOfPain.Services
{
    public class DaemonDataService //Zápis a získávání DaemonDat ze souborů.txt
    {
        private string configPath = @"..\..\..\DaemonData\Configs.json";
        private string DaemonSettingsPath = @"..\..\..\DaemonData\DaemonSettings.json";
        private string SnapshotsPath = @"..\..\..\DaemonData\Snapshots.json";

        private List<Config> Configs = new List<Config>();

        public DaemonDataService()
        {
            StreamReader sr = new StreamReader(configPath);
            string data = sr.ReadToEnd();
            sr.Close();

            this.Configs = JsonConvert.DeserializeObject<List<Config>>(data);
        }


        public List<Config> GetAllConfigs()
        {
            return this.Configs;
        }
        public Config GetConfigByID(int id)
        {
            return this.Configs.Find(x => x.Id == id);
        }


        public void WriteAllConfigs(List<Config> data)
        {
            foreach (Config newConfig in data)
            {
                if (this.Configs.Exists(x => x.Id == newConfig.Id))
                {
                    this.Configs.Remove(this.Configs.Find(x => x.Id == newConfig.Id));
                }
                this.Configs.Add(newConfig);
            }
            StreamWriter sw = new StreamWriter(configPath);
            sw.Write(JsonConvert.SerializeObject(this.Configs));
            sw.Close();
        }
    }
}
