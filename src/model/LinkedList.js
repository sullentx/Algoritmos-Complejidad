class LinkedListMix {
    constructor() {
        this.head = null; // Inicializa la cabeza de la lista enlazada como nula
    }

    // Método para insertar un elemento al final de la lista
    insert(item) {
        const start = performance.now(); // Marca el inicio del tiempo de ejecución
        const newNode = { data: item, next: null }; // Crea un nuevo nodo con el elemento y sin referencia al siguiente nodo

        if (!this.head) {
            // Si la lista está vacía
            this.head = newNode; // El nuevo nodo se convierte en la cabeza de la lista
        } else {
            let current = this.head;
            while (current.next) {
                // Busca el último nodo en la lista
                current = current.next;
            }
            current.next = newNode; // Une el nuevo nodo al último nodo encontrado
        }

        const end = performance.now(); // Marca el final del tiempo de ejecución
        return end - start; // Retorna el tiempo total de ejecución de la inserción
    }

    linearSearch(id) {
        const start = performance.now(); // Marca el inicio del tiempo de ejecución
        let current = this.head;
        let index = 0;
        while (current) {
            // Recorre la lista enlazada
            if (current.data.business === id) { 
                const end = performance.now(); // Marca el final del tiempo de ejecución al encontrar el elemento
                return { time: end - start, index: index }; // Retorna el tiempo y el índice del elemento encontrado
            }
            current = current.next;
            index++;
        }
        const end = performance.now(); // Marca el final del tiempo de ejecución si no se encuentra el elemento
        return { time: end - start, index: -1 }; // Retorna el tiempo y -1 indicando que no se encontró el elemento
    }
    // Ordenamiento burbuja de la lista
    bubbleSort() {
        let iterations = 0; // Contador de iteraciones del algoritmo
        const start = performance.now(); // Marca el inicio del tiempo de ejecución
        let swapped;

        do {
            swapped = false;
            let current = this.head;

            while (current && current.next) {
                iterations++; // Incrementa el contador de iteraciones
                if (current.data.business > current.next.data.business) {
                    // Realiza el intercambio si el nodo actual es mayor que el siguiente
                    [current.data, current.next.data] = [current.next.data, current.data];
                    swapped = true; // Indica que se realizó un intercambio
                }
                current = current.next; // Avanza al siguiente nodo
            }
        } while (swapped); // Repite hasta que no se realicen intercambios

        const end = performance.now(); // Marca el final del tiempo de ejecución
        return { sortedArray: this.toArray(), time: end - start, iterations: iterations }; // Retorna el tiempo, el arreglo ordenado y las iteraciones
    }

    // Ordenamiento merge sort para la lista
    mergeSort() {
        let iterations = 0; // Contador de iteraciones del algoritmo

        const merge = (left, right) => {
            let result = [];
            while (left.length && right.length) {
                iterations++; // Incrementa el contador de iteraciones
                if (left[0].business < right[0].business) {
                    result.push(left.shift()); // Agrega el primer elemento del lado izquierdo al resultado
                } else {
                    result.push(right.shift()); // Agrega el primer elemento del lado derecho al resultado
                }
            }
            return result.concat(left, right); // Concatena los resultados finales del lado izquierdo y derecho
        };

        const sort = (arr) => {
            if (arr.length < 2) {
                return arr; // Retorna el arreglo si tiene menos de dos elementos
            }
            const mid = Math.floor(arr.length / 2);
            const left = arr.slice(0, mid); // Divide el arreglo en mitades
            const right = arr.slice(mid);
            return merge(sort(left), sort(right)); // Aplica la función de mezcla recursivamente
        };

        const start = performance.now(); // Marca el inicio del tiempo de ejecución
        const sortedArray = sort(this.toArray()); // Ordena la lista utilizando el método merge sort
        const end = performance.now(); // Marca el final del tiempo de ejecución
        return { sortedArray: sortedArray, time: end - start, iterations: iterations }; // Retorna el arreglo ordenado, el tiempo y las iteraciones
    }

    // Convierte el campo 'business' en un valor numérico
    convertToNumeric(str) {
        if (!str) return 0; // Retorna 0 si la cadena es nula o indefinida
        return str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0); // Convierte la cadena en un valor numérico
    }

    // Obtiene el máximo valor numérico en la lista
    getMax() {
        if (!this.head) return 0; // Retorna 0 si la lista está vacía

        let current = this.head;
        let max = this.convertToNumeric(current.data.business); // Inicializa el máximo con el primer valor numérico

        while (current) {
            const numericValue = this.convertToNumeric(current.data.business);
            if (numericValue > max) {
                max = numericValue; // Actualiza el máximo si encuentra un valor numérico mayor
            }
            current = current.next; // Avanza al siguiente nodo
        }
        return max; // Retorna el máximo valor numérico encontrado
    }

    // Ordenamiento por conteo para una posición específica (exp)
    countingSort(head, exp) {
        const output = [];
        const count = new Array(10).fill(0); // Crea un arreglo de conteo inicializado en 0
        let current = head;
        let iterations = 0; // Contador de iteraciones del algoritmo

        while (current) {
            iterations++; // Incrementa el contador de iteraciones
            const numericValue = this.convertToNumeric(current.data.business);
            count[Math.floor(numericValue / exp) % 10]++; // Incrementa el conteo según el valor numérico
            current = current.next; // Avanza al siguiente nodo
        }

        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1]; // Calcula las posiciones finales del conteo
        }

        current = head;
        while (current) {
            const numericValue = this.convertToNumeric(current.data.business);
            output[count[Math.floor(numericValue / exp) % 10] - 1] = current; // Coloca los elementos en sus posiciones finales ordenadas
            count[Math.floor(numericValue / exp) % 10]--; // Decrementa el conteo
            current = current.next; // Avanza al siguiente nodo
        }

        // Reconstruir la lista ordenada
        let index = 0;
        current = head;
        while (current) {
            current.data = output[index].data; // Actualiza los datos del nodo original con los datos ordenados
            index++;
            current = current.next; // Avanza al siguiente nodo
        }

        return iterations; // Retorna el número total de iteraciones
    }

    // Radix Sort para la lista enlazada
    radixSort() {
        const startTime = performance.now(); // Marca el inicio del tiempo de ejecución

        let max = this.getMax(); // Obtiene el máximo valor numérico en la lista
        let totalIterations = 0; // Inicializa el contador de iteraciones

        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            totalIterations += this.countingSort(this.head, exp); // Aplica el ordenamiento por conteo para cada posición
        }

        const endTime = performance.now(); // Marca el final del tiempo de ejecución

        return { sortedList: this.head, time: endTime - startTime, iterations: totalIterations }; // Retorna la lista ordenada, el tiempo y las iteraciones totales
    }

    // Convierte la lista enlazada a un arreglo
    toArray() {
        let array = [];
        let current = this.head;
        while (current) {
            array.push(current.data); // Agrega los datos del nodo actual al arreglo
            current = current.next; // Avanza al siguiente nodo
        }
        return array; // Retorna el arreglo resultante
    }

    // Obtiene todos los datos de la lista enlazada como un arreglo
    getData() {
        return this.toArray(); // Retorna todos los datos de la lista enlazada
    }
}

export default LinkedListMix; // Exporta la clase LinkedListMix para su uso en otros archivos
