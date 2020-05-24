using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeopleAllocationManager.Models
{
    public class EmployeeTechnology
    {
        public int EmployeeId { get; set; }
        public virtual Employee Employee { get; set; }

        public int TechnologyId { get; set; }
        public virtual Technology Technology { get; set; }
    }
}
