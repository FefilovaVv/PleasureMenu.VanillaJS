document.addEventListener("DOMContentLoaded", onPageLoaded);


function onPageLoaded() {
    getPointsFromStorage()
    let targetTitle = document.querySelector('.menu-title');
    const titlesContainer = document.querySelector(".titles-container");
    const pointsList = document.querySelector(".points-list");
    const textReseiver = document.querySelector('.text-reseiver');
    const scoreReseiver = document.querySelector('.score-reseiver');
    const sortBtn = document.querySelector(".sort-btn");
    const allBtn = document.querySelectorAll("button", "h3");

    scoreReseiver.addEventListener('change', showRangeResult);
    sortBtn.addEventListener('click', sortPoint);
    for (let button of allBtn) { button.addEventListener('click', putPointsInStorage) };

    function putPointsInStorage() {
        let pointsListContent = pointsList.innerHTML;
        let titlesContainerContent = titlesContainer.innerHTML;

        localStorage.setItem('pointsListStored', JSON.stringify(pointsListContent));
        localStorage.setItem('titlesContainerStored', JSON.stringify(titlesContainerContent));
        targetTitle.dataset.menuContent = pointsList.innerHTML;
    };

    function activateMenu() {
        targetTitle = event.target;
        const pointsList = document.querySelector(".points-list");
        targetTitle.dataset.menuContent === undefined ? pointsList.innerHTML = '' : pointsList.innerHTML = targetTitle.dataset.menuContent;

        return targetTitle;
    };

    function getPointsFromStorage() {
        const pointsList = document.querySelector(".points-list");
        const pointsListStored = JSON.parse(localStorage.getItem('pointsListStored'));
        const titlesContainer = document.querySelector(".titles-container");
        const titlesContainerStored = JSON.parse(localStorage.getItem('titlesContainerStored'));

        pointsList.innerHTML = pointsListStored;
        titlesContainerStored !== null ? titlesContainer.innerHTML = titlesContainerStored : (titlesContainer.innerHTML =
            `<h3 class="btn-add-title-menu">+</h3>
            <h3 class="menu-title" contenteditable="" data-menu-content="">Меню <button class="point-delete">×</button></h3>`
        );

        const btnAddMenuTitle = document.querySelector('.btn-add-title-menu');
        const addBtn = document.querySelector(".add-btn");
        const allDeleteBtn = document.querySelectorAll('.point-delete');
        const allMenuTitles = document.querySelectorAll('.menu-title');

        for (let button of allDeleteBtn) { button.addEventListener('click', deletePoint); };
        for (let title of allMenuTitles) { title.addEventListener('click', activateMenu) };
        addBtn.addEventListener('click', addPoint);
        btnAddMenuTitle.addEventListener('click', addMenu);
    };

    function showRangeResult() {
        const rangeResult = document.querySelector('.range-result')
        rangeResult.innerText = scoreReseiver.value;
    };

    function addMenu() {
        menuTitle = document.createElement('h3');
        menuTitle.classList.add('menu-title');
        menuTitle.setAttribute('contenteditable', 'true');
        menuTitle.textContent = 'Название';

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("point-delete");
        deleteBtn.setAttribute('contenteditable', 'false');
        deleteBtn.textContent = "×";

        menuTitle.append(deleteBtn);
        titlesContainer.append(menuTitle);

        menuTitle.addEventListener('click', activateMenu);
        deleteBtn.addEventListener('click', deletePoint);
      
        activateMenu.call(document.querySelector('.menu-title:last-child'));
    };


    function addPoint() {
        const pointContainer = document.createElement("li");
        pointContainer.classList.add("point-container");
        const pointText = document.createElement("span");
        pointText.classList.add("point-text");
        const pointScore = document.createElement("span");
        pointScore.classList.add("point-score");
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("point-delete");

        pointText.textContent = textReseiver.value;
        pointScore.textContent = scoreReseiver.value;
        deleteBtn.textContent = "×";

        pointsList.appendChild(pointContainer).append(pointText, pointScore, deleteBtn);
        deleteBtn.addEventListener('click', deletePoint);
    };

    function sortPoint() {
        const allScores = document.querySelectorAll(".point-score");
        const sortedScores = [...allScores].sort(function (a, b) { return a.innerText - b.innerText });
        for (let score of sortedScores) {
            pointsList.appendChild(score.parentNode);
        };
    };

    function deletePoint(event) {
        this.parentNode.remove();
        event.stopPropagation();
    };

    

};
