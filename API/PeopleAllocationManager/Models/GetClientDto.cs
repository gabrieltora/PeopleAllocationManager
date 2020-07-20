using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeopleAllocationManager.Models
{
    public class GetClientDto
    {
        public int ClientId { get; set; }
        public string Name { get; set; }
        public string? PhoneNumber { get; set; }
        public string Email { get; set; }
        public string? CIF { get; set; }
        public int? CountryId { get; set; }
        public virtual Country Country { get; set; }
        public string? City { get; set; }
        public string? Address { get; set; }
        public string? IBAN { get; set; }
        public string? Bank { get; set; }

        public bool IsActiveClient { get; set; }

        public virtual IEnumerable<ProjectDto> Projects { get; set; }

        public virtual ICollection<Deal> Deals { get; set; }

        public virtual ICollection<Request> Requests { get; set; }
    }
}
