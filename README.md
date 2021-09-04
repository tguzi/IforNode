# drip-flow-node


### mysql 操作

* 修改表中字段长度
<code>alter table Table modify column Field varchar(100);</code>

* 修改不可空字段变为可空
<code>ALTER TABLE 表名 MODIFY 字段名 VARCHAR() DEFAULT NULL</code>