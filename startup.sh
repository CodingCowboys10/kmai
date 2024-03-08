# Definisci i nomi dei container di interesse
containers=("minio1_docker" "ollama_docker" "chroma_docker" "postgres_docker")

# Controlla se tutti e quattro i container di interesse esistono
containers_exist=true
for container in "${containers[@]}"; do
    if ! sudo docker ps -a --format "{{.Names}}" | grep -q "^$container$"; then
        containers_exist=false
        break
    fi
done

# Se tutti e quattro i container di interesse esistono, avvia solo il comando di start
if $containers_exist; then
    echo "All containers already exist. Starting them..."
    sudo docker compose start
else
    # Altrimenti, se almeno uno dei container di interesse non esiste, avvia docker-compose up -d per crearli e avviarli
    echo "One or more containers do not exist. Creating and starting them..."
    sudo docker compose up -d
fi

# Esegui il comando docker exec per eseguire ollama pull llama2
sudo docker exec -it ollama_docker ollama pull starling-lm:latest

# Spostati nella directory 2-RTB/poc
cd 2-RTB/poc
#cd 3-PB/mvp

# Esegui npm run dev
npm run dev