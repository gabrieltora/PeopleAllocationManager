using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeopleAllocationManager.Models
{
    public class Technology
    {
        public int TechnologyId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<EmployeeTechnology> EmployeeTechnology { get; set; }


    }
}
