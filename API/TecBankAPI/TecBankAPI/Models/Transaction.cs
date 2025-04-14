using System.ComponentModel.DataAnnotations.Schema;

namespace TecBankAPI.Models
{
    public class Transaction
    {
        public int Id { get; set; }


        [Column(TypeName = "decimal(18,2)")]
        public decimal Balance { get; set; }

        public string Date { get; set; } = string.Empty;

        public string Type { get; set; } = string.Empty;

    }
}
