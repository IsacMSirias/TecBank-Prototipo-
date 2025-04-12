using System.ComponentModel.DataAnnotations.Schema;

namespace TecBankAPI.Models
{
    public class Card
    {
        public int Id { get; set; }

        public int CCV { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Balance { get; set; }

        public string DueDate { get; set; } = string.Empty;

        public string Number { get; set; } = string.Empty;  // Cambiar a string

        public string Type { get; set; } = string.Empty;

        // foreign key
        public int AccountId { get; set; }
    }
}