﻿using DaemonOfPain.Services;
using System;
using System.Collections.Generic;

namespace DaemonOfPain
{
    internal class Program
    {
        static void Main(string[] args)
        {
            DaemonDataService dd = new DaemonDataService();

            Console.WriteLine(dd.GetSnapshotByID(1).Items.Count);
        }
    }
}