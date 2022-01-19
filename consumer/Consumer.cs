// //https://docs.confluent.io/clients-confluent-kafka-dotnet/current/overview.html
// //https://github.com/confluentinc/confluent-kafka-dotnet/tree/master/examples
// using Shared;
// using System;
// using System.Threading;
// using Confluent.Kafka;

// class Program
// {
//     public static void Main(string[] args)
//     {
//         //receive.message.max.bytes=200M and fetch.message.max.bytes=100M
//         var conf = new ConsumerConfig
//         { 
//             GroupId = Common.GetConfigValue("group.id"),
//             BootstrapServers = Common.GetConfigValue("bootstrap.servers"),
//             // Note: The AutoOffsetReset property determines the start offset in the event
//             // there are not yet any committed offsets for the consumer group for the
//             // topic/partitions of interest. By default, offsets are committed
//             // automatically, so in this example, consumption will only start from the
//             // earliest message in the topic 'my-topic' the first time you run the program.
            
//             AutoOffsetReset = AutoOffsetReset.Earliest,
//             FetchMaxBytes = 1213486160 

//         };

//         using (var c = new ConsumerBuilder<Ignore, string>(conf).Build())
//         {
//             c.Subscribe(Common.GetConfigValue("topic"));

//             CancellationTokenSource cts = new CancellationTokenSource();
//             Console.CancelKeyPress += (_, e) => {
//                 e.Cancel = true; // prevent the process from terminating.
//                 cts.Cancel();
//             };

//             try
//             {
//                 while (true)
//                 {
//                     try
//                     {
//                         var cr = c.Consume(cts.Token);
//                         Console.WriteLine($"Consumed message '{cr.Value}' at: '{cr.TopicPartitionOffset}'.");
//                     }
//                     catch (ConsumeException e)
//                     {
//                         Console.WriteLine($"Error occured: {e.Error.Reason}");
//                     }
//                 }
//             }
//             catch (OperationCanceledException)
//             {
//                 // Ensure the consumer leaves the group cleanly and final offsets are committed.
//                 c.Close();
//             }
//         }
//     }
// }