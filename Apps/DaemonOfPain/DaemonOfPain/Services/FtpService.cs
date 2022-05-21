using DaemonOfPain.Components;
using FluentFTP;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DaemonOfPain.Services
{
    public class FtpService
    {
        FtpClient client;
        public FtpService(FtpConfig config)
        {
            this.client = new FtpClient(config.Host, config.Username, config.Password);
            client.Connect();
        }
        public void UploadFile(string source, string destination)
        {
            client.UploadFile(source, destination);
        }
        public void DeleteFile(string path)
        {
            client.DeleteFile(path);
        }
        public void CreateDir(string path)
        {
            client.CreateDirectory(path, true);
        }
        public void UploadDir(string source, string destination)
        {
            client.UploadDirectory(source, destination);
        }
        public void DeleteDir(string path)
        {
            client.DeleteDirectory(path);
        }
        public bool FileExists(string path)
        {
            return client.FileExists(path);
        }
        public bool DirExists(string path)
        {
            return client.DirectoryExists(path);
        }
    }
}
