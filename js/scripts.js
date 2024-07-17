function renderImage() {
    var imageUrl = document.getElementById('image-url').value;
    var renderer = document.getElementById('image-renderer');
    renderer.src = imageUrl;
}