
document.addEventListener("DOMContentLoaded", (event) => {
	var generateTableBody = document.querySelector('#generateNumbersTable tbody');
	var number = 0;
	var bodyInnerHtml = '';
	for(var row = 0; row < 5; row++){
		var rowHtml = '<tr>';
		for(var col = 0; col < 15; col++){
			number++;
               rowHtml += '<td class="cell_' + number + '">' + number + '<\/td>';
		}
		rowHtml += '<\/tr>';
		bodyInnerHtml += rowHtml;
	}
	generateTableBody.innerHTML = bodyInnerHtml;
	
	//generate btn
	var bingoGenerator = new Bingo();
	var generateNumberBtn = document.querySelector('#generateNumberBtn');
    generateNumberBtn.addEventListener('click', (event) => {
        var random = bingoGenerator.generateNextRandom().toString();
        var numberContainer = document.querySelector('#generatedNumber');
        numberContainer.innerHTML = random;
        var tdWithNumber = generateTableBody.querySelector('td.cell_' + random);
        tdWithNumber.classList.add('selected-number');
    });

    // reset btn
    var resetTableBtn = document.querySelector('#resetGenerateNumberTable');
    resetTableBtn.addEventListener('click', (event) => {
        bingoGenerator = new Bingo();
        var selectedNumbers = generateTableBody.querySelectorAll('td.selected-number');
        selectedNumbers.forEach((cell) => {
            cell.classList.remove('selected-number');
        });
        var numberContainer = document.querySelector('#generatedNumber');
        numberContainer.innerHTML = '0';
    });
		
});
	
class Bingo {
    selectedNumbers = [];
    generateRandom() {
        var min = 1;
        var max = 75;
        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        return random;
    }
    generateNextRandom() {
        if (this.selectedNumbers.length > 74) {
            alert("All numbers Exhausted");
            return 0;
        }
        var random = this.generateRandom();
        while (this.selectedNumbers.includes(random)) {
            random = this.generateRandom();
        }
        this.selectedNumbers.push(random);
        return random;
    }
}