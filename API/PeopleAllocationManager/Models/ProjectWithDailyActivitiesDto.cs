using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeopleAllocationManager.Models
{
    public class ProjectWithDailyActivitiesDto
    {
        public int ProjectId { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string AgreementUrl { get; set; }

        public int ClientId { get; set; }
        public virtual ClientsDto Client { get; set; }

        public virtual ICollection<DailyActivity> DailyActivities { get; set; }

        public virtual IEnumerable<EmployeeDto> EmployeeProject { get; set; }



        public bool? IsChargeable { get; set; }
    }
}
