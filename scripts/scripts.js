//1° passo: identificar o carregamento da página
document.addEventListener("DOMContentLoaded", () => {
    const cards = [
        {
            image: 'image/assets/barbara.png',
            name: 'barbara',
        },
        {
            image: 'image/assets/beto.png',
            name: 'beto',
        },
        {
            image: 'image/assets/carlos.png',
            name: 'carlos',
        },
        {
            image: 'image/assets/gabi.png',
            name: 'gabi',
        },
        {
            image: 'image/assets/laura.png',
            name: 'laura',
        },
        {
            image: 'image/assets/marcos.png',
            name: 'marcos',
        },
        {
            image: 'image/assets/matheus.png',
            name: 'matheus',
        },
        {
            image: 'image/assets/ricardo.png',
            name: 'ricardo',
        },
        {
            image: 'image/assets/rony.png',
            name: 'rony',
        },
        {
            image: 'image/assets/suzane.png',
            name: 'suzane',
        },
        {
            image: 'image/assets/gustavo.jpeg',
            name: 'gustavo',
        },
        {
            image: 'image/assets/barbara.png',
            name: 'barbara',
        },
        {
            image: 'image/assets/beto.png',
            name: 'beto',
        },
        {
            image: 'image/assets/carlos.png',
            name: 'carlos',
        },
        {
            image: 'image/assets/gabi.png',
            name: 'gabi',
        },
        {
            image: 'image/assets/laura.png',
            name: 'laura',
        },
        {
            image: 'image/assets/marcos.png',
            name: 'marcos',
        },
        {
            image: 'image/assets/matheus.png',
            name: 'matheus',
        },
        {
            image: 'image/assets/ricardo.png',
            name: 'ricardo',
        },
        {
            image: 'image/assets/rony.png',
            name: 'rony',
        },
        {
            image: 'image/assets/suzane.png',
            name: 'suzane',
        },
        {
            image: 'image/assets/gustavo.jpeg',
            name: 'gustavo',
        }
        
    ]

    //embaralhar todas as cartas
    cards.sort(() => 0.5 - Math.random());

    //carregar elementos html no script
    const board = document.querySelector('.board');
    const resultView = document.querySelector('#result');
    const somaErro = document.querySelector('#contagemErro');

    let cardsChosen = [] //cartas escolhidas
    let cardsChoseniD = []; //ID DAS CARTAS escolhidas
    let cardWon = []; //cartas combinadas
    let erros = 0;
    let lockBoard = false;

    //criar quadro de cartas
    function createBoard() {
        for (let i = 0; i < cards.length; i++) {
            resultView.textContent = 'Pares encontrados: 0';
            somaErro.textContent = 'Tentativas: 0';
            const card = document.createElement('img'); //aqui estou criando o elemento img no meu html <img>
            card.setAttribute('src', 'image/assets/back.png'); // aqui estou colocando atributo no meu img criado acima <img src="image/assets/back.png">
            card.setAttribute('data-id', i); // <img src="image/assets/back.png" data-id=i/>
            card.setAttribute('class', 'imgcard')
            card.addEventListener('click', flipCard);
            board.appendChild(card); //<concatenando o board com a carta para aparecer no html.
        }
    }

    //checagem de combinações
    function checkForMatch() {

        const cardsImg = document.querySelectorAll('.board img'); //selecione todas as imagens do board
        const optionOneId = cardsChoseniD[0];// pegue a primeira carta
        const optionTwoId = cardsChoseniD[1];//pegue a segunda carta

        if (optionOneId === optionTwoId) {
            cardsImg[optionOneId].setAttribute('src', 'image/assets/back.png'); //se o usuario clicar duas vezes na mesma imagem
            alert('Você clicou na mesma imagem');
        }
        else if (cardsChosen[0] === cardsChosen[1]) {
            cardsImg[optionOneId].removeEventListener('click', flipCard);
            cardsImg[optionTwoId].removeEventListener('click', flipCard);
            cardWon.push(cardsChosen);
        }
        else {
            cardsImg[optionOneId].setAttribute('src', 'image/assets/back.png');
            cardsImg[optionTwoId].setAttribute('src', 'image/assets/back.png');
            erros++;
        }

        cardsChosen = [];
        cardsChoseniD = [];
        lockBoard = false;

        somaErro.textContent = 'Tentativas: ' + erros;
        resultView.textContent = 'Pares encontrados: ' + cardWon.length
        const totalPares = cards.length / 2;

        if (cardWon.length === totalPares) {
            const modal = document.getElementById("modal-vitoria")
            modal.style.display = 'block';
            modal.classList.add('conteudo-vitoria');
            modal.innerHTML = `<h1>🎉 Parabéns! Você encontrou todos os pares!</h1>`;
        }
    }

    function flipCard() {
        if (lockBoard) return;

        let cardId = this.getAttribute('data-id'); //pega o meu atributo da carta que passei com o evento de click
        cardsChosen.push(cards[cardId].name); //adiciona a carta para o array de
        cardsChoseniD.push(cardId);
        this.setAttribute('src', cards[cardId].image);

        if (cardsChosen.length === 2) {
            lockBoard = true;
            setTimeout(checkForMatch, 500)
        }
    }
    const overlay = document.getElementById("loading-overlay");

    function mostrarLoading() {
        overlay.classList.add("active");
    }

    function esconderLoading() {
        overlay.classList.remove("active");
    }

    function resetarJogo() {
        mostrarLoading();

        setTimeout(() => {

            cardsChosen = [];
            cardsChoseniD = [];
            cardWon = [];
            erros = '';
            lockBoard = false;

            somaErro.textContent = 'Tentativas: 0';
            resultView.textContent = 'Pares encontrados: 0';

            const modal = document.getElementById("modal-vitoria")
            modal.style.display = 'none';
            modal.classList.remove('conteudo-vitoria');
            modal.innerHTML = '';

            board.innerHTML = "";
            cards.sort(() => 0.5 - Math.random());
            createBoard();

            esconderLoading();
        }, 400); // tempo do fade
    }

    const btnReset = document.getElementById("resetarJogo");
    btnReset.addEventListener('click', resetarJogo);

    createBoard()


})

