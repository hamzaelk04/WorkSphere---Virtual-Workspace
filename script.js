function addNewWorker() {
    const form = document.forms.namedItem('addAworker');
    formdata(form)

    let workerListe = getDataFromLocalStorage('worker')
    let card = document.getElementById('cardsParent')

    card.innerHTML = ""
    if (workerListe != null) {
        workerListe.forEach(element => {
        card.innerHTML += `
                <div class="card">
                    <div class="imgUser">
                        <img src="userIcon/${element.photo.split("\\")[2]}" class="imgUser" alt="">
                    </div>
                    <div class="infoUserInCard">
                        <p class="nameUser" style="font-weight: bold;">${element.name}</p>
                        <p class="roleUserInCard">${element.role}</p>
                    </div>
                    <div class="editButton">
                        <button class="edit btn btn-warning">
                            Edit
                        </button>
                    </div>
                </div>`
    });
    }
}
addNewWorker()

function formdata(form) {
    form.addEventListener('submit', () => {
        let worker = {}

        worker.name = form.elements["firstName"].value
        worker.photo = form.elements["photo"].value
        worker.phoneNumber = form.elements["phoneNumber"].value
        worker.email = form.elements["email"].value
        worker.role = form.elements["role"].value
        // worker.experience = form.elements["experience"].value

        saveInLocalStorage("worker", worker)
    })
}

function filterWorekrsInEachAreaByRole(role, role2, role3, role4, role5) {
    let workerListe = getDataFromLocalStorage('worker')

    let card = document.getElementById('modalWorkers')

    card.innerHTML = ""
    workerListe.forEach(element => {
        if (element.role == role || element.role == role2 || element.role == role3 || element.role == role4 || element.role == role5) {
            card.innerHTML += `
                <div class="cardOnModal card">
                    <div class="imgUser">
                        <img src="userIcon/${element.photo.split("\\")[2]}" class="imgUser" alt="">
                    </div>
                    <div class="infoUserInCard">
                        <p class="nameUserOnModal nameUser" style="font-weight: bold;">${element.name}</p>
                        <p class="roleUserInCardOnModal roleUserInCard">${element.role}</p>
                    </div>
                    <div class="addOnAreaButton">
                        <button data="${element.name}" class="addOnArea btn btn-success">
                            Add
                        </button>
                    </div>
                </div>`
        }

    });
}

function showWorkersByRoleInEachArea() {
    const conferenceBtn = document.getElementById('conferenceBtn')
    const serverBtn = document.getElementById('serverBtn')
    const securityBtn = document.getElementById('securityBtn')
    const receptionBtn = document.getElementById('recerptionBtn')
    const staffBtn = document.getElementById('staffBtn')
    const vaultBtn = document.getElementById('vaultBtn')


    conferenceBtn.addEventListener('click', function () {
        filterWorekrsInEachAreaByRole('Réceptionniste', 'Manager', 'Nettoyage', 'Agents de sécurité', 'Technicien IT')
    })

    serverBtn.addEventListener('click', function () {
        filterWorekrsInEachAreaByRole('Manager', 'Technicien IT', 'Nettoyage')
    })

    securityBtn.addEventListener('click', function () {
        filterWorekrsInEachAreaByRole('Manager', 'Nettoyage', 'Agents de sécurité')
    })

    receptionBtn.addEventListener('click', function () {
        filterWorekrsInEachAreaByRole('Réceptionniste', 'Manager', 'Nettoyage')
    })

    staffBtn.addEventListener('click', function () {
        filterWorekrsInEachAreaByRole('Réceptionniste', 'Manager', 'Nettoyage', 'Agents de sécurité', 'Technicien IT')
    })

    vaultBtn.addEventListener('click', function () {
        filterWorekrsInEachAreaByRole('Manager', 'Agents de sécurité', 'Technicien IT')
    })
}
showWorkersByRoleInEachArea()

let selectedRoom = null;
function roomClicked() {
    let btnRoom = document.querySelectorAll('.addWorkerToRoom')
    btnRoom.forEach(element => {
        element.addEventListener('click', () => {
            selectedRoom = Number(element.getAttribute('zone'))
        })
    });

}
roomClicked()

function keyLocalStorageForEachRoom() {
    let key = ""
    let rooms = ['conferenceRoom', 'serverRoom', 'securityRoom', 'recerptionRoom', 'staffRoom', 'vaultRoom']
    switch (selectedRoom) {
        case 1:
            key = rooms[0]
            return key
        case 2:
            key = rooms[1]
            return key;
        case 3:
            key = rooms[2]
            return key;
        case 4:
            key = rooms[3]
            return key;
        case 5:
            key = rooms[4]
            return key;
        case 6:
            key = rooms[5]
            return key;
        default:
            break;
    }

}
////////////////////////////////////////////////////////////////////////////////////////////
function allRooms() {
    let workerListe = getDataFromLocalStorage('worker')
    let btn = document.querySelectorAll('.addOnArea')

    btn.forEach(element => {
        let nameValue = element.getAttribute('data')
        element.addEventListener('click', () => {
            
            workerListe.forEach((worker, index) => {
                if (worker.name == nameValue) {
                    let value = workerListe.splice(index, 1)[0]
                    const key = keyLocalStorageForEachRoom();
                    console.log(workerListe);
                    
                    saveInLocalStorage(key, value)
                    saveTheNewLocalStorageForWorkers('worker', workerListe)
                }
            });
        addNewWorker()
        showWorkersByRoleInEachArea()
        })
    });
}

const modal2 = document.getElementById('exampleModal2')
modal2.addEventListener('shown.bs.modal', function () {
    allRooms()
})

// functions to save in local storage
function saveTheNewLocalStorageForWorkers(key, value) {
    let data = getDataFromLocalStorage(key) || []
    data = value
    localStorage.setItem(key, JSON.stringify(data))
}

function saveInLocalStorage(key, value) {
    let data = getDataFromLocalStorage(key) || []

    data.push(value)

    localStorage.setItem(key, JSON.stringify(data))
}

function getDataFromLocalStorage(key) {
    let data = localStorage.getItem(key)

    return JSON.parse(data)
}



















// functions for dynamic input
function dynamicInput() {
    let btn = document.getElementById('addExperiences')

    btn.addEventListener('click', addExperience)
}

function addExperience() {
    let divParent = document.getElementById('newExperience')
    let compteur = 0

    divParent.innerHTML += `
                        <div class="eachExperience">
                           <input type="text" class="form-control experiencePost" name="experiencesPost${compteur}"
                               placeholder="Post">
                           <input type="text" class="form-control experienceCompany" name="experiencesCompany${compteur}"
                               placeholder="Company">
                           <button type="button" class="btn btn-danger removeExperience"><i class="fa-solid fa-minus"></i></button>
                       </div>`

    compteur++
}

function modalForm() {
    const modal = document.getElementById('exampleModal')
    modal.addEventListener('shown.bs.modal', function () {
        dynamicInput()
    })

    removeExperience()
}

function removeExperience() {
    const remove = document.getElementById('newExperience')
    remove.addEventListener('click', function (e) {
        if (e.target.closest('.removeExperience')) {
            e.target.closest('.eachExperience').remove();
        }
    });

}

function saveDataInput(form) {


}

modalForm()