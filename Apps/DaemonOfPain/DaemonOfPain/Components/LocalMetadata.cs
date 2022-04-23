using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DaemonOfPain.Components
{
    public class LocalMetadata
    {
        public int ConfigID { get; set; }
        public Dictionary<string, List<MetaPackage>> MetadataFromDest { get; set; }//string je cesta destinace
    }
    public class MetaPackage
    {
        public List<Metadata> Backups { get; set; }
    }
}
