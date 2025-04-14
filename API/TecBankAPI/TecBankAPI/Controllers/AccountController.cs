using Microsoft.AspNetCore.Mvc;
using TecBankAPI.Models;
using TecBankAPI.Services;

namespace TecBankAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly FileDataService _context;

        public AccountController(FileDataService fileDataService)
        {
            _context = fileDataService;
        }


        [HttpPost]
        public JsonResult createEdit(Account account)
        {
            var accounts = _context.getDataFromFile<Account>();
            var clients = _context.getDataFromFile<Client>();

            // Buscar el cliente
            var client = clients.FirstOrDefault(c => c.Id == account.ClientId);
            if (client == null)
            {
                return new JsonResult(BadRequest($"No existe un cliente con Id = {account.ClientId}"));
            }

            if (account.Id == 0)
            {
                account.Id = accounts.Count > 0 ? accounts.Max(a => a.Id) + 1 : 1;
                accounts.Add(account);
            }
            else
            {
                var existingAccount = accounts.FirstOrDefault(a => a.Id == account.Id);
                if (existingAccount == null)
                    return new JsonResult(NotFound());

                existingAccount.Description = account.Description;
                existingAccount.Balance = account.Balance;
                existingAccount.Currency = account.Currency;
                existingAccount.Number = account.Number;
                existingAccount.Type = account.Type;
                existingAccount.ClientId = account.ClientId;
            }

            // Guardar cuentas
            _context.saveDataToFile<Account>(accounts);

            // Asegurarse de que la lista de cuentas del cliente no sea nula
            if (client.Accounts == null)
                client.Accounts = new List<Account>();

            // Ver si ya tiene esta cuenta
            var existingInClient = client.Accounts.FirstOrDefault(a => a.Id == account.Id);
            if (existingInClient == null)
            {
                client.Accounts.Add(account);
            }
            else
            {
                // Actualizar los datos de la cuenta existente en el cliente
                existingInClient.Description = account.Description;
                existingInClient.Balance = account.Balance;
                existingInClient.Currency = account.Currency;
                existingInClient.Number = account.Number;
                existingInClient.Type = account.Type;
                existingInClient.ClientId = account.ClientId;
            }

            // Actualizar el cliente en la lista general
            var clientIndex = clients.FindIndex(c => c.Id == client.Id);
            if (clientIndex >= 0)
            {
                clients[clientIndex] = client;
            }

            // Guardar clientes
            _context.saveDataToFile<Client>(clients);

            return new JsonResult(Ok(account));
        }




        // Delete
        [HttpDelete]
        public JsonResult Delete(int id)
        {
            var accounts = _context.getDataFromFile<Account>();
            var result = accounts.FirstOrDefault(a => a.Id == id);

            if (result == null)
                return new JsonResult(NotFound());

            accounts.Remove(result);
            _context.saveDataToFile<Account>(accounts);  // Aquí también especificamos el tipo

            return new JsonResult(NoContent());
        }

        // GET by account number (as string)
        [HttpGet("number/{number}")]
        public JsonResult getByNumber(string number)
        {
            if (string.IsNullOrEmpty(number))
                return new JsonResult(new { error = "Número de cuenta inválido" }) { StatusCode = 400 };

            var account = _context.getDataFromFile<Account>().FirstOrDefault(a => a.Number.ToString() == number);

            if (account == null)
                return new JsonResult(new { error = "Cuenta no encontrada" }) { StatusCode = 404 };

            return new JsonResult(account);
        }




    }
}
