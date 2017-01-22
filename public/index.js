'use strict';

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
	var returnDate = new Date(rtl.returnDate);
	var pickupDate = new Date(rtl.pickupDate);
	//convert into millisecond
	var time = 1+ (returnDate - pickupDate )/(24*3600*1000) ;
	return time ; 
}

function rtl_time(time,price)
{
	//rental time = time x price
	var rtltimer=time * price;
	return rtltimer;
}

function rtl_distance(distance, price)
{
	//rental distance = distance x price  
	var rtldistance=distance*price;
	return rtldistance;
}

//Exercice 1 : Euro-Kilometers 
function new_rtl_Price()
{
	for(var i=0; i<rentals.length;i++)
	{
		if(rentals[i].carId==cars[i].id)	
		{	
			var time = getDate(rentals[i].id);		
			//time component: the number of rental days multiplied by the car's price per day
			var nrtl_time = rtl_time(time,cars[i].pricePerDay);
			var nrtl_distance=rtl_distance(rentals[i].distance, cars[i].pricePerKm);
			//distance component: the number of kilometers multiplied by the car's price per km
			//rental price = time + distance
			var rtl_price=nrtl_time + nrtl_distance;
			//Value change
			rentals[i].price= rtl_price;
		}
	}
}

function new_rtl_Price_prompt()
{
	for(var i=0; i<rentals.length;i++)
	{
	console.log(rentals[i].driver.firstName + ' ' + rentals[i].driver.lastName + ' ' +
	 '\nCar: ' + rentals[i].carId +
	 '\nDistance: '+rentals[i].distance+
	 '\nRental Price : ' + rtl_time(getDate(rentals[i].id),cars[i].pricePerDay) + ' + ' + rtl_distance(rentals[i].distance, cars[i].pricePerKm) + ' = '+ rentals[i].price + ' ' + 'euros');
	}
}

//Exercice 2 - Drive more, pay less

