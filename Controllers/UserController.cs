using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using aioe.Models;

namespace aioe.Controllers
{

    [ApiController]
    [Route("aa")]
    public class UserController : ControllerBase
    {

        public UserController() {
            
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            using(var context = new UserContext()) {
                return context.Users.ToList();
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(User user)  {
            using (var context = new UserContext())
            {
                User u = new User();
                u.Name = user.Name;
                u.Password = user.Password;
                context.Users.Add(u);
                await context.SaveChangesAsync();
                return Ok(u);
            }
        }
    }
}