import {
  ConnectedSocket,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import axios from 'axios';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketService implements OnGatewayConnection {
  handleConnection(client: any): void {
    console.log('CONECTED');
  }

  @SubscribeMessage('server-currency')
  handleEvent(dto: any, @ConnectedSocket() client: any) {
    setInterval(() => {
      axios
        .get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(function (response) {
          client.emit('client-currency', { data: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    }, 3000);
  }
}
