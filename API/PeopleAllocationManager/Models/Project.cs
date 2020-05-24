using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeopleAllocationManager.Models
{
    public class Project
    {
        //-	Projects(ProjectId, Name, StartDate, EndDate, ClientId, AgreementNumber, AgreementDate)
        public int ProjectId { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string AgreementUrl { get; set; }

        public int ClientId { get; set; }
        public virtual Client Client { get; set; }

        public virtual IEnumerable<DailyActivity> DailyActivities { get; set; }

        public virtual ICollection<EmployeeProject> EmployeeProject { get; set; }



    }
}
