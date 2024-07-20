class LinkedListMix {
    constructor() {
        this.head = null;     }

    insert(item) {
        const start = performance.now();
        const newNode = { data: item, next: null }; 
        if (!this.head) {
            this.head = newNode; 
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }

        const end = performance.now();
        return end - start;    }

    linearSearch(id) {
        const start = performance.now(); 
        let current = this.head;
        let index = 0;
        while (current) {
            if (current.data.business === id) { 
                const end = performance.now(); 
                return { time: end - start, index: index }; 
            }
            current = current.next;
            index++;
        }
        const end = performance.now(); 
        return { time: end - start, index: -1 }; 
        }
    
    bubbleSort() {
        let iterations = 0; 
        const start = performance.now();
        let swapped;

        do {
            swapped = false;
            let current = this.head;

            while (current && current.next) {
                iterations++; 
                if (current.data.business > current.next.data.business) {
                [current.data, current.next.data] = [current.next.data, current.data];
                swapped = true;                }
                current = current.next;             }
        } while (swapped); 
        const end = performance.now(); 
                return { sortedArray: this.toArray(), time: end - start, iterations: iterations }; 
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
        const sortedArray = sort(this.toArray()); 
        const end = performance.now(); 
        return { sortedArray: sortedArray, time: end - start, iterations: iterations };
    }

    
    convertirANumero(str) {
        if (!str) return 0;
        return str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    }

    
    getMax() {
        if (!this.head) return 0;

        let current = this.head;
        let max = this.convertirANumero(current.data.business); 

        while (current) {
            const numericValue = this.convertirANumero(current.data.business);
            if (numericValue > max) {
                max = numericValue; 
            }
            current = current.next; 
        }
        return max; 
    }

    
    countingSort(head, exp) {
        const output = [];
        const count = new Array(10).fill(0);
        let current = head;
        let iterations = 0;

        while (current) {
            iterations++; 
            const numericValue = this.convertirANumero(current.data.business);
            count[Math.floor(numericValue / exp) % 10]++; 
            current = current.next; 
        }

        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1]; 
        }

        current = head;
        while (current) {
            const numericValue = this.convertirANumero(current.data.business);
            output[count[Math.floor(numericValue / exp) % 10] - 1] = current; 
            count[Math.floor(numericValue / exp) % 10]--; 
            current = current.next; 
        }

       
        let index = 0;
        current = head;
        while (current) {
            current.data = output[index].data;
            index++;
            current = current.next; 
        }

        return iterations; 
    }

    
    radixSort() {
        const startTime = performance.now(); 

        let max = this.getMax(); 
        let totalIterations = 0; 

        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            totalIterations += this.countingSort(this.head, exp);
        }

        const endTime = performance.now(); 

        return { sortedList: this.head, time: endTime - startTime, iterations: totalIterations };
    }

    
    toArray() {
        let array = [];
        let current = this.head;
        while (current) {
            array.push(current.data);
            current = current.next; 
        }
        return array; 
    }

    
    getData() {
        return this.toArray();
    }
}

export default LinkedListMix;