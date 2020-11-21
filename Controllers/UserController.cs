using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using aioe.Models;
using aioe.Data;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace aioe.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {

        private DataContx dataContx;
        private IJwtAuthenticationManager jwtAuthenticationManager;

        public UserController(DataContx dataContx, IJwtAuthenticationManager ajwtAuthenticationManage)
        {
            this.dataContx = dataContx;
            this.jwtAuthenticationManager = ajwtAuthenticationManage;            
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            return dataContx.Users.ToList();

        }

        [AllowAnonymous]
        [HttpPost("reg")]
        public async Task<IActionResult> Post([FromBody]User userGet)
        {
            if(dataContx.Users.Any(u=> u.Name == userGet.Name)) 
             {
                 return StatusCode(300);
            }

            if(dataContx.Users.Any(u=> u.Email == userGet.Email)) 
             {
                 return StatusCode(301);
            }
            var token = jwtAuthenticationManager.Authenticate(userGet.Name, userGet.Password);
            if (token == null)
                return Unauthorized();
            User user = new User();
            user.Name = userGet.Name;
            user.Password = userGet.Password;
            user.Email = userGet.Email;
            dataContx.Users.Add(user);
            await dataContx.SaveChangesAsync();
            return Ok(new {
                user,
                token
            });  
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Authenticate([FromBody] UserCredentials userCredentials)
        {
            var user = dataContx.Users.FirstOrDefault(x => (x.Name == userCredentials.Name && x.Password == userCredentials.Password) );
             if(!dataContx.Users.Any(u=> u.Name == userCredentials.Name && u.Password == userCredentials.Password)) 
             {
                 return StatusCode(302);
            }
            var token = jwtAuthenticationManager.Authenticate(userCredentials.Name, userCredentials.Password);
            if (token == null){
                return StatusCode(303);
            }
            user.Password = "";

            return Ok( new {
                token,
                user,
                });
        }


    }
}