using Microsoft.EntityFrameworkCore;
using TecBankAPI.Models;

namespace TecBankAPI.Data
{
    public class ApiContext: DbContext
    {
        public DbSet<Client> clients { get; set; }
        public DbSet<Account> accounts { get; set; }
        public ApiContext(DbContextOptions<ApiContext> options):base(options)

        {


        }  




    }   
}
