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
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {

        private DataContx dataContx;

        public UserController(DataContx dataContx)
        {
            this.dataContx = dataContx;
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            return dataContx.Users.ToList();

        }

        [HttpPost]
        public async Task<IActionResult> Post(User user)
        {
            User u = new User();
            u.Name = user.Name;
            u.Password = user.Password;
            dataContx.Users.Add(u);
            await dataContx.SaveChangesAsync();
            return Ok(u);  
        }

    }
}