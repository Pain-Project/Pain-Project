using Quartz;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace DaemonOfPain.Encryption
{
    public class EncryptionKeysManager : IJob
    {
        public static string ServerKey { get; set; }
        public static DateTime ServerKeyExpiration { get; set; } = DateTime.Now.AddDays(-1);
        private static RSACryptoServiceProvider MyKey { get; set; }
        public Task Execute(IJobExecutionContext context)
        {
            NewKeys();
            return Task.CompletedTask;
        }
        public static void NewKeys()
        {
            //if (provider != null)
            //    provider = null;

            MyKey = new RSACryptoServiceProvider(1024);


            //RSAParameters MyPrivateKeyParam = provider.ExportParameters(true);
            //RSAParameters MyPublicKeyParam = provider.ExportParameters(false);
            //MyPrivateKey.ImportParameters(MyPrivateKeyParam);
            //MyPublicKey.ImportParameters(MyPublicKeyParam);



            //RSA r = RSA.Create();
            //RSAParameters p = r.ExportParameters(true);
            //provider.ImportParameters(p);

        }

        public static string GetPublicKey()
        {
            return RsaProcessor.ExportPublicKey(MyKey);
        }
        public static string GetPrivateKey()
        {
            return RsaProcessor.ExportPrivateKey(MyKey);
        }
    }
}
