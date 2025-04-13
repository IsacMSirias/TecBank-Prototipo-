namespace TecBankAPI.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Advisor
{
    [Key]
    public string IdNumber { get; set; } = string.Empty;

    public string FirstName { get; set; } = string.Empty;
    public string MiddleName1 { get; set; } = string.Empty;
    public string MiddleName2 { get; set; } = string.Empty;

    public string LastName1 { get; set; } = string.Empty;
    public string LastName2 { get; set; } = string.Empty;

    public DateTime BirthDate { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal SalesTargetDollars { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal SalesTargetColones { get; set; }

    // Optional: Navigation property
    public List<Loan>? LoansGranted { get; set; }
}
}