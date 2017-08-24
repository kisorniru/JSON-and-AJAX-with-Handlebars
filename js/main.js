var ourRequest  = new XMLHttpRequest();
ourRequest.open('GET', 'https://kisorniru.github.io/json-example/pets-data.json');

ourRequest.onload = function() {
	if (ourRequest.status >= 200 && ourRequest.status < 400) {
		var ourData = JSON.parse(ourRequest.responseText);
		createHTML(ourData);
	} else {
		console.log("We connected to the server, but it returned an error.");
	}
};

ourRequest.onerror = function() {
	console.log("Connection Error.");
};

ourRequest.send();

Handlebars.registerHelper("calculateAge", function(bornYear){
	var age = new Date().getFullYear() - bornYear;
	if (age > 0) {
		return age + " years old.";
	} else {
		return "Less than a years old.";
	}
});

function createHTML(petsData) {
	var rawTemplate = document.getElementById("petsTemplate").innerHTML;
	// console.log(rawTemplate);
	
	var compiledTemplate = Handlebars.compile(rawTemplate);
	// console.log(compiledTemplate);

	var ourGeneratedHTML = compiledTemplate(petsData);
	// console.log(ourGeneratedHTML);

	var petsContainer = document.getElementById("pets-container");
	petsContainer.innerHTML = ourGeneratedHTML;
}