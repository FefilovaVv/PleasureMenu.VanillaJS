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
    
    textReseiver.addEventListener('keydown', ()=>{
      event.key==='Enter'?addPoint():null;
    })
    scoreReseiver.addEventListener('input', showRangeResult);
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
        targetTitle = this;
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
            `<h3 class="btn-add-title">+</h3><div class="a-title-container">
            <h3 class="menu-title first" contenteditable="" data-menu-content="">Меню</h3><button class="point-delete">×</button>
</div>`
        );

        const btnAddMenuTitle = document.querySelector('.btn-add-title');
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
        const aTitleContainer = document.createElement('div')
        aTitleContainer.classList.add('a-title-container');

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("point-delete");
        deleteBtn.setAttribute('contenteditable', 'false');
        deleteBtn.textContent = "×";
        
        aTitleContainer.append(menuTitle, deleteBtn);
        titlesContainer.append(aTitleContainer);

        menuTitle.addEventListener('click', activateMenu);
        deleteBtn.addEventListener('click', deletePoint);
      
        activateMenu.call(document.querySelector('.a-title-container:last-child .menu-title'));

    };


    function addPoint() {
        const allMenuTitles = document.querySelectorAll('.menu-title');if( allMenuTitles.length>0){
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
        textReseiver.value ="";
        

        pointsList.appendChild(pointContainer).append(pointText, pointScore, deleteBtn);
        deleteBtn.addEventListener('click', deletePoint);
        };
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
        const allMenuTitles = document.querySelectorAll('.menu-title');
        allMenuTitles.length===0?pointsList.innerHTML=`<h2 class ="tip-for-creating-menu">Сначала тыкни на +, чтобы создать меню</h2>`: null;

    };
};
