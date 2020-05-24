using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeopleAllocationManager.Models;

namespace PeopleAllocationManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SenioritiesController : ControllerBase
    {
        private readonly PeopleAllocationManagerContext _context;

        public SenioritiesController(PeopleAllocationManagerContext context)
        {
            _context = context;
        }

        // GET: api/Seniorities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Seniority>>> GetSeniority()
        {
            return await _context.Seniority.ToListAsync();
        }

        // GET: api/Seniorities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Seniority>> GetSeniority(int id)
        {
            var seniority = await _context.Seniority.FindAsync(id);

            if (seniority == null)
            {
                return NotFound();
            }

            return seniority;
        }

        // PUT: api/Seniorities/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSeniority(int id, Seniority seniority)
        {
            if (id != seniority.SeniorityId)
            {
                return BadRequest();
            }

            _context.Entry(seniority).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SeniorityExists(id))
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

        // POST: api/Seniorities
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Seniority>> PostSeniority(Seniority seniority)
        {
            _context.Seniority.Add(seniority);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSeniority", new { id = seniority.SeniorityId }, seniority);
        }

        // DELETE: api/Seniorities/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Seniority>> DeleteSeniority(int id)
        {
            var seniority = await _context.Seniority.FindAsync(id);
            if (seniority == null)
            {
                return NotFound();
            }

            _context.Seniority.Remove(seniority);
            await _context.SaveChangesAsync();

            return seniority;
        }

        private bool SeniorityExists(int id)
        {
            return _context.Seniority.Any(e => e.SeniorityId == id);
        }
    }
}
