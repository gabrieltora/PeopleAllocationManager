using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeopleAllocationManager.Models
{
    public class EmployeeNoTechnologyNoProjectDto
    {
        public int UserId { get; set; }
        public string EmployeeCode { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? PhoneNumber { get; set; }
        public double? GrossSalary { get; set; }
        public double? NetSalary { get; set; }
        public double? HourlyPrice { get; set; }
        public bool? IsVatPayer { get; set; }

        public int DepartmentId { get; set; }
        public virtual Department Department { get; set; }

        public int UserRoleId { get; set; }

        public int? FunctionId { get; set; }
        public virtual Function Function { get; set; }

        public int? SeniorityId { get; set; }
        public virtual Seniority Seniority { get; set; }
        
        public virtual ICollection<DailyActivity> DailyActivities { get; set; }

    }
}
