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
        },
        addListItem: function(item, type){
            //Орлого, Зарлагын элементийг агуулсан html-г бэлтгэнэ.
            var html, list;
            if(type === 'inc'){
                list = '.income__list';
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">+%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                list = '.expenses__list';
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">-%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            // ter html dotroo orlogo, zarlagin utguudiig replace ashiglaj uurcilj ugnu
            html = html.replace('%id%', item.id);
            html = html.replace('%desc%', item.description);
            html = html.replace('%value%', item.value);
            //beltgesen htmlee domruu hiij ugnu
            document.querySelector(list).insertAdjacentHTML('beforeend', html);
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
        items: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        }
    };
    return {
        addItem: function(type, desc, val){
            var item, id;

            if(data.items[type].length === 0) id = 1;
            else {
                id = data.item[type][data.items[type].length - 1].id + 1;
            }

            if(type === 'inc'){
                item = new Income(id, desc, val);
            } else {
                item = new Expense(id, desc, val);
            }
            data.items[type].push(item);
            return item;
        }, 
        data: function(){
            return data;
        }
    }
})();
//Program holbogc controller
var appController = (function(uiController, financeController){
    var ctrlAddItem = function(){
        //1. Oruulah ugugdliig delgetsnees olj avna
        var input = uiController.getInput();
        //2. olj avsan ugugdluudee sanhuugiin controllert damjuulj tend hadgalna
        var item = financeController.addItem(input.type, input.desc, input.value);
        //3. olj avsan ugugdluudee web dre tohiroh hesegt n gargana
        uiController.addListItem(item, input.type);
        //4. tusviig tootsoolno
        //5. etssiin uldegddel, tootsoog delgetsend gargana
    };
    var setupEventListeners = function(){
        var DOM = uiController.getDOMstrings()
        document.querySelector(DOM.addBtn).addEventListener('click', function(){
            ctrlAddItem();
        });
        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13){
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