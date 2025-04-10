using Microsoft.EntityFrameworkCore;
using TecBankAPI.Models;

namespace TecBankAPI.Data
{
    public class ApiContext: DbContext
    {
        public DbSet<Client> consults { get; set; }
        public ApiContext(DbContextOptions<ApiContext> options):base(options)

        {


        }  




    }   
}
