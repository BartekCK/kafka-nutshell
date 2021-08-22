const { Kafka } = require('kafkajs');

const createConnection = async () => {
  const kafka = new Kafka({ clientId: 'creator', brokers: ['localhost:9092'] });
  const consumer = kafka.consumer({ groupId: 'first' });
  await consumer.connect();
  console.log('Connection successful');

  await consumer.subscribe({ topic: 'Users', fromBeginning: true });

  await consumer.run({
    eachMessage: async (payload) => {
      const { message, topic, partition } = payload;
      console.log(`-message: ${message.value}\n-topic: ${topic}\n-partition: ${partition}`);
    },
  });
};

try {
  createConnection();
} catch (e) {
  console.log(e);
}
