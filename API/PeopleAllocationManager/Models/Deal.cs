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
        //public virtual Client Client { get; set; }

        public bool? DealAccepted { get; set; }
        public bool? DealRejected { get; set; }
        public string? Status { get; set; }
        public string Description { get; set; }

        public string? Title { get; set; }

        public string? DealUrlLink { get; set; }

        public int? RequestId { get; set; }

        //public virtual Request Request { get; set; }

    }
}
