////let post = document.getElementById("post"), count = 0;

////fetch("https://jsonplaceholder.typicode.com/albums/2/photos")
////    .then((data) => data.json())
////    .then((photos) => {
////        photos.forEach((photo) => {
////            //Limit the photos for now
////            if (count < 8) {
////                count++;

////                let imgElement = document.createElement("img");
////                imgElement.src = photo.url;

////                let divElement = document.createElement("div");
////                divElement.setAttribute("class", "photo");
////                divElement.setAttribute("id", "p" + count);
////                divElement.setAttribute("style", "opacity:1");
////                divElement.appendChild(document.createTextNode(photo.title));
////                divElement.appendChild(imgElement);

////                divElement.onclick = (() => {
////                    let fadeout = setInterval(() => {
////                        divElement.style.opacity -= 0.01;
////                        if (divElement.style.opacity <= 0) {
////                            clearInterval(fadeout);
////                            post.removeChild(divElement);
////                            count--;
////                            updateCount();
////                        }
////                    })
////                })
////                post.appendChild(divElement);
////            }
////            updateCount();
////        })
////    })

////function updateCount() {
////    document.getElementById("count").innerHTML = count;
////}

let flashEle = document.getElementById('flashmessage');
if (flashEle) {
    setTimeout(() => {
        let opacity = 1.0;
        let timer = setInterval(() => {
            if (opacity <= 0) {
                clearInterval(timer);
                flashEle.remove();
            }
            opacity -= 0.05;
            flashEle.style.opacity = opacity;
        }, 50);
    }, 2000)
}