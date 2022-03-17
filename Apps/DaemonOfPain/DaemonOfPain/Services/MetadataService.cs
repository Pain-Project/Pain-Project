using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DaemonOfPain.Services
{
    public class MetadataService
    {
        public void WriteMetadata(string path, Metadata meta)
        {
            StreamWriter sw = new StreamWriter(path + @"\Metadata.json");

            sw.Write(JsonConvert.SerializeObject(meta));
            sw.Close();
        }
        public Metadata GetMetadata(string path)
        {
            StreamReader sr = new StreamReader(path + @"\Metadata.json");

            string data = sr.ReadToEnd();
            sr.Close();

            return JsonConvert.DeserializeObject<Metadata>(data);
        }
    }
}
