using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EmailSender
{
    public enum State
    {
        SUCCESS,
        NORUN,
        ERROR
    }
    public class TasksInfo
    {
        public int TaskId { get; set; }
        public int IdAssignment { get; set; }
        public State State { get; set; }
        public string Message { get; set; }
        public DateTime Date { get; set; }
        [Column("Size[MB]")]
        public int Size { get; set; }

    }
}
