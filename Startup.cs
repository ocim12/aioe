using System.Text;
using aioe.Data;
using aioe.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using aioe.Hubs;
using System.Threading.Tasks;

namespace aioe
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            string connectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<DataContx>(opt => opt.UseSqlServer(connectionString));
            services.AddControllers();
            services.AddCors();
            services.AddSignalR();

            var key = "to_jest_moj_service_key";

            services.AddAuthentication(x => {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(x => {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
                 x.Events = new JwtBearerEvents {
                     OnMessageReceived = context => {
                     var accessToken = context.Request.Query["access_token"];

                //     // If the request is for our hub...
                     var path = context.HttpContext.Request.Path;
                     if (!string.IsNullOrEmpty(accessToken) &&
                         (path.StartsWithSegments("/chat")))
                     {
                //         // Read the token out of the query string
                         context.Token = accessToken;
                     }
                     return Task.CompletedTask;
                 }
                 };
                }
            );

            services.AddSingleton<IJwtAuthenticationManager>(new JwtAuthenticationManager(key));

            // In production, the React files will be served from this directory
            // services.AddSpaStaticFiles(configuration =>
            // {
            //     configuration.RootPath = "ClientApp/build";
            // });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }


            app.UseAuthentication();
            //app.UseHttpsRedirection();
            // app.UseStaticFiles();
             //app.UseSpaStaticFiles();
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chat");
            });

             app.UseSpa(spa =>
             {
                 spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                 {
                     spa.UseReactDevelopmentServer(npmScript: "start");
                }
             });
        }
    }
}
