using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeopleAllocationManager.Models
{
    public class Provider
    {
        //-	Providers(ProviderId, Name, CIF, Country, City, Adress, IBAN, Bank, PhoneNumber)
        public int ProviderId{ get; set; }
        public string Name{ get; set; }
        public string CIF { get; set; }
        public int CountryId { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string IBAN { get; set; }
        public string Bank { get; set; }
}
}
