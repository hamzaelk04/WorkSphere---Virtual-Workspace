function addNewWorker() {
    const form = document.forms.namedItem('addAworker');
    formdata(form)

    let workerListe = getDataFromLocalStorage('worker')
    let card = document.getElementById('cardsParent')

    card.innerHTML = ""
    workerListe.forEach(element => {
        
        
        card.innerHTML += `
                <div class="card">
                    <div class="imgUser">
                        <img src="userIcon/${element.photo.split("\\", -1)[2]}" class="imgUser" alt="">
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

function saveInLocalStorage(key, value) {
    let data = getDataFromLocalStorage("worker")

    if (data == null || data == undefined) {
        data = []
    }

    data.push(value)

    localStorage.setItem(key, JSON.stringify(data))
}

function getDataFromLocalStorage(key) {
    let data = localStorage.getItem(key)

    return JSON.parse(data)
}


addNewWorker()


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

function modal() {
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

    let dataListe = []
    let data = {}




}

modal()