## Using SQL Server
```
cd /mnt/c/myWork/SmartReconApp/cdc

# Start the topology as defined in https://debezium.io/docs/tutorial/
export DEBEZIUM_VERSION=1.6
docker-compose -f docker-compose-sqlserver-ui-es.yaml up

# Initialize database and insert test data
cat debezium-sqlserver-init/inventory.sql | docker exec -i cdc_sqlserver_1 bash -c '/opt/mssql-tools/bin/sqlcmd -U sa -P $SA_PASSWORD'

# Start SQL Server connector
curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d @register-sqlserver.json

# Consume messages from a Debezium topic
docker-compose -f docker-compose-sqlserver.yaml exec kafka /kafka/bin/kafka-console-consumer.sh \
    --bootstrap-server kafka:9092 \
    --from-beginning \
    --property print.key=true \
    --topic server1.dbo.customers

# Modify records in the database via SQL Server client (do not forget to add `GO` command to execute the statement)
docker-compose -f docker-compose-sqlserver.yaml exec sqlserver bash -c '/opt/mssql-tools/bin/sqlcmd -U sa -P $SA_PASSWORD -d testDB'

# update customers set  first_name='Rajesh', last_name = 'Radhakrishnan', email='test@g.com'
# where id = 1001; GO;
# SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE'
# select * from sys.tables where schema_id = schema_id('cdc')


# Shut down the cluster
docker-compose -f docker-compose-sqlserver.yaml down
```

https://github.com/debezium/debezium-ui

https://debezium.io/blog/2021/08/12/introducing-debezium-ui/
```
docker run -it --rm --name debezium-ui -p 8080:8080 -e KAFKA_CONNECT_URI=http://connect:8083 debezium/debezium-ui:1.7
```

http://localhost:8080/

# Kafka UI
https://github.com/provectus/kafka-ui

docker run -p 8080:8080 \
	-e KAFKA_CLUSTERS_0_NAME=local \
	-e KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS=kafka:9092 \
	-d provectuslabs/kafka-ui:latest 

 http://localhost:8080

# Zookeeper UI
https://github.com/tobilg/docker-zookeeper-webui

 docker run -d \
  -p 8070:8080 \
  -e ZK_DEFAULT_NODE=192.168.0.100:2181/ \
  --name zk-web \
  -t tobilg/zookeeper-webui

   http://localhost:8080

# Install Elasticsearch with Dockeredit

https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html#_pulling_the_image

docker pull docker.elastic.co/elasticsearch/elasticsearch:7.15.1
docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.15.1

## Starting a multi-node cluster with Docker Composeedit
## Run docker-compose to bring up the cluster:
docker-compose up
## Submit a _cat/nodes request to see that the nodes are up and running:
curl -X GET "localhost:9200/_cat/nodes?v=true&pretty"

# Integration with ElasticSearch
https://debezium.io/blog/2018/01/17/streaming-to-elasticsearch/
https://debezium.io/blog/2018/09/20/materializing-aggregate-views-with-hibernate-and-debezium/

https://towardsdatascience.com/stream-your-data-changes-in-mysql-into-elasticsearch-using-debizium-kafka-and-confluent-jdbc-b93821d4997b

Step 1 Download Kafka Connect Elastic Sink Connector

https://www.confluent.io/hub/confluentinc/kafka-connect-elasticsearch


Step 2 Extract downloaded zip file
Step 3 Rename lib folder into kafka-connect-jdbc
Step 4 Copy kafka-connect-jdbc into debezium the container of kafka-connect
> docker cp /path-to-file/confluentinc-kafka-connect-elasticsearch-5.5.0/kafka-connect-jdbc/* connectdbz:/kafka/connect/

docker cp ./debezium-connector-elasticsearch cdc_connect_1:/kafka/connect/

Step 5 Verify that all dependency is copied
docker exec -it cdc_connect_1 /bin/bash
cd connect/kafka-connect-jdbc/
ls -all

Step 6 Restart Debezium Kafka Connect container
docker stop cdc_connect_1 && docker start cdc_connect_1

# Start Elastic Search Sink connector
curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d @es-sink.json

Step 7
verify ElasticsearchSinkConnector connector is registered in the list of connectors
curl -H "Accept:application/json" localhost:8083/connectors/
//output ["elastic-sink","inventory-connector"]

curl 'http://localhost:9200/server1.dbo.customers/_search?pretty'


For delete you submit DELETE request
curl -i -X DELETE localhost:8083/connectors/elastic-sink/

docker build -t mellos-consumer .
docker run -d --network=cdc_dbzui-network mellos-consumer:latest
docker logs -f --tail 10 container_name

