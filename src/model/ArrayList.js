class ArrayListMix {
    constructor() {
        this.data = []; // Inicializa el arreglo de datos vacío
    }

    // Método para insertar un elemento al final del arreglo
    insert(item) {
        const start = performance.now(); // Marca el inicio del tiempo de ejecución
        this.data.push(item); // Agrega el elemento al arreglo
        const end = performance.now(); // Marca el final del tiempo de ejecución
        return end - start; // Retorna el tiempo total de ejecución de la inserción
    }

    // Búsqueda lineal de un elemento por su ID
    linearSearch(id) {
        const start = performance.now(); // Marca el inicio del tiempo de ejecución
        for (let i = 0; i < this.data.length; i++) {
            // Recorre el arreglo
            if (this.data[i].id === id) {
                const end = performance.now(); // Marca el final del tiempo de ejecución al encontrar el elemento
                return { time: end - start, index: i }; // Retorna el tiempo y el índice del elemento encontrado
            }
        }
        const end = performance.now(); // Marca el final del tiempo de ejecución si no se encuentra el elemento
        return { time: end - start, index: -1 }; // Retorna el tiempo y -1 indicando que no se encontró el elemento
    }

    // Ordenamiento burbuja del arreglo
    bubbleSort() {
        let iterations = 0; // Contador de iteraciones del algoritmo
        const start = performance.now(); // Marca el inicio del tiempo de ejecución
        for (let i = 0; i < this.data.length - 1; i++) {
            for (let j = 0; j < this.data.length - i - 1; j++) {
                iterations++; // Incrementa el contador de iteraciones
                if (this.data[j].id > this.data[j + 1].id) {
                    // Realiza el intercambio si el elemento actual es mayor que el siguiente
                    [this.data[j], this.data[j + 1]] = [this.data[j + 1], this.data[j]];
                }
            }
        }
        const end = performance.now(); // Marca el final del tiempo de ejecución
        return { sortedArray: this.data, time: end - start, iterations: iterations }; // Retorna el arreglo ordenado, el tiempo y las iteraciones
    }

    // Ordenamiento merge sort para el arreglo
    mergeSort() {
        let iterations = 0; // Contador de iteraciones del algoritmo

        const merge = (left, right) => {
            let result = [];
            while (left.length && right.length) {
                iterations++; // Incrementa el contador de iteraciones
                if (left[0].id < right[0].id) {
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
        const sortedArray = sort(this.data); // Ordena el arreglo utilizando el método merge sort
        const end = performance.now(); // Marca el final del tiempo de ejecución
        return { sortedArray: sortedArray, time: end - start, iterations: iterations }; // Retorna el arreglo ordenado, el tiempo y las iteraciones
    }

    // Método privado para convertir el campo 'business' en un valor numérico
    _convertToNumeric(str) {
        return str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0); // Convierte la cadena en un valor numérico
    }

    // Radix Sort para el arreglo
    radixSort() {
        const startTime = performance.now(); // Marca el inicio del tiempo de ejecución

        // Convertir el campo 'business' en un valor numérico para el ordenamiento
        let numericData = this.data.map(item => ({
            ...item,
            numericValue: this._convertToNumeric(item.business)
        }));

        // Función para obtener el máximo valor numérico
        const getMax = (arr) => {
            let max = arr[0].numericValue;
            for (let i = 1; i < arr.length; i++) {
                if (arr[i].numericValue > max) {
                    max = arr[i].numericValue; // Actualiza el máximo si encuentra un valor numérico mayor
                }
            }
            return max;
        };

        // Función de ordenamiento Counting Sort para una posición específica (exp)
        const countingSort = (arr, exp) => {
            const output = new Array(arr.length);
            let count = new Array(10).fill(0); // Crea un arreglo de conteo inicializado en 0
            let iterations = 0; // Contador de iteraciones del algoritmo

            for (let i = 0; i < arr.length; i++) {
                iterations++; // Incrementa el contador de iteraciones
                count[Math.floor(arr[i].numericValue / exp) % 10]++; // Incrementa el conteo según el valor numérico
            }

            for (let i = 1; i < 10; i++) {
                count[i] += count[i - 1]; // Calcula las posiciones finales del conteo
            }

            for (let i = arr.length - 1; i >= 0; i--) {
                output[count[Math.floor(arr[i].numericValue / exp) % 10] - 1] = arr[i];
                count[Math.floor(arr[i].numericValue / exp) % 10]--; // Decrementa el conteo
            }

            for (let i = 0; i < arr.length; i++) {
                arr[i] = output[i]; // Actualiza el arreglo original con los datos ordenados
            }

            return iterations; // Retorna el número total de iteraciones
        };

        let max = getMax(numericData); // Obtiene el máximo valor numérico en el arreglo
        let totalIterations = 0; // Inicializa el contador de iteraciones

        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            totalIterations += countingSort(numericData, exp); // Aplica el ordenamiento por conteo para cada posición
        }

        // Remover el campo 'numericValue' antes de devolver los resultados ordenados
        this.data = numericData.map(({ numericValue, ...rest }) => rest);

        const endTime = performance.now(); // Marca el final del tiempo de ejecución

        return { sortedArray: this.data, time: endTime - startTime, iterations: totalIterations }; // Retorna el arreglo ordenado, el tiempo y las iteraciones totales
    }

    // Retorna todos los datos del arreglo
    getData() {
        return this.data; // Retorna todos los datos del arreglo
    }
}

export default ArrayListMix; // Exporta la clase ArrayListMix para su uso en otros archivos
