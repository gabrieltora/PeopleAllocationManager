using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeopleAllocationManager.Models
{
    public class DailyActivity
    {
        //-	DailyActivities(DailyActivityId, Date, ProjectId, EmployeeId, ServiceId, WorkedHours, Comment, Price)
        public int DailyActivityId { get; set; }
        public DateTime Date { get; set; }
        public double WorkedHours { get; set; }
        public string Comment { get; set; }
        public double Price { get; set; }

        public int ProjectId { get; set; }

        public int EmployeeId { get; set; }

        public int ServiceId { get; set; }

        public int? InvoiceId { get; set; }
        public virtual Invoice Invoice { get; set; }
    }
}

