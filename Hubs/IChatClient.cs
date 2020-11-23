using System.Threading.Tasks;
using aioe.Models;

namespace aioe.Hubs
{
    public interface IChatClient
    {
         Task RecieveMessage(ChatMessage message);
    }
}