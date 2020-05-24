using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeopleAllocationManager.Models
{
    public class Deal
    {
        public int DealId { get; set; }
        public DateTime Date { get; set; }

        public int? ClientId { get; set; }
        public virtual Client Client { get; set; }

        public bool? DealAccepted { get; set; }
        public string Description { get; set; }

    }
}
