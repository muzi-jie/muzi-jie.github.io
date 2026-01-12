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

# 初识Redis
## 认识NoSQL

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

## 认识Redis
Redis诞生于2009年，全称是Remote Dictionary Server远程词典服务器，是一个基于内存的键值型NoSQL数据库。

特征：

- 键值(Key-Value)型，Value支持多种不同的数据结构，功能丰富
- 单线程，每个命令具有原子性
- 低延迟，速度快(基于内存、IO多路复用、良好的编码)
- 支持数据持久化(可以定期把内存数据保存到磁盘.即使 Redis 重启，也能恢复数据)
- 支持主从集群(从节点进行数据备份)、分片集群(将数据拆分，存储在不同机器上，容量和性能可扩展)
- 支持多语言客户端（几乎所有后端语言都能用Redis）

## 安装Redis
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
## Redis桌面客户端
- 命令行客户端
- 图形化桌面客户端
- 编程客户端
### Redis命令行客户端
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

### Redis图形化桌面客户端
安装包：https://github.com/lework/RedisDesktopManager-Windows/releases
![下载项](../../../public/blog/redis基础/image.png)
下载解压缩后，双击运行exe文件进行安装即可。
