using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DatabaseTest.DatabaseTables
{
    public class Task
    {
        public int Id { get; set; }
        public int IdAssignment { get; set; }
        public string State { get; set; }
        public string Message { get; set; } //v db Varchar(0)? (úmysl jako max -> nefunguje -> navýšeno na 255 zatím)
        public string Date { get; set; }
        [Column("Size[MB]")]
        public int Size { get; set; } 
    }
}
