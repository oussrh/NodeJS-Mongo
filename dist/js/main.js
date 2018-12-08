let tbody = document.querySelector('tbody');
let url = 'http://localhost:8080/user';

const getStudentList = async () => {
    let reponse = await fetch(url,
        {
            method: "GET",        
            
        })
    .catch(error => console.warn(error));
    reponse = await reponse.json();
    showStudentList(reponse)
}

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
        editBt.innerHTML= `<i class="icon icon-edit"></i>`;
        editBt.id = x._id;

        delBt.classList = "btn btn-primary btn-action btn-lg";
        delBt.innerHTML= `<i class="icon icon-delete"></i>`;
        delBt.id = x._id;
        
        delBt.addEventListener('click', deleteStudent);
        editBt.addEventListener('click', editStudent);

        tr.appendChild(tdName);
        tr.appendChild(tdPrenom);
        tr.appendChild(tdEdit);
        tdEdit.appendChild(editBt);
        tdEdit.appendChild(delBt);

        tbody.appendChild(tr);
    });
}

getStudentList();

let deleteStudent = async (e) =>{
    let id = e.currentTarget.id;
    let reponse = await fetch(`http://localhost:8080/user/${id}`, {
        method: 'DELETE',
        headers: {'Content-type':'application/json'}
    })
    .catch(error => console.warn(error));

    getStudentList();
}

let editStudent = async (e) =>{
    alert(e.currentTarget.id)
}