# Come Runnare

MinIO
```shell
mkdir -p ${HOME}/minio/data

docker run \
   -p 9000:9000 \
   -p 9001:9001 \
   --user $(id -u):$(id -g) \
   --name minio1 \
   -e "MINIO_ROOT_USER=ROOT" \
   -e "MINIO_ROOT_PASSWORD=12345678" \
   -v ${HOME}/minio/data:/data \
   quay.io/minio/minio server /data --console-address ":9001"
```

```shell
npm install

npm run dev
```

E' necessario avere ollama e chromaDB che eseguono.

create un file .env dentro langchain_test e dentro inserite:
```dotenv
#poc/.env.local
OPENAI_API_KEY=sk-xxxx
```

