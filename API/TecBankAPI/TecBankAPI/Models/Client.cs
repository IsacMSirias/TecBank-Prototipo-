namespace TecBankAPI.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Client
    {
        [Key]
        public int Id { get; set; }

        public string ClientType { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal MonthlyIncome { get; set; }

        public string FirstName { get; set; } = string.Empty;

        public string MiddleName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string SecondLastName { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        [Required]
        public string Username { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        public bool State { get; set; }

        // Relación con Account (uno a muchos)
        public ICollection<Account> Accounts { get; set; } = new List<Account>();
        public List<Loan> Loans { get; set; } = new List<Loan>();

    }
}