using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TecBankAPI.Models;
using TecBankAPI.Services;
using System.Linq;

namespace TecBankAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly FileDataService _context;

        public DataController(FileDataService fileDataService)
        {
            _context = fileDataService;
        }

        // Create/Edit
        [HttpPost]
        public JsonResult CreateEdit(Client consult)
        {
            var consults = _context.getDataFromFile();

            if (consult.Id == 0)
            {
                
                if (consults.Count > 0)
                {
                    consult.Id = consults.Max(c => c.Id) + 1; 
                }
                else
                {
                    consult.Id = 1; 
                }
                consults.Add(consult);
            }
            else
            {
                var consultInDb = consults.FirstOrDefault(c => c.Id == consult.Id);
                if (consultInDb == null)
                    return new JsonResult(NotFound());

                var index = consults.IndexOf(consultInDb);
                consults[index] = consult;
            }

            _context.saveDataToFile(consults);

            return new JsonResult(Ok(consult));
        }

        //GET
        [HttpGet]
        public JsonResult GetByUsername(string username)
        {
            if (string.IsNullOrEmpty(username))
                return new JsonResult(new { error = "Username requerido" }) { StatusCode = 400 };

            var user = _context.getDataFromFile().FirstOrDefault(c => c.Username == username);

            if (user == null)
                return new JsonResult(new { error = "Usuario no encontrado" }) { StatusCode = 404 };

            return new JsonResult(user);
        }





        // Delete
        [HttpDelete]
        public JsonResult Delete(int id)
        {
            var consults = _context.getDataFromFile();
            var result = consults.FirstOrDefault(c => c.Id == id);

            if (result == null)
                return new JsonResult(NotFound());

           
            consults.Remove(result);

            
            _context.saveDataToFile(consults);

            return new JsonResult(NoContent());
        }

        // GetAll
        [HttpGet("/GetAll")]
        public JsonResult GetAll()
        {
            var result = _context.getDataFromFile();
            return new JsonResult(Ok(result));
        }
    }
}
