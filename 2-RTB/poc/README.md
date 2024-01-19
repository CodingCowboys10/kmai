# KMAI 

- [Requisiti](#requisiti)
- [Configurazione ambiente d'Esecuzione](#configurazione-ambiente-desecuzione)
- [Esecuzione](#esecuzione)

## Requisiti

- [Nodejs **^20.10.0 LTS** ](https://nodejs.org/en) (Per l'esecuzione del PoC)
- [Python **^3.10.0** ](https://www.python.org/) (Per l'esecuzione del Vector DB)
- [Docker ](https://docs.docker.com/engine/install/) (Per l'esecuzione di **MinIO** & **Ollama**)
- [Sqlite3](https://www.sqlite.org/index.html) (Per la conservazione dei messaggi)

Opzionale :

- [OPENAI_API_KEY](https://platform.openai.com/api-keys) (Necessaria per usare le API di OpenAI)

## Configurazione ambiente d'Esecuzione

### MinIO

[MinIO](https://min.io/) è un server di archiviazione ad oggetti locale e opensource compatibile con l'API S3 di Amazon. 

```shell
mkdir -p ${HOME}/minio/data

docker run \
   -p 9000:9000 \
   -p 9001:9001 \
   --user $(id -u):$(id -g) \
   --name minio1 \
   -e "MINIO_ROOT_USER=ROOT" \
   -e "MINIO_ROOT_PASSWORD=c" \
   -v ${HOME}/minio/data:/data \
   quay.io/minio/minio server /data --console-address ":9001"
```

### Ollama

[Ollama](https://ollama.ai/) permette di eseguire e scaricare localmente gli LLM.

#### [Con accelerazione Video (Solo NVIDIA GPU)](https://ollama.ai/blog/ollama-is-now-available-as-an-official-docker-image)

Installare il *[Nvidia container toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#installation)*.
```shell
docker run \
       -d \ 
       --gpus=all \
       -v ollama:/root/.ollama \
       -p 11434:11434 \
       --name ollama ollama/ollama
```
#### Con CPU 

```shell
docker run \
      -d \
      -v ollama:/root/.ollama \
      -p 11434:11434 \
      --name ollama ollama/ollama
```

##### Modelli e Requisiti

Per il PoC abbiamo scelto questi modelli.

| **Modello**                                                                   | **Ram/VRam**     |
|-------------------------------------------------------------------------------|------------------|
| [llama2:7b](https://ollama.ai/library/llama2:7b)  (7b)                        | *3.8*      (Gb)  |
| [openchat:7b-v3.5-0106](https://ollama.ai/library/openchat:7b-v3.5-0106) (7b) | *4.1*       (Gb) |
| [starling-lm:7b](https://ollama.ai/library/starling-lm:7b)  (7b)              | *4.1*       (Gb) |
| [mistral:v0.2](https://ollama.ai/library/mistral:v0.2) (7b)                   | *4.1*       (Gb) |

Una volta installato ollama si possono installare i modelli che si vogliono eseguire :
```shell
#llama2
docker exec -it ollama ollama run llama2:7b
#openChat
docker exec -it ollama ollama run openchat:7b-v3.5-0106
#starling
docker exec -it ollama ollama run starling-lm:7b
#mistral
docker exec -it ollama ollama run mistral:v0.2
```

### Chroma

[Chroma](https://www.trychroma.com/) e' un database vettoriale locale in cui conservare i vari documenti embeddizzati.

```shell
# Creiamo un ambiente virtuale in cui eseguire Chroma
python3 -m venv .venv  

# Attiviamo l'ambiente virtuale
.venv/bin/activate.fish 

# Installiamo ed eseguiamo Chroma
pip install chromadb 
chroma run
```

### Variabili 

Creare e modificare il file [.env.local](.env.local) aggiungendo : 
```shell
OPENAI_API_KEY="sk-la_tua_api_key"
AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE=1
```

## Esecuzione
Per eseguire il PoC:

```shell
# Installare le librerie
npm install 

# Esecuzione del PoC
npm run dev
```

