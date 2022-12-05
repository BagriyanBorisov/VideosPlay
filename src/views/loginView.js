import {html} from '../lib.js'
import {login} from '../user.js'

let context = null;
export async function showLogin(ctx){
    context = ctx;
    ctx.render(loginTemplate(onSubmit));


    async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let {email, password} = Object.fromEntries(formData);

        if(email.length === 0 || password.length === 0){
            return alert('Please fill all required fields.')
        }

        await login(email, password);
        ctx.modulateView();
        ctx.page.redirect('/catalog');
    }
}
function loginTemplate(onSubmit) {
    return  html` <section id="login-page" class="auth">
    <form @submit="${onSubmit}" id="login">

        <div class="container">
            <div class="brand-logo"></div>
            <h1>Login</h1>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

            <label for="login-pass">Password:</label>
            <input type="password" id="login-password" name="password">
            <input type="submit" class="btn submit" value="Login">
            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </div>
    </form>
</section>`
}




