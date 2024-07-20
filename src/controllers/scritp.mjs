import ArrayListMix from '../model/ArrayList.js'; // Importa la clase ArrayListMix desde el archivo especificado
import LinkedListMix from '../model/LinkedList.js'; // Importa la clase LinkedListMix desde el archivo especificado
import Business from '../model/Business.js';

let root = document.getElementById("list-bussines");

let arrayList = new ArrayListMix();
let linkedList = new LinkedListMix();
let arrayList1 = new ArrayListMix();
let linkedList1 = new LinkedListMix();
let arrayList2 = new ArrayListMix();
let linkedList2 = new LinkedListMix();
const loadingScreen = document.getElementById("loadingScreen");

fetch("src/model/bussines.json")
    .then(response => response.json()) 
    .then(data => {
        // Tiempo de inserción en ArrayList
        console.log("Iniciando inserción en ArrayList...");
        const startTimeArray = performance.now(); 
        const limitedData = data.slice(0, 500); 
        limitedData.forEach(item => {
            const negocio = new Business(
                item.business,
                item.name,
                item.address,
                item.city,
                item.state  
            );
            arrayList.insert(negocio);
            arrayList1.insert(negocio); 
            arrayList2.insert(negocio);
        });
        const endTimeArray = performance.now(); 

        const totalTimeArray = endTimeArray - startTimeArray

        // Tiempo de inserción en LinkedList
        console.log("Iniciando inserción en LinkedList...");
        const startTimeLinkedList = performance.now(); 
        const limitedDataLikedList = data.slice(0, 500); 
        limitedDataLikedList.forEach(item => {
            const negocio = new Business(
                item.business,
                item.name,
                item.address,
                item.city,
                item.state  
            );
            linkedList.insert(negocio);
            linkedList1.insert(negocio);
            linkedList2.insert(negocio);

        });
        const endTimeLinkedList = performance.now(); 

        const totalTimeLinkedList = endTimeLinkedList - startTimeLinkedList

        var options = {
            chart: {
              type: 'bar'
            },
            series: [{
              name: 'Milisegundos',
              data: [Math.round(totalTimeArray * 10) / 10,Math.round(totalTimeLinkedList * 10) / 10]
            }],
            xaxis: {
                name: 'Milisegundos',
              categories: ["Linkedlist","Arraylist"]
            }
          }
          
          var chart = new ApexCharts(document.querySelector("#insercion"), options);
          
          chart.render();

        const searchName = "oBqjxbnNKILyCN1S8KKd_g"; // Aquí defines el nombre que deseas buscar
        const linearSearchArray = arrayList.linearSearch(searchName);

        
        console.log("Búsqueda lineal en ArrayList:", linearSearchArray);

        
        const linearSearchLinkedList = linkedList.linearSearch(searchName);
        console.log("Búsqueda lineal en LinkedList:", linearSearchLinkedList);

        var options = {
            chart: {
              type: 'bar'
            },
            series: [{
              name: 'Milisegundos',
              data: [linearSearchLinkedList.time,linearSearchArray.time]
            }],
            xaxis: {
                name: 'Milisegundos',
              categories: ["ArrayList","LinkedList"]
            }
          }
          
          var chart = new ApexCharts(document.querySelector("#busquedaLineal"), options);
          
          chart.render();

          
        const sortedArray = arrayList.bubbleSort(); 
        console.log("Bubble Sort Array:", sortedArray);

        const sortedLinkedList = linkedList.bubbleSort(); 
        console.log("Bubble Sort LinkedList:", sortedLinkedList);

        const mergeArray = arrayList1.mergeSort(); 
        console.log("Merge Sort ArrayListMix:", mergeArray);

        const mergeLiked = linkedList1.mergeSort();
        console.log("Merge Sort LinkedListMix:", mergeLiked);

        const radixArray = arrayList2.radixSort(data); 
        console.log("Radix Sort Array:", radixArray);

        const radixList = linkedList2.radixSort();
        console.log("Radix Sort LinkedList:", radixList);
       
        
        var options = {
            chart: {
              type: 'bar'
            },
            series: [{
              name: 'Milisegundos',
              data: [Math.round(sortedArray.time * 10) / 10,Math.round(sortedLinkedList.time * 10) / 10,Math.round(mergeArray.time * 10) / 10
                    ,Math.round(mergeLiked.time * 10) / 10,Math.round(radixArray.time * 10) / 10,Math.round(radixList.time * 10) / 10]
            }],
            xaxis: {
                name: 'Milisegundos',
              categories: ["Burbuja Array","Burbuja Linked", "Merge Array" ,"Merge Linked", "Radix Array", "Radix Linked"]
            }
          }
          
          var chart = new ApexCharts(document.querySelector("#tiemposOrdenamiento"), options);
          
          chart.render();

          var options = {
            chart: {
              type: 'bar'
            },
            series: [{
              name: 'Iteraciones',
              data: [sortedArray.iterations,sortedLinkedList.iterations]
            }],
            xaxis: {
                name: 'Iteraciones',
              categories: ["ArrayList","LinkedList"]
            }
          }
          
          var chart = new ApexCharts(document.querySelector("#IteracionesBurbuja"), options);
          
          chart.render();

          var options = {
            chart: {
              type: 'bar'
            },
            series: [{
              name: 'Iteraciones',
              data: [mergeArray.iterations,mergeLiked.iterations,radixArray.iterations,radixList.iterations]
            }],
            xaxis: {
                name: 'Iteraciones',
              categories: ["ArrayList","LinkedList"]
            }
          }
          
          var chart = new ApexCharts(document.querySelector("#iteracionesOrdenamiento"), options);
          
          chart.render();
          setTimeout(function() {
            loadingScreen.classList.add("hidden");
          }, 1000);

  
    })    
    .catch(err => {console.error("Error al cargar o procesar los datos:", err)
      setTimeout(function() {
        loadingScreen.classList.add("hidden");
      }, 1000);
    });