function addNewWorker() {
    formdata()


}

addNewWorker()

function formdata() {
    const form = document.forms.namedItem('addAworker');

    let worker = {}

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        worker.name = form.elements["firstName"].value
        worker.photo = form.elements["photo"].value
        worker.phoneNumber = form.elements["phoneNumber"].value
        worker.email = form.elements["email"].value
        worker.role = form.elements["role"].value
        worker.experience = form.elements["experience"].value

        saveInLocalStorage("worker", worker)
    })
}

function saveInLocalStorage(key, value) {
    let data = getDataFromLocalStorage("worker") || []

    data.push(value)

    localStorage.setItem(key, JSON.stringify(data))
}

function getDataFromLocalStorage(key) {
    let data = localStorage.getItem(key)

    return JSON.parse(data)
}