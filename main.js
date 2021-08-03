"use strict";

const area = document.getElementById('area');

let move = 0,
    result = {
        crossVictory: 'Победили крестики!',
        zeroVictory: 'Победили нолики!',
        deadHeat: 'Ничья!'
    },
    final = false;

const modal = document.getElementById('modal-result-wrapper'),
      modalContent = document.getElementById('content'),
      overlay = document.getElementById('overlay'),
      btnClose = document.getElementById('btn-close');

area.addEventListener('click', e => {
    const target = e.target;

    if(target.classList.contains('box')) {
        if(move % 2 === 0) {
            target.innerHTML = 'X';
            actionBlock(target);
        } else {
            target.innerHTML = '0';
            actionBlock(target);
        }

        move++;
        check();
    }
});

const actionBlock = item => {
    item.style.pointerEvents = 'none';
};

const check = () => {
    const boxes = document.querySelectorAll('.box');
    const arr = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    for(let i = 0; i < arr.length; i++) {
        if(boxes[arr[i][0]].innerHTML == 'X' && boxes[arr[i][1]].innerHTML == 'X' && boxes[arr[i][2]].innerHTML == 'X') {
            final = true;
            prepareResult(result.crossVictory);
        } else if(boxes[arr[i][0]].innerHTML == '0' && boxes[arr[i][1]].innerHTML == '0' && boxes[arr[i][2]].innerHTML == '0') {
            final = true;
            prepareResult(result.zeroVictory);
        } else if(move == 9 && final == false) {
            prepareResult(result.deadHeat);
        }
    }
};

const prepareResult = winner => {
    modalContent.innerHTML = winner;
    modal.style.display = 'block';
};

const closeModal = () => {
    modal.style.display = 'none';
    location.reload();
};

overlay.addEventListener('click', closeModal);
btnClose.addEventListener('click', closeModal);
