using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeopleAllocationManager.Models
{
    public class Invoice
    {
        //-	Invoices(InvoiceId, Date, ProviderId, ProjectId, VAT, Discount, DailyActivityId)
        public int InvoiceId { get; set; }
        public DateTime Date { get; set; }
        public double VAT { get; set; }
        public double Discount { get; set; }

        public virtual IEnumerable<DailyActivity> DailyActivities { get; set; }

        public int ProviderId { get; set; }
        public virtual Provider Provider { get; set; }

        public int ClientId { get; set; }
        public virtual Client Client { get; set; }
    }
}
