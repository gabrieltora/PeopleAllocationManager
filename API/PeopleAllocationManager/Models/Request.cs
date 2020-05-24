using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeopleAllocationManager.Models
{
    public class Request
    {
        public int RequestId { get; set; }
        public string Description { get; set; }

        public DateTime Date { get; set; }

        public int? ClientId { get; set; }
        public virtual Client Client { get; set; }

    }
}
