import { createWorker } from 'tesseract.js';
import pageimage from "../assets/designs/pageimage.png";

const worker = createWorker({
    workerPath: "../../node_modules/tesseract.js/dist/worker.min.js",
    langPath: "../assets/langdata",
    corePath: "../../node_modules/tesseract.js-core/tesseract-core.wasm.js",
    
});


const recognizeText = (ctx:CanvasRenderingContext2D) => {
    console.log(ctx, "I AM CTX");
    (async () => {
        await worker.load();
        await worker.loadLanguage('ben');
        await worker.initialize('ben');
        const { data: { text } } = await worker.recognize(pageimage);
        console.log(text);
        await worker.terminate();
      })();
}

export default recognizeText;