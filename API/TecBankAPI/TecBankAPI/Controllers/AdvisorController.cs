using Microsoft.AspNetCore.Mvc;
using TecBankAPI.Models;
using TecBankAPI.Services;

namespace TecBankAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdvisorController : ControllerBase
    {
        private readonly FileDataService _context;

        public AdvisorController(FileDataService fileDataService)
        {
            _context = fileDataService;
        }

        // GET: api/advisor
        [HttpGet]
        public IActionResult GetAll()
        {
            var advisors = _context.getDataFromFile<Advisor>();
            return Ok(advisors);
        }

        // GET: api/advisor/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var advisors = _context.getDataFromFile<Advisor>();
            var advisor = advisors.FirstOrDefault(a => a.IdNumber == id);
            if (advisor == null)
                return NotFound();
            return Ok(advisor);
        }

        // POST: api/advisor
        [HttpPost]
        public IActionResult CreateOrUpdate(Advisor advisor)
        {
            var advisors = _context.getDataFromFile<Advisor>();

            var existingAdvisor = advisors.FirstOrDefault(a => a.IdNumber == advisor.IdNumber);

            if (existingAdvisor == null)
            {
                // New advisor
                advisors.Add(advisor);
            }
            else
            {
                // Update existing advisor
                existingAdvisor.FirstName = advisor.FirstName;
                existingAdvisor.MiddleName1 = advisor.MiddleName1;
                existingAdvisor.MiddleName2 = advisor.MiddleName2;
                existingAdvisor.LastName1 = advisor.LastName1;
                existingAdvisor.LastName2 = advisor.LastName2;
                existingAdvisor.BirthDate = advisor.BirthDate;
                existingAdvisor.SalesTargetDollars = advisor.SalesTargetDollars;
                existingAdvisor.SalesTargetColones = advisor.SalesTargetColones;
            }

            _context.saveDataToFile<Advisor>(advisors);

            return Ok(advisor);
        }

        // DELETE: api/advisor/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var advisors = _context.getDataFromFile<Advisor>();
            var advisor = advisors.FirstOrDefault(a => a.IdNumber == id);

            if (advisor == null)
                return NotFound();

            advisors.Remove(advisor);
            _context.saveDataToFile<Advisor>(advisors);

            return NoContent();
        }
    }
}