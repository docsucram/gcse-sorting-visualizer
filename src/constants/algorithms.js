// GCSE Computer Science Sorting Algorithms Reference & Metadata
// Tailored for OCR J277, AQA 8525, and Pearson Edexcel specifications

export const ALGORITHMS = {
  bubble: {
    id: 'bubble',
    name: 'Bubble Sort',
    category: 'Exchange Sort',
    examBoardRelevance: 'OCR J277 §2.1.2 • AQA 8525 §3.1.1 • Edexcel GCSE',
    complexity: {
      bestTime: 'O(n)',
      averageTime: 'O(n²)',
      worstTime: 'O(n²)',
      space: 'O(1) (In-place)',
      stable: true,
    },
    complexityNotes: {
      best: 'Occurs when list is already sorted; early-exit flag detects 0 swaps on Pass 1.',
      worst: 'Occurs when list is completely reversed; requires n(n-1)/2 comparisons and swaps.',
      space: 'Requires O(1) auxiliary memory because elements are swapped directly in-place without extra lists.',
      stability: 'Stable because equal elements are never swapped past one another (only strict `>` triggers swap).'
    },
    description: 'Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. After pass k, the k-th largest element is bubbled into its final position at the right end.',
    pros: [
      'Extremely simple to implement and understand for beginners.',
      'In-place algorithm: uses minimal extra memory (O(1) auxiliary space).',
      'Adaptive: with a swapped flag, can terminate in O(n) time on an already sorted list.',
      'Stable sort: preserves relative order of duplicate elements.'
    ],
    cons: [
      'Very inefficient on large datasets with quadratic O(n²) average time.',
      'Performs a massive number of costly swaps compared to Selection or Insertion sort.'
    ],
    examTips: [
      'Pass 1 always places the LARGEST item into the final index of the array.',
      'Total passes required on an array of length n is at most (n - 1).',
      'Remember the early-exit optimization: `swapped = False` set before the inner loop, flipped to `True` if any swap occurs.',
      'Common exam trap: Students often compare `list[j]` with `list[j]` instead of `list[j+1]`, or loop past array boundaries causing IndexOutOfBounds.'
    ],
    examQuestions: [
      {
        question: 'Explain why Bubble Sort has a best-case time complexity of O(n) when an early-exit flag is used. [2 marks]',
        markScheme: '1 mark for stating that the algorithm checks every adjacent pair once (1 pass with n-1 comparisons). 1 mark for stating the swapped flag remains False, allowing the algorithm to terminate early.'
      },
      {
        question: 'State the contents of array [5, 1, 4, 2, 8] after Pass 1 of Bubble Sort. [2 marks]',
        markScheme: 'Pass 1 result: [1, 4, 2, 5, 8]. Mark 1: 8 in final position. Mark 2: other elements correctly swapped.'
      }
    ],
    pseudocode: [
      { line: 1, text: 'swapped = True', note: 'Initialize swapped flag to True to enter loop' },
      { line: 2, text: 'pass_num = 0', note: 'Track pass counter' },
      { line: 3, text: 'while swapped == True', note: 'Repeat until a full pass makes 0 swaps' },
      { line: 4, text: '    swapped = False', note: 'Reset swapped flag at start of each pass' },
      { line: 5, text: '    for j = 0 to (length - 2 - pass_num)', note: 'Compare adjacent pairs, ignoring already sorted tail' },
      { line: 6, text: '        if list[j] > list[j + 1] then', note: 'Check if adjacent items are in wrong order' },
      { line: 7, text: '            temp = list[j]', note: 'Temporary variable holds value for swap' },
      { line: 8, text: '            list[j] = list[j + 1]', note: 'Shift smaller element left' },
      { line: 9, text: '            list[j + 1] = temp', note: 'Place larger element right' },
      { line: 10, text: '            swapped = True', note: 'Mark that a swap occurred this pass' },
      { line: 11, text: '        endif', note: 'End conditional check' },
      { line: 12, text: '    next j', note: 'Advance to next pair' },
      { line: 13, text: '    pass_num = pass_num + 1', note: 'Pass complete: one more element guaranteed sorted' },
      { line: 14, text: 'endwhile', note: 'List is now fully sorted' }
    ]
  },

  insertion: {
    id: 'insertion',
    name: 'Insertion Sort',
    category: 'Insertion Sort',
    examBoardRelevance: 'OCR J277 §2.1.2 • AQA 8525 §3.1.1 • Edexcel GCSE',
    complexity: {
      bestTime: 'O(n)',
      averageTime: 'O(n²)',
      worstTime: 'O(n²)',
      space: 'O(1) (In-place)',
      stable: true,
    },
    complexityNotes: {
      best: 'Occurs when list is already sorted; each key element is compared only once with previous item (O(n) comparisons, 0 shifts).',
      worst: 'Occurs when list is reversed; each item i must shift past all i items before it (O(n²) shifts).',
      space: 'In-place sorting requiring only O(1) auxiliary variable (`key`).',
      stability: 'Stable sort: elements with identical values maintain original order.'
    },
    description: 'Divides the list into a sorted sublist (left) and an unsorted sublist (right). In each pass, picks the next unsorted element (`key`) and shifts larger elements in the sorted sublist one place right to insert the key into its correct position.',
    pros: [
      'Very efficient for small datasets (n < 30) or nearly sorted lists.',
      'Adaptive: runs in O(n) linear time on sorted or nearly sorted data.',
      'Online algorithm: can sort a streaming list as items arrive one by one.',
      'Low constant factors and in-place memory efficiency.'
    ],
    cons: [
      'Quadratic O(n²) time makes it slow for large datasets.',
      'Performs many element shifts when dealing with reversed data.'
    ],
    examTips: [
      'Start the outer loop at index 1 because a single element at index 0 is already considered sorted by definition.',
      'In exam trace tables, the left portion of the list expands by 1 sorted element after each pass.',
      'Notice the shift operation: elements are moved right one at a time (`list[j+1] = list[j]`) rather than pairwise swaps.',
      'Excellent real-world analogy: how a card player sorts a hand of playing cards.'
    ],
    examQuestions: [
      {
        question: 'State one advantage of Insertion Sort over Bubble Sort when sorting a nearly-sorted list. [1 mark]',
        markScheme: 'Insertion sort only shifts elements that are out of order, requiring fewer total operations than Bubble Sort.'
      },
      {
        question: 'Given the array [12, 11, 13, 5, 6], show the state after the first two passes of Insertion Sort. [2 marks]',
        markScheme: 'Pass 1 (key=11): [11, 12, 13, 5, 6]. Pass 2 (key=13): [11, 12, 13, 5, 6].'
      }
    ],
    pseudocode: [
      { line: 1, text: 'for i = 1 to (length - 1)', note: 'Outer loop: examine each unsorted element from index 1' },
      { line: 2, text: '    key = list[i]', note: 'Store current element to be inserted' },
      { line: 3, text: '    j = i - 1', note: 'Start comparing backwards from the sorted sublist' },
      { line: 4, text: '    while j >= 0 and list[j] > key', note: 'Find insertion point by shifting larger elements' },
      { line: 5, text: '        list[j + 1] = list[j]', note: 'Shift larger element one position to the right' },
      { line: 6, text: '        j = j - 1', note: 'Move index leftwards' },
      { line: 7, text: '    endwhile', note: 'Correct insertion position found at j + 1' },
      { line: 8, text: '    list[j + 1] = key', note: 'Insert key into its sorted slot' },
      { line: 9, text: 'next i', note: 'Advance to next unsorted element' }
    ]
  },

  selection: {
    id: 'selection',
    name: 'Selection Sort',
    category: 'Selection Sort',
    examBoardRelevance: 'OCR J277 Specification & standard GCSE algorithm syllabus',
    complexity: {
      bestTime: 'O(n²)',
      averageTime: 'O(n²)',
      worstTime: 'O(n²)',
      space: 'O(1) (In-place)',
      stable: false,
    },
    complexityNotes: {
      best: 'Always O(n²) because it must scan the entire remaining unsorted list to find the true minimum, even if already sorted.',
      worst: 'O(n²) comparisons in all cases: n(n-1)/2 comparisons.',
      space: 'In-place sort: O(1) auxiliary space.',
      stability: 'Unstable: long-distance swaps can reorder identical elements.'
    },
    description: 'Finds the smallest (minimum) element in the unsorted portion of the list and swaps it with the element at the beginning of the unsorted portion. Repeats until the whole list is sorted.',
    pros: [
      'Minimizes the number of writes/swaps: performs at most n - 1 swaps total.',
      'Useful when write operations to flash memory/EEPROM are costly or wear out.',
      'Simple logic and zero auxiliary storage.'
    ],
    cons: [
      'Not adaptive: always takes O(n²) comparisons even if input is already sorted.',
      'Generally slower than Insertion Sort in practice.',
      'Unstable in its standard array implementation.'
    ],
    examTips: [
      'After Pass 1, the absolute SMALLEST element is placed at index 0.',
      'Selection sort always makes exactly n(n-1)/2 comparisons regardless of initial array ordering.',
      'Exam contrast question: Why does Selection Sort do fewer swaps than Bubble Sort? (Because Selection Sort finds the min first, doing at most 1 swap per pass, whereas Bubble Sort swaps continuously).'
    ],
    examQuestions: [
      {
        question: 'Compare Selection Sort and Bubble Sort in terms of the number of swaps performed. [2 marks]',
        markScheme: 'Selection sort performs at most n - 1 swaps (at most 1 per pass). Bubble sort can perform up to n(n-1)/2 swaps in worst case.'
      }
    ],
    pseudocode: [
      { line: 1, text: 'for i = 0 to (length - 2)', note: 'Outer loop: position to fill with next minimum element' },
      { line: 2, text: '    min_index = i', note: 'Assume first unsorted element is minimum' },
      { line: 3, text: '    for j = (i + 1) to (length - 1)', note: 'Inner loop: scan rest of unsorted list' },
      { line: 4, text: '        if list[j] < list[min_index] then', note: 'Found an element smaller than current minimum' },
      { line: 5, text: '            min_index = j', note: 'Update index of minimum element' },
      { line: 6, text: '        endif', note: 'End check' },
      { line: 7, text: '    next j', note: 'Continue scanning' },
      { line: 8, text: '    if min_index != i then', note: 'Only swap if minimum is not already at index i' },
      { line: 9, text: '        temp = list[i]', note: 'Swap minimum into position i' },
      { line: 10, text: '        list[i] = list[min_index]', note: 'Assign minimum element' },
      { line: 11, text: '        list[min_index] = temp', note: 'Place displaced element' },
      { line: 12, text: '    endif', note: 'End swap condition' },
      { line: 13, text: 'next i', note: 'Pass complete: index i is guaranteed sorted' }
    ]
  },

  merge: {
    id: 'merge',
    name: 'Merge Sort',
    category: 'Divide and Conquer',
    examBoardRelevance: 'OCR J277 §2.1.2 • AQA 8525 §3.1.1 • Edexcel GCSE Core',
    complexity: {
      bestTime: 'O(n log n)',
      averageTime: 'O(n log n)',
      worstTime: 'O(n log n)',
      space: 'O(n) (Auxiliary Memory)',
      stable: true,
    },
    complexityNotes: {
      best: 'Guaranteed O(n log n) in all cases because list is always split into log₂(n) levels and merged in O(n) per level.',
      worst: 'Guaranteed O(n log n); immune to bad worst-case data inputs.',
      space: 'Crucial GCSE exam point: requires O(n) auxiliary memory to hold merged sublists.',
      stability: 'Stable sort: preserves relative ordering when merge condition uses `<=`.'
    },
    description: 'A classic divide-and-conquer algorithm. Recursively splits the list into halves until each sublist has 1 element (base case). Then merges pairs of sorted sublists back together in correct order until the entire list is reassembled.',
    pros: [
      'Guaranteed consistent O(n log n) performance for all inputs (best, average, worst).',
      'Stable sorting algorithm.',
      'Parallelizes well and suitable for large datasets that do not fit into RAM (external sorting).'
    ],
    cons: [
      'Requires O(n) auxiliary memory space, unlike in-place algorithms.',
      'Higher constant overhead for small lists compared to Insertion Sort.'
    ],
    examTips: [
      'Dividing stage: list is split down to individual elements of length 1 (a list of 1 element is inherently sorted).',
      'Merging stage: two sorted sublists are compared element-by-element and combined into one sorted list.',
      'Key Exam Disadvantage: "Requires additional memory / RAM to store temporary sublists during merging."',
      'Key Exam Advantage: "Consistent O(n log n) time even in the worst-case scenario."'
    ],
    examQuestions: [
      {
        question: 'Describe how the merge sort algorithm uses the divide and conquer approach to sort a list of numbers. [4 marks]',
        markScheme: 'Mark 1: Repeatedly splits list in half. Mark 2: Continues until sublists contain 1 element. Mark 3: Combines/merges pairs of sublists in sorted order. Mark 4: Repeats merge step until one single sorted list remains.'
      },
      {
        question: 'State one disadvantage of Merge Sort compared to Bubble Sort. [1 mark]',
        markScheme: 'Requires more memory / auxiliary storage space / O(n) additional RAM.'
      }
    ],
    pseudocode: [
      { line: 1, text: 'function mergeSort(list)', note: 'Divide-and-conquer recursive function' },
      { line: 2, text: '    if length(list) <= 1 then', note: 'Base case: 1 element is already sorted' },
      { line: 3, text: '        return list', note: 'Return single element sublist' },
      { line: 4, text: '    endif', note: 'End base case' },
      { line: 5, text: '    mid = length(list) DIV 2', note: 'Find midpoint to divide list into two halves' },
      { line: 6, text: '    left = mergeSort(sublist(0, mid))', note: 'Recursively sort left half' },
      { line: 7, text: '    right = mergeSort(sublist(mid, length))', note: 'Recursively sort right half' },
      { line: 8, text: '    return merge(left, right)', note: 'Combine two sorted halves into single sorted list' },
      { line: 9, text: 'endfunction', note: 'Recursive split complete' }
    ]
  },

  quick: {
    id: 'quick',
    name: 'Quick Sort',
    category: 'Divide and Conquer / Partitioning',
    examBoardRelevance: 'GCSE High-Tier & A-Level Computer Science',
    complexity: {
      bestTime: 'O(n log n)',
      averageTime: 'O(n log n)',
      worstTime: 'O(n²)',
      space: 'O(log n) (Call stack)',
      stable: false,
    },
    complexityNotes: {
      best: 'Occurs when the chosen pivot consistently splits the list into two equal halves.',
      worst: 'Occurs when pivot is always the smallest or largest element (e.g. already sorted list with end pivot), leading to n recursive levels.',
      space: 'Requires O(log n) stack space for recursion; operates in-place without extra list copies.',
      stability: 'Unstable: swapping elements across the pivot can disrupt relative order.'
    },
    description: 'Selects a "pivot" element from the array and partitions the other elements into two sub-arrays according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively.',
    pros: [
      'Fastest general-purpose comparison sort in practice with very small constant factors.',
      'In-place partition requires no large auxiliary array allocations.',
      'Cache-friendly memory access patterns.'
    ],
    cons: [
      'Worst-case performance is O(n²) if pivot selection is poor.',
      'Unstable sort.',
      'Recursive call stack consumes O(log n) memory.'
    ],
    examTips: [
      'Partitioning step: rearranges elements so items < pivot go to left, items >= pivot go to right.',
      'The pivot itself is in its final, permanently sorted position once partitioned!',
      'Common pivot choices: first item, last item, middle item, or median-of-three.'
    ],
    examQuestions: [
      {
        question: 'Explain what happens to the pivot element during the partitioning step of Quick Sort. [2 marks]',
        markScheme: 'Mark 1: Placed between elements smaller than it and elements greater than it. Mark 2: Stays in its final sorted position.'
      }
    ],
    pseudocode: [
      { line: 1, text: 'procedure quickSort(list, low, high)', note: 'Recursive quicksort within index bounds' },
      { line: 2, text: '    if low < high then', note: 'Base condition: array slice has 2+ elements' },
      { line: 3, text: '        p_idx = partition(list, low, high)', note: 'Partition around pivot and get final pivot index' },
      { line: 4, text: '        quickSort(list, low, p_idx - 1)', note: 'Recursively sort elements to left of pivot' },
      { line: 5, text: '        quickSort(list, p_idx + 1, high)', note: 'Recursively sort elements to right of pivot' },
      { line: 6, text: '    endif', note: 'Base case reached' },
      { line: 7, text: 'endprocedure', note: 'Complete' }
    ]
  },

  icbics: {
    id: 'icbics',
    name: "I Can't Believe It Can Sort (ICBICS)",
    category: 'Educational Curiosity',
    examBoardRelevance: 'Algorithmic Curiosity & Code Analysis (Stanley P. Y. Fung, 2021)',
    complexity: {
      bestTime: 'Θ(n²)',
      averageTime: 'Θ(n²)',
      worstTime: 'Θ(n²)',
      space: 'O(1) (In-place)',
      stable: false,
    },
    complexityNotes: {
      best: 'Always executes exactly n² comparisons and variable swaps regardless of input data.',
      worst: 'Always Θ(n²) - strictly quadratic with zero optimizations.',
      space: 'O(1) auxiliary in-place memory.',
      stability: 'Unstable due to bidirectional swapping over the full length.'
    },
    description: 'A mind-bendingly short, symmetric 2-loop sorting algorithm published by Stanley P. Y. Fung in 2021. Both loops simply iterate from 0 to n-1. When j < i, it acts like Selection Sort finding the minimum; when j > i, it acts like Insertion Sort!',
    pros: [
      'Remarkably concise: only 4 lines of code.',
      'Symmetric loops require zero boundary arithmetic (no n-1, no i+1, no early exit logic).',
      'Fascinating theoretical proof demonstrating how dual behaviors emerge from a single swap condition.'
    ],
    cons: [
      'Executes unnecessary iterations and swaps compared to standard algorithms.',
      'Always Θ(n²) comparisons even if input list is completely sorted.'
    ],
    examTips: [
      'Great for code comprehension questions: "Trace what happens when j is less than i versus when j is greater than i."',
      'Demonstrates why thoughtful loop bounds (like in Bubble and Selection Sort) save unnecessary computations.'
    ],
    examQuestions: [
      {
        question: 'Identify the total number of comparisons made by ICBICS for a list of size n. [1 mark]',
        markScheme: 'Exactly n × n = n² comparisons.'
      }
    ],
    pseudocode: [
      { line: 1, text: 'for i = 0 to (length - 1)', note: 'Outer loop iterates across entire list' },
      { line: 2, text: '    for j = 0 to (length - 1)', note: 'Inner loop ALSO iterates across entire list (symmetric!)' },
      { line: 3, text: '        if list[i] < list[j] then', note: 'Single conditional swap rule' },
      { line: 4, text: '            swap(list[i], list[j])', note: 'Swap elements i and j' },
      { line: 5, text: '        endif', note: 'End conditional' },
      { line: 6, text: '    next j', note: 'Next inner index' },
      { line: 7, text: 'next i', note: 'Next outer index' }
    ]
  }
};
