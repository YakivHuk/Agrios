const burgerButton = document.getElementById('burgerButton')
const navPanel = document.getElementById('navPanel')

const headerSearchButton = document.getElementById('headerSearchButton')
const headerPanel = document.querySelector(".header-panel")

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

function drawCard(product, container) {
    const card = document.createElement("div");
    card.classList.add("card");
    let grade = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.round(product.grade)) {
            grade += ` <i class="yellow-star fa-solid fa-star"></i>\n`;
        } else {
            grade += ` <i class="fa-solid fa-star"></i>\n`;
        }
    }
    card.innerHTML = `
        <div class="image-container">
            <img src="${product.path}" alt="${product.name}">
        </div>
        <div class="details">
            <p class="name-product">${product.name}</p>
            <p class="grade" title="Оцінка ${product.grade} з 5">${grade}</p>
            <p class="price">${product.price} ₴/кг</p>
        </div>`;
    container.appendChild(card);
}

function searchProducts() {
    fetch('./assets/data/data.json')
        .then(response => response.json())
        .then(data => {
            if (document.querySelector(".loading")) {
                results.removeChild(document.querySelector(".loading"));
            }
            if (headerSearchField.value.trim() != "") {
                const filteredArray = data.filter(product => product.name.toLowerCase().trim().startsWith(headerSearchField.value.trim().toLowerCase()));
                if (filteredArray.length == 0) {
                    if (document.getElementById("noProducts")) results.removeChild(document.getElementById("noProducts"));
                    const noProducts = document.createElement("div");
                    noProducts.setAttribute("id", "noProducts");
                    noProducts.classList.add("no-products");
                    noProducts.innerHTML = `
                    <p>
                        <i class="fa-solid fa-ban"></i>
                    </p>
                    <p>
                        Жодного товару не знайдено!
                    </p>`;
                    results.appendChild(noProducts);
                } else {
                    const noProducts = document.getElementById("noProducts");
                    if (noProducts) results.removeChild(noProducts);
                    for (let product of filteredArray) {
                        drawCard(product, results)
                    }
                }
            }
        })
}

const debouncedSearch = debounce(searchProducts, 1000);

headerSearchButton.addEventListener('click', () => {
    const existing = document.getElementById("searchMenu");
    if (document.getElementById("searchMenu")) {
        searchMenu.classList.add('search-menu-closing-animation');
        setTimeout(() => {
            if (headerPanel.contains(existing)) {
                headerPanel.removeChild(searchMenu);
            }
        }, 500)
    } else {
        const searchMenu = document.createElement("div");
        searchMenu.setAttribute("id", "searchMenu")
        searchMenu.innerHTML = `
            <input id="headerSearchField" type="text" placeholder="Щось шукаєте?">
            <div id="results" class="results"></div>
        `;
        searchMenu.classList.add("search-menu");
        searchMenu.classList.add("search-menu-opening-animation")
        headerPanel.appendChild(searchMenu);
        setTimeout(() => searchMenu.classList.remove("search-menu-opening-animation"), 500);
        const headerSearchField = document.getElementById("headerSearchField");
        const results = document.getElementById("results")

        headerSearchField.addEventListener("input", () => {
        const products = results.querySelectorAll(".card");
        for (let product of products) {
            results.removeChild(product);
        };

        isNoProductsElement = document.getElementById("noProducts");
        if (isNoProductsElement) results.removeChild(isNoProductsElement);

        isLoadingElement = document.querySelector(".loading");
        if (isLoadingElement) results.removeChild(isLoadingElement);
        const loading = document.createElement("div");
        loading.classList.add("loading");
        results.appendChild(loading)
        debouncedSearch();
        })
    }
});

