function previewImage() {
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    const file = imageInput.files[0];

    const reader = new FileReader();
    reader.onload = function (e) {
        imagePreview.style.backgroundImage = `url(${e.target.result})`;
    }
    reader.readAsDataURL(file);
}

async function uploadImage() {
    const imageInput = document.getElementById('imageInput');
    const resultDiv = document.getElementById('result');

    if (imageInput.files.length === 0) {
        resultDiv.innerHTML = "Please upload an image first.";
        return;
    }

    const file = imageInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
        resultDiv.innerHTML = "Processing...";
        const response = await fetch('YOUR_BACKEND_API_URL_HERE', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        resultDiv.innerHTML = `Diagnosis: ${result.condition} <br> Confidence: ${result.confidence}%`;
    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = "An error occurred while processing the image.";
    }
}
