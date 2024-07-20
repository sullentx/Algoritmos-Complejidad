class ArrayListMix {
    constructor() {
        this.data = []; 
    }

    insert(item) {
        const start = performance.now();
        this.data.push(item); 
        const end = performance.now(); 
        return end - start;
    }

    linearSearch(id) {
        const start = performance.now(); 
        for (let i = 0; i < this.data.length; i++) {
            // Recorre el arreglo
            if (this.data[i].business === id) {
                const end = performance.now(); 
                return { time: end - start, index: i }; 
            }
        }
        const end = performance.now();        
         return { time: end - start, index: -1 }; 
        
    }   
    

    // Ordenamiento burbuja del arreglo
    bubbleSort() {
        let iterations = 0; // Contador de iteraciones del algoritmo
        const start = performance.now(); // Marca el inicio del tiempo de ejecución
        for (let i = 0; i < this.data.length - 1; i++) {
            for (let j = 0; j < this.data.length - i - 1; j++) {
                iterations++; // Incrementa el contador de iteraciones
                if (this.data[j].business> this.data[j + 1].business) {
                    // Realiza el intercambio si el elemento actual es mayor que el siguiente
                    [this.data[j], this.data[j + 1]] = [this.data[j + 1], this.data[j]];
                }
            }
        }
        const end = performance.now(); // Marca el final del tiempo de ejecución
        return { sortedArray: this.data, time: end - start, iterations: iterations }; // Retorna el arreglo ordenado, el tiempo y las iteraciones
    }

    mergeSort() {
        let iterations = 0; 

        const merge = (left, right) => {
            let result = [];
            while (left.length && right.length) {
                iterations++; 
                if (left[0].business < right[0].business) {
                    result.push(left.shift()); 
                } else {
                    result.push(right.shift());
                }
            }
            return result.concat(left, right); 
        };
    

        const sort = (arr) => {
            if (arr.length < 2) {
                return arr; 
            }
            const mid = Math.floor(arr.length / 2);
            const left = arr.slice(0, mid);
            const right = arr.slice(mid);
            return merge(sort(left), sort(right)); 
        };

        const start = performance.now(); 
        const sortedArray = sort(this.data);
        const end = performance.now(); 
        return { sortedArray: sortedArray, time: end - start, iterations: iterations }; 
    }

    toNumero(str) {
        return str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0); // Convierte la cadena en un valor numérico
    }

   radixSort() {
        const startTime = performance.now(); 

        let numericData = this.data.map(item => ({
            ...item,
            numericValue: this.toNumero(item.business)
        }));

        const getMax = (arr) => {
            let max = arr[0].numericValue;
            for (let i = 1; i < arr.length; i++) {
                if (arr[i].numericValue > max) {
                    max = arr[i].numericValue; 
                }
            }
            return max;
        };

        const countingSort = (arr, exp) => {
            const output = new Array(arr.length);
            let count = new Array(10).fill(0); 
            let iterations = 0;

            for (let i = 0; i < arr.length; i++) {
                iterations++;                 
                count[Math.floor(arr[i].numericValue / exp) % 10]++; 
            }

            for (let i = 1; i < 10; i++) {
                count[i] += count[i - 1]; 
            }

            for (let i = arr.length - 1; i >= 0; i--) {
                output[count[Math.floor(arr[i].numericValue / exp) % 10] - 1] = arr[i];
                count[Math.floor(arr[i].numericValue / exp) % 10]--; 
            }

            for (let i = 0; i < arr.length; i++) {
                arr[i] = output[i]; 
            }

            return iterations; 
        };

        let max = getMax(numericData);
        let totalIterations = 0; 

        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            totalIterations += countingSort(numericData, exp); 
        }

        this.data = numericData.map(({ numericValue, ...rest }) => rest);

        const endTime = performance.now(); 

        return { sortedArray: this.data, time: endTime - startTime, iterations: totalIterations }; 
    }

    
    getData() {
        return this.data;
    }
}

export default ArrayListMix;