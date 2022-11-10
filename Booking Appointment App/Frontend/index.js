function savetoBackend(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.emailId.value
    const phoneNumber=event.target.phoneNumber.value;

    const obj = { name:name, email:email ,phoneNumber:phoneNumber}
    axios.post("http://localhost:7000/user/add-user",obj)
        .then((response) => {
            showNewUserOnScreen(response.data)
            console.log(response)
        })
        .catch((err) => {
            console.log(err)
        })



}
function showNewUserOnScreen(response) {

    document.getElementById('text').value = " ";
    document.getElementById('email').value = " ";
    document.getElementById('phonenumber').value="";
    // console.log(response.data);

    const parentNode = document.getElementById('listOfUsers');
    const childHTML = `<li id="${response.id}"> ${response.name} - ${response.email}  - ${response.phoneNumber}
     <button onclick=deleteUser("${response.id}")> Delete</button>
     <button onclick=editUserDetails('${response.name}','${response.email}','${response.phoneNumber}',"${response.id}")>Edit</button>
     
 </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

window.addEventListener('DOMContentLoaded', () => {
    axios.get("http://localhost:7000/user")
        .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
                showNewUserOnScreen(response.data[i])
            }
        })
        .catch((err) => console.log(err));
})

function editUserDetails(name,emailId,phoneNumber,responseId){
    //console.log(name);

    document.getElementById("text").value = name;

    document.getElementById("email").value = emailId;

    ocument.getElementById('phonenumber').value=phoneNumber;


    deleteUser(responseId)
}



function deleteUser(responseId) {
    console.log(responseId)
    const url='http://localhost:7000/user/delete-user/'+responseId;
    axios.post(url)
        .then((response) => {
            removeUserFromScreen(responseId);
            console.log(response)

        })
        .catch((err) => console.log(err));


}

function removeUserFromScreen(responseId) {
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(responseId);
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}