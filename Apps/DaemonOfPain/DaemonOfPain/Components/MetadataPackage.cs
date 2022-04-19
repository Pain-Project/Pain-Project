using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DaemonOfPain.Components
{
    public class MetadataPackage
    {
        public int ConfigID { get; set; }
        public List<Package> Packages { get; set; }
    }
    public class Package
    {
        public List<Metadata> Backups { get; set; }
    }
}
