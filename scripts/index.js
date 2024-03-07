const categoryBtns = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json();
    const categoryBtnContainer = document.getElementById("category-btn-container")
    data.data.forEach(buttons => {
        const btn = document.createElement("button");
        btn.classList = `btn px-6 hover:bg-red-600 hover:text-white`
        btn.innerText = `${buttons.category}`
        btn.addEventListener("click", () => findId(buttons.category_id))
        categoryBtnContainer.appendChild(btn);
    });
    const findId =(id)=>{
        videoCards(id);
    }
}
categoryBtns();

const videoCards = async(id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json();
    const videoCardsContainer = document.getElementById("video-cards-container")
    videoCardsContainer.innerHTML = ""
    data.data.forEach(videoCard => {
        const div = document.createElement("div") 
        div.classList = `card card-compact bg-base-100 shadow-xl`
        div.innerHTML = `
        <figure class="p-1 "><img class="rounded-xl h-44 w-full object-cover" src="${videoCard.thumbnail}" alt="Shoes" /></figure>
                <div class="card-body ">
                  <div class="flex">
                    <!-- * profile picture -->
                    <div class="rounded-full w-20">
                        <img class="w-12 h-12 rounded-full object-cover" src="${videoCard.authors[0].profile_picture}" alt="">
                    </div>
                    <!-- * all text -->
                    <div>
                        <h1 class="text-[1rem] font-bold leading-6">${videoCard.title}</h1>
                        <div id="peragraf" class="flex  items-center gap-3 mt-2">
                            <h6 class="text-sm opacity-70">${videoCard.authors[0].profile_name}</h6>
                            <p id= verified class="hidden" ><span class="material-symbols-outlined text-blue-600">
                            verified
                            </span></p>
                        </div>
                        <p class="opacity-70 font-semibold mt-3"> ${videoCard.others.views} views</p>
                    </div>
                  </div>
                </div>
        `
        videoCardsContainer.appendChild(div);
    });
}
videoCards(1000);