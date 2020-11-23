using Microsoft.AspNetCore.SignalR;
using aioe.Models;
using System.Threading.Tasks;

namespace aioe.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        public async Task SendMessage(ChatMessage message) {
            await Clients.All.RecieveMessage(message);
        }
    }
}