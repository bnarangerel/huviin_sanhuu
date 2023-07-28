//Closure ashiglan ugugdliin daldlalt hiihin tuld iimerhuu f dotor biccihvel zugeer baidag
//return dre object maygaar function, huvisagc ntre hiihgui bol zugeer returnees busad hesegt baival yer n bol uur hesgees handah bolomjgui gsn ug
//Delgetstei ajillah controller
var uiController = (function(){
    var DOMstrings = {
        inputType: ".add__type",
        inputDesc: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn",
        incomeList: ".income__list",
        expenseList: ".expenses__list",
        budgetValue: ".budget__value",
        incomeLabel: ".budget__income--value",
        expenseLabel: ".budget__expenses--value",
        persentageLabel: ".budget__expenses--percentage",
        containerDev: ".container",
        expensePercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };
    var nodedListForeach = function(list, callback){
        for(var i = 0; i < list.length; i ++){
            callback(list[i], i);
        }
    };
    var formatMoney = function(number, type){
        number = "" + number;
        var x = number.split("").reverse().join("");

        var y = "";
        var count = 1;

        for(var i = 0; i < x.length; i ++){
            y = y + x[i];

            if(count % 3 === 0) y = y + ",";
            count ++;
        }

        var z = y.split("").reverse().join("");

        if(z[0] === ',') z = z.substring(1, z.length);
        if(type === 'inc') z = "+" + z;
        else z = "-" + z;
        return z;
    }
    return{
        displayDate: function(){
            var unuudur = new Date();

            document.querySelector(DOMstrings.dateLabel).textContent = unuudur.getMonth() + " сар";
        },
        getInput: function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value,
                desc: document.querySelector(DOMstrings.inputDesc).value,
                value: parseInt(document.querySelector(DOMstrings.inputValue).value)
            }
        },
        displayPercentages: function(allPercentages){
            //Zarlagin NodeList-iig oloh
            var elements = document.querySelectorAll(DOMstrings.expensePercentageLabel);
            //element bolgonii huvid zarlagin huviig massivaas avc shivj oruulah
            nodedListForeach(elements, function(el, index){
                el.textContent = allPercentages[index] + '%';
            });
        },
        getDOMstrings: function(){
            return DOMstrings;
        },
        clearFields: function(){
            var fields = document.querySelectorAll(DOMstrings.inputDesc + ", " + DOMstrings.inputValue);
            // convert list
            var fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(el, index, array){
                el.value = "";
            });
            fieldsArr[0].focus();
        },
        tusviigUzuuleh: function(tusuv){
            var type;
            if(tusuv.tusuv >= 0) type = 'inc';
            else type = 'exp';
            document.querySelector(DOMstrings.budgetValue).textContent = formatMoney(tusuv.tusuv, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatMoney(tusuv.totalInc, 'inc');
            document.querySelector(DOMstrings.expenseLabel).textContent = formatMoney(tusuv.totalExp, 'exp');
            if(tusuv.huvi !== 0){
                document.querySelector(DOMstrings.persentageLabel).textContent = tusuv.huvi+ '%';
            } else {
                document.querySelector(DOMstrings.persentageLabel).textContent = tusuv.huvi;
            }
        },
        deleteListItem: function(id){
            var el = document.getElementById(id);
            el.parentNode.removeChild(el);

        },
        addListItem: function(item, type){
            //Орлого, Зарлагын элементийг агуулсан html-г бэлтгэнэ.
            var html, list;
            if(type === 'inc'){
                list = DOMstrings.incomeList;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                list = DOMstrings.expenseList;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            // ter html dotroo orlogo, zarlagin utguudiig replace ashiglaj uurcilj ugnu
            html = html.replace('%id%', item.id);
            html = html.replace('%desc%', item.description);
            html = html.replace('%value%', formatMoney(item.value, type));
            //beltgesen htmlee domruu hiij ugnu
            document.querySelector(list).insertAdjacentHTML('beforeend', html);
        },

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
        this.percentage = -1;
    };
    var data = {
        items: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
        tusuv: 0,
        huvi: 0
    };
    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome > 0)
            this.percentage = Math.round((this.value / totalIncome) * 100);
        else this.percentage = 0;
    };
    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };
    var calculateTotal = function(type){
        sum = 0;
        data.items[type].forEach(function(el){
            sum = sum + el.value;
        });
        data.totals[type] = sum;
    };
    return {
        addItem: function(type, desc, val){
            var item, id;

            if(data.items[type].length === 0) id = 1;
            else {
                id = data.items[type][data.items[type].length - 1].id + 1;
            }
            if(type === 'inc'){
                item = new Income(id, desc, val);
            } else {
                item = new Expense(id, desc, val);
            }
            data.items[type].push(item);
            return item;
        }, 
        deleteItem: function(type, id){
            var ids = data.items[type].map(function(el){
                return el.id;
            });
            var index = ids.indexOf(id);
            if(index !== -1){
                data.items[type].splice(index, 1);
            }
        },
        data: function(){
            return data;
        },
        tusuvTootsooloh: function(){
            //Niit orlogo
            calculateTotal('inc');
            //Niit zardal
            calculateTotal('exp');
            //Tusviig shineer tootsoolno
            data.tusuv = data.totals.inc - data.totals.exp;
            //Orlogo, zarlagiin hubviig tootsoolno
            if(data.totals.inc > 0)
                data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
            else data.hubi = 0;

        },
        calculatePercentages: function(){
            data.items.exp.forEach(function(el){
                el.calcPercentage(data.totals.inc);
            })
        },
        getPercentages: function(){
            var allPercentages = data.items.exp.map(function(el){
                return el.getPercentage();
            });
            return allPercentages;
        },
        tusuvAvah: function(){
            return{
                tusuv: data.tusuv, 
                huvi: data.huvi,
                totalInc: data.totals.inc, 
                totalExp: data.totals.exp
            }
        }
    }
})();
//Program holbogc controller
var appController = (function(uiController, financeController){
    var ctrlAddItem = function(){
        //1. Oruulah ugugdliig delgetsnees olj avna
        var input = uiController.getInput();
        if(input.desc !== "" && input.value !== ""){
            //2. olj avsan ugugdluudee sanhuugiin controllert damjuulj tend hadgalna
            var item = financeController.addItem(input.type, input.desc, input.value);
            
            //3. olj avsan ugugdluudee web dre tohiroh hesegt n gargana
            uiController.addListItem(item, input.type);
            uiController.clearFields();
            //tusuv shineer tootsooloh
            updateTusuv();
        }
    };
    var updateTusuv = function(){
        //4. tusviig tootsoolno
        financeController.tusuvTootsooloh();
        
        //5. etssiin uldegddel
        var tusuv = financeController.tusuvAvah();
        
        //6. tootsoog delgetsend gargana
        uiController.tusviigUzuuleh(tusuv);

        //7. Elementuudiin huviig tootsoolno
        financeController.calculatePercentages();

        //8. Elementuudiin huviig huleej avna
        var allPercentages = financeController.getPercentages();

        //9. Edgeer huviig delgetsend gargana
        uiController.displayPercentages(allPercentages);
        
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
        document.querySelector(DOM.containerDev).addEventListener('click', function(event){
            var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
            if(id){
                var arr = id.split('-');
                var type = arr[0];
                var itemId = arr[1];
                // 1. sanhuugiin modulias type, id ashiglaad ustgana.
                financeController.deleteItem(type, parseInt(itemId));
                //2. delgets deerees ene elementiig ustgana
                uiController.deleteListItem(id);
                //3. uldegdel tootsoog shinecilj haruulna
                //tusuv shineer tootsooloh
                updateTusuv();
            }
        })
    }
    return{
        init: function(){
            console.log('Application started...');
            uiController.displayDate();
            uiController.tusviigUzuuleh({
                tusuv: 0, 
                huvi: 0,
                totalInc: 0, 
                totalExp: 0
            });
            setupEventListeners();
        }
    }
})(uiController, financeController); 

appController.init();