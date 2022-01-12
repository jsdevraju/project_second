const access_key = 'D6GVL6ykNHf5e5E7lI1DUic09zT5xuEZ9zqWROZSrys';
const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=30`;
const gallery =  document.querySelector('.gallery');

//track image index
let current = 0;

//store all data images
let allImages;
const getImages =  async () =>{
    const getData = await fetch(random_photo_url);
    const data = await getData.json();
    allImages = data;
    makeImages(data)
}

getImages();

const makeImages = (data) =>{
    data.forEach((item, index) =>{
        let img = document.createElement('img');
        img.src = item.urls.regular;
        img.className = 'gallery-img';
        gallery.appendChild(img)

        img.addEventListener('click', () =>{
            current = index;
            showPop(item)
        })
    })
}

const showPop = (item) =>{
    const image_popup =  document.querySelector('.image_popup');
    const closebtn = document.querySelector('.close_btn');
    const downloadBtn = document.querySelector('.down_btn');
    const images =  document.querySelector('.large_img');

    image_popup.classList.add('show');
    downloadBtn.href = item.links.html;
    images.src = item.urls.regular;

    closebtn.addEventListener('click', ()=>{
        image_popup.classList.remove('show')
    })
}

//Next Prev Functionality

const prvBtn =  document.querySelector('.pre-btn');
const nextBtn = document.querySelector('.next-btn');

prvBtn.addEventListener('click', () =>{
    if(current > 0){
        current--;
        console.log(allImages);
        showPop(allImages[current])
    }
})

nextBtn.addEventListener('click', () =>{
    if(current < allImages.length -1){
        current++;
        showPop(allImages[current])
    }
})

//Search Functionality
let searchParam =  location.search.split('=').pop();
const search_photo_url = `https://api.unsplash.com/search/photos?client_id=${access_key}&query=${searchParam}&per_page=50`; 

const searchImages = async () =>{
    const getImg = await fetch(search_photo_url);
    const data  = await getImg.json();
    console.log(data);
    allImages = data.results;
    makeImages(allImages)
}

if(searchParam == ''){
    getImages()
}else{
    searchImages();
}

  