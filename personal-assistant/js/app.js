document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const reminderInput = document.getElementById('reminder-input');
    const reminderPriority = document.getElementById('reminder-priority');
    const addReminderBtn = document.getElementById('add-reminder-btn');
    const reminderList = document.getElementById('reminder-list');
    const dilemmaInput = document.getElementById('dilemma-input');
    const prosInput = document.getElementById('pros-input');
    const consInput = document.getElementById('cons-input');
    const clearDecisionBtn = document.getElementById('clear-decision-btn');
    const decisionResult = document.getElementById('decision-result');
    const analyzeDecisionBtn = document.getElementById('analyze-decision-btn');

    // Theme switcher
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Add task
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const li = document.createElement('li');
            li.textContent = taskText;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => {
                li.remove();
            });
            li.appendChild(deleteBtn);
            
            li.addEventListener('click', (e) => {
                if(e.target.tagName !== 'BUTTON') {
                    li.classList.toggle('completed');
                }
            });

            taskList.appendChild(li);
            taskInput.value = '';
        }
    });

    // Add reminder
    addReminderBtn.addEventListener('click', () => {
        const reminderText = reminderInput.value.trim();
        if (reminderText !== '') {
            const priority = reminderPriority.value;
            const li = document.createElement('li');
            li.textContent = reminderText;
            li.classList.add(priority);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => {
                li.remove();
            });
            li.appendChild(deleteBtn);

            reminderList.appendChild(li);
            reminderInput.value = '';
        }
    });

    // Analyze decision
    analyzeDecisionBtn.addEventListener('click', () => {
        const dilemma = dilemmaInput.value.trim();
        if (dilemma === '') {
            decisionResult.innerHTML = '<p>Please enter a dilemma first.</p>';
            return;
        }

        const pros = prosInput.value.trim().split('\n').filter(p => p.trim() !== '');
        const cons = consInput.value.trim().split('\n').filter(c => c.trim() !== '');

        const proCount = pros.length;
        const conCount = cons.length;

        let resultHTML = `<h3>Analysis for "${dilemma}"</h3>`;
        resultHTML += `<p>You have listed ${proCount} pros and ${conCount} cons.</p>`;

        if (proCount > conCount) {
            resultHTML += '<p>There are more pros than cons. This might be a good choice.</p>';
        } else if (conCount > proCount) {
            resultHTML += '<p>There are more cons than pros. You might want to reconsider.</p>';
        } else {
            resultHTML += '<p>The number of pros and cons is equal. This is a tough decision.</p>';
        }

        decisionResult.innerHTML = resultHTML;
    });

    // Clear decision helper
    clearDecisionBtn.addEventListener('click', () => {
        dilemmaInput.value = '';
        prosInput.value = '';
        consInput.value = '';
        decisionResult.innerHTML = '';
    });
});
