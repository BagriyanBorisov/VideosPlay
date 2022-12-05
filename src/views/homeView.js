import {html} from '../lib.js'

let context = null;
export async function showHome(ctx) {
    context = ctx;
    ctx.render(homeTemplate());
}

function homeTemplate(){
    return html ` <section id="welcome-world">
        <div class="welcome-message">
            <h2>Welcome to</h2>
            <h3>VideosPlay</h3>
        </div>
        <img src="/images/playLogo.png" alt="hero">
        <div class="data-buttons">
            <a href="/catalog"  class="btn goto-catalogBtn">Go to the catalog</a>
        </div>
    </section>`
}
