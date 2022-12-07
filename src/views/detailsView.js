import {html,nothing} from '../lib.js'
import {createComment, deleteById, getAllComments, getById} from "../data.js";


let context = null;
export async function showDetails(ctx) {
    context = ctx;
    let id = ctx.params.id;
    let item = await getById(id);
    let comments = await getAllComments(id);
    comments = comments.reverse();
    ctx.render(detailsTemplate(item, isUser(),isCreator(),onDelete,comments,onSubmit));

    function isUser(){
        return Boolean(ctx.user)
    }

    function isCreator(){
        if(ctx.user){
            if(ctx.user._id === item._ownerId)
            {
                return true;
            }
        }
        return false;
    }

   async function onDelete(e){
        e.preventDefault();
        if(confirm('Are you sure you want to delete this video?')){
            await deleteById(id);
            ctx.page.redirect('/');
        }
    }

    async function onSubmit(e){
        e.preventDefault();

        let formData = new FormData(e.target);
        let {comment} = Object.fromEntries(formData);

        if(!comment){
            return alert('Cannot send an empty comment!');
        }
        let time =  new Date().toLocaleString("en-US", {timeZone: "Europe/Sofia"})
        await createComment({gameId: id,comment, username: ctx.user.username, time});
        e.target.reset();
        ctx.page.redirect('/catalog/'+ id);
    }

}

function detailsTemplate(item,isUser,isCreator,onDelete,comments,onSubmit){
    return html ` <section id="game-details">
        <h1>${item.title}</h1>
        <div class="info-section">
            <div class="center game-header">
                <p class="type" >Category: ${item.category}</p>
                <iframe class="game-img" src="${item.videoUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
           
            ${isUser && !isCreator
                    ?  html`
                        <div class="buttons">
                         <a  href="javascript:void(0)" class="like-button">Like</a>
                            <h2 class="likes-header">Likes: 0</h2>
                        </div>
                        ` 
                    : nothing}

            <!-- Edit/Delete buttons ( Only for creator of this game )  -->
            ${isCreator ? html` <div class="buttons">
                <a href="/edit/${item._id}" class="button">Edit</a>
                <a  @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
            </div>` : nothing}

            <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
            ${isUser && !isCreator ? html `<article class="create-comment">
                <label>Add new comment:</label>
                <form @submit="${onSubmit}" class="form">
                    <input class="textarea" name="comment"  placeholder="Comment......">
                    <input class="btn comment" type="submit" value="Add Comment">
                </form>
            </article>
            ` : nothing}
            
            <div class="details-comments">
                <h2>Comments:</h2>
                ${comments.length ? html` <ul>
                    <!-- list all comments for current game (If any) -->
                    ${Object.values(comments).map(commentTemplate)}
                </ul>` : html` <p class="no-comment">No comments.</p>`}
                <!-- Display paragraph: If there are no games in the database -->
            </div>

            <!-- Edit/Delete buttons ( Only for creator of this game )  -->
          
           
        </div>
        
       
       
    </section>`
}

function commentTemplate(comment){
  return html ` <li class="comment">
        <p>${comment.time}</p>
        <p>${comment.username}: ${comment.comment} </p>
    </li>`
}