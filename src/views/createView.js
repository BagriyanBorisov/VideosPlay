import {html} from '../lib.js'
import {createGame} from "../data.js";

let context = null;
export async function showCreate(ctx) {
    context = ctx;
    ctx.render(createTemplate(onSubmit));


    async function onSubmit(e){
        e.preventDefault();

        let formData = new FormData(e.target);
        let {title, category,videoUrl} = Object.fromEntries(formData);

        if(!title || !category  || !videoUrl){
            return alert('All fields are required!')
        }

        await createGame({title, category, videoUrl});
        e.target.reset();
        ctx.page.redirect('/catalog');
    }

}

function createTemplate(onSubmit){
    return html `<section id="create-page" class="auth">
        <form @submit=${onSubmit} id="create">
            <div class="container">
                <h1>Upload Video</h1>
                <label for="leg-title">Title:</label>
                <input type="text" id="title" name="title" placeholder="Enter video title...">

                <label for="category">Category:</label>
                <input type="text" id="category" name="category" placeholder="Enter category...">
                
                <label for="game-img">Video Url:</label>
                <input type="text" id="videoUrl" name="videoUrl" placeholder="Upload a videoUrl...">
                
                <input class="btn submit" type="submit" value="Upload Video">
            </div>
        </form>
    </section>`
}