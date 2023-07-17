let myBookmarks = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const bookmarksFromLocalStorage = JSON.parse(localStorage.getItem("myBookmarks"))
const tabBtn = document.getElementById("tab-btn")

const tabs = [
    { url: window.url, title: window.title }
]

// GET BOOKMARKS FROM THE LOCAL STORAGE AND RENDER THEM
if (bookmarksFromLocalStorage) {
    myBookmarks = bookmarksFromLocalStorage
    render(myBookmarks)
}

// SAVE CURRENT TAB TO THE BOOKMARKS
tabBtn.addEventListener("click", function () {
    if (typeof chrome !== "undefined" && typeof chrome.runtime !== "undefined") {
        // Code is running in a Chrome extension
        console.log("Running inside a Chrome extension!");
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            myBookmarks.push(tabs[0].url)
            localStorage.setItem("myBookmarks", JSON.stringify(myBookmarks))
            render(myBookmarks)
        })
    } else {
        // Code is running in a regular web page
        console.log("Not running inside a Chrome extension.");
        myBookmarks.push(window.location.href)
        localStorage.setItem("myBookmarks", JSON.stringify(myBookmarks))
        render(myBookmarks)
    }
})

// RENDER BOOKMARKS
function render(link) {
    let listItems = ""
    for (let i = 0; i < link.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${link[i]}'>
                    ${link[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

// DELETE ALL BOOKMARKS
deleteBtn.addEventListener("click", function () {
    const result = confirm("Are you sure you want to delete all bookmarks?")
    if (result) {
        localStorage.clear()
        myBookmarks = []
    }
    render(myBookmarks)
})

// ADD BOOKMARKS TO THE LOCAL STORAGE AND RENDER THEM
inputBtn.addEventListener("click", function () {
    myBookmarks.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myBookmarks", JSON.stringify(myBookmarks))
    render(myBookmarks)
})