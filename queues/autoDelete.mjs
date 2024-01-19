import amqp from "amqplib";
import { randomUUID } from "crypto";

async function autoDelete() {
  const connection = await amqp.connect({
    hostname: "localhost",
    port: 5672,
    username: "rabbitmq",
    password: "curso",
  });

  // Criando canal de comunicação
  const channel = await connection.createChannel();

  await channel.assertQueue('auto_delete', {
    autoDelete: true
  })

  // for(let i=0; i<100; i++){
  //   channel.publish('','auto_delete', Buffer.from(`Minha fila auto-delete`));
  // }

  await channel.prefetch(10)
  channel.consume('auto_delete', (data) => {
    console.log(data.content.toString())
  })

}

autoDelete();
