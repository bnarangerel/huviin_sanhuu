//Closure ashiglan ugugdliin daldlalt hiihin tuld iimerhuu f dotor biccihvel zugeer baidag
//return dre object maygaar function, huvisagc ntre hiihgui bol zugeer returnees busad hesegt baival yer n bol uur hesgees handah bolomjgui gsn ug
//Delgetstei ajillah controller
var uiController = (function(){
    
})();
//Sanhuutei ajillah controller
var financeController = (function(){

})();
//Program holbogc controller
var appController = (function(uiController, financeController){
    var ctrlAddItem = function(){
        //1. Oruulah ugugdliig delgetsnees olj avna
        //2. olj avsan ugugdluudee sanhuugiin controllert damjuulj tend hadgalna
        //3. olj avsan ugugdluudee web dre tohiroh hesegt n gargana
        //4. tusviig tootsoolno
        //5. etssiin uldegddel, tootsoog delgetsend gargana
    }
    document.querySelector('.add__btn').addEventListener('click', function(){
        ctrlAddItem();
    });

    document.addEventListener('keypress', function(event){
        if(event.keyCode === 13 || event.which === 13){
            console.log(event.keyCode)
            ctrlAddItem();
        }
    })
})(uiController, financeController); 