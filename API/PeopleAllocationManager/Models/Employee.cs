using System;
using System.Collections.Generic;

namespace PeopleAllocationManager.Models
{
    public partial class Employee
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

        public int UserRoleId { get; set; }

        public int? FunctionId { get; set; }

        public int? SeniorityId { get; set; }

        public virtual IEnumerable<DailyActivity> DailyActivities { get; set; }

        public virtual ICollection<EmployeeTechnology> EmployeeTechnology { get; set; }

        public virtual ICollection<EmployeeProject> EmployeeProject { get; set; }
    }
}
