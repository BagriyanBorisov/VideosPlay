import {html,nothing} from '../lib.js'
import {getAll} from "../data.js";

let context = null;
export async function showCatalog(ctx) {
    context = ctx;
    let items = await getAll();
    ctx.render(catalogTemplate(items));
}

function catalogTemplate(items){
    return html ` <section id="catalog">
        <div id="home-page">
            <h1>Watch Videos</h1>
            ${items.length 
                    ? Object.values(items).map(cardTemplate)
                    : html `<h6>No videos in the database yet!</h6>`}
           
        </div>
    </section>
    `
}

function cardTemplate(item){
    return html` <div class="game">
        <div class="image-wrap">
            <iframe width="580" height="225" src="${item.videoUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <h3>${item.title}</h3>
<!--        <h6>Uploaded By: </h6>-->
        <div class="data-buttons">
            <a href="/catalog/${item._id}" class="btn details-btn">Details</a>
        </div>
    </div>`
}