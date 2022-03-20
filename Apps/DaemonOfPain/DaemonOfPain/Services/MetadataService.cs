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



        public List<Metadata> MetaSearcher(string path, bool returnFirstRecord = false)
        {
            DirectoryInfo directories = new DirectoryInfo(path);
            List<Metadata> Mlist = new List<Metadata>();
            foreach (var dir in directories.GetDirectories())
            {
                DirectoryInfo subDirectories = new DirectoryInfo(dir.FullName);
                foreach (var subDir in subDirectories.GetDirectories())
                {
                    if (File.Exists(subDir.FullName + "\\Metadata.json"))
                    {
                        Mlist.Add(GetMetadata(subDir.FullName + "\\Metadata.json"));
                        if (returnFirstRecord) { return Mlist; }
                    }
                    else
                    {
                        DirectoryInfo subSubDirectories = new DirectoryInfo(subDir.FullName);
                        foreach (var subSubDir in subSubDirectories.GetDirectories())
                        {
                            if (File.Exists(subSubDir.FullName + "\\Metadata.json"))
                            {
                                Mlist.Add(GetMetadata(subSubDir.FullName + "\\Metadata.json"));
                                if (returnFirstRecord) { return Mlist; }
                            }
                        }
                    }
                }
            }
            return Mlist;
        }

        //public string GetConfigPath(Config config, string path)
        //{
        //    DirectoryInfo directores = new DirectoryInfo(path);
        //    foreach (var dir in directores.GetDirectories())
        //    {
        //        string[] parts = dir.Name.Split('_');
        //        if(parts[1] == config.ConfigName) { return dir.FullName; }
        //    }
        //    //projdi všehny metadata
        //    foreach (var dir in directores.GetDirectories())
        //    {
        //        List<Metadata> Mlist = MetaSearcher(dir.FullName, true);
        //        foreach (var item in Mlist)
        //        {
        //            if(item.ConfigName == config.ConfigName)
        //            {
        //                return dir.FullName;
        //            }
        //        }
        //    }
        //    return null;
        //}

    }
}
