using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TecBankAPI.Models;
using TecBankAPI.Services;
using System.Linq;

namespace TecBankAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly FileDataService _context;

        public ClientController(FileDataService fileDataService)
        {
            _context = fileDataService;
        }

        //Create/edit
        [HttpPost]
        public JsonResult createEdit(Client client)
        {
            var clients = _context.getDataFromFile<Client>();

            if (client.Id == 0)
            {
                // Nuevo cliente
                client.Id = clients.Count > 0 ? clients.Max(c => c.Id) + 1 : 1;
                clients.Add(client);
            }
            else
            {
                // Editar cliente existente
                var existingClient = clients.FirstOrDefault(c => c.Id == client.Id);
                if (existingClient == null)
                    return new JsonResult(NotFound());

                // Actualizar propiedades (campo por campo)
                existingClient.ClientType = client.ClientType;
                existingClient.MonthlyIncome = client.MonthlyIncome;
                existingClient.FirstName = client.FirstName;
                existingClient.MiddleName = client.MiddleName;
                existingClient.LastName = client.LastName;
                existingClient.SecondLastName = client.SecondLastName;
                existingClient.Phone = client.Phone;
                existingClient.Username = client.Username;
                existingClient.Password = client.Password;
                existingClient.Address = client.Address;
                existingClient.State = client.State;
            }

            _context.saveDataToFile<Client>(clients);

            return new JsonResult(Ok(client));
        }


        // GET by Username
        [HttpGet]
        public JsonResult GetByUsername(string username)
        {
            if (string.IsNullOrEmpty(username))
                return new JsonResult(new { error = "Username requerido" }) { StatusCode = 400 };

            var user = _context.getDataFromFile<Client>().FirstOrDefault(c => c.Username == username);

            if (user == null)
                return new JsonResult(new { error = "Usuario no encontrado" }) { StatusCode = 404 };

            return new JsonResult(user);
        }

        // Delete
        [HttpDelete]
        public JsonResult Delete(int id)
        {
            var clients = _context.getDataFromFile<Client>();
            var result = clients.FirstOrDefault(c => c.Id == id);

            if (result == null)
                return new JsonResult(NotFound());

            clients.Remove(result);

            _context.saveDataToFile<Client>(clients);  // Especificar el tipo 'Client'

            return new JsonResult(NoContent());
        }

        // GetAll
        [HttpGet("/GetAll")]
        public JsonResult GetAll()
        {
            var result = _context.getDataFromFile<Client>();
            return new JsonResult(Ok(result));
        }

        // GET by Id
        [HttpGet("{id}")]
        public JsonResult GetById(int id)
        {
            var client = _context.getDataFromFile<Client>().FirstOrDefault(c => c.Id == id);

            if (client == null)
                return new JsonResult(new { error = "Cliente no encontrado" }) { StatusCode = 404 };

            return new JsonResult(client);
        }

    }
}
