// Q1 Given an array, find the average of all contiguous subarrays of size ‘K’ in it.
// Array: [1, 3, 2, 6, -1, 4, 1, 8, 2], K=5
// Ans  : [2.2, 2.8, 2.4, 3.6, 2.8]

function avg_of_subarr(arr, k) {
  let res = [];
  let start = 0;
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]; //adding to variable sum untill k items of array has been parsed
    if (i >= k - 1) {
      res.push(sum / k); //upon reaching k items in the array, the average is stored in RESULT
      sum -= arr[start]; //remove the starting item of the window >  move the sliding window
      start += 1; //add the subsequent item in the window >  move the sliding window
    }
  }
  return res;
}

// Q2 Given an array of positive numbers and a positive number ‘k’, find the maximum sum of any contiguous subarray of size ‘k’.
// Input: [2, 1, 5, 1, 3, 2], k=3
// Output: 9
function max_sum(arr, k) {
  let ans = -Infinity;
  let start = 0;
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (i >= k - 1) {
      ans = Math.max(ans, sum);
      sum -= arr[start];
      start += 1;
    }
  }
  return ans;
}

// Given an array of positive numbers and a positive number ‘S’, find the length of the
// smallest contiguous subarray whose sum is greater than or equal to ‘S’. Return 0, if no such subarray exists.
// Input: [2, 1, 5, 2, 3, 2], S=7
// Output: 2
// Input: [2, 1, 5, 2, 8], S=7
// Output: 1

function small_subarr_given_sum(arr, k) {
  let sum = 0;
  let result = Infinity;
  let start = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    while (sum >= k) {
      //we shrink the window until the sum is greater than or equal to K
      result = Math.min(result, i - start + 1); // i starts from 0 and so does start but min length can't be 0 that means no item is considered in the array
      sum -= arr[start];
      start += 1;
    }
  }

  if (result == Infinity) {
    return 0;
  }
  return result;
}

// Q4 Given a string, find the length of the longest substring in it with no more than K distinct characters.
// Input: String="araaci", K=2
// Output: 4

function k_distinct_chars(str, k) {
  let start_index = 0;
  let frequency_D = {};
  let result = -Infinity;
  for (let i = 0; i < str.length; i++) {
    let right_char = str[i];
    if (!(right_char in frequency_D)) {
      frequency_D[right_char] = 0;
    }
    frequency_D[right_char] += 1;
    while (Object.keys(frequency_D).length > k) {
      let left_char = str[start_index];
      frequency_D[left_char] -= 1;
      if (frequency_D[left_char] == 0) {
        delete frequency_D[left_char];
      }
      start_index += 1;
    }
    result = Math.max(result, i - start_index + 1);
  }
  return result;
}

// Q5 Fruits into baskets
// ----------------------
// Given an array of characters where each character represents a fruit tree, you are given two baskets and your goal is to put maximum number of fruits in each basket.
// The only restriction is that each basket can have only one type of fruit. You can start with any tree, but once you have started you can’t skip a tree. You will pick
// one fruit from each tree until you cannot, i.e., you will stop when you have to pick from a third fruit type. Write a function to return the maximum number of fruits
// in both the baskets.
// Input: Fruit=['A', 'B', 'C', 'A', 'C']
// Output: 3
// Input: Fruit=['A', 'B', 'C', 'B', 'B', 'C']
// Output: 5
function fruit_basket(arr) {
  let start_idx = 0;
  let fruit_basket = {};
  let result = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    let right_char = arr[i];
    if (!(right_char in fruit_basket)) {
      fruit_basket[right_char] = 0;
    }
    fruit_basket[right_char] += 1;
    while (Object.keys(fruit_basket).length > 2) {
      //only two types of fruits in each basket
      let left_char = arr[start_idx];
      fruit_basket[left_char] -= 1; //this section is done only upon encountering more than 2 fruit types
      if (fruit_basket[left_char] == 0) {
        //this while loop blocks length calculations at the end when there are more than 2 types of fruits in the dictionary
        delete fruit_basket[left_char];
      }
      start_idx += 1;
    }
    result = Math.max(result, i - start_idx + 1);
  }
  return result;
}

//Q6 Given a string, find the length of the longest substring which has no repeating characters.
// Input: String="aabccbb"
// Output: 3
// Input: String="abccde"
// Output: 3

function non_repeat_string(str) {
  let start = 0;
  let dic = {};
  let length = -Infinity;
  for (let i = 0; i < str.length; i++) {
    let tempChar = str[i];
    if (tempChar in dic) {
      // this checks if the charecter is a repeating charecter ? if so then it moves the start index of the sliding window
      start = Math.max(start, dic[tempChar] + 1); //start index is where the last index gave maximum length.
    }
    dic[tempChar] = i; // if the charecter doesn't exist in the dictionary then the start pointer isn't advanced and if it does, the dictionary position value is updated to the current position of the i pointer
    length = Math.max(length, i - start + 1); // the max length is compared with itself
  }
  return length;
}




console.log(non_repeat_string("aabccbb"));
// console.log(fruit_basket(["A", "B", "C", "B", "B", "C"]));
// console.log(k_distinct_chars("cbbebi", 3));
// console.log(small_subarr_given_sum([2, 1, 5, 2, 8], 7));
