function applyUpsideDownRotation(canvas, context) {
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(Math.PI);
    context.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
}

function applyAdvancedDistortion(canvas, context) {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    const maxDistortion = 100;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const offsetX = x - centerX;
            const offsetY = y - centerY;
            const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
            const distortionAmount = (maxDistortion - distance) / maxDistortion;

            const sourceX = Math.floor(centerX + offsetX * distortionAmount);
            const sourceY = Math.floor(centerY + offsetY * distortionAmount);

            if (sourceX >= 0 && sourceX < width && sourceY >= 0 && sourceY < height) {
                const sourceIndex = (sourceY * width + sourceX) * 4;
                const targetIndex = (y * width + x) * 4;

                data[targetIndex] = data[sourceIndex]; // R
                data[targetIndex + 1] = data[sourceIndex + 1]; // G
                data[targetIndex + 2] = data[sourceIndex + 2]; // B
            }
        }
    }
    context.putImageData(imageData, 0, 0);
}

function applyRandomDistortion(canvas, context) {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const distortionIntensity = 20;

    for (let i = 0; i < data.length; i += 4) {
        const randomOffsetX = (Math.random() - 0.5) * distortionIntensity;
        const randomOffsetY = (Math.random() - 0.5) * distortionIntensity;

        const sourceX = Math.floor(i / 4) % canvas.width;
        const sourceY = Math.floor(i / 4 / canvas.width);

        const targetX = clamp(sourceX + randomOffsetX, 0, canvas.width - 1);
        const targetY = clamp(sourceY + randomOffsetY, 0, canvas.height - 1);

        const sourceIndex = (sourceY * canvas.width + sourceX) * 4;
        const targetIndex = (targetY * canvas.width + targetX) * 4;

        data[targetIndex] = data[sourceIndex]; // R
        data[targetIndex + 1] = data[sourceIndex + 1]; // G
        data[targetIndex + 2] = data[sourceIndex + 2]; // B
    }

    context.putImageData(imageData, 0, 0);
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function applyBlackAndWhiteEffect(canvas, context) {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const average = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const value = average < 128 ? 0 : 255;

        data[i] = value; // R
        data[i + 1] = value; // G
        data[i + 2] = value; // B
    }

    context.putImageData(imageData, 0, 0);
}