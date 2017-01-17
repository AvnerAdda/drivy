'use strict';

//EXERCICE 1 - Euro-Kilometers

function getRental(id)
{
	for ( var i = 0 ; i < rentals.length ; i++)
	{
		if ( id == rentals[i].id)
		{
			return rentals[i];
		}
	}
	return ;
}

function getDate(id)
{
	// retal date 
	var rtl = getRental(id);
	var returnDate = new Date (rtl.returnDate);
	var pickupDate = new Date(rtl.pickupDate);
	//convert into millisecond
	var time = 1+ (returnDate - pickupDate )/(24*3600*1000) ;
	return time ; 
}

function rtl_time(time,price)
{
	//rental time = time x price
	var rtltimer=time * price;
	//console.log('Rental time ' + rentaltimer);
	return rtltimer;
}

function rtl_distance(distance, price){
	//rental distance = distance x price  
	var rtldistancer=distance*price;
	//console.log('Rental distance ' + rentaldistancer);
	return rtldistancer;
}

//Exercice 1 : Euro-Kilometers
function new_rtl_Price()
{
	for(var i=0; i<rentals.length;i++)
	{
			
		if(rentals[i].carId==cars[i].id)	
		{	
			var time = getDate(rentals[i].id);		
		
			var nrtl_time = rtl_time(time,cars[i].pricePerDay);
			var nrtl_distance=rtl_distance(rentals[i].distance, cars[i].pricePerKm);
			
			//rental price = time + distance
			var rtl_price=nrtl_time + nrtl_distance;
			//Value change
			rentals[i].price= rtl_price;
		}
	}
}

/*
function PricePerConductor(rentals)
{
	var j = 0
	while(j<rentals.length)
	{
		console.log(j);
		var conducerFirstName = rentals[j].driver.firstName;
		console.log(conducerFirstName);
		var beginDate = convertDate(rentals[j].pickupDate);
		console.log(beginDate);
		var returnDate = convertDate(rentals[j].returnDate);
		console.log(returnDate);
		var numberOfDay = getDays(beginDate,returnDate);
		console.log(numberOfDay);
		var carId = rentals[j].carId;
		console.log(carId);
		var priceD = pricePerDay(carId);
		console.log(priceD);
		var priceK = pricePerKm(carId);
		console.log(priceK);
		var distance = rentals[j].distance;
		console.log(distance);
	}
}
*/


function discount(day)
{

}

var rtlCommission = function rtlCommission(price,days)
{
 	//console.log(cars)
 	console.log(rentals);
 	PricePerConductor(rentals);
 	console.log(rentals);
}


//Exercice 2 - Drive more, pay less

function dsct_rentalPrice()
{
		
	for(var i=0; i<rentals.length;i++){ 
	
		var time_day = getDate(rentals[i].id);		
		var rental_dsct;
	
		if(time_day==1)
	{
			rental_dsct = rentals[i].price;
			console.log(rentals[i].driver.firstName + ' ' + rentals[i].driver.lastName + ' ' + '\nRental Price (no discount) : '  + rental_dsct  + ' euros');
		}
	
		else if(time_day>1 && time_day<=4) 
		{ 
			rental_dsct = rentals[i].price*0.90; 
			console.log(rentals[i].driver.firstName + ' ' + rentals[i].driver.lastName + ' ' + '\nRental Price Discount (-10%) : ' + rental_dsct + ' euros'); 
			rentals[i].price= rental_dsct;
		} 
	
		else if(time_day>4 && time_day<=10) {
	
			rental_dsct =rentals[i].price*0.70; 
			console.log(rentals[i].driver.firstName + ' ' + rentals[i].driver.lastName + ' ' + '\nRental Price Discount (-30%) : ' + rental_dsct + ' euros');
			rentals[i].price= rental_dsct;
		}
			
		else if(time_day>10) { 
	
			rental_dsct = rentals[i].price*0.50; 
			console.log(rentals[i].driver.firstName + ' ' + rentals[i].driver.lastName + ' ' + '\nRental Price Discount(-50%) : ' + rental_dsct + ' euros');
			rentals[i].price= rental_dsct;
		} 
	
	}
}

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': 
  {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': 'Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

console.time()
//console.log(cars);
console.log(rentals);
//console.log(actors);
console.log(rentalModifications);
console.group('EXERCICE 1 - Euro-Kilometers')
new_rtl_Price()
for(var i=0; i<rentals.length;i++)
{
	console.log(rentals[i].driver.firstName + ' ' + rentals[i].driver.lastName + ' ' +
	 '\nCar: ' + rentals[i].carId +
	 '\nDistance: '+rentals[i].distance+
	 '\nRental Price : ' + rtl_time(getDate(rentals[i].id),cars[i].pricePerDay) + ' + ' + rtl_distance(rentals[i].distance, cars[i].pricePerKm) + ' = '+ rentals[i].price + ' ' + 'euros');
}
console.log('Price have change !')
console.timeEnd()
console.group('EXERCICE 2 - Drive more, pay less')
dsct_rentalPrice();
console.timeEnd()