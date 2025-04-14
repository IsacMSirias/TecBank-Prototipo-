using Microsoft.AspNetCore.Mvc;
using TecBankAPI.Models;
using TecBankAPI.Services;

namespace TecBankAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private readonly FileDataService _context;

        public CardController(FileDataService fileDataService)
        {
            _context = fileDataService;
        }

        // Create or Edit Card
        [HttpPost]
        public JsonResult CreateEdit(Card card)
        {
            var cards = _context.getDataFromFile<Card>();
            var accounts = _context.getDataFromFile<Account>();

            // Buscar la cuenta asociada
            var account = accounts.FirstOrDefault(a => a.Id == card.AccountId);
            if (account == null)
            {
                return new JsonResult(BadRequest($"No existe una cuenta con Id = {card.AccountId}"));
            }

            if (card.Id == 0)
            {
                // Crear nueva tarjeta
                card.Id = cards.Count > 0 ? cards.Max(c => c.Id) + 1 : 1;
                cards.Add(card);
            }
            else
            {
                // Actualizar tarjeta existente
                var existingCard = cards.FirstOrDefault(c => c.Id == card.Id);
                if (existingCard == null)
                    return new JsonResult(NotFound());

                existingCard.CCV = card.CCV;
                existingCard.Balance = card.Balance;
                existingCard.DueDate = card.DueDate;
                existingCard.Number = card.Number;
                existingCard.Type = card.Type;
                existingCard.AccountId = card.AccountId;
            }

            // Guardar tarjetas
            _context.saveDataToFile<Card>(cards);

            // Asegurarse de que la lista de tarjetas de la cuenta no sea nula
            if (account.Cards == null)
                account.Cards = new List<Card>();

            // Verificar si ya tiene esta tarjeta asociada a la cuenta
            var existingInAccount = account.Cards.FirstOrDefault(c => c.Id == card.Id);
            if (existingInAccount == null)
            {
                account.Cards.Add(card);
            }
            else
            {
                // Actualizar los datos de la tarjeta existente en la cuenta
                existingInAccount.CCV = card.CCV;
                existingInAccount.Balance = card.Balance;
                existingInAccount.DueDate = card.DueDate;
                existingInAccount.Number = card.Number;
                existingInAccount.Type = card.Type;
                existingInAccount.AccountId = card.AccountId;
            }

            // Actualizar la cuenta en la lista general
            var accountIndex = accounts.FindIndex(a => a.Id == account.Id);
            if (accountIndex >= 0)
            {
                accounts[accountIndex] = account;
            }

            // Guardar cuentas
            _context.saveDataToFile<Account>(accounts);

            return new JsonResult(Ok(card));
        }

        // Delete Card
        [HttpDelete]
        public JsonResult Delete(int id)
        {
            var cards = _context.getDataFromFile<Card>();
            var result = cards.FirstOrDefault(c => c.Id == id);

            if (result == null)
                return new JsonResult(NotFound());

            cards.Remove(result);
            _context.saveDataToFile<Card>(cards);  // Guardar las tarjetas actualizadas

            // Eliminar la tarjeta de la lista de tarjetas asociadas en la cuenta correspondiente
            var accounts = _context.getDataFromFile<Account>();
            var account = accounts.FirstOrDefault(a => a.Cards.Any(c => c.Id == id));

            if (account != null)
            {
                var cardToRemove = account.Cards.FirstOrDefault(c => c.Id == id);
                if (cardToRemove != null)
                {
                    account.Cards.Remove(cardToRemove);
                    _context.saveDataToFile<Account>(accounts);  // Guardar las cuentas actualizadas
                }
            }

            return new JsonResult(NoContent());
        }

        // GET by Card Number (string)
        [HttpGet("number/{number}")]
        public JsonResult GetByNumber(string number)
        {
            if (string.IsNullOrEmpty(number))
                return new JsonResult(new { error = "Número de tarjeta inválido" }) { StatusCode = 400 };

            var card = _context.getDataFromFile<Card>().FirstOrDefault(c => c.Number == number);

            if (card == null)
                return new JsonResult(new { error = "Tarjeta no encontrada" }) { StatusCode = 404 };

            return new JsonResult(card);
        }

        // GET all cards by account number
        [HttpGet("account/{accountNumber}")]
        public JsonResult GetCardsByAccount(string accountNumber)
        {
            var accounts = _context.getDataFromFile<Account>();
            var account = accounts.FirstOrDefault(a => a.Number == accountNumber);

            if (account == null)
                return new JsonResult(new { error = "Cuenta no encontrada" }) { StatusCode = 404 };

            return new JsonResult(account.Cards);
        }
    }
}