function debounce(func, ms) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), ms);
    };
}

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

    const counter = document.getElementById("counter")

    const sortList = document.getElementById("sortList");

    const pageButtons = document.getElementById("pageButtons");

    function printCards(products, container) {
        if (products.length == 0) {
            if (document.getElementById("noProducts")) container.removeChild(document.getElementById("noProducts"));
            const noProducts = document.createElement("div");
            noProducts.setAttribute("id", "noProducts");
            noProducts.classList.add("no-products");
            noProducts.innerHTML = `
            <p>
                <i class="fa-solid fa-ban"></i>
            </p>
            <p>
                Жодного товару не знайдено!
            </p>`;
            container.appendChild(noProducts);
            return;
        } else {
            const noProducts = document.getElementById("noProducts");
            if (noProducts) container.removeChild(noProducts);
        }

        if (window.matchMedia("(min-width: 1025px)").matches) {
            for (let i = 0; i < 9 && i < products.length; i++) {
                drawCard(products[i], container);
            };
            counter.textContent = "Показано 1-" + (9 < products.length ? 9 : products.length) + " з " + products.length + " результатів";
        }
        else if (window.matchMedia("(min-width: 769px)").matches) {
            for (let i = 0; i < 8 && i < products.length; i++) {
                drawCard(products[i], container);
            };
            counter.textContent = "Показано 1-" + (8 < products.length ? 8 : products.length) + " з " + products.length + " результатів";
        }
        else if (window.matchMedia("(max-width: 768px)").matches) {
            for (let i = 0; i < 6 && i < products.length; i++) {
                drawCard(products[i], container);
            };
            counter.textContent = "Показано 1-" + (6 < products.length ? 6 : products.length) + " з " + products.length + " результатів";
        }
    }

    function deleteCards() {
        const products = container.querySelectorAll(".card");
        for (let product of products) {
            container.removeChild(product);
        }
    }

    let pageNumber = 1;
    let numberOfCards;

    function createBackButton(filteredArray, numberOfPages) {
        if (pageNumber > 1 && !document.getElementById("backButton")) {
            const backButton = document.createElement("button");
            backButton.textContent = "‹";
            backButton.classList.add("page-button");
            backButton.setAttribute("id", "backButton");
            pageButtons.prepend(backButton);
            backButton.addEventListener("click", () => {
                deleteCards();
                const buttons = document.querySelectorAll(".page-button");
                buttons.forEach((button) => {
                    if (+button.textContent == pageNumber - 1) {
                        button.classList.add("page-button-visited");
                    } else {
                        button.classList.remove("page-button-visited");
                    }
                })
                let count = 0;
                for (let j = (pageNumber - 2) * numberOfCards; j < filteredArray.length && j < (pageNumber - 1) * numberOfCards; j++) {
                    drawCard(filteredArray[j], container);
                    count++;
                };
                counter.textContent = "Показано 1-" + count + " з " + filteredArray.length + " результатів";
                if (pageNumber == 2) {
                    pageButtons.removeChild(document.getElementById("backButton"));
                }
                pageNumber -= 1;
                createForwardButton(filteredArray, numberOfPages);
            })
        } else if (pageNumber == 1 && document.getElementById("backButton")) {
            pageButtons.removeChild(document.getElementById("backButton"));
        }
    }

    function createForwardButton(filteredArray, numberOfPages) {
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
                let count = 0;
                for (let j = pageNumber * numberOfCards; j < filteredArray.length && j < pageNumber * numberOfCards + numberOfCards; j++) {
                    drawCard(filteredArray[j], container);
                    count++;
                };
                counter.textContent = "Показано 1-" + count + " з " + filteredArray.length + " результатів";
                if (pageNumber + 1 == numberOfPages) {
                    pageButtons.removeChild(document.getElementById("forwardButton"));
                }
                pageNumber += 1;
                createBackButton(filteredArray, numberOfPages);
            })
        } else if (pageNumber == numberOfPages && document.getElementById("forwardButton")) {
            pageButtons.removeChild(document.getElementById("forwardButton"));
        }
    }

    function createPageButtons(filteredArray) {
        const buttonsArray = pageButtons.querySelectorAll(".page-button");
        buttonsArray.forEach((button) => {
            pageButtons.removeChild(button);
        });
        let numberOfPages = Math.ceil((filteredArray.length + 1) / numberOfCards);
        for (let i = 1; i <= numberOfPages; i++) {
            const button = document.createElement("button");
            button.textContent = i;
            button.classList.add("page-button");
            if (i == 1) {
                button.classList.add("page-button-visited");
            }
            pageButtons.appendChild(button);
            button.addEventListener("click", () => {
                const buttons = document.querySelectorAll(".page-button");
                buttons.forEach((button) => {
                    button.classList.remove("page-button-visited");
                })
                button.classList.add("page-button-visited");
                deleteCards();
                let count = 0;
                for (let j = (i - 1) * numberOfCards; j < filteredArray.length && j < (i - 1) * numberOfCards + numberOfCards; j++) {
                    drawCard(filteredArray[j], container);
                    pageNumber = i;
                    createForwardButton(filteredArray, numberOfPages); 
                    createBackButton(filteredArray, numberOfPages);
                    count++;
                };
                counter.textContent = "Показано 1-" + count + " з " + filteredArray.length + " результатів";
            });
        }
        createForwardButton(filteredArray, numberOfPages);
    }
    document.addEventListener("DOMContentLoaded", () => {
    fetch('./assets/data/data.json')
        .then(response => response.json())
        .then(data => {
            printCards(data, container);
            if (window.innerWidth > 1025) {
                numberOfCards = 9;
            }
            else if (window.innerWidth > 769) {
                numberOfCards = 8;
            }
            else if (window.innerWidth <= 769) {
                numberOfCards = 6;
            }

            let filteredArray = structuredClone(data);
            createPageButtons(filteredArray);

            searchField.addEventListener("keypress", (e) => {
                if (e.key == "Enter") {
                    deleteCards();
                    filteredArray = data.filter(product => product.name.toLowerCase().trim().startsWith(searchField.value.toLowerCase().trim()));
                    printCards(filteredArray, container);
                    createPageButtons(filteredArray);
                    rangeMin.value = 0;
                    rangeMax.value = 100;
                    priceRange.textContent = `${minPrice.toFixed(2)} ₴ - ${maxPrice.toFixed(2)} ₴`;
                    sortList.value = 1;
                }
            });

            searchButton.addEventListener("click", () => {
                deleteCards();
                filteredArray = data.filter(product => product.name.toLowerCase().trim().startsWith(searchField.value.toLowerCase().trim()));
                printCards(filteredArray, container);
                rangeMin.value = 0;
                rangeMax.value = 100;
                priceRange.textContent = `${minPrice.toFixed(2)} ₴ - ${maxPrice.toFixed(2)} ₴`;
                createPageButtons(filteredArray);
                sortList.value = 1;
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
                let newArray = filteredArray.filter(product => product.price >= lowestPriceRange && product.price <= highestPriceRange);
                printCards(newArray, container);
                pageNumber = 1;
                createPageButtons(newArray);
            })

            allBtn.addEventListener("click", () => {
                deleteCards();
                filteredArray = structuredClone(data);
                printCards(data, container);
                searchField.value = null;
                rangeMin.value = 0;
                rangeMax.value = 100;
                priceRange.textContent = `${minPrice.toFixed(2)} ₴ - ${maxPrice.toFixed(2)} ₴`;
                pageNumber = 1;
                createPageButtons(filteredArray);
                sortList.value = 1;
            });

            vegetablesBtn.addEventListener("click", () => {
                deleteCards();
                filteredArray = structuredClone(data);
                filteredArray = filteredArray.filter(product => product.category == "Овочі");
                printCards(filteredArray, container);
                searchField.value = null;
                rangeMin.value = 0;
                rangeMax.value = 100;
                priceRange.textContent = `${minPrice.toFixed(2)} ₴ - ${maxPrice.toFixed(2)} ₴`;
                pageNumber = 1;
                createPageButtons(filteredArray);
                sortList.value = 1;
            });

            fruitsBtn.addEventListener("click", () => {
                deleteCards();
                filteredArray = structuredClone(data);
                filteredArray = filteredArray.filter(product => product.category == "Фрукти");
                printCards(filteredArray, container);
                searchField.value = null;
                rangeMin.value = 0;
                rangeMax.value = 100;
                priceRange.textContent = `${minPrice.toFixed(2)} ₴ - ${maxPrice.toFixed(2)} ₴`;
                pageNumber = 1;
                createPageButtons(filteredArray);
                sortList.value = 1;
            });

            bestBtn.addEventListener("click", () => {
                deleteCards();
                filteredArray = structuredClone(data);
                filteredArray = filteredArray.filter(product => product.grade >= 4.5);
                printCards(filteredArray, container);
                searchField.value = null;
                rangeMin.value = 0;
                rangeMax.value = 100;
                priceRange.textContent = `${minPrice.toFixed(2)} ₴ - ${maxPrice.toFixed(2)} ₴`;
                pageNumber = 1;
                createPageButtons(filteredArray);
                sortList.value = 1;
            });

            otherBtn.addEventListener("click", () => {
                deleteCards();
                filteredArray = structuredClone(data);
                filteredArray = filteredArray.filter(product => product.category == "Інше");
                printCards(filteredArray, container);
                searchField.value = null;
                rangeMin.value = 0;
                rangeMax.value = 100;
                priceRange.textContent = `${minPrice.toFixed(2)} ₴ - ${maxPrice.toFixed(2)} ₴`;
                pageNumber = 1;
                createPageButtons(filteredArray);
                sortList.value = 1;
            });
            
            sortList.addEventListener("input", () => {
                deleteCards();
                let sortArray = filteredArray;
                switch (+sortList.value) {
                    case 1:
                        if (filteredArray == [] || filteredArray.length == data.length) {
                            printCards(data, container);
                            pageNumber = 1;
                            createPageButtons(data);
                        } else {
                            printCards(filteredArray, container);
                            pageNumber = 1;
                            createPageButtons(filteredArray);
                        }
                        break;
                    case 2:      
                        sortArray.sort((a, b) => a.price - b.price);
                        printCards(sortArray, container);
                        pageNumber = 1;
                        createPageButtons(filteredArray, container);
                        break;
                    case 3:
                        sortArray.sort((a, b) => b.price - a.price);
                        printCards(sortArray, container);
                        pageNumber = 1;
                        createPageButtons(filteredArray, container);
                        break;
                    case 4:
                        sortArray.sort((a, b) => b.grade - a.grade);
                        printCards(sortArray, container);
                        pageNumber = 1;
                        createPageButtons(filteredArray);
                }
            });
        })
    });
}