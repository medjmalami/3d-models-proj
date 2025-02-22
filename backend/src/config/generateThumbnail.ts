import { createCanvas } from "canvas";
import { WebGLRenderer, Scene, PerspectiveCamera, DirectionalLight, Box3, Vector3, Object3D, Group } from "three";
import { promises as fs } from "fs";
import path from "path";
import gl from "gl"; // Import headless-gl for WebGL support
import { load } from "@loaders.gl/core";
import { GLTFLoader } from "@loaders.gl/gltf";

// Explicitly type the model scene to handle it as a generic Object3D or Group
export async function generateThumbnail(inputFile: string, filename: string) {
    const width = 512, height = 512;

    // Define output directory
    const outputDir = path.join(__dirname, "../public/uploads/thumbnails/");
    await fs.mkdir(outputDir, { recursive: true }); // Ensure directory exists

    const outputFile = path.join(outputDir, filename + ".png");

    // Create a headless WebGL context
    const webglContext = gl(width, height, { preserveDrawingBuffer: true });

    if (!webglContext) {
        throw new Error("Failed to create WebGL context.");
    }

    // Set up Three.js scene
    const scene = new Scene();
    const camera = new PerspectiveCamera(45, width / height, 0.1, 100);
    const light = new DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    // WebGL renderer
    const renderer = new WebGLRenderer({ context: webglContext });
    renderer.setSize(width, height);

    // Load the 3D model using @loaders.gl/gltf
    const model = await load(inputFile, GLTFLoader);

    // Ensure model is valid and contains a scene property
    if (!model || !Array.isArray(model) || !model[0] || !model[0].scene) {
        throw new Error("Failed to load the 3D model.");
    }

    // Add model to the scene, ensuring the scene property is an Object3D
    const root = model[0].scene as Object3D;
    scene.add(root);

    // Compute bounding box for dynamic camera positioning
    const bbox = new Box3().setFromObject(root);
    const center = new Vector3();
    bbox.getCenter(center);

    const size = new Vector3();
    bbox.getSize(size);

    // Adjust camera distance based on model size
    const maxDim = Math.max(size.x, size.y, size.z);
    const distance = maxDim * 2.5;
    camera.position.set(center.x + distance, center.y + distance, center.z + distance);
    camera.lookAt(center);

    // Render the scene
    renderer.render(scene, camera);

    // Read pixels from WebGL context
    const buffer = new Uint8Array(width * height * 4);
    webglContext.readPixels(0, 0, width, height, webglContext.RGBA, webglContext.UNSIGNED_BYTE, buffer);

    // Convert buffer to PNG
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(width, height);

    // Flip the image vertically
    for (let y = 0; y < height; y++) {
        const row = buffer.slice(y * width * 4, (y + 1) * width * 4);
        imageData.data.set(row, (height - 1 - y) * width * 4);
    }

    ctx.putImageData(imageData, 0, 0);

    // Save as PNG
    await fs.writeFile(outputFile, canvas.toBuffer("image/png"));
    console.log(`✅ Thumbnail saved to ${outputFile}`);
}
