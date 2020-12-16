import { createWorker } from 'tesseract.js';
import pageimage from "../assets/designs/pageimage.png";

const worker = createWorker({
    logger: (m) => console.log(m),
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