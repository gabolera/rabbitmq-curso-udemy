import amqp from "amqplib";
async function exchange() {
  const conn = await amqp.connect({
    hostname: "localhost",
    port: 5672,
    username: "rabbitmq",
    password: "curso",
  });

  const channel = await conn.createChannel();

  // Criar uma exchange
  await channel.assertExchange("udemy_exchange", "direct");

  // Criar uma filas
  await channel.assertQueue("udemy_push_notification", {
    durable: true,
  })
  await channel.assertQueue("udemy_email_notification", {
    durable: true,
  });

  // Binding - Linkar fila com exchange
  await channel.bindQueue('udemy_push_notification', 'udemy_exchange', 'novoCurso')
  await channel.bindQueue('udemy_email_notification', 'udemy_exchange', 'novoCurso')
  await channel.bindQueue('udemy_email_notification', 'udemy_exchange', 'diploma')

  // Publicando mensagem com chave de roteamento
  channel.publish(
    "udemy_exchange",
    "diploma",
    Buffer.from("Teste mensagem")
  );

  await channel.close()
  await conn.close()
}

exchange();
