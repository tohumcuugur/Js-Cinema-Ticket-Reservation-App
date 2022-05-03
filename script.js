const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculateTotal();

container.addEventListener('click', function (e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        //We created a click event in the container. When clicking anywhere, we reach it with e.target and then filt it.We filted it with only have 'seat' class .And we removed those with have 'reserved' class.
        e.target.classList.toggle('selected'); //İf 'selected' class is exist toggle is deleting it.İf 'selected' class is not exist toggle adds 'selected' class.Thats how toggle works.
        calculateTotal();
    }
});

select.addEventListener('change', function (e) {
    calculateTotal();
});
//***************İMPORTANT****************We need array for map() method.We cant use map() on NodeList.With map() method we can search informations ,value's in array.  
function calculateTotal() {
    const selectedSeats = container.querySelectorAll('.seat.selected');

    const selectedSeatsArr = [];
    const seatsArr = [];

    selectedSeats.forEach(function (seat) {
        selectedSeatsArr.push(seat); //***************İMPORTANT**************** In moder java script we can do it with SPREAD method.
    });
    seats.forEach(function (seat) { 
        seatsArr.push(seat)
    });

    let selectedSeatIndexs = selectedSeatsArr.map(function (seat) {
        return seatsArr.indexOf(seat);
    });

    let selectedSeatCount = selectedSeats.length
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;

    saveToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function (seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }
}

function saveToLocalStorage(indexs) {
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex); //********************İMPORTANT********************selectedIndex is dom property. like select.value. select.value giving the value in that moment so select.selectIndex give the index in that moment.
}