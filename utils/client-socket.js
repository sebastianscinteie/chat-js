
export default class ClientSocket extends WebSocket{
  constructor(...args){
    super(...args);

    this.addEventListener('open', () => {
      console.log("Socket open.");
    })
  
    this.addEventListener("message", (msg) => {
      let data = JSON.parse(msg.data)
      if (data?.recentMessages) {
        messages.push(...data.recentMessages)
        setMessages([...messages])
        return;
      }

      if(!"username" in data) {
        console.log("Message from server doesn't contain user field.")
      }
      if(!"time" in data) {
        console.log("Message from server doesn't contain time field.")
      }
      if(!"message" in data) {
        console.log("Message from server doesn't contain message field.")
      }

      messages.push(data)
      setMessages([...messages])
    });
  }
}