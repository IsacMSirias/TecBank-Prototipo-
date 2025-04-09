using Microsoft.EntityFrameworkCore;
using TecBankAPI.Models;

namespace TecBankAPI.Data
{
    public class ApiContext: DbContext
    {
        public DbSet<BankConsult> consults { get; set; }
        public ApiContext(DbContextOptions<ApiContext> options):base(options)

        {


        }  




    }   
}
