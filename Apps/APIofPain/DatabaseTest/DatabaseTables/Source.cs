using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatabaseTest.DatabaseTables
{
    public class Source
    {
        public int Id { get; set; }
        public int IdConfig { get; set; }
        public string Path { get; set; } //v db Varchar(0)? (úmysl jako max -> nefunguje -> navýšeno na 260 zatím)
    }
}
