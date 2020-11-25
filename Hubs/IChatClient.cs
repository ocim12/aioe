using System.Collections.Generic;
using System.Threading.Tasks;
using aioe.Models;

namespace aioe.Hubs
{
    public interface IChatClient
    {
         Task RecieveMessage(ChatMessage message);
         Task LoggedUsers(HashSet<string> users);
         
    }
}