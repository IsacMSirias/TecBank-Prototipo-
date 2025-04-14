using Microsoft.AspNetCore.Mvc;
using TecBankAPI.Models;
using TecBankAPI.Services;

namespace TecBankAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly FileDataService _context;

        public TransactionController(FileDataService fileDataService)
        {
            _context = fileDataService;
        }

        [HttpPost("account/{accountId}")]
        public JsonResult CreateTransactionForAccount(int accountId, Transaction transaction)
        {
            var accounts = _context.getDataFromFile<Account>();
            var account = accounts.FirstOrDefault(a => a.Id == accountId);

            if (account == null)
                return new JsonResult(BadRequest($"No existe una cuenta con Id = {accountId}"));

            account.Transactions ??= new List<Transaction>();
            transaction.Id = account.Transactions.Count > 0 ? account.Transactions.Max(t => t.Id) + 1 : 1;
            account.Transactions.Add(transaction);

            if (transaction.Type.ToLower() == "deposito")
                account.Balance += transaction.Balance;
            else if (transaction.Type.ToLower() == "retiro")
                account.Balance -= transaction.Balance;

            _context.saveDataToFile<Account>(accounts);

            return new JsonResult(Ok(transaction));
        }

        [HttpPost("card/{cardId}")]
        public JsonResult CreateTransactionForCard(int cardId, Transaction transaction)
        {
            var cards = _context.getDataFromFile<Card>();
            var card = cards.FirstOrDefault(c => c.Id == cardId);

            if (card == null)
                return new JsonResult(BadRequest($"No existe una tarjeta con Id = {cardId}"));

            card.Transactions ??= new List<Transaction>();
            transaction.Id = card.Transactions.Count > 0 ? card.Transactions.Max(t => t.Id) + 1 : 1;
            card.Transactions.Add(transaction);

            if (transaction.Type.ToLower() == "deposito")
                card.Balance += transaction.Balance;
            else if (transaction.Type.ToLower() == "retiro")
                card.Balance -= transaction.Balance;

            _context.saveDataToFile<Card>(cards);

            return new JsonResult(Ok(transaction));
        }

        [HttpGet("account/{accountId}")]
        public JsonResult GetTransactionsForAccount(int accountId)
        {
            var accounts = _context.getDataFromFile<Account>();
            var account = accounts.FirstOrDefault(a => a.Id == accountId);

            if (account == null)
                return new JsonResult(BadRequest("Cuenta no encontrada"));

            return new JsonResult(account.Transactions ?? new List<Transaction>());
        }

        [HttpGet("card/{cardId}")]
        public JsonResult GetTransactionsForCard(int cardId)
        {
            var cards = _context.getDataFromFile<Card>();
            var card = cards.FirstOrDefault(c => c.Id == cardId);

            if (card == null)
                return new JsonResult(BadRequest("Tarjeta no encontrada"));

            return new JsonResult(card.Transactions ?? new List<Transaction>());
        }

        [HttpGet("id/{id}")]
        public JsonResult GetTransactionById(int id)
        {
            var accounts = _context.getDataFromFile<Account>();
            var cards = _context.getDataFromFile<Card>();

            // Buscar en cuentas
            foreach (var acc in accounts)
            {
                var tx = acc.Transactions?.FirstOrDefault(t => t.Id == id);
                if (tx != null)
                    return new JsonResult(new { origen = "cuenta", cuentaId = acc.Id, transaccion = tx });
            }

            // Buscar en tarjetas
            foreach (var card in cards)
            {
                var tx = card.Transactions?.FirstOrDefault(t => t.Id == id);
                if (tx != null)
                    return new JsonResult(new { origen = "tarjeta", tarjetaId = card.Id, transaccion = tx });
            }

            return new JsonResult(NotFound($"Transacción con Id = {id} no encontrada"));
        }
    }
}
