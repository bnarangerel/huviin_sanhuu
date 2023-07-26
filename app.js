//Closure ashiglan ugugdliin daldlalt hiihin tuld iimerhuu f dotor biccihvel zugeer baidag
//return dre object maygaar function, huvisagc ntre hiihgui bol zugeer returnees busad hesegt baival yer n bol uur hesgees handah bolomjgui gsn ug
//Delgetstei ajillah controller
var uiController = (function(){
    var DOMstrings = {
        inputType: ".add__type",
        inputDesc: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn"
    }
    return{
        getInput: function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value,
                desc: document.querySelector(DOMstrings.inputDesc).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },
        getDOMstrings: function(){
            return DOMstrings;
        }
    }
})();
//Sanhuutei ajillah controller
var financeController = (function(){
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        }
    };
})();
//Program holbogc controller
var appController = (function(uiController, financeController){
    var ctrlAddItem = function(){
        //1. Oruulah ugugdliig delgetsnees olj avna
        console.log(uiController.getInput().value)
        //2. olj avsan ugugdluudee sanhuugiin controllert damjuulj tend hadgalna
        //3. olj avsan ugugdluudee web dre tohiroh hesegt n gargana
        //4. tusviig tootsoolno
        //5. etssiin uldegddel, tootsoog delgetsend gargana
    }
    var setupEventListeners = function(){

        var DOM = uiController.DOMstrings

        document.querySelector(DOM.addBtn).addEventListener('click', function(){
            ctrlAddItem();
        });

        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13){
                console.log(event.keyCode)
                ctrlAddItem();
            }
        });
    }

    return{
        init: function(){
            console.log('Application started...');
            setupEventListeners();
        }
    }
})(uiController, financeController); 
appController.init();