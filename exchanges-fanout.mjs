import amqp from "amqplib";
import { randomUUID } from 'crypto'
async function exchangeFanout() {
  const conn = await amqp.connect({
    hostname: "localhost",
    port: 5672,
    username: "rabbitmq",
    password: "curso"
  });

  const channel = await conn.createChannel();

  // Criando recursos se não existir
  await channel.assertExchange('notifications', 'fanout')
  await channel.assertQueue('email_notification')
  await channel.assertQueue('sms_notification')
  await channel.assertQueue('push_notification')

  // Binds
  await channel.bindQueue('email_notification', 'notifications', '')
  await channel.bindQueue('sms_notification', 'notifications', '')
  await channel.bindQueue('push_notification', 'notifications', '')

  channel.publish('notifications', '', Buffer.from(`Sua conta teve uma atividade suspeita - ${randomUUID()}`))

  await channel.close()
  await conn.close()
}

exchangeFanout();
