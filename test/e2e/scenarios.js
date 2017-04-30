'use strict';  

describe('E2E: notification-messages', function() {

	beforeEach(function() {
		browser.ignoreSynchronization = true;
		browser.get('/source/index.html');
	});

	describe('showing and removing an alert', function() {

		beforeEach(function() {
			element(by.model('note.header')).sendKeys('Header');
			element(by.model('note.content')).sendKeys('Content');
			element.all(by.model('note.category')).get(0).click();
			element.all(by.model('note.type')).get(0).click();
			element(by.id('simulateButton')).click();
		});

		it('should display an alert', function() {
			expect(element.all(by.repeater('item in buffer')).count()).toEqual(1);
		});

		it('should display the alert with title and body', function() {
			expect(element(by.css('.ns-title')).getText()).toEqual('ID 1: Header');
			expect(element(by.css('.ns-content')).getText()).toEqual('Content');
		});

		it('should close the alert on pressing the x span', function() {
			element(by.css('.ns-close')).click();
			expect(element(by.css('.notification')).isPresent()).toBeFalsy();
		});

		it('should automatically close the alert in 90 sec', function() {
			setTimeout(function() {
				expect(element(by.css('.notification')).isPresent()).toBeFalsy();
			}, 90000);
		});
	});

	describe('showing a group of alerts', function() {

		beforeEach(function() {
			for (var i = 1; i <= 7; i++) {
				element(by.model('note.header')).sendKeys('Header');
				element(by.model('note.content')).sendKeys('Content');
				element.all(by.model('note.category')).get(0).click();
				element.all(by.model('note.type')).get(0).click();
				element(by.id('simulateButton')).click();
				setTimeout(function() {},1000);
			}
		})

		it('should display max 5 alerts at the same time', function() {
			expect(element.all(by.repeater('item in buffer'))
				.count()).toEqual(5);
		});

		it('should display only the latest alerts', function() {
			expect(element.all(by.repeater('item in buffer')).last().element(by.binding('item.header')).getText()).toContain('7');
		});

		it('should regroup the alerts when closing one of alerts', function() {
			expect(element.all(by.repeater('item in buffer')).first().element(by.binding('item.header')).getText()).toContain('3');
			element.all(by.repeater('item in buffer')).first().element(by.css('.ns-close')).click();
			expect(element.all(by.repeater('item in buffer')).first().element(by.binding('item.header')).getText()).toContain('2');
		});
	});

	describe('showing alerts of different types/cats', function() {

		beforeEach(function() {
			element(by.model('note.header')).sendKeys('Header');
			element(by.model('note.content')).sendKeys('Content');
		});

		it('should display a info alert', function() {
			element.all(by.model('note.category')).get(0).click();
			element.all(by.model('note.type')).get(0).click();
			element(by.id('simulateButton')).click();
			expect(element.all(by.repeater('item in buffer')).first().getAttribute('class')).toContain('info');
		});

		it('should display a warning alert', function() {
			element.all(by.model('note.category')).get(1).click();
			element.all(by.model('note.type')).get(0).click();
			element(by.id('simulateButton')).click();
			expect(element.all(by.repeater('item in buffer')).first().getAttribute('class')).toContain('warning');
		});

		it('should display a error alert', function() {
			element.all(by.model('note.category')).get(2).click();
			element.all(by.model('note.type')).get(0).click();
			element(by.id('simulateButton')).click();
			expect(element.all(by.repeater('item in buffer')).first().getAttribute('class')).toContain('error');
		});

		it('should display a note alert with no buttons', function() {
			element.all(by.model('note.category')).get(0).click();
			element.all(by.model('note.type')).get(0).click();
			element(by.id('simulateButton')).click();
			expect(element.all(by.css('li button')).first().isDisplayed()).toBeFalsy();
			expect(element.all(by.css('li button')).last().isDisplayed()).toBeFalsy();
		});

		it('should display a ok_confirm alert with one button', function() {
			element.all(by.model('note.category')).get(0).click();
			element.all(by.model('note.type')).get(1).click();
			element(by.id('simulateButton')).click();
			expect(element.all(by.css('li button')).first().isDisplayed()).toBeTruthy();
			expect(element.all(by.css('li button')).last().isDisplayed()).toBeFalsy();
		});

		it('should display a ok_confirm alert with one button', function() {
			element.all(by.model('note.category')).get(0).click();
			element.all(by.model('note.type')).get(2).click();
			element(by.id('simulateButton')).click();
			expect(element.all(by.css('li button')).first().isDisplayed()).toBeTruthy();
			expect(element.all(by.css('li button')).last().isDisplayed()).toBeTruthy();
		});
	});

	describe('talking to server', function() {

		beforeEach(function() {
			// 	browser.ignoreSynchronization = false;
			// 	browser.addMockModule('httpBackendMock', function() {
			// 		angular.module('httpBackendMock', ['Demo', 'notification-messages', 'ngMockE2E'])
			// 		.run(function($httpBackend) {

			// 			var list =
			// 			[
			// 			{
			// 				"id": 100,
			// 				"from": "userManagement",
			// 				"category": "info",
			// 				"type": "note",
			// 				"header": "Lorem ipsum dolor.",
			// 				"content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, quae."
			// 			},
			// 			{
			// 				"id": 101,
			// 				"from": "userManagement",
			// 				"category": "warning",
			// 				"type": "ok_confirm",
			// 				"header": "Lorem ipsum dolor sit.",
			// 				"content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex dolorem, maiores."
			// 			},
			// 			{
			// 				"id": 102,
			// 				"from": "userManagement",
			// 				"category": "error",
			// 				"type": "ok_cancel_confirm",
			// 				"header": "Lorem ipsum dolor sit.",
			// 				"content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex dolorem, maiores."
			// 			},
			// 			{
			// 				"id": 103,
			// 				"from": "userManagement",
			// 				"category": "info",
			// 				"type": "ok_confirm",
			// 				"header": "Lorem ipsum.",
			// 				"content": "Lorem ipsum dolor sit amet."
			// 			},
			// 			{
			// 				"id": 104,
			// 				"from": "userManagement",
			// 				"category": "warning",
			// 				"type": "ok_cance_confirm",
			// 				"header": "Lorem ipsum dolor sit.",
			// 				"content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex dolorem, maiores."
			// 			},
			// 			{
			// 				"id": 105,
			// 				"from": "userManagement",
			// 				"category": "error",
			// 				"type": "info",
			// 				"header": "Lorem ipsum dolor sit.",
			// 				"content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse ad harum architecto? Accusantium!"
			// 			},
			// 			{
			// 				"id": 106,
			// 				"from": "userManagement",
			// 				"category": "warning",
			// 				"type": "info",
			// 				"header": "Lorem ipsum dolor sit.",
			// 				"content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, sint."
			// 			}
			// 			];

			// 			$httpBackend.whenGET('http://localhost:3000/list').respond(list);

			// 		    // $httpBackend.whenPOST('http://localhost:3000/confirm').respond(function(method, url, data) {
			// 		    //   var respond = angular.fromJson(data);
			// 		    //   confirm.push(respond);
			// 		    //   return [200, confirm, {}];
			// 		    // });
			// 		});
			// 	});
			element(by.id('showModal')).click();
			browser.sleep(1000);
			element(by.id('getFromServer')).click();
			element(by.css('button.close')).click();
			browser.sleep(1000);
		});

		it('should fetch data from server', function() {
			expect(element.all(by.repeater('item in buffer')).count()).toEqual(5);
		});

		it('should send response to server', function() {
			element.all(by.css('button.ns-btn')).first().click();
			browser.get('http://localhost:3000/confirm/102');
			expect(element(by.css('pre')).getText()).toContain('"id": 102');
		});
	});



});