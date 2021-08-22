const { Kafka } = require('kafkajs');

const createConnection = async () => {
  const kafka = new Kafka({ clientId: 'creator', brokers: ['localhost:9092'] });
  const admin = kafka.admin();
  await admin.connect();
  console.log('Connection successful');

  await admin.createTopics({
    topics: [
      {
        topic: 'Users',
        numPartitions: 2,
      },
    ],
  });
  console.log('Topic Users was created');
  await admin.disconnect();
};

try {
  createConnection();
} catch (e) {
  console.log(e);
}
