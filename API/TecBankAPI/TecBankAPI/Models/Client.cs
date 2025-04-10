namespace TecBankAPI.Models
{
    public class Client
    {
        public int Id { get; set; }
        public string ClientType { get; set; }         
        public decimal MonthlyIncome { get; set; }      
        public string FirstName { get; set; }          
        public string MiddleName { get; set; }          
        public string LastName { get; set; }            
        public string SecondLastName { get; set; }      
        public string Phone { get; set; }               
        public required string Username { get; set; }            
        public string Password { get; set; }            
        public string Address { get; set; }
    }
}
