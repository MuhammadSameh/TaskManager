using API.Helpers;
using API.Mapping;
using Core.Entities;
using Core.Repositories;
using Infrastructure.Data;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
ConfigurationManager configuration = builder.Configuration;

builder.Services.AddControllers();
builder.Services.AddAutoMapper(typeof(MappingProfiles));
builder.Services.AddScoped<ITaskRepository, TaskRepository>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<TaskContext>(
                x => x.UseSqlServer(
                    configuration.GetConnectionString("DefaultConnection")
                    ));

builder.Services.AddIdentity<User, IdentityRole>(
                         options =>
                         {
                             options.Password.RequiredLength = 8;
                             options.Password.RequireNonAlphanumeric = false;
                             options.Password.RequireUppercase = false;
                             options.Password.RequireLowercase = false;
                         }

                     ).AddEntityFrameworkStores<TaskContext>();

builder.Services.AddCors(opt =>
{
    opt.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
    });
}
);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = "User";
    options.DefaultChallengeScheme = "User";
}).AddJwtBearer("User", options =>
   {
       options.TokenValidationParameters = new TokenValidationParameters
       {
           IssuerSigningKey = TokenHelper.GenerateSecretKey(configuration),
           ValidateIssuer = false,
           ValidateAudience = false
       };
   });



var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<TaskContext>();
    await context.Database.MigrateAsync();
    SeedData.SeedUsersAsync(scope.ServiceProvider).GetAwaiter().GetResult();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