function dsct_rentalPrice()
{
	for(var i=0; i<rentals.length;i++){ 
		var time_day = getDate(rentals[i].id);		
		var rental_dsct;
		//price per day decreases by 10% after 1 day
		if(time_day==1)
		{
			rental_dsct = rentals[i].price;
			console.log(rentals[i].driver.firstName + ' ' + rentals[i].driver.lastName + ' ' + '\nRental Price (no discount) : '  + rental_dsct  + ' euros');
		}
		//price per day decreases by 30% after 4 days
		else if(time_day>1 && time_day<=4) 
		{ 
			rental_dsct = rentals[i].price*0.90; 
			console.log(rentals[i].driver.firstName + ' ' + rentals[i].driver.lastName + ' ' + '\nRental Price Discount (-10%) : ' + rental_dsct + ' euros'); 
			rentals[i].price= rental_dsct;
		} 
		//price per day decreases by 50% after 10 days
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

//Exercice 3 - Give me all your money

function comm()
{
	for(var i=0; i<rentals.length;i++)
	{
		var time_day = getDate(rentals[i].id);	
		//Drivy take a 30% commission on the rental price to cover their costs.
		var comm = rentals[i].price * 0.70;
		console.log('Commission: ' + rentals[i].driver.firstName + ' ' + rentals[i].driver.lastName + ' course is ' + comm + '.');
		//insurance: half of commission
		var insur = comm / 2;
		console.log('Insurrance: ' + rentals[i].driver.firstName + ' ' + rentals[i].driver.lastName + ' course is ' + comm + '.');
		rentals[i].commission.insurance = insur;
		//roadside assistance 1€ per day
		var roadAssist = time_day * 1;
		console.log('Road assistance: ' + rentals[i].driver.firstName + ' ' + rentals[i].driver.lastName + ' course is ' + roadAssist + '.');
		rentals[i].commission.assistance = roadAssist;
		//drivy: the rest
		var total =comm - insur - roadAssist;
		console.log('Drivy: ' + rentals[i].driver.firstName + ' ' + rentals[i].driver.lastName + ' course is ' + total + '.');
		rentals[i].commission.drivy = total;
	}		
}

// Exercice 4 - The famous deductible

function opt_deduct()
{
	for(var i=0; i<rentals.length;i++)
	{
		//In case of an accident, drivy applies a 800€ euros deductible.
		//The driver can reduce the deductible amount from 800€ to 150€ with a deductible option for a few more euros per day.
		var time_day = getDate(rentals[i].id);	
		//The driver is charged an additional 4€/day when he chooses the deductible reduction option.		
		var optDeduct=4*time_day;
		var rtl_price_deduitopt;
		//If deductible reduction 
		if(rentals[i].options.deductibleReduction==true)
		{
			rtl_price_deduitopt = rentals[i].price + optDeduct;
			console.log(rentals[i].driver.firstName + ' ' + rentals[i].driver.lastName + '\nRental price (deduit option) : ' + rtl_price_deduitopt);
			rentals[i].price=rtl_price_deduitopt;
		}
		//else 
		else
		{
			rtl_price_deduitopt=rentals[i].price;
			console.log(rentals[i].driver.firstName + ' ' + rentals[i].driver.lastName + '\nRental price (without deduit option) : ' + rtl_price_deduitopt);
		}
	}
}

//Exercise 5 - Pay the actors

function payactors()
{
	for ( var i = 0 ; i < actors.length ; i++)
	{
	var p = 0;
	var comm = 0;
	var insur = 0;
	var assist = 0 ;
	var deductReduct = true ; 
	var day = getDate(actors[i].rentalId);
	
		for ( var j = 0 ; j < rentals.length ; j++)
		{
			if (actors[i].rentalId == rentals[j].id ) 
			{
				p = rentals[j].price;
				var comm = rentals[j].price * 0.70;
				var insur = comm / 2;
				var roadAssist = day * 1;
				var drivy = comm - insur - roadAssist;	
				
				for (var k = 0 ; k < actors[i].payment.length; k++)
				{
					switch(actors[i].payment[k].who)
					{
						case 'driver' : 
						//the driver must pay the rental price and the (optional) deductible reduction
						actors[i].payment[k].amount=p;
						console.log(' Driver Amount : ' + actors[i].payment[k].amount);
						break;

						case 'owner' :
						//the owner receives the rental price minus the commission
						actors[i].payment[k].amount=p-comm;
						console.log(' Owner Amount : ' + actors[i].payment[k].amount);
						break;
				
						case 'insurance' :
						//the insurance receives its part of the commission
						actors[i].payment[k].amount=insur;
						console.log(' Insurance Amount : ' + actors[i].payment[k].amount);
						break;
				
						case 'assistance' :
						//the assistance receives its part of the commission
						actors[i].payment[k].amount=roadAssist;
						console.log(' Assistance Amount : ' + actors[i].payment[k].amount);
						break;
				
						case 'drivy' :
						//drivy receives its part of the commission, plus the deductible reduction
						//If reduction 
						if(rentals[i].options.deductibleReduction==true)
						{
							var deduct=4*day;
							actors[i].payment[k].amount=drivy + deduct;
							console.log(' Drivy Amount : ' + actors[i].payment[k].amount);
 							break;
 						}
 						//else
 	 					else {
 							var deduct=0;
 							actors[i].payment[k].amount=drivy + deduct;
 							console.log(' Drivy Amount : ' + actors[i].payment[k].amount);
 						break;
 						}
 					}			
 				}			
 			}
 		}
 	}
}

//Exercise 6 - Rental modification
 
function updat_modif()
{	
 	for(var i=0; i<rentalModifications.length; i++)
 	{
 		for(var j=0; j<rentals.length; j++)
 		{		
 			//Drivy computes the amount that was already paid by (or given to) each actor
 			//Using the new dates/distance, drivy re-computes the price of the rental, the "deductible reduction" amount, the commission, ...
			//Drivy compute the delta amount that must be debited/credited for each actor
			//Each actor receives a debit/credit payment to settle his debt
			//What is the delta amounts for each actor?

 			if(rentalModifications[i].rentalId == rentals[j].id)
 			{	
 				if( typeof rentalModifications[i].returnDate != "undefined")
 				{
 				rentals[j].returnDate = rentalModifications[i].returnDate;
 				}
 				if(typeof rentalModifications[i].pickupDate != "undefined")
 				{
 				rentals[j].pickupDate = rentalModifications[i].pickupDate;
 				}
 				if(typeof rentalModifications[i].distance != "undefined")
 				{
 				rentals[j].distance = rentalModifications[i].distance;
 				}
 				if(typeof rentalModifications[i].options!="undefined")
 				{
 				rentals[j].options.deductibleReduction=rentalModifications[i].options.deductibleReduction;
 				}
 				if(typeof rentalModifications[i].carId!="undefined")
 				{
 				rentals[j].carId=rentalModifications[i].carId;
 				}
 			}
 		}
	}
}
 
function apply_modif()
{
	//All new data
 	console.log('Modifications');
	new_rtl_Price();
	dsct_rentalPrice();
	opt_deduct();
	payactors();
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

console.group('DATA:')
console.time()
console.log('Cars \n');
console.log(cars); 
console.log('Rentals \n');
console.log(rentals);
console.log('Actors \n');
console.log(actors);
console.log('Rental Modifications \n');
console.log(rentalModifications);
console.groupEnd();

console.group('EXERCICE 1 - Euro-Kilometers')
new_rtl_Price()
new_rtl_Price_prompt()
console.log('Price have change !')
console.timeEnd()
console.groupEnd()


console.group('EXERCICE 2 - Drive more, pay less')
dsct_rentalPrice();
console.log('Rental Price have change !')
console.timeEnd()
console.groupEnd()


console.group('EXERCICE 3 - Give me all your money')
comm();
console.timeEnd()
console.groupEnd()

console.group('EXERCICE 4 - The famous deductible')
opt_deduct();
console.timeEnd()
console.groupEnd()

console.group('EXERCICE 5 - Pay the actors')
payactors();
console.timeEnd()
console.groupEnd()

console.group('EXERCICE 6 - Rental modification')
apply_modif();
console.timeEnd()
console.groupEnd()

console.log("FINISH!")