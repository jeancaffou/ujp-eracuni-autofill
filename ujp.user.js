// ==UserScript==
// @name         Task List Generator
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Generate task list from user input
// @author       You
// @match        https://eracuni.ujp.gov.si/*
// @grant        none
// ==/UserScript==

// Sample task list:
// Task 1	2:00:00
// Task 2	17:00:00
// Task 3	24:00:00


(function() {
    'use strict';
    
    var PRICE = 40;

    // Create and style the button
    var button = document.createElement('button');
    button.textContent = 'Izpolni';
    button.style.display = 'block';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.padding = '10px';
    button.style.border = 'none';
    button.style.backgroundColor = '#007bff';
    button.style.color = '#fff';
    button.style.cursor = 'pointer';
    button.style.zIndex = '9999';

    // Append the button to the document body
    document.body.appendChild(button);

    // Click event listener for the button
    button.addEventListener('click', function() {
        // Get the existing input field
        var inputField = document.getElementById('TxtZgoraj');
        if (!inputField) {
            console.error('Input field #TxtZgoraj not found.');
            return;
        }
        
        // Task list provided as user input
        var taskList = inputField.value;

        // Step 1: Click all <img> elements with title "Odstrani postavko" except those with class "hidden"
        document.querySelectorAll('img[title="Odstrani postavko"]:not(.hidden)').forEach(function(img) {
            img.click();
        });

        // Loop through each task and fill the input fields accordingly
        var tasks = taskList.split('\n');
        tasks.forEach(function(task, index) {
            // Call AddPost() function at the beginning of the loop
            if (index > 0) unsafeWindow.AddPost();

            // Get the input elements with updated index
            var articleInput = document.querySelector('#Postavka_' + index + '__Artikel');
            var quantityInput = document.querySelector('#Postavka_' + index + '__Kolicina');
            var unitMeasureSelect = document.querySelector('#Postavka_' + index + '__EnotaMereId');
            var priceInput = document.querySelector('#Postavka_' + index + '__Cena');
            var taxSelect = document.querySelector('#Postavka_' + index + '__DavekId');
            var taxCodeSelect = document.querySelector('#Postavka_' + index + '__DavekKoda');
            var popustInput = document.querySelector('#Postavka_' + index + '__Popust');

            // Split the task details
            var taskParts = task.split('\t');
            var taskName = taskParts[0];
            var hoursSpent = parseFloat(taskParts[1].split(':')[0]) + parseFloat(taskParts[1].split(':')[1]) / 60;

            // Fill the input fields with task details
            articleInput.value = taskName;
            quantityInput.value = hoursSpent;
            popustInput.value = '0'
            unitMeasureSelect.value = '21';
            priceInput.value = PRICE;
            taxSelect.value = '5';
            taxCodeSelect.value = 'O';
        });

        // Clear the input field after processing
        inputField.value = '';
      
        // Set the current date
        var currentDate = new Date();
        var formattedCurrentDate = currentDate.getDate() + '.' + (currentDate.getMonth() + 1) + '.' + currentDate.getFullYear();

        // Set the first day of the previous month
        var firstDayPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        var formattedFirstDayPrevMonth = firstDayPrevMonth.getDate() + '.' + (firstDayPrevMonth.getMonth() + 1) + '.' + firstDayPrevMonth.getFullYear();

        // Set the last day of the previous month
        var lastDayPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        var formattedLastDayPrevMonth = lastDayPrevMonth.getDate() + '.' + (lastDayPrevMonth.getMonth() + 1) + '.' + lastDayPrevMonth.getFullYear();

        // Set the date 30 days from now
        var date30DaysFromNow = new Date();
        date30DaysFromNow.setDate(date30DaysFromNow.getDate() + 30);
        var formattedDate30DaysFromNow = date30DaysFromNow.getDate() + '.' + (date30DaysFromNow.getMonth() + 1) + '.' + date30DaysFromNow.getFullYear();

        // Set the values in the inputs
        document.getElementById('DatumIzdaje').value = formattedCurrentDate;
        document.getElementById('DatumDobaveOd').value = formattedFirstDayPrevMonth;
        document.getElementById('DatumDobaveDo').value = formattedLastDayPrevMonth;
        document.getElementById('DatumPlacila').value = formattedDate30DaysFromNow;
    });
})();
