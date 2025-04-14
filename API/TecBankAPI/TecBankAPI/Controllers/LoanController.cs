using Microsoft.AspNetCore.Mvc;
using TecBankAPI.Models;
using TecBankAPI.Services;

namespace TecBankAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoanController : ControllerBase
    {
        private readonly FileDataService _context;

        public LoanController(FileDataService fileDataService)
        {
            _context = fileDataService;
        }

        // POST: Crear o editar préstamo
        [HttpPost]
        public JsonResult CreateOrEdit(Loan loan)
        {
            var loans = _context.getDataFromFile<Loan>();
            var clients = _context.getDataFromFile<Client>();

            // Verificar que el cliente exista
            var client = clients.FirstOrDefault(c => c.Id == loan.ClientId);
            if (client == null)
            {
                return new JsonResult(BadRequest($"No existe un cliente con Id = {loan.ClientId}"));
            }

            if (loan.Id == 0)
            {
                // Crear nuevo préstamo
                loan.Id = loans.Count > 0 ? loans.Max(l => l.Id) + 1 : 1;
                loans.Add(loan);
            }
            else
            {
                // Editar préstamo existente
                var existingLoan = loans.FirstOrDefault(l => l.Id == loan.Id);
                if (existingLoan == null)
                    return new JsonResult(NotFound());

                existingLoan.Total = loan.Total;
                existingLoan.Debt = loan.Debt;
                existingLoan.Tax = loan.Tax;
                existingLoan.ClientId = loan.ClientId;
            }

            // Guardar préstamos
            _context.saveDataToFile<Loan>(loans);

            // Asegurar que la lista de préstamos del cliente no sea nula
            if (client.Loans == null)
                client.Loans = new List<Loan>();

            var existingInClient = client.Loans.FirstOrDefault(l => l.Id == loan.Id);
            if (existingInClient == null)
            {
                client.Loans.Add(loan);
            }
            else
            {
                existingInClient.Total = loan.Total;
                existingInClient.Debt = loan.Debt;
                existingInClient.Tax = loan.Tax;
                existingInClient.ClientId = loan.ClientId;
            }

            // Actualizar cliente en la lista
            var clientIndex = clients.FindIndex(c => c.Id == client.Id);
            if (clientIndex >= 0)
                clients[clientIndex] = client;

            _context.saveDataToFile<Client>(clients);

            return new JsonResult(Ok(loan));
        }

        // DELETE
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            var loans = _context.getDataFromFile<Loan>();
            var loan = loans.FirstOrDefault(l => l.Id == id);

            if (loan == null)
                return new JsonResult(NotFound());

            loans.Remove(loan);
            _context.saveDataToFile<Loan>(loans);

            // Eliminar también del cliente
            var clients = _context.getDataFromFile<Client>();
            var client = clients.FirstOrDefault(c => c.Id == loan.ClientId);
            if (client != null && client.Loans != null)
            {
                client.Loans.RemoveAll(l => l.Id == id);
                _context.saveDataToFile<Client>(clients);
            }

            return new JsonResult(NoContent());
        }

        // GET by ID
        [HttpGet("{id}")]
        public JsonResult GetById(int id)
        {
            var loan = _context.getDataFromFile<Loan>().FirstOrDefault(l => l.Id == id);

            if (loan == null)
                return new JsonResult(new { error = "Préstamo no encontrado" }) { StatusCode = 404 };

            return new JsonResult(loan);
        }

        // GET all
        [HttpGet]
        public JsonResult GetAll()
        {
            var loans = _context.getDataFromFile<Loan>();
            return new JsonResult(loans);
        }

        // GET loans by client ID
        [HttpGet("client/{clientId}")]
        public JsonResult GetByClient(int clientId)
        {
            var loans = _context.getDataFromFile<Loan>().Where(l => l.ClientId == clientId).ToList();
            return new JsonResult(loans);
        }
    }
}
