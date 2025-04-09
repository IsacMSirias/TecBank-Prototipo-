using Microsoft.EntityFrameworkCore;
using TecBankAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Configuración de la base de datos o servicios necesarios
builder.Services.AddSingleton<FileDataService>(new FileDataService("TecBankDB.txt"));

// Agregar los controladores
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("http://localhost:8081") // Cambia esto por el dominio de tu frontend
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configuración de Swagger solo para el entorno de desarrollo
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseSwagger();
app.UseSwaggerUI();

// Usar la política de CORS configurada
app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
