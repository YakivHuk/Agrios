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

const filterButton = document.getElementById("filterButton");
const sideBar = document.getElementById("sideBar");

if (filterButton && sideBar) {
    filterButton.addEventListener("click", () => {
        sideBar.classList.remove("close-sidebar");
        sideBar.classList.toggle("d-none");
        sideBar.classList.add("open-sidebar");
        const overlay = document.createElement("div")
        overlay.classList.add("overlay");
        document.body.appendChild(overlay);
        setTimeout(() => {sideBar.classList.remove("open-sidebar");}, 300)
        overlay.addEventListener("click", () => {
            sideBar.classList.add("close-sidebar");
            document.body.removeChild(overlay);
            setTimeout(() => {sideBar.classList.toggle("d-none");}, 270)
        })
    });
}

const container = document.getElementById("cards");
if (container) {
    const searchField = document.getElementById("searchField");
    const searchButton = document.getElementById("searchButton");

    const priceRange = document.getElementById("priceRange");
    const rangeMin = document.getElementById("rangeMin");
    const rangeMax = document.getElementById("rangeMax");
    const applyButton = document.getElementById("applyButton");

    const allBtn = document.getElementById("allCategoryButton");
    const vegetablesBtn = document.getElementById("vegetablesCategoryButton");
    const fruitsBtn = document.getElementById("fruitsCategoryButton");
    const bestBtn = document.getElementById("bestCategoryButton");
    const otherBtn = document.getElementById("otherCategoryButton");

    const sortList = document.getElementById("sortList");

    const pageButtons = document.getElementById("pageButtons");
    function drawCards(product) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <div class="image-container">
                <img src="${product.path}" alt="${product.name}">
            </div>
            <p class="name-product">${product.name}</p>\n`;
        let grade = "";
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.round(product.grade)) {
                grade += ` <i class="yellow-star fa-solid fa-star"></i>\n`;
            } else {
                grade += ` <i class="fa-solid fa-star"></i>\n`;
            }
        }
        card.innerHTML += `
            <p class="grage" title="Оцінка ${product.grade} з 5">${grade}</p>
            <p class="price">${product.price} ₴/кг</p>`;
        container.appendChild(card);
    }

    function deleteCards() {
        const products = container.querySelectorAll(".card");
        for (let product of products) {
            container.removeChild(product);
        }
    }

    function createForwardButton(filteredArray, pageNumber, numberOfPages) {
        if (pageNumber < numberOfPages && !document.getElementById("forwardButton")) {
            const forwardButton = document.createElement("button");
            forwardButton.textContent = "›";
            forwardButton.classList.add("page-button");
            forwardButton.setAttribute("id", "forwardButton");
            pageButtons.appendChild(forwardButton);
            forwardButton.addEventListener("click", () => {
                deleteCards();
                const buttons = document.querySelectorAll(".page-button");
                buttons.forEach((button) => {
                    if (+button.textContent == pageNumber + 1) {
                        button.classList.add("page-button-visited");
                    } else {
                        button.classList.remove("page-button-visited");
                    }
                })
                for (let j = pageNumber * 9; j < filteredArray.length && j < pageNumber * 9 + 9; j++) {
                    drawCards(filteredArray[j]);
                    if (pageNumber + 1 == numberOfPages) {
                        pageButtons.removeChild(document.getElementById("forwardButton"));
                    }
                    return pageNumber + 1;
                };
            })
        } else if (pageNumber == numberOfPages && document.getElementById("forwardButton")) {
            pageButtons.removeChild(document.getElementById("forwardButton"));
            return pageNumber;
        }
    }

    function createPageButtons(filteredArray) {
        const buttonsArray = pageButtons.querySelectorAll(".page-button");
        buttonsArray.forEach((button) => {
            pageButtons.removeChild(button);
        });
        let numberOfPages = Math.ceil((filteredArray.length + 1) / 9);
        let pageNumber;
        for (let i = 1; i <= numberOfPages; i++) {
            const button = document.createElement("button");
            button.textContent = i;
            button.classList.add("page-button");
            pageButtons.appendChild(button);
            button.addEventListener("click", () => {
                const buttons = document.querySelectorAll(".page-button");
                buttons.forEach((button) => {
                    button.classList.remove("page-button-visited");
                })
                button.classList.add("page-button-visited");
                deleteCards();
                for (let j = (i - 1) * 9; j < filteredArray.length && j < (i - 1) * 9 + 9; j++) {
                    drawCards(filteredArray[j]);
                    pageNumber = i;
                    pageNumber = createForwardButton(filteredArray, pageNumber, numberOfPages);;  
                };
            });
        }

        
    }
    document.addEventListener("DOMContentLoaded", () => {
    fetch('./assets/data/data.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                drawCards(product);
            });

            let filteredArray = structuredClone(data);

            searchField.addEventListener("keypress", (e) => {
                if (e.key == "Enter") {
                    deleteCards();
                    filteredArray = data.filter(product => product.name == searchField.value)
                    filteredArray.forEach(product => {
                        drawCards(product);
                    });
                }
            });

            searchButton.addEventListener("click", () => {
                deleteCards();
                filteredArray = data.filter(product => product.name == searchField.value)
                filteredArray.forEach(product => {
                    drawCards(product);
                });
            })

            let maxPrice = 0;
            data.forEach((product) => {
                if (product.price > maxPrice) {
                    maxPrice = product.price;
                }
            });
            let minPrice = maxPrice;
            data.forEach((product) => {
                if (product.price < minPrice) {
                    minPrice = product.price;
                }
            });
            
            priceRange.textContent = `${minPrice.toFixed(2)} ₴ - ${maxPrice.toFixed(2)} ₴`;

            let lowestPriceRange = minPrice;
            let highestPriceRange = maxPrice;
            let difference = maxPrice - minPrice;

            rangeMin.addEventListener("input", () => {
                if (+rangeMin.value + 9 >= rangeMax.value) {
                    rangeMin.value = +rangeMax.value - 9;
                }
                lowestPriceRange = minPrice;
                lowestPriceRange += difference * rangeMin.value / 100;
                priceRange.textContent = `${lowestPriceRange.toFixed(2)} ₴ - ${highestPriceRange.toFixed(2)} ₴`;
            });

            rangeMax.addEventListener("input", () => {
                if (+rangeMax.value - 9 <= rangeMin.value) {
                    rangeMax.value = +rangeMin.value + 9;
                }
                highestPriceRange = maxPrice;
                highestPriceRange -= difference * (100 - rangeMax.value) / 100;
                priceRange.textContent = `${lowestPriceRange.toFixed(2)} ₴ - ${highestPriceRange.toFixed(2)} ₴`;
            });

            applyButton.addEventListener("click", () => {
                deleteCards();
                filteredArray = structuredClone(data);
                filteredArray = filteredArray.filter(product => product.price >= lowestPriceRange && product.price <= highestPriceRange);
                filteredArray.forEach(product => {
                    drawCards(product);
                });
                sortList.value = 1;
            })

            allBtn.addEventListener("click", () => {
                deleteCards();
                filteredArray = structuredClone(data);
                data.forEach(product => {
                    drawCards(product);
                });
                createPageButtons(filteredArray);
            });

            vegetablesBtn.addEventListener("click", () => {
                deleteCards();
                filteredArray = data.filter(product => product.category == "Овочі");
                filteredArray.forEach(product => {
                    drawCards(product);
                });
            });

            fruitsBtn.addEventListener("click", () => {
                deleteCards();
                filteredArray = data.filter(product => product.category == "Фрукти");
                filteredArray.forEach(product => {
                    drawCards(product);
                });
            });

            bestBtn.addEventListener("click", () => {
                deleteCards();
                filteredArray = data.filter(product => product.grade >= 4.5);
                filteredArray.forEach(product => {
                    drawCards(product);
                });
            });

            otherBtn.addEventListener("click", () => {
                deleteCards();
                filteredArray = data.filter(product => product.category == "Інше");
                filteredArray.forEach(product => {
                    drawCards(product);
                });
            });
            
            sortList.addEventListener("input", () => {
                deleteCards();
                let sortArray = filteredArray;
                switch (+sortList.value) {
                    case 1:
                        if (filteredArray == [] || filteredArray.length == data.length) {
                            data.forEach(product => {
                                drawCards(product);
                            });
                        } else {
                            filteredArray.forEach(product => {
                                drawCards(product);
                            });
                        }
                        break;
                    case 2:      
                        sortArray.sort((a, b) => a.price - b.price);
                        sortArray.forEach(product => {
                            drawCards(product);
                        });
                        break;
                    case 3:
                        sortArray.sort((a, b) => b.price - a.price);
                        sortArray.forEach(product => {
                            drawCards(product);
                        });
                        break;
                    case 4:
                        sortArray.sort((a, b) => b.grade - a.grade);
                        sortArray.forEach(product => {
                            drawCards(product);
                        });
                }
            });
        })
    });
}