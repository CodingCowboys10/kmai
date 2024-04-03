import { Ollama } from 'ollama'
import cliProgress from 'cli-progress'

const ollama = new Ollama({ host: 'http://ollama:11434/' })
const model = 'starling-lm:latest'

const ollamaInit = async () => {
    console.log(`downloading ${model}...`)
    const stream = await ollama.pull({ model: model, stream: true })
    const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    bar.start(100, 0); // Start the progress bar

    for await (const part of stream) {
        if (part.digest) {
            let percent = 0
            if (part.completed && part.total) {
                percent = Math.round((part.completed / part.total) * 100)
            }
            bar.increment(percent); // Increment the progress bar
            bar.update(); // Update the progress bar
        } else {
            console.log(part.status)
        }
    }

    bar.stop(); // Stop the progress bar when the download is complete
}

ollamaInit().then(() => console.log(`downloading ${model} terminated`))