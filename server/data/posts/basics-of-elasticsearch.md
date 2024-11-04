---
layout: ../layouts/BlogPost.astro
title: Basics of Elasticsearch
slug: basics-of-elasticsearch
description: What is it? How to install? What makes it elastic?
tags:
  - learning
added: 2024-10-22T03:02:34.748Z
---

Lately, I’ve been learning the basics of Elasticsearch, so while I take notes, may as well make a post about it.While researching it and looking for tutorials, I came across their Youtube channel. So not only do they have a complete documentation of their open-source database, but they also have advocates that make tutorials. [Here](https://youtube.com/playlist?list=PL_mJOmq4zsHbcdoeAwNWuhEWwDARMMBta\&si=ZA-i1_hXM3oow_Zl "Here")'s the playlist that I like the most, it’s composed of bite-size videos instead of long format ones.

### What is Elasticsearch?

Elasticsearch is an open-source database optimized for searching within large datasets. While it can be used as a regular database, this engine shines best in its many searching abilities. It is optimized for fast data retrieval, advance querying and analytics. Many companies that have huge databases use it, like Uber and Tinder. It operates through a RESTful API. It doesn’t just let you get your data it also has the option to get information about that data, like how many times a word is used or how many times that data has been searched.

The difference between Elasticsearch and a classic database, which is primarily used for storage, is that Elasticsearch’s primary goal is to provide near-instant full-text search and data aggregation.The data aggregation can be used to have statistics on said data.

### Terminology

Elasticsearch has a structure that may feel familiar if you’ve worked with databases before, but it uses different terms:

* Index: Similar to a collection in MongoDB or a table in SQL. It’s a logical namespace to group documents together. 
* Id: Every document has its own unique identifier. 
* Document: A JSON object that contains data. In SQL terms, a document is equivalent to a row in a table. 
* Field: Represents individual attributes in the document, similar to a column in a table. 
* Node: A single instance of Elasticsearch running on a server or machine. 
* Shard: Elasticsearch automatically divides indexes into smaller pieces called shards, where documents are stored. 
* Cluster: A group of nodes working together. Each node in the cluster holds data and participates in indexing and searching. 
* Mapping: Defines the fields and data types of an index.

### Why is it called Elasticsearch?

Elasticsearch is called that because it automatically scales and distributes data across multiple nodes,allowing it to handle large, dynamic datasets while providing fast and flexible search and real-time analytics.

### Kibana or no Kibana?

If you want to use Elasticsearch, you’ll probably want to install kibana as well. Kibana is an open-source data visualization dashboard for Elasticsearch, allowing you to query your data, create charts, and monitor your Elasticsearch environment.

In a way, to reuse what we already about data bases, Kibana acts like SQL Developer but works just like Postman. It lets you query and interact with your Elasticsearch data. Instead of SQL queries, you write REST API queries. And it serves as a visual interface for making REST API requests, allowing you to interact with the Elasticsearch APIs, much like Postman does for general API testing.

<br/>
<hr/>

### How to Install Elasticsearch and Kibana on Windows and Run Locally

Now, for the hardest part: installing Elasticsearch and Kibana and making them work for the first time. Here’s how I installed Elasticsearch and Kibana and made them work:

1. Download Elasticsearch and Kibana: Extract them to a suitable location. I put them directly in C:\\.
2. Start Elasticsearch: Open a command prompt, navigate to C:\elasticsearch-8.15.3\bin, and run elasticsearch.bat. Wait until Elasticsearch is fully started.
3. Access Elasticsearch: Open a browser and go to localhost:9200. If it asks for a username and password, it means Elasticsearch is working.
4. Reset Password: Open a new command prompt without stopping elasticsearch.bat and run elasticsearch-reset-password.bat -i -u elastic. Set a new password.
5. Verify Access: Log in with the username elastic and the password you set. You should see a JSON document.
6. Configure Elasticsearch: Open C:\elasticsearch-8.15.3\config\elasticsearch.yml and add:
```
   cluster.name: my-application
   node.name: node-1
   path.data: C:\elasticsearch-8.15.3\data
   path.logs: C:\elasticsearch-8.15.3\logs
   network.host: 0.0.0.0
   http.port: 9200
   xpack.security.enabled: false
   discovery.seed_hosts: ["127.0.0.1"]
   cluster.initial_master_nodes: ["node-1"]
```
7. Restart Elasticsearch: Run elasticsearch.bat again.
8. Configure Kibana: Open C:\kibana-8.15.3\config\kibana.yml and add:
```
   server.host: "0.0.0.0"
   elasticsearch.hosts: ["http://localhost:9200/"]
```
   
9. Start Kibana: Open a new command prompt, navigate to C:\kibana-8.15.3\bin, and run kibana.bat. Then go to localhost:5601.

And that’s it! You are now ready to mess around with Elasticsearch.