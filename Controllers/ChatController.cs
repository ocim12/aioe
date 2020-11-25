// using System.Threading.Tasks;
// using aioe.Hubs;
// using aioe.Models;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.AspNetCore.SignalR;


// namespace aioe.Controllers
// {
//     [ApiController]
//     [Route("[controller]")]
//     public class ChatController : ControllerBase
//     {
//         private readonly IHubContext<ChatHub, IChatClient> chatHub;

//         public ChatController(IHubContext<ChatHub, IChatClient> chatHub)
//         {
//             this.chatHub = chatHub;
//         }

//         [HttpPost("messages")]
//         public async Task Post(ChatMessage message)
//         {
//             await chatHub.Clients.All.RecieveMessage(message);
//         }


//         [HttpGet("users")]
//         public async Task LoggedUsers()
//         {
//             await chatHub.Clients.All.LoggedUsers(chatHub);
            
//         }
//     }
// }