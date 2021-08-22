const { Kafka } = require('kafkajs');

const msg = process.argv[2];

const createConnection = async () => {
  const kafka = new Kafka({ clientId: 'creator', brokers: ['localhost:9092'] });
  const producer = kafka.producer();
  await producer.connect();
  console.log('Connection successful');

  const partition = msg[0].toUpperCase() < 'N' ? 0 : 1;

  const result = await producer.send({ topic: 'Users', messages: [{ value: msg, partition }] });

  console.log(`Successfully: ${JSON.stringify(result)}`);
  await producer.disconnect();
};

try {
  createConnection();
} catch (e) {
  console.log(e);
}
