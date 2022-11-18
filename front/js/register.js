const host = "http://localhost:4000";




// const register = async (e) => {
//     const nameInput = document.querySelector("#inputName").value
//     const lastInput = document.querySelector("#inputLastName").value
//     const email = document.querySelector("#inputemail").value
//     const password = document.querySelector("#inputpassaword").value
//     const button = document.querySelector("#btn2").value

//     const response = await fetch("http://localhost:4000/register", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             name: nameInput.value,
//             lastname: lastInput.value,
//             email: email.value,
//             createPassword: password.value
//         }),
//     });
//     const res = await response.json();

//     if (res.isRegistered) {
//         console.log("otabek");
//         window.location.replace("/kirish");
//     }
//     console.log("rocket ~ file: assign.js ~ line 18 ~ signUp ~ response", res);
// };
async function loginRender() {
    const nameInput = document.querySelector("#inputName").value
    const lastInput = document.querySelector("#inputLastName").value
    const email = document.querySelector("#inputemail").value
    const password = document.querySelector("#inputpassaword").value
    const button = document.querySelector("#btn2").value

    button.addEventListener("click", async () => {
        let newUser = {
            name: nameInput.value,
            lastname: lastInput.value,
            email: email.value,
            createPassword: password.value
        };
        let result = await fetch(host + "/register", {
            method: "POST",
            headers: {
                "Content-Type": "applacation/json",
            },
            body: JSON.stringify(newUser, null, 2),
        })
        result = await result.json();
        if (result.data.id) {
            window.localStorage.setItem("email", result.data.id + "");
            window.location = "/home";
        }
        console.log(result);
    })

}

loginRender()