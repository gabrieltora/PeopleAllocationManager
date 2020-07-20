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
    public class ProjectsController : ControllerBase
    {
        private readonly PeopleAllocationManagerContext _context;

        public ProjectsController(PeopleAllocationManagerContext context)
        {
            _context = context;
        }

        // GET: api/Projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProject()
        {
            return await _context.Project.ToListAsync();
        }

        // GET: api/Projects/dto
        [HttpGet("/api/Projects/dto")]
        public IQueryable<ProjectDto> GetProjectDto()
        {
            var project = from p in _context.Project
                                select new ProjectDto()
                                {
                                    ProjectId = p.ProjectId,
                                    Name = p.Name,
                                    StartDate = p.StartDate,
                                    EndDate = p.EndDate,
                                    AgreementUrl = p.AgreementUrl,
                                    ClientId = p.ClientId,
                                    IsChargeable = p.IsChargeable
                                };

            return project;
        }


        // GET: api/ProjectWithDailyActivitiesDto/dto
        [HttpGet("/api/ProjectWithDailyActivitiesDto/dto")]
        public IActionResult GetProjectWithDailyActivitiesDto()
        {
            
            List<ProjectWithDailyActivitiesDto> final_result = new List<ProjectWithDailyActivitiesDto>();
            foreach (var e in _context.Project)
            {
                var client = new ClientsDto() {
                    ClientId = e.Client.ClientId,
                    Name = e.Client.Name,
                    PhoneNumber = e.Client.PhoneNumber,
                    Email = e.Client.Email,
                    CIF = e.Client.CIF,
                    CountryId = e.Client.CountryId,
                    Country = e.Client.Country,
                    City = e.Client.City,
                    Address = e.Client.Address,
                    IBAN = e.Client.IBAN,
                    Bank = e.Client.Bank,
                    IsActiveClient = e.Client.IsActiveClient
                };


                var epproject = from epr in e.EmployeeProject
                                select new EmployeeDto()
                                {
                                    EmployeeId = epr.EmployeeId,
                                    FirstName = epr.Employee.FirstName,
                                    LastName = epr.Employee.LastName,
                                    Department = epr.Employee.Department,
                                    Function = epr.Employee.Function
                                };

                final_result.Add(new ProjectWithDailyActivitiesDto()
                {
                    ProjectId = e.ProjectId,
                    Name = e.Name,
                    StartDate = e.StartDate,
                    EndDate = e.EndDate,
                    AgreementUrl = e.AgreementUrl,
                    ClientId = e.ClientId,
                    Client = client,
                    IsChargeable = e.IsChargeable,
                    DailyActivities = e.DailyActivities,
                    EmployeeProject = epproject
                });
            }

            return Ok(final_result);

        }





        // GET: api/Projects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
            var project = await _context.Project.FindAsync(id);

            if (project == null)
            {
                return NotFound();
            }

            return project;
        }

        // PUT: api/Projects/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProject(int id, Project project)
        {
            if (id != project.ProjectId)
            {
                return BadRequest();
            }

            _context.Entry(project).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
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

        // POST: api/Projects
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Project>> PostProject(Project project)
        {
            _context.Project.Add(project);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProject", new { id = project.ProjectId }, project);
        }

        // DELETE: api/Projects/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Project>> DeleteProject(int id)
        {
            var project = await _context.Project.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            _context.Project.Remove(project);
            await _context.SaveChangesAsync();

            return project;
        }

        private bool ProjectExists(int id)
        {
            return _context.Project.Any(e => e.ProjectId == id);
        }
    }
}
