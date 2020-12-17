import { createWorker } from 'tesseract.js';
import pageimage from "../assets/designs/pageimage.png";

const worker = createWorker({
    logger: (m) => console.log(m),
    workerPath: '../../node_modules/tesseract.js/dist/worker.min.js',
    langPath: '../assets/langdata',
    corePath: '../../node_modules/tesseract.js-core/tesseract-core.wasm.js',
});


const recognizeText = (img:string) => {
    (async () => {
        await worker.load();
        await worker.loadLanguage('ben');
        await worker.initialize('ben');
        const { data: { text } } = await worker.recognize(img);
        console.log(text);
        await worker.terminate();
      })();
}

export default recognizeText;