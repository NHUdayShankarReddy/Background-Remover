const imageUpload = document.getElementById('imageUpload');
const removeBackgroundBtn = document.getElementById("removeBackgroundBtn");
const loader = document.getElementById('loader');
const outputCanvas = document.getElementById('outputCanvas')

const API_KEY = 'ouwi2VQxxPUuDS4KNMtyCwdN';

//50 credits per month


imageUpload.addEventListener('change', () => {
    if (imageUpload.files.length > 0) {
        removeBackgroundBtn.removeAttribute('disabled');
    } else {
        removeBackgroundBtn.setAttribute('disabled')
    }
})

removeBackgroundBtn.addEventListener('click', () => {
    const file = imageUpload.files[0];
    const formData = new FormData();
    formData.append('image_file', file);

    loader.style.display = 'block';

    fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
            'X-Api-Key': API_KEY
        },
        body: formData
    })


        .then(response => response.blob())
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);
            const image = new Image();
            image.src = imageUrl;
            image.onload = () => {
                const { width, height } = image;
                outputCanvas.width = width;
                outputCanvas.height = height;
                const ctx = outputCanvas.getContext('2d');
                ctx.drawImage(image, 0, 0);
                URL.revokeObjectURL(imageUrl);
                loader.style.display = 'none';
                outputCanvas.style.display = 'block';
            };
        })
        .catch(error => {
            console.error(error);
            alert('An Issue Has been occured try after some time')
            loader.style.display = 'none';
        })


})