using System.ComponentModel.DataAnnotations.Schema;

namespace TecBankAPI.Models
{
    public class Loan
    {
        public int Id { get; set; }

        public int Total { get; set; }

        public int Debt { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Tax { get; set; }

        // foreign key
        public int ClientId { get; set; }
    }
}