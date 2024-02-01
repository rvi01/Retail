console.log("JS: client side javascript file is loaded");

const addUser = document.querySelector("#add");
const add_first_name = document.querySelector("#first_name");
const add_last_name = document.querySelector("#last_name");
const add_email = document.querySelector("#email");
const add_phone_number = document.querySelector("#phone_number");
const add_password = document.querySelector("#password");

addUser.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("here")
    const first_name  = add_first_name.value;
    const last_name  = add_last_name.value;
    const email  = add_email.value;
    const phone_number  = add_phone_number.value;
    const password  = add_password.value;

    const add_data = {
        first_name : first_name,
        last_name : last_name,
        email : email,
        phone_number : phone_number,
        password : password
   };

    try {
    const response = await fetch('/users/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(add_data)
    });
    console.log("response ==>1st",response)
    if (response.ok) {
        console.log("response ==>",response)
        Swal.fire({
            title: "Data Saved!",
            text: "data saved successfully!",
            icon: "success"
          });
    } else {
        console.error('Failed to submit data');
        // Handle errors, display an error message to the user, etc.
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
    }
    } catch (error) {
    console.error('Error:', error);
    // Handle network errors or other issues
    }
})

