## 怎么在mac上面部署fastgpt

### 前置条件

1、可以 curl api.openai.com 

2、有openai key

3、有邮箱MAILE_CODE

4、有docker 

```
docker -v
```

5、有pnpm ，可以使用`brew install pnpm`安装

6、需要创建一个放置pg和mongo数据的文件夹，这里创建在`~/fastgpt`目录中,里面有`pg` 和`mongo `两个文件夹

```
➜  fast-gpt pwd
/Users/jie/fast-gpt
➜  fast-gpt ls
mongo pg
```



### docker部署方式

这种方式主要是为了方便调试，可以使用`pnpm dev ` 运行fast-gpt项目

**1、.env.local 文件**

```
# proxy
AXIOS_PROXY_HOST=127.0.0.1
AXIOS_PROXY_PORT_FAST=7890
AXIOS_PROXY_PORT_NORMAL=7890
queueTask=1
# email
MY_MAIL= {Your Mail}
MAILE_CODE={Yoir Mail code}
# ali ems
aliAccessKeyId=xxx
aliAccessKeySecret=xxx
aliSignName=xxx
aliTemplateCode=SMS_xxx
# token
TOKEN_KEY=sswada
# openai
OPENAIKEY={Your openapi key}
# db
MONGODB_URI=mongodb://username:password@0.0.0.0:27017/test?authSource=admin
PG_HOST=0.0.0.0
PG_PORT=8100
PG_USER=xxx
PG_PASSWORD=xxx
PG_DB_NAME=xxx
```

**2、部署mongo**

```
docker run --name mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=username -e MONGO_INITDB_ROOT_PASSWORD=password -v ~/fast-gpt/mongo/data:/data/db -d mongo:4.0.1
```

**3、部署pgsql**

```
docker run -it --name pg -e "POSTGRES_PASSWORD=xxx" -e POSTGRES_USER=xxx -p 8100:5432 -v ~/fast-gpt/pg/data:/var/lib/postgresql/data -d octoberlan/pgvector:v0.4.1
```

进pgsql容器运行

```
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL

CREATE EXTENSION vector;
-- init table
CREATE TABLE modelData (
    id BIGSERIAL PRIMARY KEY,
    vector VECTOR(1536),
    status VARCHAR(50) NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    model_id VARCHAR(50) NOT NULL,
    q TEXT NOT NULL,
    a TEXT NOT NULL
);
-- create index
CREATE INDEX modelData_status_index ON modelData (status);
CREATE INDEX modelData_modelId_index ON modelData (modelId);
CREATE INDEX modelData_userId_index ON modelData (userId);
EOSQL
```



4、**最后在FASTGPT项目里面运行pnpm dev 运行项目，然后进入localhost:3000 看项目是否跑起来了**