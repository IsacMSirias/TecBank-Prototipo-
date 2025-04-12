namespace TecBankAPI.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Account
    {
    
            [Key]
            public int Id { get; set; }

            public string Description { get; set; } = string.Empty;

            [Column(TypeName = "decimal(18,2)")]
            public decimal Balance { get; set; }

            public string Currency { get; set; } = string.Empty;

            public string Number { get; set; } = string.Empty;  // Cambiar a string

            public string Type { get; set; } = string.Empty;

            // foreign key
            public int ClientId { get; set; }

        public ICollection<Card> Cards { get; set; } = new List<Card>();
    } }
