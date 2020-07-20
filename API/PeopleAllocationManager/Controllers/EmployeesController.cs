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
    public class EmployeesController : ControllerBase
    {
        private readonly PeopleAllocationManagerContext _context;

        public EmployeesController(PeopleAllocationManagerContext context)
        {
            _context = context;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployee()
        {
            return await _context.Employee.ToListAsync();
        }



        // GET: api/EmployeesGetDto/dto
        [HttpGet("/api/EmployeesGetDto/dto")]
        public IActionResult GetEmployeesGetDto()
        {

            List<EmployeesGetDto> final_result = new List<EmployeesGetDto>();
            foreach (var e in _context.Employee)
            {
                var epproject = from epr in e.EmployeeProject
                                select new ProjectDto()
                                {
                                    ProjectId = epr.ProjectId,
                                    Name = epr.Project.Name,
                                    StartDate = epr.Project.StartDate,
                                    EndDate = epr.Project.EndDate,
                                    AgreementUrl = epr.Project.AgreementUrl,
                                    ClientId = epr.Project.ClientId,
                                    IsChargeable = epr.Project.IsChargeable
                                };

                var etechnology = from eth in e.EmployeeTechnology
                                  select new TechnologyDto()
                                {
                                    TechnologyId = eth.Technology.TechnologyId,
                                    Name = eth.Technology.Name
                                };

                final_result.Add(new EmployeesGetDto()
                {
                    UserId = e.UserId,
                    EmployeeCode = e.EmployeeCode,
                    FirstName = e.FirstName,
                    LastName = e.LastName,
                    UserName = e.UserName,
                    Email = e.Email,
                    Password = e.Password,
                    CreatedDate = e.CreatedDate,
                    BirthDate = e.BirthDate,
                    PhoneNumber = e.PhoneNumber,
                    GrossSalary = e.GrossSalary,
                    NetSalary = e.NetSalary,
                    HourlyPrice = e.HourlyPrice,
                    IsVatPayer = e.IsVatPayer,
                    DepartmentId = e.DepartmentId,
                    Department = e.Department,
                    UserRoleId = e.UserRoleId,
                    FunctionId = e.FunctionId,
                    Function = e.Function,
                    SeniorityId = e.SeniorityId,
                    Seniority = e.Seniority,
                    EmployeeProject = epproject,
                    EmployeeTechnology = etechnology
                });
            }

            return Ok(final_result);

        }









        // GET: /api/EmployeeNoTechnologyNoProjectDto/dto
        [HttpGet("/api/EmployeeNoTechnologyNoProjectDto/dto")]
        public IQueryable<EmployeeNoTechnologyNoProjectDto> GetEmployeeNoTechnologyNoProjectDto()
        {
            var employee = from e in _context.Employee
                           select new EmployeeNoTechnologyNoProjectDto()
                           {
                               UserId = e.UserId,
                               EmployeeCode = e.EmployeeCode,
                               FirstName = e.FirstName,
                               LastName = e.LastName,
                               UserName = e.UserName,
                               Email = e.Email,
                               Password = e.Password,
                               CreatedDate = e.CreatedDate,
                               BirthDate = e.BirthDate,
                               PhoneNumber = e.PhoneNumber,
                               GrossSalary = e.GrossSalary,
                               NetSalary = e.NetSalary,
                               HourlyPrice = e.HourlyPrice,
                               IsVatPayer = e.IsVatPayer,
                               DepartmentId = e.DepartmentId,
                               Department = e.Department,
                               UserRoleId = e.UserRoleId,
                               FunctionId = e.FunctionId,
                               Function = e.Function,
                               SeniorityId = e.SeniorityId,
                               Seniority = e.Seniority,
                               DailyActivities = e.DailyActivities
                           };

            return employee;
        }



        // GET: api/EmployeeNoTechnologyNoProjectDto/dto/{id}
        [HttpGet("/api/EmployeeNoTechnologyNoProjectDto/dto/{id}")]
        public IActionResult GetEmployeeNoTechnologyNoProjectDto(int id)
        {
            var foundUser = _context.Employee.Where(e => e.UserId == id);

            if (foundUser == null)
            {
                return NotFound();
            }
            List<EmployeeNoTechnologyNoProjectDto> final_result = new List<EmployeeNoTechnologyNoProjectDto>();
            foreach (var e in foundUser)
            {
                
                final_result.Add(new EmployeeNoTechnologyNoProjectDto()
                {
                    UserId = e.UserId,
                    EmployeeCode = e.EmployeeCode,
                    FirstName = e.FirstName,
                    LastName = e.LastName,
                    UserName = e.UserName,
                    Email = e.Email,
                    Password = e.Password,
                    CreatedDate = e.CreatedDate,
                    BirthDate = e.BirthDate,
                    PhoneNumber = e.PhoneNumber,
                    GrossSalary = e.GrossSalary,
                    NetSalary = e.NetSalary,
                    HourlyPrice = e.HourlyPrice,
                    IsVatPayer = e.IsVatPayer,
                    DepartmentId = e.DepartmentId,
                    Department = e.Department,
                    UserRoleId = e.UserRoleId,
                    FunctionId = e.FunctionId,
                    Function = e.Function,
                    SeniorityId = e.SeniorityId,
                    Seniority = e.Seniority,
                    DailyActivities = e.DailyActivities
                });
            }

            return Ok(final_result);

        }


        // GET: api/EmployeeNoTechnologyDto/dto/{id}
        [HttpGet("/api/EmployeeNoTechnologyDto/dto/{id}")]
        public IActionResult GetEmployeeNoTechnologyDto(int id)
        {
            var foundUser = _context.Employee.Where(e => e.UserId == id);

            if (foundUser == null)
            {
                return NotFound();
            }
            List<EmployeeNoTechnologyDto> final_result = new List<EmployeeNoTechnologyDto>();
            foreach (var e in foundUser)
            {
                var epproject = from epr in e.EmployeeProject
                                select new ProjectDto()
                                {
                                    ProjectId = epr.ProjectId,
                                    Name = epr.Project.Name,
                                    StartDate = epr.Project.StartDate,
                                    EndDate = epr.Project.EndDate,
                                    AgreementUrl = epr.Project.AgreementUrl,
                                    ClientId = epr.Project.ClientId,
                                    IsChargeable = epr.Project.IsChargeable
                                };

                final_result.Add(new EmployeeNoTechnologyDto()
                {
                    UserId = e.UserId,
                    EmployeeCode = e.EmployeeCode,
                    FirstName = e.FirstName,
                    LastName = e.LastName,
                    UserName = e.UserName,
                    Email = e.Email,
                    Password = e.Password,
                    CreatedDate = e.CreatedDate,
                    BirthDate = e.BirthDate,
                    PhoneNumber = e.PhoneNumber,
                    GrossSalary = e.GrossSalary,
                    NetSalary = e.NetSalary,
                    HourlyPrice = e.HourlyPrice,
                    IsVatPayer = e.IsVatPayer,
                    DepartmentId = e.DepartmentId,
                    Department = e.Department,
                    UserRoleId = e.UserRoleId,
                    FunctionId = e.FunctionId,
                    Function = e.Function,
                    SeniorityId = e.SeniorityId,
                    Seniority = e.Seniority,
                    DailyActivities = e.DailyActivities,
                    EmployeeProject = epproject



                }); ;
            }

            return Ok(final_result);

        }




        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employee.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/Employees/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            if (id != employee.UserId)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
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

        // POST: api/Employees
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            _context.Employee.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployee", new { id = employee.UserId }, employee);
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> DeleteEmployee(int id)
        {
            var employee = await _context.Employee.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employee.Remove(employee);
            await _context.SaveChangesAsync();

            return employee;
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employee.Any(e => e.UserId == id);
        }
    }
}
