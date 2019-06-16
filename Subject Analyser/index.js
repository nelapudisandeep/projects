let parent1 = document.getElementById("firstCol");
let parent2 = document.getElementById("secondCol");
let parent3 = document.getElementById("thirdCol");

window.addEventListener("load",(e)=>{
    e.preventDefault();
    let d = new Date();
    let date = d.toDateString();
    document.getElementById("header").innerHTML = date;
})
document.getElementById("btn1").addEventListener("click",(e)=>{
    e.preventDefault();
    let topicName = prompt("Enter the name of the topic : ");
//    console.log(topicName);
    let child1 = document.createElement("li");
    child1.setAttribute("class",'topic');
    child1.innerHTML = topicName;
    if(topicName){
        parent1.appendChild(child1);
        let child2 = document.createElement("li");
        let child3 = document.createElement("li");
        child2.setAttribute("class",'topic');
        child3.setAttribute("class",'topic');
        parent2.appendChild(child2);
        parent3.appendChild(child3);
    }
});


document.getElementById("container").addEventListener("click",(event)=>{
    let elementName  = event.target.nodeName;
    elementName = elementName.toLowerCase();
    if(elementName === "li"){
        let parent = event.target.parentElement.children;
        let childElement = event.target.innerHTML;
//        console.log(parent);
//        console.log(childElement);
        let parentChildLength = parent.length;
        let index;
        for(let i =0; i < parentChildLength ; i++){
            if(parent[i].innerHTML === childElement){
                index  = i;
            }
        }
        let secondParent = document.getElementById("secondCol").children;
        let secondParentLength = secondParent.length;
//        console.log(secondParent);
//        console.log(secondParentLength);
        secondParent[index].innerHTML += "* ";
    }
});

document.getElementById("btn2").addEventListener("click",(e)=>{
    e.preventDefault();
    let element = document.getElementById("secondCol");
    let length = element.children.length;
    let element3 = document.getElementById("thirdCol");
    for(let i = 0;i<length;i++){
        let stars = element.children[i].innerHTML;
        let starCount = countStars(stars);
        element3.children[i].innerHTML = starCount;
    }
});

document.getElementById("btn3").addEventListener("click",(e)=>{
    e.preventDefault();
    let item_array = [];
    document.getElementById("btn2").click();
    let subjectName = document.getElementById("subject").value;
//    console.log(subjectName);
    if(subjectName){
        document.getElementById("containerModal").style.display = "block";
    }else{
        alert("please retry after entering the subject!");
    }
    // creating objects;
    let parentCol1 = document.getElementById("firstCol").children;
    let parentCol2 = document.getElementById("thirdCol").children;
    let parentCol1length = parentCol1.length;
    for(let i = 0;i<parentCol1length;i++){
        let item = {};
        item.name = parentCol1[i].innerHTML;
//        console.log(parentCol1[i].innerHTML);
//        console.log(parentCol2[i].innerHTML);
        item.y = parentCol2[i].innerHTML;
        item_array.push(item);
    }
    
makePie(subjectName,item_array);
    
    
});

document.getElementById("close").addEventListener("click",(e)=>{
    e.preventDefault();
    document.getElementById("containerModal").style.display = "none";
});

function countStars(string){
    let temparr = string.split(" ");
    return temparr.length - 1;
}

function makePie(subjectname,itemarray) {

            var chart = new CanvasJS.Chart("chartContainer", {
                exportEnabled: true,
                animationEnabled: true,
                title: {
                    text: subjectname
                },
                legend: {
                    cursor: "pointer",
                    itemclick: explodePie
                },
                data: [{
                    type: "pie",
                    showInLegend: true,
                    toolTipContent: "{name}: <strong>{y}%</strong>",
                    indexLabel: "{name} - {y}%",
                    dataPoints: itemarray
                }]
            });
            chart.render();
}

function explodePie(e) {
            if (typeof(e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
                e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
            } else {
                e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
            }
            e.chart.render();
}

