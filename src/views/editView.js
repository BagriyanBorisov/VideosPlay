import {html} from '../lib.js';
import {getById, updateGame} from "../data.js";

let context = null;
export async function showEdit(ctx) {
    context = ctx;
    let id = ctx.params.id;
    let item = await getById(id);
    ctx.render(editTemplate(item,onSubmit));

    async function onSubmit(e){
        e.preventDefault();

        let formData = new FormData(e.target);
        let {title, category, videoUrl} = Object.fromEntries(formData);

        if(!title || !category || !videoUrl){
            return alert('All fields are required!')
        }

        await updateGame(id,{title, category, videoUrl});
        e.target.reset();
        ctx.page.redirect('/catalog/'+id);
    }


}

function editTemplate(item,onSubmit){
    return html `<section id="edit-page" class="auth">
        <form  @submit="${onSubmit}" id="edit">
            <div class="container">

                <h1>Edit Video</h1>
                <label for="leg-title">Title:</label>
                <input type="text" id="title" name="title" placeholder="Enter video title..." .value="${item.title}">

                <label for="category">Category:</label>
                <input type="text" id="category" name="category" placeholder="Enter category..." .value="${item.category}">

                <label for="game-img">Video Url:</label>
                <input type="text" id="videoUrl" name="videoUrl" placeholder="Upload a photo..." .value="${item.videoUrl}">

                <input class="btn submit" type="submit" value="Update Video">
            </div>
        </form>
    </section>`
}