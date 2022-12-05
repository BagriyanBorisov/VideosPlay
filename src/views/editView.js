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
        let {title, category, maxLevel, imageUrl, summary} = Object.fromEntries(formData);

        if(!title || !category || !maxLevel || !imageUrl | !summary){
            return alert('All fields are required!')
        }

        await updateGame(id,{title, category, maxLevel, imageUrl, summary});
        e.target.reset();
        ctx.page.redirect('/catalog/'+id);
    }


}

function editTemplate(item,onSubmit){
    return html `<section id="edit-page" class="auth">
        <form  @submit="${onSubmit}" id="edit">
            <div class="container">

                <h1>Edit Game</h1>
                <label for="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" .value="${item.title}">

                <label for="category">Category:</label>
                <input type="text" id="category" name="category" .value="${item.category}">

                <label for="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" .value="${item.maxLevel}">

                <label for="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" .value="${item.imageUrl}">

                <label for="summary">Summary:</label>
                <textarea name="summary" id="summary">${item.summary}</textarea>
                <input class="btn submit" type="submit" value="Edit Game">
            </div>
        </form>
    </section>`
}