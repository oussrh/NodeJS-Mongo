let tbody = document.querySelector('tbody');
let body = document.querySelector('body');

const getStudentList = async () => {
    let reponse = await fetch('http://localhost:8080/user', {
            method: "GET",
        })
        .catch(error => console.warn(error));
    reponse = await reponse.json();
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    showStudentList(reponse)
}
//******************************************************************
// Show list student
//******************************************************************
const showStudentList = (list) => {
    tbody.innerHTML = "";
    list.map(x => {
        let tr = document.createElement('tr');

        let tdName = document.createElement('td');
        tdName.innerHTML = x.name;

        let tdPrenom = document.createElement('td');
        tdPrenom.innerHTML = x.prenom;

        let tdEdit = document.createElement('td');
        let editBt = document.createElement('button');
        let delBt = document.createElement('button');

        editBt.classList = "btn btn-primary btn-action btn-lg";
        editBt.innerHTML = `<i class="icon icon-edit"></i>`;
        editBt.id = x._id;

        delBt.classList = "btn btn-primary btn-action btn-lg";
        delBt.innerHTML = `<i class="icon icon-delete"></i>`;
        delBt.id = x._id;

        delBt.addEventListener('click', deleteStudent);
        editBt.addEventListener('click', getStudent);

        tr.appendChild(tdName);
        tr.appendChild(tdPrenom);
        tr.appendChild(tdEdit);

        tdEdit.appendChild(editBt);
        tdEdit.appendChild(delBt);

        tbody.appendChild(tr);

    });
}
getStudentList();
//******************************************************************
//Delte student
//******************************************************************
let deleteStudent = async (e) => {
    let id = e.currentTarget.id;
    swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then(async (willDelete) => {
            if (willDelete) {
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
                await fetch(`http://localhost:8080/user/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-type': 'application/json'
                        }
                    })
                    .catch(error => console.warn(error));
                getStudentList();

            } else {
                getStudentList();
            }
        });
}
//******************************************************************
//Edit student
//******************************************************************

//get the current element 
let getStudent = async (e) => {
    let id = e.currentTarget.id;
    let reponse = await fetch(`http://localhost:8080/user/${id}`, {
            method: "GET",
        })
        .catch(error => console.warn(error));
    reponse = await reponse.json();

    id = document.getElementById('editId');
    let inputName = document.getElementById('editName');
    let inputLastN = document.getElementById('editLastN');

    id.value = reponse[0]._id;
    inputName.value = reponse[0].prenom;
    inputLastN.value = reponse[0].name;

    let modal = document.querySelector('#modal-edit');
    modal.className = "modal modal-lg active";
}
//send modification to server
const modifyStudent = async () => {
    let id = document.getElementById('editId').value;
    let inputName = document.getElementById('editName');
    let inputLastN = document.getElementById('editLastN');

    await fetch(`http://localhost:8080/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "name": inputLastN.value,
                "prenom": inputName.value
            })
        })
        .catch(error => console.warn(error));
    swal({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
        button: "Aww yiss!",
    });
    let modal = document.querySelector('#modal-edit');
    modal.className = "modal modal-lg";
    getStudentList();
}
document.querySelector('.modify').addEventListener('click', modifyStudent);
//******************************************************************
//add student
//******************************************************************
let addStudent = async () => {
    let name = document.getElementById('name');
    let lastN = document.getElementById('lastN');
    let reponse = await fetch('http://localhost:8080/user', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "name": name.value,
                "prenom": lastN.value
            })
        })
        .catch(error => console.warn(error));
    swal({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
        button: "Aww yiss!",
    });
    name.value = "";
    lastN.value = "";
    let modal = document.querySelector('#modal-add');
    modal.className = "modal modal-lg";
    getStudentList();
}
document.querySelector('.submit').addEventListener('click', addStudent);
//******************************************************************
//open modal (add)
//******************************************************************
let openModal = () => {
    let modal = document.querySelector('#modal-add');
    modal.className = "modal modal-lg active";
}
document.querySelector('.add').addEventListener('click', openModal);
//******************************************************************
//close modal (add)
//******************************************************************
let closeModal = () => {
    let modal = document.querySelector('#modal-add');
    modal.className = "modal modal-lg";
}
document.querySelector('.btn-clear').addEventListener('click', closeModal);
//******************************************************************
//close modal (edit)
//******************************************************************
let closeEditModal = () => {
    let modal = document.querySelector('#modal-edit');
    modal.className = "modal modal-lg";
}
document.querySelector('.modalEdit').addEventListener('click', closeEditModal);

//******************************************************************
//open modal (about)
//******************************************************************
let openModalAbout = () => {
    let modal = document.querySelector('#modal-about');
    modal.className = "modal active";
}
document.querySelector('.about').addEventListener('click', openModalAbout);
//******************************************************************
//close modal (about)
//******************************************************************
let closeModalAbout = () => {
    let modal = document.querySelector('#modal-about');
    modal.className = "modal";
}
document.querySelector('.closeAbout').addEventListener('click', closeModalAbout);