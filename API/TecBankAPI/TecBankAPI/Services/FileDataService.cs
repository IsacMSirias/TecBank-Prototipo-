using System.Text.Json;


namespace TecBankAPI.Services
{
    public class FileDataService
    {
        private readonly string _basePath;

        public FileDataService(string basePath)
        {
            _basePath = basePath;
        }

        private string GetFilePath<T>()
        {
            return Path.Combine(_basePath, typeof(T).Name + ".json");
        }

        public List<T> getDataFromFile<T>()
        {
            var path = GetFilePath<T>();

            if (File.Exists(path))
            {
                var jsonData = File.ReadAllText(path);
                return JsonSerializer.Deserialize<List<T>>(jsonData) ?? new List<T>();
            }
            else
            {
                return new List<T>(); // Si no existe, simplemente devuelve una lista vacía
            }
        }

        public void saveDataToFile<T>(List<T> data)
        {
            var path = GetFilePath<T>();
            var jsonData = JsonSerializer.Serialize(data, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(path, jsonData);
        }
    }

}

