function Set() {

    //finds the intersection of two lists
    this.intersection = function (listA, listB) {

        var resultList = []; // create a resultList array

        if (listA === null || listB === null) { // check for invalid inputs
            return null; //exit and return null to indicate an error
        }

        for (var i = 0; i < listA.length; i++) { // for every element in listA
            var nextValue = listA[i]; //get next value in the list

            //for every element in listB
            for (var j = 0; j < listB.length; j++) {
                if (listB[j] === nextValue) { //this listB element equals nextValue
                    resultList.push(listB[j]); //add listB element to end of resultList
                    break; //break out of (exit) the listB inner loop
                }
            } //end listB inner loop
        } // end listA outer loop

        return resultList;
    }


    //finds the union of two lists
    this.union = function (listA, listB) {

        var resultList = []; // create a resultList array

        if (listA === null || listB === null) { // check for invalid inputs
            return null; //exit and return null to indicate an error
        }

        var unionA = this.symmetricDifference(listA, listB);
        for (var i = 0; i < unionA.length; i++) {
            resultList.push(unionA[i]);
        }
        var intersectionA = this.intersection(listA, listB);
        for (var i = 0; i < intersectionA.length; i++) {
            resultList.push(intersectionA[i]);
        }
        return resultList;
    }


    //finds the relativeComplement of two lists
    this.relativeComplement = function (listA, listB) {

        var resultList = []; // create a resultList array

        if (listA === null || listB === null) { // check for invalid inputs
            return null; //exit and return null to indicate an error
        }

        for (var i = 0; i < listA.length; i++) { //for every element in listA
            var nextValue = listA[i]; //get next value in the list

            var found = false;
            for (var j = 0; j < listB.length; j++) {
                if (nextValue === listB[j]) { //nextValue does not equal listB
                    found = true;
                    break; //exit listB inner loop
                }
            }
            if (!found) {
                resultList.push(nextValue); //add nextValue to end of resultList
            }
        } //end listA outer loop

        return resultList;
    }


    //finds the symmetricDifference of two lists
    this.symmetricDifference = function (listA, listB) {

        var resultList = []; // create a resultList array

        if (listA === null || listB === null) { // check for invalid inputs
            return null; //exit and return null to indicate an error
        }

        var differenceA = this.relativeComplement(listA, listB);
        for (var i = 0; i < differenceA.length; i++) {
            resultList.push(differenceA[i]);
        }

        var differenceB = this.relativeComplement(listB, listA);
        for (var i = 0; i < differenceB.length; i++) {
            resultList.push(differenceB[i]);
        }
        return resultList;
    }


}
