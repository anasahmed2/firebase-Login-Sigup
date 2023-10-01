import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,

} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
    getDatabase,
    ref,
    set,
    onValue,
    get,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
   
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth()
let signupBtn = document.getElementById("signupBtn")
let goSignup = document.getElementById("goSignup")
let goLogin = document.getElementById("gologin")
let signUpPage = document.getElementById("signUpPage")
let loginPage = document.getElementById("loginPage")
let sipner = document.getElementById("sipner")
let mainContainer = document.getElementById("main-container")

goSignup.addEventListener("click", () => {
    signUpPage.style.display = "block"
    loginPage.style.display = "none"
})
goLogin.addEventListener("click", () => {
    signUpPage.style.display = "none"
    loginPage.style.display = "block"
})


signupBtn.addEventListener("click", () => {
    let signupName = document.getElementById("signup-username")
    let signupEmail = document.getElementById("signup-Email")
    let signupPassword = document.getElementById("Signup-password")
    sipner.style.display = "block";
    mainContainer.style.display = "none";
    createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
        .then((userCredential) => {

            sipner.style.display = "none";
            mainContainer.style.display = "block";
            const user = userCredential.user;

            console.log("user", user)

            set(ref(db, `users/${user.uid}`), {

                email: signupEmail.value,
                password: signupPassword.value,
                displayName: signupName.value,
            })
            signupEmail.value = "";
            signupPassword.value = "";
            signupName.value = "";

        })
        .catch((error) => {
            sipner.style.display = "none";
            mainContainer.style.display = "block";
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(`user err ===>${errorMessage}`)
            swal.fire({
                icon: 'error',
                title: `${errorMessage}`,
                text: 'Please enable your location',
                button: "OK"
            })
            signupEmail.value = "";
            signupPassword.value = "";
            signupName.value = "";
        });


})

let loginBtn = document.getElementById("loginBtn")

loginBtn.addEventListener("click", () => {
    let loginEmail = document.getElementById("login-Email")
    let loginPassword = document.getElementById("login-password")
    sipner.style.display = "block";
    mainContainer.style.display = "none";
    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
        .then((userCredential) => {
    
            const user = userCredential.user;
            onValue(ref(db, `users/${user.uid}`),
                data => {
                    console.log(data.val())
                    location.href="welcome.html"
                    sipner.style.display = "none";
                    mainContainer.style.display = "block";
                }
            )

            loginEmail.value = "";
            loginPassword.value = "";

        })
        .catch((error) => {
            sipner.style.display = "none";
            mainContainer.style.display = "block";
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(`user===>${errorMessage}`)

            loginEmail.value = "";
            loginPassword.value = "";


        });

})





















 // get(ref(db, `users/${user.uid}`))
            //     .then((snapshot) => {
            //         if (snapshot.exists()) {
            //             console.log(snapshot.val());
            //         } else {
            //             console.log("No data available");
            //         }
            //     }).catch((error) => {
            //         console.error(error);
            //     });