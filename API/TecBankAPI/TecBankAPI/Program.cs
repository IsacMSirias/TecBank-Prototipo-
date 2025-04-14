using Microsoft.EntityFrameworkCore;
using TecBankAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Configuración de la base de datos o servicios necesarios
builder.Services.AddSingleton<FileDataService>(new FileDataService("Data"));

// Agregar los controladores
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins(
            "http://localhost:8081",            // Expo web
            "http://localhost:3000",            // React web local
            "http://192.168.50.135:8081",       // Expo web por IP
            "http://192.168.50.135:3000"        // React web por IP
        )
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

// Usar la política de CORS configurada
app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Permitir que el backend escuche desde cualquier IP (en tu red local)
//app.Urls.Add("http://0.0.0.0:6969");

app.Run();
