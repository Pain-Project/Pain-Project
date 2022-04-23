using DaemonOfPain.Components;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DaemonOfPain.Services
{
    public class LocalMetadataService
    {
        private string MetadataPackagePath = @"..\..\..\DaemonData\BackupMetadata.json";
        public MetaPackage GetFirstOrLastPackage(List<MetaPackage> packages, bool first) //z listu metadat vrátí první nebo poslední Metadata podle Datumů v nich uloženýćh
        {
            if (packages.Count != 0)
            {
                MetaPackage result = packages[0];
                foreach (var meta in packages)
                {
                    try
                    {
                        if (first)
                        {
                            int resultNumber = DateTime.Compare(result.Backups[0].CreateDate, meta.Backups[0].CreateDate);
                            if (resultNumber > 0)
                                result = meta;
                        }
                        else
                        {
                            int resultNumber = DateTime.Compare(result.Backups[0].CreateDate, meta.Backups[0].CreateDate);
                            if (resultNumber < 0)
                                result = meta;
                        }
                    }
                    catch { }
                }
                return result;
            }
            return null;
        }
        public Metadata GetFirstOrLastMetadata(MetaPackage package, bool first) //z listu metadat vrátí první nebo poslední Metadata podle Datumů v nich uloženýćh
        {
            if (package.Backups.Count != 0)
            {
                Metadata result = package.Backups[0];
                foreach (var meta in package.Backups)
                {
                    if (first)
                    {
                        int resultNumber = DateTime.Compare(result.CreateDate, meta.CreateDate);
                        if (resultNumber > 0)
                            result = meta;
                    }
                    else
                    {
                        int resultNumber = DateTime.Compare(result.CreateDate, meta.CreateDate);
                        if (resultNumber < 0)
                            result = meta;
                    }
                }
                return result;
            }
            return null;
        }
        public void DeleteLastPackage()
        {

        }
        public void AddPackage()
        {

        }
        public void WriteMetadataPackage(LocalMetadata meta)
        {
            StreamReader sr = new StreamReader(MetadataPackagePath);
            string data = sr.ReadToEnd();
            sr.Close();
            List<LocalMetadata> metapackages = new List<LocalMetadata>();
            if (data != "")
                metapackages = JsonConvert.DeserializeObject<List<LocalMetadata>>(data);
            if (metapackages.Exists(x => x.ConfigID == meta.ConfigID))
                metapackages.Remove(metapackages.Find(x => x.ConfigID == meta.ConfigID));
            metapackages.Add(meta);

            StreamWriter sw = new StreamWriter(MetadataPackagePath);
            sw.Write(JsonConvert.SerializeObject(metapackages));
            sw.Close();
        }
        public LocalMetadata GetMetadataPackageByID(int id)
        {
            try
            {
                StreamReader sr = new StreamReader(MetadataPackagePath);
                string data = sr.ReadToEnd();
                sr.Close();
                List<LocalMetadata> metadatas = new List<LocalMetadata>();
                metadatas = JsonConvert.DeserializeObject<List<LocalMetadata>>(data);
                if(metadatas == null) { return null; }
                return metadatas.Find(x => x.ConfigID == id);
            }
            catch (NullReferenceException)
            { return null; }
        }
    }
}
