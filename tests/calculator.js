describe('Sample Calc', () => {
    it('Addition', function()
    {
        browser.get('https://juliemr.github.io/protractor-demo/');
        
        element(by.model('first')).sendKeys('12');
        element(by.model('second')).sendKeys('12');
        element(by.css('[ng-click="doAddition()"]')).click();
        element(by.cssContainingText('.ng-binding','24'));
        
        browser.sleep(2000);
        
        
        
        
    } );

   
});