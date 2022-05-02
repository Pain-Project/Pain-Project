﻿using Newtonsoft.Json;
using Quartz;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DaemonOfPain
{
    public class ReportHolder : IJob
    {
        private static string ReportsPath = @"..\..\..\DaemonData\Reports.json";
        public async Task Execute(IJobExecutionContext context)
        {
            List<Report> reports = GetReports();
            foreach (var item in reports)
            {
                try
                {
                    await APIService.SendReport(item);
                    reports.Remove(item);
                }
                catch (Exception)
                {
                    break;
                }
            }
            WriteReports(reports);
        }
        private static List<Report> GetReports()
        {
            StreamReader sr = new StreamReader(ReportsPath);
            string data = sr.ReadToEnd();
            sr.Close();
            List<Report> reports = JsonConvert.DeserializeObject<List<Report>>(data);
            if (reports == null)
                reports = new List<Report>();
            return reports;
        }
        public static void AddReport(Report report)
        {
            List<Report> reports = GetReports();
            reports.Add(report);
            WriteReports(reports);
        }
        private static void WriteReports(List<Report> reports)
        {
            StreamWriter sw = new StreamWriter(ReportsPath,false);
            sw.Write(JsonConvert.SerializeObject(reports));
            sw.Close();
        }

    }
}
