import {html} from '../lib.js'
import {register} from "../user.js";

let context = null;
export async function showRegister(ctx){
    context = ctx;
    ctx.render(registerTemplate(onSubmit));
    async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let {username, email, password} = Object.fromEntries(formData);
        let repeatPassword = e.target.querySelector('#confirm-password').value;

        if(username.length=== 0 || email.length === 0 || password.length === 0 || repeatPassword.length === 0){
            return alert('Please fill all required fields.')
        }
        if(password !== repeatPassword){
            return alert('Passwords dont match');
        }
        await register(username,email, password);
        e.target.reset();
        ctx.modulateView();
        ctx.page.redirect('/catalog')

    }
}
function registerTemplate(onSubmit) {
    return  html`   <section id="register-page" class="content auth">
        <form @submit="${onSubmit}" id="register">
            <div class="container">
                <div class="brand-logo"></div>
                <h1>Register</h1>

                <label for="username">Username:</label>
                <input type="text" id="username" name="username" placeholder="maria12">
                
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="maria@email.com">

                <label for="pass">Password:</label>
                <input type="password" name="password" placeholder="*********" id="register-password">

                <label for="con-pass">Confirm Password:</label>
                <input type="password" name="confirm-password" placeholder="*********" id="confirm-password">

                <input class="btn submit" type="submit" value="Register">

                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </div>
        </form>
    </section>`;
}







