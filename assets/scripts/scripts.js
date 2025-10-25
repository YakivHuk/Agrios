const burgerButton = document.getElementById('burgerButton')
const navPanel = document.getElementById('navPanel')

const exploreTabsButton = document.getElementById('exploreTabsButton')
const newsTabsButton = document.getElementById('newsTabsButton')
const contactsTabsButton = document.getElementById('contactsTabsButton')

const explore = document.getElementById('explore')
const news = document.getElementById('news')
const contact = document.getElementById('contact')

const navBar = document.getElementById('navBar')

const progressBar = document.getElementById('progressBar')

const blocks = document.querySelectorAll(".animate-on-scroll");

let count = 0;

burgerButton.addEventListener('click', () => {
    count++
    burgerButton.classList.toggle('close-burger-button')
    navPanel.classList.toggle('burger-closing-animation')
    if (count%2 == 0) {
        setTimeout(() => navPanel.classList.toggle('d-none'), 500)
    } else { 
        navPanel.classList.toggle('d-none')
        setTimeout(() => navPanel.classList.toggle('burger-opening-animation'), 500)
        navPanel.classList.toggle('burger-opening-animation')
    }
})

exploreTabsButton.addEventListener('click', () => {
    explore.classList.toggle('d-none')
    exploreTabsButton.classList.toggle('tab-button-open')
})

newsTabsButton.addEventListener('click', () => {
    news.classList.toggle('d-none')
    newsTabsButton.classList.toggle('tab-button-open')
})

contactsTabsButton.addEventListener('click', () => {
    contact.classList.toggle('d-none')
    contactsTabsButton.classList.toggle('tab-button-open')
})

window.addEventListener('scroll', () => {
    if(window.scrollY > 100) {
        navBar.classList.add('scrolled')
    } else navBar.classList.remove('scrolled')
})

window.addEventListener('scroll', () => {
    const scrolledThrough = window.scrollY
    const heightPage = document.body.scrollHeight - window.innerHeight
    const percent = (scrolledThrough / heightPage) * 100
    progressBar.style.width = percent + "%"
})