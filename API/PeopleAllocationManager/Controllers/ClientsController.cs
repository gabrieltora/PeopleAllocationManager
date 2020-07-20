using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeopleAllocationManager.Models;

namespace PeopleAllocationManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly PeopleAllocationManagerContext _context;

        public ClientsController(PeopleAllocationManagerContext context)
        {
            _context = context;
        }

        // GET: api/Clients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Client>>> GetClient()
        {
            return await _context.Client.ToListAsync();
        }


        // GET: api/Clients/dto
        [HttpGet("/api/Clients/dto")]
        public IQueryable<ClientsDto> GetClientDto()
        {
            var clients = from c in _context.Client
                          select new ClientsDto()
                          {
                              ClientId = c.ClientId,
                              Name = c.Name,
                              PhoneNumber = c.PhoneNumber,
                              Email = c.Email,
                              CIF = c.CIF,
                              CountryId = c.CountryId,
                              Country = c.Country,
                              City = c.City,
                              Address = c.Address,
                              IBAN = c.IBAN,
                              Bank = c.Bank,
                              IsActiveClient = c.IsActiveClient
                            };

            return clients;
        }

        // GET: api/ClientsDealsRequests/dto
        [HttpGet("/api/ClientsDealsRequests/dto")]
        public IQueryable<ClientsDealsRequestsDto> GetClientsDealsRequestsDto()
        {
            var clients = from c in _context.Client
                          select new ClientsDealsRequestsDto()
                          {
                              ClientId = c.ClientId,
                              Name = c.Name,
                              PhoneNumber = c.PhoneNumber,
                              Email = c.Email,
                              CIF = c.CIF,
                              CountryId = c.CountryId,
                              Country = c.Country,
                              City = c.City,
                              Address = c.Address,
                              IBAN = c.IBAN,
                              Bank = c.Bank,
                              IsActiveClient = c.IsActiveClient,
                              Deals = c.Deals,
                              Requests = c.Requests
                          };

            return clients;
        }





        // GET: api/Clients/GetClientDto/dto/{id}
        [HttpGet("/api/Clients/GetClientDto/dto/{id}")]
        public IActionResult GetGetClientDto(int id)
        {
            var foundClient = _context.Client.Where(e => e.ClientId == id);

            if (foundClient == null)
            {
                return NotFound();
            }
            List<GetClientDto> final_result = new List<GetClientDto>();
            foreach (var c in foundClient)
            {

                var projects = from proj in c.Projects
                                select new ProjectDto()
                                {
                                    ProjectId = proj.ProjectId,
                                    Name = proj.Name,
                                    StartDate = proj.StartDate,
                                    EndDate = proj.EndDate,
                                    AgreementUrl = proj.AgreementUrl,
                                    ClientId = proj.ClientId,
                                    IsChargeable = proj.IsChargeable
                                };

                final_result.Add(new GetClientDto()
                {
                    ClientId = c.ClientId,
                    Name = c.Name,
                    PhoneNumber = c.PhoneNumber,
                    Email = c.Email,
                    CIF = c.CIF,
                    CountryId = c.CountryId,
                    Country = c.Country,
                    City = c.City,
                    Address = c.Address,
                    IBAN = c.IBAN,
                    Bank = c.Bank,
                    IsActiveClient = c.IsActiveClient,
                    Deals = c.Deals,
                    Requests = c.Requests,
                    Projects = projects
                });
            }

            return Ok(final_result);

        }









        // GET: api/Clients/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Client>> GetClient(int id)
        {
            var client = await _context.Client.FindAsync(id);

            if (client == null)
            {
                return NotFound();
            }

            return client;
        }

        // PUT: api/Clients/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClient(int id, Client client)
        {
            if (id != client.ClientId)
            {
                return BadRequest();
            }

            _context.Entry(client).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Clients
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Client>> PostClient(Client client)
        {
            _context.Client.Add(client);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClient", new { id = client.ClientId }, client);
        }

        // DELETE: api/Clients/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Client>> DeleteClient(int id)
        {
            var client = await _context.Client.FindAsync(id);
            if (client == null)
            {
                return NotFound();
            }

            _context.Client.Remove(client);
            await _context.SaveChangesAsync();

            return client;
        }

        private bool ClientExists(int id)
        {
            return _context.Client.Any(e => e.ClientId == id);
        }
    }
}
