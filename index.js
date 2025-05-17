// 初始化食物列表，尝试从 localStorage 加载
let food = JSON.parse(localStorage.getItem('food')) || ['好朋友', '家常菜', '麦当劳'];

// 添加新食物到列表并显示
function addFood() {
    const foodInput = document.getElementById('foodInput').value;
    if (foodInput) {
        food.push(foodInput);
        document.getElementById('foodInput').value = ''; // 清空输入框
        updateFoodList(); // 更新食物列表
        saveToLocalStorage(); // 保存到本地存储
    }
}

// 显示食物列表
function updateFoodList() {
    const foodList = document.getElementById('foodList');
    foodList.innerHTML = ''; // 清空旧内容
    food.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;
        const deleteButton = document.createElement('button');
        deleteButton.className = "delete-button";
        deleteButton.textContent = '删除';
        deleteButton.onclick = function () {
            food.splice(index, 1);
            updateFoodList();
            saveToLocalStorage();
        };
        li.appendChild(deleteButton);
        foodList.appendChild(li); // 添加新项
    });
}

// 切换食物列表的显示状态
function toggleFoodList() {
    const foodList = document.getElementById('foodList');
    const foodListContainer = foodList.parentElement;

    if (foodList.style.display === 'none') {
        foodList.style.display = 'block'; // 显示食物列表
        foodListContainer.style.display = 'block'; // 显示容器
        updateFoodList(); // 更新食物列表
    } else {
        foodList.style.display = 'none'; // 隐藏食物列表
        foodListContainer.style.display = 'none'; // 隐藏容器
    }
}

// 保存食物列表到本地存储
function saveToLocalStorage() {
    localStorage.setItem('food', JSON.stringify(food));
}

// 页面加载时初始化食物列表
window.onload = function () {
    updateFoodList();
};
