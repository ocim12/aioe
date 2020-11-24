using Microsoft.AspNetCore.SignalR;
using aioe.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Collections.Generic;

namespace aioe.Hubs
{

    public static class OnlineUsersHandler
    {
        public static HashSet<string> UsersOnline = new HashSet<string>();
    }


    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ChatHub : Hub<IChatClient>
    {


        public async Task SendMessage(ChatMessage message)
        {
            await Clients.All.RecieveMessage(message);
        }

        public async Task LoggedUsers() 
        {
            await Clients.All.LoggedUsers(OnlineUsersHandler.UsersOnline);
        }

        public override Task OnConnectedAsync()
        {
            OnlineUsersHandler.UsersOnline.Add(Context.User.Identity.Name);
            LoggedUsers();
            return base.OnConnectedAsync();
        }
    }
}