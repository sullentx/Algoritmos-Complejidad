import ArrayListMix from '../model/ArrayList.js'; // Importa la clase ArrayListMix desde el archivo especificado
import LinkedListMix from '../model/LinkedList.js'; // Importa la clase LinkedListMix desde el archivo especificado

// Obtén el elemento raíz en el DOM donde se mostrarán los datos
let root = document.getElementById("list-bussines");

// Crea instancias de ArrayListMix y LinkedListMix
let arrayList = new ArrayListMix();
let linkedList = new LinkedListMix();

// Realiza una solicitud fetch para obtener los datos del archivo JSON de negocios
fetch("src/controllers/business.json")
    .then(response => response.json()) // Convierte la respuesta a formato JSON
    .then(data => {
        // Tiempo de inserción en ArrayList
        console.log("Iniciando inserción en ArrayList...");
        const startTimeArray = performance.now(); // Marca el inicio del tiempo
        data.forEach(item => {
            arrayList.insert(item); // Inserta cada elemento en el ArrayList
        });
        const endTimeArray = performance.now(); // Marca el final del tiempo
        console.log(`Tiempo de inserción en ArrayList: ${endTimeArray - startTimeArray} milisegundos`);

        // Tiempo de inserción en LinkedList
        console.log("Iniciando inserción en LinkedList...");
        const startTimeLinkedList = performance.now(); // Marca el inicio del tiempo
        data.forEach(item => {
            linkedList.insert(item); // Inserta cada elemento en la LinkedList
        });
        const endTimeLinkedList = performance.now(); // Marca el final del tiempo
        console.log(`Tiempo de inserción en LinkedList: ${endTimeLinkedList - startTimeLinkedList} milisegundos`);

        // Muestra solo los primeros 100 registros en el DOM
        for (let x = 0; x < 100; x++) {
            let item = document.createElement("li");
            item.textContent = data[x].name; // Añade el nombre del negocio como texto del elemento de lista
            root.appendChild(item); // Agrega el elemento de lista al elemento raíz en el DOM
        }

        const searchName = "Marko's Meats & Deli"; // Aquí defines el nombre que deseas buscar
        const linearSearchArray = arrayList.linearSearch(searchName);
        console.log("Búsqueda lineal en ArrayList:", linearSearchArray);

        const linearSearchLinkedList = linkedList.linearSearch(searchName);
        console.log("Búsqueda lineal en LinkedList:", linearSearchLinkedList);
        // Método de ordenamiento Bubble Sort
        const sortedArray = arrayList.bubbleSort(); // Ordena el ArrayList usando Bubble Sort
        console.log("Bubble Sort Array:", sortedArray);

        const sortedLinkedList = linkedList.bubbleSort(); // Ordena la LinkedList usando Bubble Sort
        console.log("Bubble Sort LinkedList:", sortedLinkedList);

        // Método de ordenamiento Merge Sort
        const mergeArray = arrayList.mergeSort(); // Ordena el ArrayList usando Merge Sort
        console.log("Merge Sort ArrayListMix:", mergeArray);

        const mergeLiked = linkedList.mergeSort(); // Ordena la LinkedList usando Merge Sort
        console.log("Merge Sort LinkedListMix:", mergeLiked);

        // Método de ordenamiento Radix Sort
        const radixArray = arrayList.radixSort(data); // Ordena el ArrayList usando Radix Sort
        console.log("Radix Sort Array:", radixArray);

        const radixList = linkedList.radixSort(); // Ordena la LinkedList usando Radix Sort
        console.log("Radix Sort LinkedList:", radixList);
        const linealSearchArray = arrayList.linearSearch()
    })
    .catch(err => console.error("Error al cargar o procesar los datos:", err)); // Manejo de errores en caso de fallo en la solicitud o procesamiento
