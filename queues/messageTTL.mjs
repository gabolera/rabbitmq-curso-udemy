import amqp from "amqplib";
import { randomUUID } from "crypto";

async function messageTTL() {
  const connection = await amqp.connect({
    hostname: "localhost",
    port: 5672,
    username: "rabbitmq",
    password: "curso",
  });

  // Criando canal de comunicação
  const channel = await connection.createChannel();

  await channel.assertQueue('message_ttl', {
    messageTtl: 30000
  })

  channel.publish('', 'message_ttl', Buffer.from('Minha mensagem de 30s'))

}

messageTTL();
