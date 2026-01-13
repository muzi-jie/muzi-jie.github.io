---
title: redis基础
author: 李杰
pubDatetime: 2026-01-12T00:00:00Z
featured: false
draft: true
description: redis基础笔记
tags: 
 - 后端
 - redis
---

# 1. 初识Redis
## 1.1 认识NoSQL

**表 1：SQL 与 NoSQL 对比**
| 对比项 | SQL | NoSQL |
| --- | --- | --- |
| 数据结构 | 结构化（Structured） | 非结构化 |
| 数据关联 | 关联的（数据库会帮你维护关系，例如：外键） | 无关联 (数据库不会帮你维护关系，需要程序员自己去维护) |
| 查询方式 | SQL 查询 (不同的数据库命令一样) | 非 SQL (不同的数据库命令不一样) |
| 事务特性 | ACID (原子性、一致性、独立性、持久性)| BASE (无法完全保证ACID) |
| 存储方式 | 磁盘 | 内存 |
| 扩展性 | 垂直扩展 (关系型数据库集群模式一般是主从，主从数据一致，起到数据备份的作用，称为垂直扩展) | 水平扩展 (非关系型数据库可以将数据拆分，存储在不同机器上，可以保存海量数据，解决内存大小有限的问题。称为水平扩展) |
| 使用场景 | 1. 数据结构固定<br>2. 相关业务对数据安全性、一致性要求较高 | 1. 数据结构不固定<br>2. 对一致性、安全性要求不高<br>3. 对性能要求高 |

**表 2：NoSQL非结构化**
| 类型 | 代表数据库 |
| --- | --- |
| 键值型 | Redis |
| 文档型 | MongoDB |
| 列类型 | HBase |
| 图类型 | Neo4j |

## 1.2 认识Redis
Redis诞生于2009年，全称是Remote Dictionary Server远程词典服务器，是一个基于内存的键值型NoSQL数据库。

特征：

- 键值(Key-Value)型，Value支持多种不同的数据结构，功能丰富
- 单线程，每个命令具有原子性
- 低延迟，速度快(基于内存、IO多路复用、良好的编码)
- 支持数据持久化(可以定期把内存数据保存到磁盘.即使 Redis 重启，也能恢复数据)
- 支持主从集群(从节点进行数据备份)、分片集群(将数据拆分，存储在不同机器上，容量和性能可扩展)
- 支持多语言客户端（几乎所有后端语言都能用Redis）

## 1.3 安装Redis
- Windows 版：https://github.com/microsoftarchive/redis/releases
- Linux 版：https://download.redis.io/releases/
注意：最好在 Linux / WSL 环境使用学习redis

以下是Linux / WSL 环境安装Redis的步骤：
1.安装sudo apt install redis-server
```bash
sudo apt install redis-server
```
2.修改配置文件
```bash
sudo -i #在管理员模式才能进行etc目录
sudo vim /etc/redis/redis.conf #修改配置文件里bind、daemonize、requirepass、dir、databases等配置
```
3.开机自启（安装好自己就会开机自启）
4.四个命令
```bash
systemctl start redis #启动Redis服务
systemctl stop redis #停止Redis服务
systemctl restart redis #重启Redis服务
systemctl status redis #查看Redis服务状态
```
## 1.4 Redis桌面客户端
- 命令行客户端
- 图形化桌面客户端
- 编程客户端
### 1.4.1 Redis命令行客户端
Redis安装完成后就自带了命令行客户端：redis-cli，使用方式如下：
```bash
redis-cli [options] [commonds]
```

常见的option有：
- -h 127.0.0.1：指定连接的Redis服务器主机名或IP地址，默认是127.0.0.1
- -p 6379：指定连接的Redis服务器端口号，默认是6379
- -a password：指定连接的Redis服务器密码，默认是没有密码
- -n db：指定连接的Redis数据库编号，默认是0

其中commonds就是Redis的命令，一般不使用这一项，先连接之后再执行命令。
- ping：测试连接是否成功,正常会返回Pong

### 1.4.2 Redis图形化桌面客户端
安装包：https://github.com/lework/RedisDesktopManager-Windows/releases
![下载项](../../../public/blog/redis基础/01.png)
下载解压缩后，双击运行exe文件进行安装。
进行redis连接即可使用。

# 2. Redis命令
Redis 所有命令可在 [https://redis.io/commands](https://redis.io/commands) 中查询。
命令行查询: help @value的类别
## 2.1 数据结构介绍
Redis是典型的key-value数据库，key一般是字符串，而value包含很多不同的数据类型

| 类型        | 名称     | 示例                          | 分类     |
| ----------- | -------- | ----------------------------- | -------- |
| String      | 字符串   | `hello world`                 | 基本类型 |
| Hash        | 哈希     | `{name:"Jack",age:21}`        | 基本类型 |
| List        | 列表     | `A → B → C → C`               | 基本类型 |
| Set         | 集合     | `{A,B,C}`                     | 基本类型 |
| SortedSet   | 有序集合 | `{A:1,B:2,C:3}`               | 基本类型 |
| GEO         | 地理位置 | `{A:(120.3,30.5)}`            | 特殊类型 |
| BitMap      | 位图     | `0110110101110101011`          | 特殊类型 |
| HyperLogLog | 基数统计 | `0110110101110101011`          | 特殊类型 |

## 2.2 通用命令
```bash
help 命令 #查看用法
keys 通配符 #查找适配的key
del key1 key2 key3 #删除key，若没有key3则只删除key1、key2
exists key #key是否存在，返回1存在，返回0不存在
expire key  time #设置过期时间（s）
ttl key #查看过期时间
```
## 2.3 String类型
String类型，也就是字符串类型，是Redis中最简单的存储类型
其value是字符串，不过根据字符串的格式不同，又可以分为3类
 - string：普通字符串
 - int：整数类型，可以做自增、自减操作
 - float：浮点类型，可以做自增、自减操作

不管是哪种格式，底层都是字节数组形式存储，只不过是编码方式不同，字符串类型的最大空间不能超过512M
```bash
set key value #新增一个键值对 或者覆盖现有这个key
setnx key value #如果不存在key，新增一个键值对，返回增加数
setex key time value #添加值并设置有效期
get key #取值
mset key1 value1 key2 value2 #批量添加键值对
mget key1 key2 #批量获取值，返回一个数组
incr key #整形 value++，返回值是增加后的value
incrby key increment #整形 自增increment（可为负）
incrbyfloat key increment #浮点数 自增increment浮点数
```
## Key的层级格式
使用 `项目名:业务名:类型:id` 作为key，也可以使用自己的规则。所有的value类型都可以适用

## Hash
Hash类型，也叫散列，其中value是一个无序字典，类似于Java中的HashMap结构
![Hash结构](../../../public/blog/redis基础/02.jpg)
```bash
hset key field value #新增一个键值对 或者覆盖现有这个key
hsetnx key field value #如果不存在则新增，返回增加数
hget key field #取值
hmset key field1 value1 field2 value2 #批量添加
hmget key field1 field2 #批量获取值，返回一个数组
hgetall key #获取所有field和value,返回数组 例如：field1 value1 field1 value2 field2
hkeys key #获取所有的field 返回数组
hvals key #获取所有的value 返回数组
hincrby key field increment #自增increment（可为负）返回自增后的值
```
