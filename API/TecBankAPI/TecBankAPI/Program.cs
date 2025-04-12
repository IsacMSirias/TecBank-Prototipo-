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
        policy.WithOrigins("http://localhost:8081", "http://localhost:3000") // Cambia esto por el dominio de tu frontend
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

app.Run();
