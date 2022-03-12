using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DaemonOfPain
{
    public class Snapshot
    {
        public int ConfigID { get; set; }
        public List<SnapshotItem> Items { get; set; }
    }
}
