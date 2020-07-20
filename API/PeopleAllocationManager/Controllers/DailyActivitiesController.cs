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
    public class DailyActivitiesController : ControllerBase
    {
        private readonly PeopleAllocationManagerContext _context;

        public DailyActivitiesController(PeopleAllocationManagerContext context)
        {
            _context = context;
        }

        // GET: api/DailyActivities
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<DailyActivity>>> GetDailyActivity()
        //{
        //    return await _context.DailyActivity.ToListAsync();
        //}

        // GET: api/DailyActivities
        [HttpGet]
        public IQueryable<DailyActivityDto> GetDailyActivity()
        {
            var dailyActivity = from d in _context.DailyActivity
                               select new DailyActivityDto()
                               {
                                  DailyActivityId = d.DailyActivityId,
                                  Date = d.Date,
                                  WorkedHours = d.WorkedHours,
                                  Comment = d.Comment,
                                  Price = d.Price,
                                  ProjectId = d.ProjectId,
                                  EmployeeId= d.EmployeeId,
                                  ServiceId= d.ServiceId,
                                  InvoiceId = d.InvoiceId,
                                };

            return dailyActivity;
        }

        // GET: api/DailyActivities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DailyActivity>> GetDailyActivity(int id)
        {
            var dailyActivity = await _context.DailyActivity.FindAsync(id);

            if (dailyActivity == null)
            {
                return NotFound();
            }

            return dailyActivity;
        }

        // PUT: api/DailyActivities/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDailyActivity(int id, DailyActivity dailyActivity)
        {
            if (id != dailyActivity.DailyActivityId)
            {
                return BadRequest();
            }

            _context.Entry(dailyActivity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DailyActivityExists(id))
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

        // POST: api/DailyActivities
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DailyActivity>> PostDailyActivity(DailyActivity dailyActivity)
        {
            _context.DailyActivity.Add(dailyActivity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDailyActivity", new { id = dailyActivity.DailyActivityId }, dailyActivity);
        }

        // DELETE: api/DailyActivities/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DailyActivity>> DeleteDailyActivity(int id)
        {
            var dailyActivity = await _context.DailyActivity.FindAsync(id);
            if (dailyActivity == null)
            {
                return NotFound();
            }

            _context.DailyActivity.Remove(dailyActivity);
            await _context.SaveChangesAsync();

            return dailyActivity;
        }

        private bool DailyActivityExists(int id)
        {
            return _context.DailyActivity.Any(e => e.DailyActivityId == id);
        }
    }
}
