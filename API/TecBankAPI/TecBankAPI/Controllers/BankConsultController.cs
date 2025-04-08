using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TecBankAPI.Models;
using TecBankAPI.Data;

namespace TecBankAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BankConsultController : ControllerBase
    {
        private readonly ApiContext _context;
        public BankConsultController(ApiContext context)
        {
            _context = context;
        }

        //Create/Edit
        [HttpPost]
        public JsonResult CreateEdit(BankConsult consult) {
            if (consult.Id == 0)
            {
                _context.consults.Add(consult);
            }
            else {
                var consultInDb = _context.consults.Find(consult.Id);

                if (consultInDb == null) 
                    return new JsonResult(NotFound());

                consultInDb = consult;
                
            }

            _context.SaveChanges();

            return new JsonResult(Ok(consult));
        
        }

        //Get
        [HttpGet]
        public JsonResult Get(int id) { 
        var result = _context.consults.Find(id);

            if (result == null)

                return new JsonResult(NotFound());

            return new JsonResult(Ok(result));
        
        }

        //Delete
        [HttpDelete]
        public JsonResult Delete(int id) {

            var result = _context.consults.Find(id);

            if ( result == null)
                return new JsonResult(NotFound());

            _context.consults.Remove(result);
            _context.SaveChanges();

            return new JsonResult(NoContent());
        }

        //GetAll
        [HttpGet("/GetAll")]

        public JsonResult GetAll() { 

            var result = _context.consults.ToList();

            return new JsonResult(Ok(result));
        }
    }
}
