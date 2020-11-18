using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using aioe.Data;
using aioe.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace aioe.Controllers
{

    [Authorize]
    [Route("api/auth")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        
        private IJwtAuthenticationManager jwtAuthenticationManager;
        private DataContx dataContx;
        

        public AuthenticationController(DataContx dataContx, IJwtAuthenticationManager jwtAuthenticationManager)
        {
            this.dataContx = dataContx;
            this.jwtAuthenticationManager = jwtAuthenticationManager;
        }

        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] {"val1, val2"};

        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] UserCredentials userCredentials)
        {
            var user = dataContx.Users.FirstOrDefault(x => (x.Name == userCredentials.Name && x.Password == userCredentials.Password) );
             if(!dataContx.Users.Any(u=> u.Name == userCredentials.Name && u.Password == userCredentials.Password)) 
             {
                 return null;
            }
            var token = jwtAuthenticationManager.Authenticate(userCredentials.Name, userCredentials.Password);
            if (token == null)
                return Unauthorized();
            return Ok(new {
                token,
                user,
                });
        }


    }
}