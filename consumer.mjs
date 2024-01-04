import amqp from 'amqplib'

async function main(){
  const conn = await amqp.connect({
    hostname: 'localhost',
    port: 5672,
    username: 'rabbitmq',
    password: 'curso'
  })

  const channel = await conn.createChannel()

  await channel.assertQueue('minha_fila', {
    durable: true
  })

  // Limitando a quantidade de mensagens
  channel.prefetch(5)

  channel.consume('minha_fila', (data) => {
    const mensagem = data.content.toString()
    console.log(mensagem)

    // Retirando mensagem da fila
    channel.ack(data)
  })

}

main()