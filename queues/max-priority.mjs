import amqp from "amqplib";

async function maxPriority() {
  const connection = await amqp.connect({
    hostname: "localhost",
    port: 5672,
    username: "rabbitmq",
    password: "curso",
  });

  // Criando canal de comunicação
  const channel = await connection.createChannel();

  await channel.assertQueue('priority', {
    maxPriority: 5
  })

  for(let i=0; i<10; i++){
    channel.publish('', 'priority', Buffer.from('Mensagem padrão sem prioridade'))
  }
  
  channel.publish('', 'priority', Buffer.from('Mensagem com prioridade 5'), {
    priority: 5
  })

  await channel.close();
  await connection.close();
}

maxPriority();
