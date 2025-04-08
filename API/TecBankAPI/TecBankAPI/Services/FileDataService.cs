using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using TecBankAPI.Models;

namespace TecBankAPI.Services
{
    public class FileDataService
    {
        private readonly string _filePath;

        public FileDataService(string filePath)
        {
            _filePath = filePath;
        }

        public List<BankConsult> getDataFromFile()
        {
            if (File.Exists(_filePath))
            {
                var jsonData = File.ReadAllText(_filePath); 
                return JsonSerializer.Deserialize<List<BankConsult>>(jsonData) ?? new List<BankConsult>();
            }
            else
            {
                throw new FileNotFoundException("File was not found");
            }
        }
        public void saveDataToFile(List<BankConsult> consults)
        {
            var jsonData = JsonSerializer.Serialize(consults, new JsonSerializerOptions { WriteIndented = true }); 
            File.WriteAllText(_filePath, jsonData); 
        }
    }
}



